import { type ReactNode } from 'react';

import type { IBlockRendererOptions } from '@aijinet/bodoc-agent-parser-renderers';

import { renderButtonTag, isButtonTag } from './buttonRenderer';
import { renderDivTag } from './divRenderer';
import { renderHeadingTag, isHeadingTag } from './headingRenderer';
import { renderTypographyTag, isTypographyTag } from './typographyRenderer';

export const renderBlockTag = (
  tagName: string,
  innerContent: string,
  key: number,
  options: IBlockRendererOptions,
  attributes?: string,
  cdata?: object | null,
): ReactNode => {
  const {
    context,
    parseInlineContent,
    parseImagePattern,
    onButtonPress,
    onLinkPress,
    placeholders,
  } = options;
  const lowerTag = tagName.toLowerCase();

  if (isTypographyTag(lowerTag)) {
    return renderTypographyTag(lowerTag, innerContent, key, attributes, {
      context,
      parseInlineContent,
      onButtonPress,
      onLinkPress,
      placeholders,
    });
  }

  if (isHeadingTag(lowerTag)) {
    return renderHeadingTag(lowerTag, innerContent, key, {
      context,
      parseInlineContent,
      onButtonPress,
      onLinkPress,
      placeholders,
    });
  }

  if (isButtonTag(lowerTag)) {
    return renderButtonTag(lowerTag, innerContent, key, {
      context,
      onButtonPress,
      cdata: cdata || undefined,
    });
  }

  if (lowerTag === 'div') {
    const renderBlockTagFn = (
      nestedTagName: string,
      nestedContent: string,
      nestedKey: number,
      nestedOptions: IBlockRendererOptions,
      nestedAttributes?: string,
      nestedCdata?: object | null,
    ) =>
      renderBlockTag(
        nestedTagName,
        nestedContent,
        nestedKey,
        nestedOptions,
        nestedAttributes,
        nestedCdata,
      );

    return renderDivTag(
      innerContent,
      key,
      {
        context,
        parseInlineContent,
        parseImagePattern,
        renderBlockTagFn,
        onButtonPress,
        onLinkPress,
        placeholders,
      },
      attributes,
    );
  }

  return parseInlineContent(innerContent, onButtonPress, placeholders, onLinkPress);
};

export { isTypographyTag } from './typographyRenderer';
export { isHeadingTag } from './headingRenderer';
export { isButtonTag } from './buttonRenderer';
