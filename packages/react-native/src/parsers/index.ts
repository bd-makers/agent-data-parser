import type { ReactNode } from 'react';

import type {
  IRendererContext,
  ParseFunction,
  IMessageParser,
} from '@bdmakers/agent-data-parser-renderers';
import { detectContentType } from '@bdmakers/agent-data-parser';

import { parseHtml } from './parseHtml';
import { createParseInlineContent } from './parseInlineContent';
import { createParseMarkdown } from './parseMarkdown';

export const createBodocParser = (context: IRendererContext): ParseFunction => {
  const parseInlineContent = createParseInlineContent(context);
  const parseMarkdown = createParseMarkdown(context);

  return (
    content: string,
    onButtonPress?: (title: string, cdata?: object) => void,
    placeholders?: Record<string, string>,
    onLinkPress?: (href: string, cdata?: object) => void,
  ): ReactNode[] => {
    const contentType = detectContentType(content);

    switch (contentType) {
      case 'html':
        return parseHtml(content, {
          context,
          parseInlineContent,
          onButtonPress,
          placeholders,
          onLinkPress,
        });
      case 'markdown':
      default:
        return parseMarkdown(content);
    }
  };
};

export class BodocParserAdapter implements IMessageParser {
  private readonly parser: ParseFunction;

  constructor(context: IRendererContext) {
    this.parser = createBodocParser(context);
  }

  parse(
    content: string,
    onButtonPress?: (title: string, cdata?: object) => void,
    placeholders?: Record<string, string>,
    onLinkPress?: (href: string, cdata?: object) => void,
  ): ReactNode[] {
    return this.parser(content, onButtonPress, placeholders, onLinkPress);
  }
}

export { createParseInlineContent } from './parseInlineContent';
export { parseHtml } from './parseHtml';
export { createParseMarkdown } from './parseMarkdown';
