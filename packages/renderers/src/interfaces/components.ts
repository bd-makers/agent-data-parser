/**
 * Component Props Interfaces
 * Platform-agnostic interfaces for UI components used by the parser
 */

import type { ReactNode, CSSProperties } from 'react';

/**
 * Base style type - can be platform-specific styles or CSS properties
 */
export type StyleProp<T> = T | T[] | undefined;

/**
 * Spacing values (design token based)
 */
export type SpacingValue = number;

/**
 * Color value - hex string or design token reference
 */
export type ColorValue = string;

/**
 * Border radius values
 */
export type BorderRadiusValue = number;

/**
 * Flex alignment types
 */
export type FlexAlignType = 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
export type FlexJustifyType =
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'space-between'
  | 'space-around'
  | 'space-evenly';
export type FlexDirectionType = 'row' | 'column' | 'row-reverse' | 'column-reverse';

/**
 * Text alignment types
 */
export type TextAlignType = 'left' | 'center' | 'right' | 'auto' | 'justify';

/**
 * View/Container component props
 */
export interface IViewProps {
  children?: ReactNode;
  style?: StyleProp<ViewStyleProps | CSSProperties>;
  testID?: string;

  // Spacing shortcuts
  p?: SpacingValue; // padding
  pv?: SpacingValue; // paddingVertical
  ph?: SpacingValue; // paddingHorizontal
  pt?: SpacingValue; // paddingTop
  pb?: SpacingValue; // paddingBottom
  pl?: SpacingValue; // paddingLeft
  pr?: SpacingValue; // paddingRight

  m?: SpacingValue; // margin
  mv?: SpacingValue; // marginVertical
  mh?: SpacingValue; // marginHorizontal
  mt?: SpacingValue; // marginTop
  mb?: SpacingValue; // marginBottom
  ml?: SpacingValue; // marginLeft
  mr?: SpacingValue; // marginRight

  // Layout
  flex?: number;
  gap?: SpacingValue;
  flexDirection?: FlexDirectionType;
  alignItems?: FlexAlignType;
  justifyContent?: FlexJustifyType;

  // Appearance
  backgroundColor?: ColorValue;
  width?: number | string;
  height?: number | string;
  borderRadius?: BorderRadiusValue;
  borderWidth?: number;
  borderColor?: ColorValue;
}

/**
 * View style properties (subset of React Native ViewStyle)
 */
export interface ViewStyleProps {
  flex?: number;
  flexDirection?: FlexDirectionType;
  alignItems?: FlexAlignType;
  justifyContent?: FlexJustifyType;
  gap?: number;
  padding?: number;
  paddingVertical?: number;
  paddingHorizontal?: number;
  paddingTop?: number;
  paddingBottom?: number;
  paddingLeft?: number;
  paddingRight?: number;
  margin?: number;
  marginVertical?: number;
  marginHorizontal?: number;
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
  backgroundColor?: string;
  width?: number | string;
  height?: number | string;
  borderRadius?: number;
  borderWidth?: number;
  borderColor?: string;
}

/**
 * Typography style reference
 */
export interface ITypographyStyle {
  fontSize: number;
  lineHeight: number;
  fontWeight: string;
  letterSpacing?: number;
  fontFamily?: string;
  textDecorationLine?: 'none' | 'underline' | 'line-through' | 'underline line-through';
}

/**
 * Text component props
 */
export interface ITextProps {
  children?: ReactNode;
  style?: StyleProp<TextStyleProps | CSSProperties>;
  testID?: string;

  // Typography
  typography?: ITypographyStyle;
  color?: ColorValue;
  textAlign?: TextAlignType;
  flex?: number;

  // Event handlers
  onPress?: () => void;

  // Accessibility
  accessibilityLabel?: string;
  numberOfLines?: number;
}

/**
 * Text style properties (subset of React Native TextStyle)
 */
export interface TextStyleProps {
  fontSize?: number;
  lineHeight?: number;
  fontWeight?: string;
  letterSpacing?: number;
  fontFamily?: string;
  color?: string;
  textAlign?: TextAlignType;
  textDecorationLine?: string;
  flex?: number;
}

/**
 * Image component props
 */
export interface IImageProps {
  source: IImageSource;
  style?: StyleProp<ImageStyleProps | CSSProperties>;
  testID?: string;

  // Size
  width?: number;
  height?: number;

  // Appearance
  resizeMode?: 'cover' | 'contain' | 'stretch' | 'center';
  borderRadius?: BorderRadiusValue;

  // Fallback
  defaultSource?: IImageSource;

  // Accessibility
  accessibilityLabel?: string;
}

/**
 * Image source type
 */
export interface IImageSource {
  uri?: string;
  // For bundled images in React Native
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  default?: any;
}

/**
 * Image style properties
 */
export interface ImageStyleProps {
  width?: number | string;
  height?: number | string;
  borderRadius?: number;
  resizeMode?: string;
}

/**
 * Button component props
 */
export interface IButtonProps {
  title: string;
  onPress?: () => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyleProps | CSSProperties>;
  testID?: string;

  // Size variant
  size?: IButtonSize;

  // Tone/variant
  tone?: string;

  // Custom colors
  textColor?: string;
  backgroundColor?: string;

  // Icon support
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

/**
 * Button size configuration
 */
export interface IButtonSize {
  container: {
    height: number;
    paddingHorizontal: number;
    borderRadius: number;
    minWidth?: number;
    flex?: number;
  };
  text: {
    style: ITypographyStyle;
  };
  icon?: {
    size: number;
    gap: number;
  };
}

/**
 * Spacer component props
 */
export interface ISpacerProps {
  size?: SpacingValue;
  horizontal?: boolean;
  style?: StyleProp<ViewStyleProps | CSSProperties>;
}

/**
 * ShimmerText component props (optional - for loading states)
 */
export interface IShimmerTextProps {
  children?: ReactNode;
  messageId?: string;
  style?: StyleProp<TextStyleProps | CSSProperties>;
  testID?: string;
}

/**
 * Link/Pressable text props
 */
export interface ILinkProps {
  children?: ReactNode;
  href?: string;
  onPress?: () => void;
  style?: StyleProp<TextStyleProps | CSSProperties>;
  testID?: string;
}
