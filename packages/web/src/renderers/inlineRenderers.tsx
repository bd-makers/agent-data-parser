import type { ReactNode } from 'react';

import type {
  IRendererContext,
  IParseInlineTagsOptions,
  IParseInlineTagsResult,
} from '@bdmakers/agent-data-parser-renderers';
import { parseInlineMarkdownToSegments, parseAttributes } from '@bdmakers/agent-data-parser';

export const renderInlineMarkdown = (text: string, context: IRendererContext): ReactNode => {
  const segments = parseInlineMarkdownToSegments(text);

  if (segments.length === 1 && segments[0].type === 'text') {
    return segments[0].content;
  }

  const { theme, components } = context;
  const BDText = components.Text;

  return segments.map((segment, index) => {
    if (segment.type === 'bold') {
      return (
        <BDText
          key={index}
          typography={theme?.typography.body2_bold}
          color={theme?.colors.text_secondary}
        >
          {segment.content}
        </BDText>
      );
    }
    return segment.content;
  });
};

export const parseInlineTags = (
  text: string,
  options: IParseInlineTagsOptions,
): IParseInlineTagsResult => {
  const { context, keyStart, depth = 0, onLinkPress, linkCdataMap, originalText } = options;
  const parts: ReactNode[] = [];
  let key = keyStart;

  if (depth > 50) {
    return { parts: [text], nextKey: key };
  }

  if (!/<(a|b|font)([^>]*)>/i.test(text)) {
    return { parts: [renderInlineMarkdown(text, context)], nextKey: key };
  }

  const { theme, components } = context;
  const BDText = components.Text;

  const inlineRegex = /<(a|b|font)([^>]*)>(.*?)<\/\1>/gi;
  let lastIndex = 0;
  let match;
  let matchCount = 0;

  while ((match = inlineRegex.exec(text)) !== null) {
    matchCount++;
    if (match.index > lastIndex) {
      const textBefore = text.slice(lastIndex, match.index);
      if (textBefore) {
        const { parts: beforeParts, nextKey: beforeKey } = parseInlineTags(textBefore, {
          context,
          keyStart: key,
          depth: depth + 1,
          onLinkPress,
          linkCdataMap,
          originalText,
        });
        parts.push(...beforeParts);
        key = beforeKey;
      }
    }

    const [, tagName, attributes, content] = match;
    const attrs = parseAttributes(attributes);

    if (tagName.toLowerCase() === 'a') {
      const href = attrs.href || '';

      let cdata: object | null | undefined;
      if (onLinkPress && linkCdataMap && originalText && href) {
        const linkPattern = `<a\\s+([^>]*)>${content.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}<\\/a>`;
        const linkRegex = new RegExp(linkPattern, 'gi');
        let linkMatch;
        let foundIndex = -1;

        while ((linkMatch = linkRegex.exec(originalText)) !== null) {
          const matchAttrs = parseAttributes(linkMatch[1]);
          if (matchAttrs.href === href) {
            foundIndex = linkMatch.index;
            break;
          }
        }

        if (foundIndex >= 0) {
          const cdataKey = `${href}::${foundIndex}`;
          cdata = linkCdataMap.get(cdataKey) ?? undefined;
        }
      }

      const handlePress = href
        ? onLinkPress
          ? () => onLinkPress(href, cdata ?? undefined)
          : () => context.openUrl(href)
        : undefined;

      const { parts: linkParts, nextKey: linkKey } = parseInlineTags(content, {
        context,
        keyStart: key,
        depth: depth + 1,
        onLinkPress,
        linkCdataMap,
        originalText,
      });
      parts.push(
        <BDText
          key={key++}
          typography={theme?.typography.body3_bold}
          color={handlePress ? theme?.colors.text_accent : theme?.colors.text_secondary}
          onPress={handlePress}
        >
          {linkParts}
        </BDText>,
      );
      key = linkKey;
    }

    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    const remaining = text.slice(lastIndex);
    if (remaining) {
      if (remaining === text && matchCount === 0) {
        parts.push(renderInlineMarkdown(remaining, context));
      } else {
        const { parts: remainingParts, nextKey: remainingKey } = parseInlineTags(remaining, {
          context,
          keyStart: key,
          depth: depth + 1,
          onLinkPress,
          linkCdataMap,
          originalText,
        });
        parts.push(...remainingParts);
        key = remainingKey;
      }
    }
  } else if (parts.length === 0) {
    parts.push(renderInlineMarkdown(text, context));
  }

  return { parts, nextKey: key };
};
