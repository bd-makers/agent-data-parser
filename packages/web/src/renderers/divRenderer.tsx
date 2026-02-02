import React, { type ReactNode, type CSSProperties } from 'react';

import type { IDivRendererOptions, IRendererContext } from '@bdmakers/agent-data-parser-renderers';
import { parseAttributes, findBlockTags } from '@bdmakers/agent-data-parser';

const processInlineContentForDiv = (
  content: ReactNode,
  keyPrefix: string,
  context: IRendererContext,
): ReactNode[] => {
  const elements: ReactNode[] = [];
  let keyIndex = 0;
  const { components, theme } = context;
  const BDView = components.View;
  const BDText = components.Text;
  const BDImage = components.Image;
  const spacing = theme?.spacing || { s8: 8, s10: 10 };

  if (Array.isArray(content)) {
    let currentGroup: ReactNode[] = [];
    let hasImageInGroup = false;

    const flushGroup = () => {
      if (currentGroup.length > 0) {
        if (hasImageInGroup && currentGroup.length > 1) {
          elements.push(
            <BDView
              key={`${keyPrefix}-group-${keyIndex++}`}
              flexDirection="row"
              alignItems="center"
              mb={spacing.s10}
              style={{ flexShrink: 1, minWidth: 0 }}
            >
              {currentGroup}
            </BDView>,
          );
        } else {
          currentGroup.forEach((item) => {
            if (React.isValidElement(item)) {
              elements.push(React.cloneElement(item, { key: `${keyPrefix}-item-${keyIndex++}` }));
            } else {
              elements.push(item);
            }
          });
        }
        currentGroup = [];
        hasImageInGroup = false;
      }
    };

    content.forEach((child) => {
      if (React.isValidElement(child)) {
        if (child.type === BDImage) {
          currentGroup.push(
            <BDView
              key={`${keyPrefix}-img-${keyIndex}`}
              style={{ flexShrink: 0, alignSelf: 'center', marginRight: spacing.s8 }}
            >
              {child}
            </BDView>,
          );
          hasImageInGroup = true;
          keyIndex++;
        } else if (hasImageInGroup) {
          currentGroup.push(React.cloneElement(child, { key: `${keyPrefix}-elem-${keyIndex}` }));
          keyIndex++;
        } else {
          flushGroup();
          elements.push(React.cloneElement(child, { key: `${keyPrefix}-elem-${keyIndex++}` }));
        }
      } else if (typeof child === 'string' && child.trim()) {
        if (hasImageInGroup) {
          currentGroup.push(
            <BDView
              key={`${keyPrefix}-text-wrapper-${keyIndex}`}
              style={{ flexShrink: 1, minWidth: 0 }}
            >
              <BDText typography={theme?.typography.body2_medium} numberOfLines={0}>
                {child}
              </BDText>
            </BDView>,
          );
          keyIndex++;
        } else {
          flushGroup();
          elements.push(
            <BDView
              key={`${keyPrefix}-text-wrapper-${keyIndex++}`}
              style={{ flexShrink: 1, minWidth: 0 }}
            >
              <BDText typography={theme?.typography.body2_medium} numberOfLines={0}>
                {child}
              </BDText>
            </BDView>,
          );
        }
      }
    });

    flushGroup();
  } else if (React.isValidElement(content)) {
    if (content.type === BDImage) {
      elements.push(
        <BDView
          key={`${keyPrefix}-img-${keyIndex++}`}
          style={{ flexShrink: 0, alignSelf: 'center', marginRight: spacing.s8 }}
        >
          {content}
        </BDView>,
      );
    } else {
      elements.push(React.cloneElement(content, { key: `${keyPrefix}-elem-${keyIndex++}` }));
    }
  } else if (typeof content === 'string' && content.trim()) {
    elements.push(content);
  } else if (content !== null && content !== undefined) {
    elements.push(content);
  }

  return elements;
};

const checkHasOnlyImage = (processedElements: ReactNode[], context: IRendererContext): boolean => {
  if (processedElements.length !== 1 || !React.isValidElement(processedElements[0])) {
    return false;
  }

  const { components } = context;
  const BDView = components.View;
  const BDImage = components.Image;

  const firstElem = processedElements[0];
  if (firstElem.type !== BDView) {
    return false;
  }

  const { children } = firstElem.props as { children?: ReactNode };
  if (React.isValidElement(children) && children.type === BDImage) {
    return true;
  }

  if (Array.isArray(children) && children.length === 1) {
    const child = children[0];
    return React.isValidElement(child) && child.type === BDImage;
  }

  return false;
};

interface ProcessTextBeforeBlockOptions {
  textBefore: string;
  blockMatch: ReturnType<typeof findBlockTags>[0];
  key: number;
  elementKey: number;
  options: IDivRendererOptions;
  leftElements: ReactNode[];
  pendingImageElements: ReactNode[];
}

const processTextBeforeBlock = (
  opts: ProcessTextBeforeBlockOptions,
): { newPendingImages: ReactNode[]; newElementKey: number } => {
  const { textBefore, blockMatch, key, elementKey, options, leftElements, pendingImageElements } =
    opts;
  const { parseInlineContent, onButtonPress, onLinkPress, placeholders, context } = options;

  const inlineContent = parseInlineContent(textBefore, onButtonPress, placeholders, onLinkPress);
  const processedElements = processInlineContentForDiv(
    inlineContent,
    `div-${key}-before-${elementKey}`,
    context,
  );

  const [, , nextAttributes] = blockMatch.match;
  const nextAttrs = parseAttributes(nextAttributes || '');
  const isNextRightAligned = nextAttrs.halign && nextAttrs.halign.toLowerCase() === 'right';

  const hasOnlyImage = checkHasOnlyImage(processedElements, context);
  const currentElementKey = elementKey;

  if (hasOnlyImage && !isNextRightAligned) {
    const clonedElements = processedElements.map((elem, idx) =>
      React.isValidElement(elem)
        ? React.cloneElement(elem, { key: `div-${key}-before-${currentElementKey}-${idx}` })
        : elem,
    );
    return {
      newPendingImages: [...pendingImageElements, ...clonedElements],
      newElementKey: elementKey + 1,
    };
  }

  const newPendingImages: ReactNode[] = [];
  if (pendingImageElements.length > 0) {
    leftElements.push(...pendingImageElements);
  }

  const clonedElements = processedElements.map((elem, idx) =>
    React.isValidElement(elem)
      ? React.cloneElement(elem, { key: `div-${key}-before-${currentElementKey}-${idx}` })
      : elem,
  );
  leftElements.push(...clonedElements);

  return { newPendingImages, newElementKey: elementKey + 1 };
};

const handleRenderedBlock = (
  rendered: ReactNode,
  nestedAttributes: string,
  key: number,
  elementKey: number,
  leftElements: ReactNode[],
  rightElements: ReactNode[],
  pendingImageElements: ReactNode[],
  context: IRendererContext,
): {
  newLeftElements: ReactNode[];
  newRightElements: ReactNode[];
  newPendingImages: ReactNode[];
} => {
  const parsedNestedAttrs = parseAttributes(nestedAttributes || '');
  const isRightAligned =
    parsedNestedAttrs.halign && parsedNestedAttrs.halign.toLowerCase() === 'right';

  const { components } = context;
  const BDView = components.View;

  const newLeftElements = [...leftElements];
  const newRightElements = [...rightElements];
  let newPendingImages = [...pendingImageElements];

  if (isRightAligned) {
    if (newPendingImages.length > 0) {
      newLeftElements.push(...newPendingImages);
      newPendingImages = [];
    }
    newRightElements.push(rendered);
  } else if (newPendingImages.length > 0) {
    newLeftElements.push(
      <BDView
        key={`div-${key}-img-group-${elementKey - 1}`}
        flexDirection="row"
        alignItems="center"
        style={{ flexShrink: 0 }}
      >
        {newPendingImages}
        {rendered}
      </BDView>,
    );
    newPendingImages = [];
  } else {
    newLeftElements.push(rendered);
  }

  return { newLeftElements, newRightElements, newPendingImages };
};

const hasImageInElement = (elem: React.ReactElement, context: IRendererContext): boolean => {
  const { components } = context;
  const BDView = components.View;
  const BDImage = components.Image;

  if (elem.type === BDImage) {
    return true;
  }

  if (elem.type === BDView) {
    const props = elem.props as { children?: ReactNode; style?: CSSProperties };
    const { children } = props;

    if (React.isValidElement(children) && children.type === BDImage) {
      return true;
    }

    if (Array.isArray(children)) {
      return children.some((child) => React.isValidElement(child) && child.type === BDImage);
    }
  }

  return false;
};

const separateLogoAndText = (
  leftElements: ReactNode[],
  context: IRendererContext,
): {
  logoElement: ReactNode | undefined;
  textElements: ReactNode[];
} => {
  const { components } = context;
  const BDView = components.View;
  const BDImage = components.Image;

  let logoElement: ReactNode | undefined;
  const textElements: ReactNode[] = [];

  leftElements.forEach((elem) => {
    if (React.isValidElement(elem) && hasImageInElement(elem, context)) {
      if (!logoElement) {
        if (elem.type === BDImage) {
          logoElement = <BDView style={{ flexShrink: 0 }}>{elem}</BDView>;
        } else {
          logoElement = elem;
        }
        return;
      }
    }
    textElements.push(elem);
  });

  return { logoElement, textElements };
};

const applyTextElementStyles = (
  elements: ReactNode[],
  keyPrefix: string,
  context: IRendererContext,
): ReactNode[] =>
  elements.map((elem, idx) => {
    const { components } = context;
    const BDView = components.View;

    if (!React.isValidElement(elem) || elem.type !== BDView) {
      return elem;
    }

    const props = elem.props as { style?: CSSProperties };
    const style = props.style || {};
    const newStyle: CSSProperties = {
      ...style,
      flex: undefined,
      flexShrink: style.flexShrink ?? 1,
      minWidth: style.minWidth ?? 0,
    };
    Object.keys(newStyle).forEach((k) => {
      if (newStyle[k as keyof CSSProperties] === undefined) {
        delete newStyle[k as keyof CSSProperties];
      }
    });
    return React.cloneElement(elem, {
      key: elem.key || `${keyPrefix}-${idx}`,
      style: newStyle,
    } as Record<string, unknown>);
  });

const flattenTextElements = (elements: ReactNode[], context: IRendererContext): ReactNode[] => {
  const { components } = context;
  const BDView = components.View;

  const flattened: ReactNode[] = [];
  elements.forEach((elem) => {
    if (React.isValidElement(elem)) {
      if (elem.type === BDView) {
        const props = elem.props as {
          flexDirection?: string;
          children?: ReactNode;
          style?: CSSProperties;
        };
        const { flexDirection, children } = props;

        if (flexDirection === 'row') {
          if (Array.isArray(children)) {
            flattened.push(...flattenTextElements(children, context));
          } else if (children) {
            flattened.push(children);
          }
        } else {
          const style = props.style || {};
          const newStyle: CSSProperties = {
            ...style,
            flex: undefined,
            flexShrink: style.flexShrink ?? 1,
            minWidth: style.minWidth ?? 0,
          };
          Object.keys(newStyle).forEach((k) => {
            if (newStyle[k as keyof CSSProperties] === undefined) {
              delete newStyle[k as keyof CSSProperties];
            }
          });
          flattened.push(
            React.cloneElement(elem, { key: elem.key, style: newStyle } as Record<string, unknown>),
          );
        }
      } else {
        flattened.push(elem);
      }
    } else {
      flattened.push(elem);
    }
  });
  return flattened;
};

const renderDivWithBlockTags = (
  innerContent: string,
  key: number,
  blockMatches: ReturnType<typeof findBlockTags>,
  options: IDivRendererOptions,
  flexDirection: 'row' | 'column' = 'row',
): ReactNode => {
  const {
    context,
    parseInlineContent,
    renderBlockTagFn,
    onButtonPress,
    onLinkPress,
    placeholders,
  } = options;
  const { components, theme } = context;
  const BDView = components.View;
  const spacing = theme?.spacing || { s10: 10 };

  let leftElements: ReactNode[] = [];
  let rightElements: ReactNode[] = [];
  let lastIdx = 0;
  let elementKey = 0;
  let pendingImageElements: ReactNode[] = [];

  blockMatches.forEach((blockMatch) => {
    if (blockMatch.index > lastIdx) {
      const textBefore = innerContent.slice(lastIdx, blockMatch.index).trim();
      if (textBefore) {
        const result = processTextBeforeBlock({
          textBefore,
          blockMatch,
          key,
          elementKey,
          options,
          leftElements,
          pendingImageElements,
        });
        pendingImageElements = result.newPendingImages;
        elementKey = result.newElementKey;
      }
    }

    const [, nestedTagName, nestedAttributes, nestedContent] = blockMatch.match;
    const rendered = renderBlockTagFn(
      nestedTagName,
      nestedContent,
      elementKey++,
      {
        context,
        parseInlineContent,
        parseImagePattern: options.parseImagePattern,
        onButtonPress,
        onLinkPress,
        placeholders,
      },
      nestedAttributes,
    );

    const blockResult = handleRenderedBlock(
      rendered,
      nestedAttributes,
      key,
      elementKey - 1,
      leftElements,
      rightElements,
      pendingImageElements,
      context,
    );
    leftElements = blockResult.newLeftElements;
    rightElements = blockResult.newRightElements;
    pendingImageElements = blockResult.newPendingImages;

    lastIdx = blockMatch.index + blockMatch.match[0].length;
  });

  if (pendingImageElements.length > 0) {
    leftElements.push(...pendingImageElements);
  }

  if (lastIdx < innerContent.length) {
    const remaining = innerContent.slice(lastIdx).trim();
    if (remaining) {
      const inlineContent = parseInlineContent(remaining, onButtonPress, placeholders, onLinkPress);
      const processedElements = processInlineContentForDiv(
        inlineContent,
        `div-${key}-remaining-${elementKey}`,
        context,
      );
      leftElements.push(
        ...processedElements.map((elem, idx) =>
          React.isValidElement(elem)
            ? React.cloneElement(elem, { key: `div-${key}-remaining-${elementKey}-${idx}` })
            : elem,
        ),
      );
    }
  }

  const { logoElement, textElements } = separateLogoAndText(leftElements, context);
  const flattenedTextElements = flattenTextElements(textElements, context);
  const finalTextElements = applyTextElementStyles(flattenedTextElements, 'final-text', context);

  return (
    <BDView
      key={key}
      flexDirection={flexDirection}
      alignItems="center"
      width="100%"
      gap={flexDirection === 'column' ? spacing.s10 : undefined}
    >
      {logoElement && (
        <BDView style={{ flexShrink: 0, marginRight: spacing.s10 }}>{logoElement}</BDView>
      )}
      {finalTextElements.length > 0 && (
        <BDView
          flexDirection={flexDirection}
          alignItems="center"
          style={{ flex: 1, minWidth: 0, flexShrink: 1 }}
          gap={flexDirection === 'column' ? spacing.s10 : undefined}
        >
          {finalTextElements.map((elem, idx) => {
            if (React.isValidElement(elem)) {
              const existingStyle = (elem.props as { style?: CSSProperties })?.style || {};
              return React.cloneElement(elem, {
                key: elem.key || `final-text-${idx}`,
                style: { ...existingStyle, flexShrink: 1, minWidth: 0, maxWidth: '100%' },
              } as Record<string, unknown>);
            }
            return elem;
          })}
        </BDView>
      )}
      {rightElements.length > 0 && (
        <BDView style={{ width: 20, minWidth: 20, flexShrink: 0, alignSelf: 'stretch' }} />
      )}
      {rightElements.length > 0 && (
        <BDView alignItems="flex-end" justifyContent="flex-end" style={{ flexShrink: 0 }}>
          {rightElements}
        </BDView>
      )}
    </BDView>
  );
};

export const renderDivTag = (
  innerContent: string,
  key: number,
  options: IDivRendererOptions,
  attributes?: string,
): ReactNode => {
  const { context, parseInlineContent, onButtonPress, onLinkPress, placeholders } = options;
  const { components, theme } = context;
  const BDView = components.View;
  const spacing = theme?.spacing || { s8: 8, s10: 10 };

  let flexDirection: 'row' | 'column' = 'row';
  if (attributes) {
    const attrs = parseAttributes(attributes);
    const direct = attrs.direct?.toLowerCase();
    if (direct === 'row' || direct === 'column') {
      flexDirection = direct;
    }
  }

  const blockMatches = findBlockTags(innerContent);
  const hasBlockTags = blockMatches.length > 0;

  if (hasBlockTags) {
    return renderDivWithBlockTags(innerContent, key, blockMatches, options, flexDirection);
  }

  const content = parseInlineContent(innerContent, onButtonPress, placeholders, onLinkPress);
  const processedElements = processInlineContentForDiv(content, `div-${key}`, context);

  return (
    <BDView
      key={key}
      flexDirection={flexDirection}
      alignItems="center"
      gap={flexDirection === 'column' ? spacing.s10 : spacing.s8}
      width="100%"
      style={{ flexWrap: 'nowrap' }}
    >
      {processedElements}
    </BDView>
  );
};
