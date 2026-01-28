import { type ReactNode } from 'react';

import type { IRendererContext } from '@bdmakers/agent-data-parser-renderers';
import {
  parseAttributes,
  parseCdataContent,
  findCdataTags,
  replacePlaceholders,
  getImageDefaultSize,
  buildImageUrl,
} from '@bdmakers/agent-data-parser';

import { parseInlineTags } from '../renderers/inlineRenderers';

export const createParseInlineContent =
  (context: IRendererContext) =>
  (
    text: string,
    _onButtonPress?: (title: string, cdata?: object) => void,
    placeholders?: Record<string, string>,
    onLinkPress?: (href: string, cdata?: object) => void,
  ): ReactNode => {
    if (!text) return '';

    const { components } = context;
    const BDImage = components.Image;

    let processingText = text;

    if (placeholders) {
      processingText = replacePlaceholders(processingText, placeholders);
    }

    const cdataMatches = findCdataTags(processingText);
    const linkCdataMap = new Map<string, object | null>();

    if (onLinkPress && cdataMatches.length > 0) {
      const linkRegex = /<a\s+([^>]*)>(.*?)<\/a>/gi;
      let linkMatch;
      const linkMatches: Array<{ index: number; href: string; content: string }> = [];

      while ((linkMatch = linkRegex.exec(processingText)) !== null) {
        const attrs = parseAttributes(linkMatch[1]);
        const href = attrs.href || '';
        if (href) {
          linkMatches.push({ index: linkMatch.index, href, content: linkMatch[2] });
        }
      }

      linkMatches.forEach((linkInfo) => {
        const prevCdata = cdataMatches
          .filter(
            (cdataMatch) =>
              cdataMatch.index < linkInfo.index &&
              cdataMatch.index + cdataMatch.fullMatch.length <= linkInfo.index,
          )
          .sort((a, b) => b.index - a.index)[0];

        if (prevCdata) {
          const parsedCdata = parseCdataContent(prevCdata.content);
          const key = `${linkInfo.href}::${linkInfo.index}`;
          linkCdataMap.set(key, parsedCdata);
        }
      });
    }

    const parts: ReactNode[] = [];
    let key = 0;

    processingText = processingText.replace(/<br\s*\/?>/gi, '\n');

    const imageRegex = /\[(image|logo)_(\d+)_(\d+)(?:\|(\d+)x(\d+))?\]/g;
    let lastIndex = 0;
    let match = imageRegex.exec(processingText);

    while (match !== null) {
      if (match.index > lastIndex) {
        const textBefore = processingText.slice(lastIndex, match.index);
        if (textBefore) {
          const { parts: inlineParts, nextKey } = parseInlineTags(textBefore, {
            context,
            keyStart: key,
            onLinkPress,
            linkCdataMap,
            originalText: processingText,
          });
          parts.push(...inlineParts);
          key = nextKey;
        }
      }

      const [, type, id, seq, widthStr, heightStr] = match;
      const defaultSize = getImageDefaultSize(type);
      const width = widthStr ? Number.parseInt(widthStr, 10) : defaultSize.width;
      const height = heightStr ? Number.parseInt(heightStr, 10) : defaultSize.height;
      const imageUrl = buildImageUrl(context.imageBaseUrl, id, seq);

      parts.push(
        <BDImage
          key={key++}
          source={{ uri: imageUrl }}
          defaultSource={context.defaultImageSource}
          width={width}
          height={height}
        />,
      );

      lastIndex = match.index + match[0].length;
      match = imageRegex.exec(processingText);
    }

    const remainingText = processingText.slice(lastIndex);
    if (remainingText) {
      const { parts: inlineParts } = parseInlineTags(remainingText, {
        context,
        keyStart: key,
        onLinkPress,
        linkCdataMap,
        originalText: processingText,
      });
      parts.push(...inlineParts);
    }

    return parts.length > 0 ? parts : processingText;
  };
