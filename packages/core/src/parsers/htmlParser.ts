/**
 * HTML Parser Core Logic
 * Platform-agnostic HTML parsing utilities
 */

import type { ReactNode } from 'react';

import type { IRendererContext, ParseInlineContentFn } from '@bdmakers/agent-data-parser-renderers';

import { parseCdataContent } from '../utils/cdataUtils';
import { parseImagePattern } from '../utils/imageUtils';
import {
  findHrTags,
  findBlockTags,
  findCdataTags,
  collectAndSortPositions,
  type TagPosition,
} from '../utils/tagFinders';

import type { ParseHtmlOptions, BlockRendererFn } from './types';

const DEFAULT_BR_HEIGHT = 10;

/**
 * Calculates br tag height based on size attribute
 */
export const calculateBrHeight = (sizeAttr: string | undefined): number => {
  if (!sizeAttr) {
    return DEFAULT_BR_HEIGHT;
  }

  // Extract percent value from size attribute (e.g.: "50%", "50", "50% ")
  const percentMatch = sizeAttr.match(/(\d+(?:\.\d+)?)\s*%/);
  if (percentMatch) {
    const percent = parseFloat(percentMatch[1]!);
    return (DEFAULT_BR_HEIGHT * percent) / 100;
  }

  return DEFAULT_BR_HEIGHT;
};

/**
 * Extracts size attribute from br tag
 */
export const extractSizeFromBrTag = (brTag: string): string | undefined => {
  const sizeMatch = brTag.match(/size\s*=\s*["']?([^"'>]+)["']?/i);
  return sizeMatch ? sizeMatch[1]!.trim() : undefined;
};

/**
 * Splits HTML by br tags and extracts heights
 */
export const splitByBrTags = (html: string): { parts: string[]; brHeights: number[] } => {
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

  return { parts, brHeights };
};

/**
 * Process HR tag
 */
export const processHrTag = (
  pos: TagPosition,
  lastIndex: number,
  trimmed: string,
  sectionElements: ReactNode[],
  sectionKeyRef: { current: number },
  options: ParseHtmlOptions,
  renderHr: (key: number, context: IRendererContext) => ReactNode,
): number => {
  const { context, parseInlineContent, onButtonPress, onLinkPress, placeholders } = options;

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

  sectionElements.push(renderHr(sectionKeyRef.current++, context));

  return pos.index + (pos.hrLength ?? 4);
};

/**
 * Process section with block tags
 */
export const processSection = (
  sectionText: string,
  sectionKeyRef: { current: number },
  options: ParseHtmlOptions,
  blockRenderer: BlockRendererFn,
): ReactNode[] => {
  const { context, parseInlineContent, onButtonPress, onLinkPress, placeholders } = options;
  const sectionElements: ReactNode[] = [];

  // Find CDATA tags first for later use
  const cdataMatches = findCdataTags(sectionText);

  // Remove CDATA tags from text (prevent Text component errors)
  const textWithoutCdata = sectionText
    .replace(/<CDATA\s+[^>]*?\/>/gis, '')
    .replace(/<CDATA>.*?<\/CDATA>/gis, '');

  const hrMatches = findHrTags(textWithoutCdata);
  const blockMatches = findBlockTags(textWithoutCdata);
  const allPositions = collectAndSortPositions(hrMatches, blockMatches);

  let lastIndex = 0;

  allPositions.forEach((pos) => {
    if (pos.type === 'hr') {
      // HR tags should be handled by the platform-specific code
      // For now, we skip and let it be handled elsewhere
      lastIndex = pos.index + (pos.hrLength ?? 4);
      return;
    }

    if (pos.match) {
      const [, tagName, attributes, innerContent] = pos.match;

      // For button tags, find preceding CDATA tag
      const lowerTagName = tagName!.toLowerCase();
      const isButtonTagMatch =
        lowerTagName === 'button' || lowerTagName === 'button1' || lowerTagName === 'button2';

      let cdata: object | null = null;
      if (isButtonTagMatch && cdataMatches.length > 0) {
        const buttonTagPattern = `<${tagName}[^>]*>.*?</${tagName}\\s*>`;
        const buttonRegex = new RegExp(buttonTagPattern, 'gsi');
        let buttonMatch;
        let buttonIndex = -1;

        while ((buttonMatch = buttonRegex.exec(sectionText)) !== null) {
          if (buttonMatch[0].includes(innerContent!)) {
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

      const renderedBlock = blockRenderer(
        tagName!,
        innerContent!,
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

  // Handle remaining text
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

/**
 * Creates an inline content parser factory
 * This is a placeholder factory - actual implementation should be in platform-specific packages
 * The parameters are required for the full implementation but the core package only provides the structure
 */
export const createParseInlineContentFactory = (
  _context: IRendererContext,
  _parseInlineTags: (
    text: string,
    options: {
      context: IRendererContext;
      keyStart: number;
      onLinkPress?: (href: string, cdata?: object) => void;
      linkCdataMap?: Map<string, object | null>;
      originalText?: string;
    },
  ) => { parts: ReactNode[]; nextKey: number },
  _renderImage: (
    key: number,
    imageUrl: string,
    width: number,
    height: number,
    context: IRendererContext,
  ) => ReactNode,
): ParseInlineContentFn => {
  return (
    text: string,
    _onButtonPress?: (title: string, cdata?: object) => void,
    _placeholders?: Record<string, string>,
    _onLinkPress?: (href: string, cdata?: object) => void,
  ): ReactNode => {
    if (!text) return '';

    // This is a placeholder - actual implementation will be in platform-specific packages
    // The core package provides the structure, not the React Native-specific rendering
    return text;
  };
};

/**
 * Export default br height for use by platform-specific packages
 */
export { DEFAULT_BR_HEIGHT };
