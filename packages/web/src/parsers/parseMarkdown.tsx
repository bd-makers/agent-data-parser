import React, { type ReactNode, type CSSProperties } from 'react';

import type { IRendererContext } from '@bdmakers/agent-data-parser-renderers';

import { renderInlineMarkdown } from '../renderers/inlineRenderers';

const listItemStyle: CSSProperties = {
  marginLeft: 10,
  marginBottom: 3,
};

const PARSING_CACHE_SIZE = 50;
const parsingCache = new Map<string, ReactNode[]>();

const LINE_CACHE_SIZE = 500;
const lineCache = new Map<string, ReactNode>();

const getCachedOrParse = (
  markdown: string,
  parseFn: (markdown: string) => ReactNode[],
): ReactNode[] => {
  if (parsingCache.has(markdown)) {
    return parsingCache.get(markdown)!;
  }

  const result = parseFn(markdown);

  if (parsingCache.size >= PARSING_CACHE_SIZE) {
    const firstKey = parsingCache.keys().next().value;
    if (firstKey !== undefined) {
      parsingCache.delete(firstKey);
    }
  }

  parsingCache.set(markdown, result);
  return result;
};

export const createParseMarkdown = (context: IRendererContext) => {
  const { components, theme } = context;
  const BDView = components.View;
  const BDText = components.Text;
  const Spacer = components.Spacer;

  const textColor = theme?.colors.text_secondary;

  return (markdown: string): ReactNode[] =>
    getCachedOrParse(markdown, (md) => {
      const normalizedMarkdown = md
        .replace(/\r\n/g, '\n')
        .replace(/\r/g, '\n')
        .replace(/\\n/g, '\n')
        .replace(/([^\n])\s*-\s/g, '$1\n- ')
        .replace(/([^\n])\s*(\d+\.)\s/g, '$1\n$2 ');

      const lines = normalizedMarkdown.split('\n');
      const elements: ReactNode[] = [];
      let globalKey = 0;
      let currentSectionElements: ReactNode[] = [];
      let lineKey = 0;
      let isInList = false;

      const closeCurrentSection = () => {
        if (currentSectionElements.length > 0) {
          elements.push(
            <BDView key={globalKey++} style={{ marginBottom: 10 }}>
              {currentSectionElements}
            </BDView>,
          );
          currentSectionElements = [];
        }
      };

      lines.forEach((line) => {
        const trimmedLine = line.trim();

        if (!trimmedLine) {
          if (currentSectionElements.length > 0) {
            closeCurrentSection();
          }
          isInList = false;
        } else {
          const isListItem = trimmedLine.startsWith('- ') || /^\d+\. /.test(trimmedLine);
          const isHeading =
            trimmedLine.startsWith('# ') ||
            trimmedLine.startsWith('## ') ||
            trimmedLine.startsWith('### ') ||
            trimmedLine.startsWith('#### ');

          if (isHeading && currentSectionElements.length > 0) {
            closeCurrentSection();
          }

          if (isListItem && !isInList) {
            closeCurrentSection();
          }

          if (!isListItem) {
            isInList = false;
          } else {
            isInList = true;
          }

          const cachedElement = lineCache.get(trimmedLine);
          if (cachedElement && React.isValidElement(cachedElement)) {
            currentSectionElements.push(React.cloneElement(cachedElement, { key: lineKey++ }));
            return;
          }

          let newElement: ReactNode = null;

          if (trimmedLine.startsWith('# ')) {
            newElement = (
              <BDText key={lineKey++} typography={theme?.typography.h1_bold} color={textColor}>
                {renderInlineMarkdown(trimmedLine.slice(2), context)}
              </BDText>
            );
          } else if (trimmedLine.startsWith('## ')) {
            newElement = (
              <BDText key={lineKey++} typography={theme?.typography.body2_bold} color={textColor}>
                {renderInlineMarkdown(trimmedLine.slice(3), context)}
              </BDText>
            );
          } else if (trimmedLine.startsWith('### ')) {
            newElement = (
              <BDText key={lineKey++} typography={theme?.typography.body3_bold} color={textColor}>
                {renderInlineMarkdown(trimmedLine.slice(4), context)}
              </BDText>
            );
          } else if (trimmedLine.startsWith('#### ')) {
            newElement = (
              <BDText key={lineKey++} typography={theme?.typography.body4_bold} color={textColor}>
                {renderInlineMarkdown(trimmedLine.slice(5), context)}
              </BDText>
            );
          } else if (trimmedLine.startsWith('- ')) {
            newElement = (
              <BDText
                key={lineKey++}
                typography={theme?.typography.body2_medium}
                style={listItemStyle}
                color={textColor}
              >
                {'• '}
                {renderInlineMarkdown(trimmedLine.slice(2), context)}
              </BDText>
            );
          } else {
            const orderedListMatch = /^(\d+)\. /.exec(trimmedLine);
            if (orderedListMatch) {
              const number = orderedListMatch[1];
              newElement = (
                <BDText
                  key={lineKey++}
                  typography={theme?.typography.body2_medium}
                  style={listItemStyle}
                  color={textColor}
                >
                  {number}. {renderInlineMarkdown(trimmedLine.replace(/^\d+\. /, ''), context)}
                </BDText>
              );
            } else {
              if (isInList) {
                closeCurrentSection();
                isInList = false;
              }
              newElement = (
                <BDText
                  key={lineKey++}
                  typography={theme?.typography.body2_medium}
                  color={textColor}
                >
                  {renderInlineMarkdown(trimmedLine, context)}
                </BDText>
              );
            }
          }

          if (newElement) {
            if (lineCache.size >= LINE_CACHE_SIZE) {
              const firstKey = lineCache.keys().next().value;
              if (firstKey !== undefined) {
                lineCache.delete(firstKey);
              }
            }
            lineCache.set(trimmedLine, newElement);
            currentSectionElements.push(newElement);
          }
        }
      });

      if (currentSectionElements.length > 0) {
        closeCurrentSection();
      }

      elements.push(<Spacer key={globalKey++} size={30} />);

      return elements;
    });
};
