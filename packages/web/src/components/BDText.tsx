/**
 * BDText Component
 * Web (React DOM) span component with typography support
 */

import { type CSSProperties, type HTMLAttributes, type ReactNode } from 'react';

interface TypographyStyle {
  fontSize?: number;
  lineHeight?: number;
  fontWeight?: string | number;
  letterSpacing?: number;
  fontFamily?: string;
  textDecorationLine?: 'underline' | 'none' | 'line-through';
}

export interface BDTextProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'style'> {
  style?: CSSProperties;
  children?: ReactNode;
  typography?: TypographyStyle;
  color?: string;
  flex?: CSSProperties['flex'];
  textAlign?: CSSProperties['textAlign'];
  onPress?: () => void;
  testID?: string;
  accessibilityLabel?: string;
  numberOfLines?: number;
}

/**
 * Converts typography style to CSS properties
 */
const typographyToCSS = (typography?: TypographyStyle): CSSProperties => {
  if (!typography) return {};

  return {
    fontSize: typography.fontSize,
    lineHeight: typography.lineHeight ? `${typography.lineHeight}px` : undefined,
    fontWeight: typography.fontWeight,
    letterSpacing: typography.letterSpacing,
    fontFamily: typography.fontFamily,
    textDecoration: typography.textDecorationLine === 'underline' ? 'underline' : undefined,
  };
};

export const BDText = ({
  typography,
  style,
  children,
  color,
  flex,
  textAlign,
  onPress,
  testID,
  accessibilityLabel,
  numberOfLines,
  ...rest
}: BDTextProps) => {
  const typographyStyle = typographyToCSS(typography);

  const combinedStyle: CSSProperties = {
    ...typographyStyle,
    color,
    textAlign,
    flex,
    ...(numberOfLines
      ? {
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          WebkitLineClamp: numberOfLines,
          WebkitBoxOrient: 'vertical' as const,
        }
      : {}),
    ...(onPress ? { cursor: 'pointer' } : {}),
    ...style,
  };

  return (
    <span
      style={combinedStyle}
      onClick={onPress}
      data-testid={testID}
      aria-label={accessibilityLabel}
      {...rest}
    >
      {children}
    </span>
  );
};

BDText.displayName = 'BDText';
