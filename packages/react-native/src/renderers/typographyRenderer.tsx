import React, { type ReactNode } from 'react';
import type { TextStyle } from 'react-native';

import type {
  IRendererContext,
  ITypographyRendererOptions,
  TypographyTagName,
  ITypographyStyleDef,
} from '@aijinet/bodoc-agent-parser-renderers';
import { parseAttributes, cleanColorAttribute } from '@aijinet/bodoc-agent-parser';

const getTypographyStyle = (
  tagName: TypographyTagName,
  context: IRendererContext,
): ITypographyStyleDef | null => {
  const { theme } = context;
  if (!theme) return null;

  switch (tagName) {
    case 'b1b':
      return theme.typography.body1_bold;
    case 'b1m':
      return theme.typography.body1;
    case 'b2b':
      return theme.typography.body2_bold;
    case 'b2m':
      return theme.typography.body2_medium;
    case 'b3b':
      return theme.typography.body3_bold;
    case 'b3m':
      return theme.typography.body3_medium;
    case 'b4b':
      return theme.typography.body4_bold;
    case 'b4m':
      return theme.typography.body4_medium;
    case 'b5b':
      return theme.typography.body5_bold;
    case 'b5m':
      return theme.typography.body5_medium;
    case 'c1b':
      return theme.typography.caption1_bold;
    case 'c1m':
      return theme.typography.caption1;
    case 'c2b':
      return theme.typography.caption2_medium;
    case 'c2m':
      return theme.typography.caption2_medium;
    default:
      return null;
  }
};

export const isTypographyTag = (tagName: string): tagName is TypographyTagName => {
  const typographyTags: TypographyTagName[] = [
    'b1b',
    'b1m',
    'b2b',
    'b2m',
    'b3b',
    'b3m',
    'b4b',
    'b4m',
    'b5b',
    'b5m',
    'c1b',
    'c1m',
    'c2b',
    'c2m',
  ];
  return typographyTags.includes(tagName.toLowerCase() as TypographyTagName);
};

export const renderTypographyTag = (
  tagName: TypographyTagName,
  innerContent: string,
  key: number,
  attributes: string | undefined,
  options: ITypographyRendererOptions,
): ReactNode => {
  const { context, parseInlineContent, onButtonPress, onLinkPress, placeholders } = options;
  const typography = getTypographyStyle(tagName, context);

  if (!typography) return null;

  const { theme, components } = context;
  const BDText = components.Text;
  const BDView = components.View;

  const parsedAttrs = attributes ? parseAttributes(attributes) : {};
  const colorAttr = cleanColorAttribute(parsedAttrs.color);

  let textColor: string | undefined = theme?.colors.text_secondary;
  let hexColor: string | undefined;

  if (colorAttr) {
    if (colorAttr.startsWith('#')) {
      hexColor = colorAttr;
    } else if (theme?.colors) {
      const tokenKey = colorAttr as keyof typeof theme.colors;
      if (tokenKey in theme.colors && theme.colors[tokenKey]) {
        textColor = theme.colors[tokenKey];
      }
    }
  }

  const styleOverride: TextStyle = {};
  if (tagName === 'c2b') {
    styleOverride.fontWeight = '600';
    styleOverride.fontFamily = 'Pretendard-SemiBold';
  }
  if (hexColor) {
    styleOverride.color = hexColor;
  }

  const linkRegex = /<a([^>]*)>/i;
  const linkMatch = linkRegex.exec(innerContent);
  let onPress: (() => void) | undefined;

  if (linkMatch) {
    const linkAttrs = parseAttributes(linkMatch[1]);
    const href = linkAttrs.href || '';
    if (href) {
      onPress = () => context.openUrl(href);
    }
  }

  const { halign, valign } = parsedAttrs;

  const shouldApplyShimmer = (() => {
    const { messageType, messageId } = context;
    if (messageType === 'jsx' && messageId) {
      return true;
    }
    return false;
  })();

  let alignSelf: 'flex-start' | 'center' | 'flex-end' | undefined;
  let marginLeft: number | 'auto' | undefined;
  let marginRight: number | 'auto' | undefined;

  if (halign) {
    const halignLower = halign.toLowerCase();
    if (halignLower === 'left') {
      alignSelf = 'flex-start';
      marginRight = 'auto';
    } else if (halignLower === 'center') {
      alignSelf = 'center';
      marginLeft = 'auto';
      marginRight = 'auto';
    } else if (halignLower === 'right') {
      alignSelf = 'flex-end';
      marginLeft = 'auto';
    }
  } else if (valign) {
    const valignLower = valign.toLowerCase();
    if (valignLower === 'top') {
      alignSelf = 'flex-start';
    } else if (valignLower === 'mid') {
      alignSelf = 'center';
    } else if (valignLower === 'bot') {
      alignSelf = 'flex-end';
    }
  }

  const textElement = (
    <BDText
      typography={typography}
      color={textColor}
      style={styleOverride as Record<string, unknown>}
      onPress={onPress}
      suppressHighlighting={onPress ? false : undefined}
    >
      {parseInlineContent(innerContent, onButtonPress, placeholders, onLinkPress)}
    </BDText>
  );

  const ShimmerText = components.ShimmerText;
  const wrappedTextElement =
    shouldApplyShimmer && ShimmerText ? (
      <ShimmerText enabled={shouldApplyShimmer} duration={1200} messageId={context.messageId}>
        {textElement}
      </ShimmerText>
    ) : (
      textElement
    );

  if (alignSelf || marginLeft || marginRight) {
    const wrapperStyle: Record<string, unknown> = {};
    if (alignSelf) wrapperStyle.alignSelf = alignSelf;
    if (marginLeft) wrapperStyle.marginLeft = marginLeft;
    if (marginRight) wrapperStyle.marginRight = marginRight;
    return (
      <BDView key={key} style={wrapperStyle}>
        {wrappedTextElement}
      </BDView>
    );
  }

  return React.cloneElement(wrappedTextElement as React.ReactElement, { key });
};
