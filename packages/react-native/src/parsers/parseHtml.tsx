import { type ReactNode } from 'react';

import type { IRendererContext, ParseInlineContentFn } from '@bdmakers/agent-data-parser-renderers';
import {
  parseAttributes,
  parseCdataContent,
  parseImagePattern,
  findHrTags,
  findBlockTags,
  findCdataTags,
  collectAndSortPositions,
  type TagPosition,
} from '@bdmakers/agent-data-parser';

import { renderBlockTag } from '../renderers/blockRenderers';

interface ParseHtmlOptions {
  context: IRendererContext;
  parseInlineContent: ParseInlineContentFn;
  onButtonPress?: (title: string, cdata?: object) => void;
  onLinkPress?: (href: string, cdata?: object) => void;
  placeholders?: Record<string, string>;
}

const processHrTag = (
  pos: TagPosition,
  lastIndex: number,
  trimmed: string,
  sectionElements: ReactNode[],
  sectionKeyRef: { current: number },
  options: ParseHtmlOptions,
): number => {
  const { context, parseInlineContent, onButtonPress, onLinkPress, placeholders } = options;
  const { components } = context;
  const BDView = components.View;

  if (pos.index > lastIndex) {
    const textBefore = trimmed.slice(lastIndex, pos.index);
    const trimmedBefore = textBefore.trim();
    if (trimmedBefore) {
      const inlineContent = parseInlineContent(
        trimmedBefore,
        onButtonPress,
        placeholders,
        onLinkPress,
      );
      if (Array.isArray(inlineContent)) {
        sectionElements.push(...inlineContent);
      } else {
        sectionElements.push(inlineContent);
      }
      sectionKeyRef.current++;
    }
  }

  sectionElements.push(<BDView key={sectionKeyRef.current++} style={context.styles.hr} />);
  return pos.index + (pos.hrLength || 4);
};

const processSection = (
  sectionText: string,
  sectionKeyRef: { current: number },
  options: ParseHtmlOptions,
): ReactNode[] => {
  const { context, parseInlineContent, onButtonPress, onLinkPress, placeholders } = options;
  const sectionElements: ReactNode[] = [];

  const cdataMatches = findCdataTags(sectionText);
  const textWithoutCdata = sectionText
    .replace(/<CDATA\s+[^>]*?\/>/gis, '')
    .replace(/<CDATA>.*?<\/CDATA>/gis, '');

  const hrMatches = findHrTags(textWithoutCdata);
  const blockMatches = findBlockTags(textWithoutCdata);
  const allPositions = collectAndSortPositions(hrMatches, blockMatches);

  let lastIndex = 0;

  allPositions.forEach((pos) => {
    if (pos.type === 'hr') {
      lastIndex = processHrTag(
        pos,
        lastIndex,
        textWithoutCdata,
        sectionElements,
        sectionKeyRef,
        options,
      );
      return;
    }

    if (pos.match) {
      const [, tagName, attributes, innerContent] = pos.match;
      parseAttributes(attributes);

      const lowerTagName = tagName.toLowerCase();
      const isButtonTag =
        lowerTagName === 'button' || lowerTagName === 'button1' || lowerTagName === 'button2';

      let cdata: object | null = null;
      if (isButtonTag && cdataMatches.length > 0) {
        const buttonTagPattern = `<${tagName}[^>]*>.*?</${tagName}\\s*>`;
        const buttonRegex = new RegExp(buttonTagPattern, 'gsi');
        let buttonMatch;
        let buttonIndex = -1;

        while ((buttonMatch = buttonRegex.exec(sectionText)) !== null) {
          if (buttonMatch[0].includes(innerContent)) {
            buttonIndex = buttonMatch.index;
            break;
          }
        }

        if (buttonIndex >= 0) {
          const prevCdata = cdataMatches
            .filter(
              (cdataMatch) =>
                cdataMatch.index < buttonIndex &&
                cdataMatch.index + cdataMatch.fullMatch.length <= buttonIndex,
            )
            .sort((a, b) => b.index - a.index)[0];

          if (prevCdata) {
            cdata = parseCdataContent(prevCdata.content);
          }
        }
      }

      const renderedBlock = renderBlockTag(
        tagName,
        innerContent,
        sectionKeyRef.current++,
        {
          context,
          parseInlineContent,
          parseImagePattern,
          onButtonPress,
          onLinkPress,
          placeholders,
        },
        attributes,
        cdata,
      );

      if (Array.isArray(renderedBlock)) {
        sectionElements.push(...renderedBlock);
      } else {
        sectionElements.push(renderedBlock);
      }
      lastIndex = pos.index + pos.match[0].length;
    }
  });

  if (lastIndex < textWithoutCdata.length) {
    const remainingText = textWithoutCdata.slice(lastIndex);
    const trimmed = remainingText.trim();
    if (trimmed) {
      const inlineContent = parseInlineContent(trimmed, onButtonPress, placeholders, onLinkPress);
      if (Array.isArray(inlineContent)) {
        sectionElements.push(...inlineContent);
      } else {
        sectionElements.push(inlineContent);
      }
    }
  }

  return sectionElements;
};

const defaultBrHeight = 10;

const calculateBrHeight = (sizeAttr: string | undefined): number => {
  if (!sizeAttr) return defaultBrHeight;

  const percentMatch = sizeAttr.match(/(\d+(?:\.\d+)?)\s*%/);
  if (percentMatch) {
    const percent = parseFloat(percentMatch[1]);
    return (defaultBrHeight * percent) / 100;
  }

  return defaultBrHeight;
};

const extractSizeFromBrTag = (brTag: string): string | undefined => {
  const sizeMatch = brTag.match(/size\s*=\s*["']?([^"'>]+)["']?/i);
  return sizeMatch ? sizeMatch[1].trim() : undefined;
};

export const parseHtml = (html: string, options: ParseHtmlOptions): ReactNode[] => {
  const { context } = options;
  const { components } = context;
  const BDView = components.View;
  const Spacer = components.Spacer;

  const elements: ReactNode[] = [];
  let key = 0;

  const brRegex = /<br\s*(?:[^>]*)?\/?>?/gi;
  const parts: string[] = [];
  const brHeights: number[] = [];

  let lastIndex = 0;
  let match;

  while ((match = brRegex.exec(html)) !== null) {
    parts.push(html.slice(lastIndex, match.index));
    const sizeAttr = extractSizeFromBrTag(match[0]);
    brHeights.push(calculateBrHeight(sizeAttr));
    lastIndex = match.index + match[0].length;
  }

  parts.push(html.slice(lastIndex));

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    const trimmed = part.trim();

    if (trimmed) {
      const sectionKeyRef = { current: 0 };
      const sectionElements = processSection(trimmed, sectionKeyRef, options);

      const isLastPart = i === parts.length - 1;
      const nextPartIsEmpty = i < parts.length - 1 && !parts[i + 1].trim();

      let marginBottom = 0;
      if (!isLastPart || nextPartIsEmpty) {
        marginBottom = i < brHeights.length ? brHeights[i] : defaultBrHeight;
      }

      if (sectionElements.length > 0) {
        elements.push(
          <BDView key={key++} flexDirection="column" style={{ marginBottom }}>
            {sectionElements}
          </BDView>,
        );
      }
    } else if (parts.length > 1) {
      const spacing = i < brHeights.length ? brHeights[i] : defaultBrHeight;
      elements.push(
        <BDView key={key++} style={{ minHeight: spacing, marginBottom: spacing, width: '100%' }} />,
      );
    }
  }

  elements.push(<Spacer key={key++} size={20} />);

  return elements;
};
