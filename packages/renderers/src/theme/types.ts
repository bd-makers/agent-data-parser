/**
 * Theme Token Interfaces
 * Platform-agnostic design token interfaces
 */

/**
 * Color system tokens
 */
export interface IColorSystem {
  // Common
  common_100: string;
  common_0: string;

  // Neutrals
  cool_neutral_50: string;
  cool_neutral_100: string;
  cool_neutral_150: string;
  cool_neutral_200: string;
  cool_neutral_250: string;
  cool_neutral_300: string;
  cool_neutral_350: string;
  cool_neutral_400: string;
  cool_neutral_450: string;
  cool_neutral_500: string;
  cool_neutral_550: string;
  cool_neutral_600: string;
  cool_neutral_650: string;
  cool_neutral_700: string;
  cool_neutral_750: string;
  cool_neutral_800: string;
  cool_neutral_850: string;
  cool_neutral_900: string;
  cool_neutral_950: string;
  cool_neutral_990: string;

  // Light Blue
  light_blue_50: string;
  light_blue_100: string;
  light_blue_200: string;
  light_blue_300: string;
  light_blue_400: string;
  light_blue_500: string;
  light_blue_600: string;
  light_blue_700: string;
  light_blue_800: string;
  light_blue_900: string;

  // Blue
  blue_50: string;
  blue_100: string;
  blue_200: string;
  blue_300: string;
  blue_400: string;
  blue_500: string;
  blue_600: string;
  blue_700: string;
  blue_800: string;
  blue_900: string;

  // Blue Dim
  blue_dim_50: string;
  blue_dim_100: string;
  blue_dim_200: string;
  blue_dim_300: string;
  blue_dim_400: string;
  blue_dim_500: string;
  blue_dim_600: string;
  blue_dim_700: string;
  blue_dim_800: string;
  blue_dim_900: string;

  // Cyan
  cyan_50: string;
  cyan_100: string;
  cyan_200: string;
  cyan_300: string;
  cyan_400: string;
  cyan_500: string;
  cyan_600: string;
  cyan_700: string;
  cyan_800: string;
  cyan_900: string;

  // Green
  green_50: string;
  green_100: string;
  green_200: string;
  green_300: string;
  green_400: string;
  green_500: string;
  green_600: string;
  green_700: string;
  green_800: string;
  green_900: string;

  // Lime
  lime_50: string;
  lime_100: string;
  lime_150: string;
  lime_200: string;
  lime_300: string;
  lime_400: string;
  lime_500: string;
  lime_600: string;
  lime_700: string;
  lime_800: string;
  lime_900: string;

  // Amber
  amber_50: string;
  amber_100: string;
  amber_200: string;
  amber_300: string;
  amber_400: string;
  amber_500: string;
  amber_600: string;
  amber_700: string;
  amber_800: string;
  amber_900: string;

  // Orange
  orange_50: string;
  orange_100: string;
  orange_200: string;
  orange_300: string;
  orange_400: string;
  orange_500: string;
  orange_600: string;
  orange_700: string;
  orange_800: string;
  orange_900: string;

  // Red
  red_50: string;
  red_100: string;
  red_200: string;
  red_300: string;
  red_400: string;
  red_500: string;
  red_600: string;
  red_700: string;
  red_800: string;
  red_900: string;

  // Magenta
  magenta_50: string;
  magenta_100: string;
  magenta_200: string;
  magenta_300: string;
  magenta_400: string;
  magenta_500: string;
  magenta_600: string;
  magenta_700: string;
  magenta_800: string;
  magenta_900: string;

  // Purple
  purple_50: string;
  purple_100: string;
  purple_200: string;
  purple_300: string;
  purple_400: string;
  purple_500: string;
  purple_600: string;
  purple_700: string;
  purple_800: string;
  purple_900: string;

  // Violet
  violet_50: string;
  violet_100: string;
  violet_200: string;
  violet_300: string;
  violet_400: string;
  violet_500: string;
  violet_600: string;
  violet_700: string;
  violet_800: string;
  violet_900: string;

  // Alpha colors
  alpha_white_0: string;
  alpha_white_50: string;
  alpha_white_100: string;
  alpha_white_200: string;
  alpha_white_300: string;
  alpha_white_400: string;
  alpha_white_500: string;
  alpha_white_600: string;
  alpha_white_700: string;
  alpha_white_800: string;
  alpha_white_900: string;

  alpha_black_0: string;
  alpha_black_50: string;
  alpha_black_100: string;
  alpha_black_200: string;
  alpha_black_300: string;
  alpha_black_400: string;
  alpha_black_500: string;
  alpha_black_600: string;
  alpha_black_700: string;
  alpha_black_800: string;
  alpha_black_900: string;
}

/**
 * Semantic color tokens
 */
export interface ISemanticColors {
  // Background
  bg_primary: string;
  bg_secondary: string;
  bg_tertiary: string;
  bg_chatting: string;
  bg_emphasis_primary: string;
  bg_emphasis_secondary: string;

  // Text
  text_primary: string;
  text_secondary: string;
  text_tertiary: string;
  text_quaternary: string;
  text_disabled: string;
  text_inverse_primary: string;
  text_inverse_secondary: string;
  text_inverse_tertiary: string;
  text_accent: string;

  // Icon
  icon_enabled: string;
  icon_subtle: string;
  icon_inactive: string;
  icon_active: string;
  icon_accent: string;
  icon_disabled: string;
  icon_pressed: string;
  icon_inverse: string;

  // Border
  border_primary: string;
  border_subtle: string;
  border_selected: string;
  border_transparent: string;

  // Overlay
  overlay_50: string;

  // Modal
  modal_background: string;
  modal_surface_primary: string;
  modal_surface_secondary: string;

  // Button
  button_accent_primary: string;
  button_accent_secondary: string;
  button_accent_tertiary: string;
  button_accent_extra: string;
  button_surface_accent_disabled: string;
  button_surface_neutral: string;
  button_surface_neutral_disabled: string;

  // Toast
  toast_background: string;

  // Utility
  list_overlay_disabled: string;
  accent: string;
  error: string;
  warning: string;

  // Static
  static_white: string;
  static_black: string;
  static_white_bold: string;
  static_white_subtle: string;
  static_white_subtler: string;
  static_black_bold: string;
  static_black_subtler: string;
}

/**
 * Spacing tokens
 */
export interface ISpacingTokens {
  s1: number;
  s2: number;
  s4: number;
  s6: number;
  s8: number;
  s9: number;
  s10: number;
  s12: number;
  s14: number;
  s16: number;
  s18: number;
  s20: number;
  s24: number;
  s28: number;
  s30: number;
  s32: number;
  s34: number;
  s38: number;
  s40: number;
  s44: number;
  s45: number;
  s48: number;
  s50: number;
  s52: number;
  s56: number;
  s60: number;
  s64: number;
  s66: number;
}

/**
 * Shape tokens (border radius)
 */
export interface IShapeTokens {
  r4: number;
  r6: number;
  r8: number;
  r10: number;
  r12: number;
  r16: number;
  r20: number;
  r24: number;
  r38: number;
  r9999: number;

  border_05: number;
  border_10: number;
}

/**
 * Font tokens
 */
export interface IFontTokens {
  // Sizes
  size_38: number;
  size_34: number;
  size_24: number;
  size_22: number;
  size_20: number;
  size_18: number;
  size_16: number;
  size_14: number;
  size_13: number;
  size_12: number;
  size_10: number;
  size_8: number;

  // Line heights
  line_height_40: number;
  line_height_36: number;
  line_height_32: number;
  line_height_30: number;
  line_height_28: number;
  line_height_24: number;
  line_height_22: number;
  line_height_20: number;
  line_height_18: number;
  line_height_14: number;
  line_height_12: number;

  // Weights
  weight_600: string;
  weight_500: string;
  weight_400: string;

  // Letter spacing
  letter_spacing_m10: number;
  letter_spacing_m05: number;
  letter_spacing_0: number;

  // Text decoration
  text_decoration_underline: string;
}

/**
 * Typography style definition
 */
export interface ITypographyStyleDef {
  fontSize: number;
  lineHeight: number;
  fontWeight: string;
  letterSpacing: number;
  fontFamily?: string;
  textDecorationLine?: 'none' | 'underline' | 'line-through' | 'underline line-through';
  color?: string;
}

/**
 * Typography tokens
 */
export interface ITypographyTokens {
  // Headings
  h1_bold: ITypographyStyleDef;
  h2_bold: ITypographyStyleDef;
  h2: ITypographyStyleDef;
  h3: ITypographyStyleDef;
  h3_bold: ITypographyStyleDef;
  h4: ITypographyStyleDef;
  h5_bold: ITypographyStyleDef;
  h5_bold_underline: ITypographyStyleDef;
  h5_medium: ITypographyStyleDef;
  h5: ITypographyStyleDef;

  // Body 1
  body1_bold: ITypographyStyleDef;
  body1_bold_underline: ITypographyStyleDef;
  body1: ITypographyStyleDef;

  // Body 2
  body2_bold: ITypographyStyleDef;
  body2_bold_underline: ITypographyStyleDef;
  body2_medium: ITypographyStyleDef;
  body2_normal: ITypographyStyleDef;
  body2_reading: ITypographyStyleDef;

  // Body 3
  body3_bold: ITypographyStyleDef;
  body3_bold_underline: ITypographyStyleDef;
  body3_medium: ITypographyStyleDef;
  body3_underline: ITypographyStyleDef;
  body3_reading: ITypographyStyleDef;
  body3_normal: ITypographyStyleDef;

  // Body 4
  body4_bold: ITypographyStyleDef;
  body4_medium: ITypographyStyleDef;
  body4_underline: ITypographyStyleDef;
  body4_normal: ITypographyStyleDef;
  body4_reading: ITypographyStyleDef;

  // Body 5
  body5_bold: ITypographyStyleDef;
  body5_medium: ITypographyStyleDef;
  body5_underline: ITypographyStyleDef;
  body5_normal: ITypographyStyleDef;
  body5_reading: ITypographyStyleDef;

  // Caption
  caption1_bold: ITypographyStyleDef;
  caption1: ITypographyStyleDef;
  caption1_underline: ITypographyStyleDef;
  caption2_medium: ITypographyStyleDef;
}

/**
 * Button size tokens
 */
export interface IButtonSizeTokens {
  FullWidth: IButtonSizeConfig;
  XXLarge: IButtonSizeConfig;
  Xlarge: IButtonSizeConfig;
  Large: IButtonSizeConfig;
  Medium: IButtonSizeConfig;
  Small: IButtonSizeConfig;
  XSmall: IButtonSizeConfig;
}

export interface IButtonSizeConfig {
  container: {
    height: number;
    paddingHorizontal: number;
    borderRadius: number;
    flex?: number;
    minWidth?: number;
  };
  text: {
    style: ITypographyStyleDef;
  };
  icon: {
    size: number;
    gap: number;
  };
}

/**
 * Button tone tokens
 */
export interface IButtonToneTokens {
  Primary: IButtonToneConfig;
  Secondary: IButtonToneConfig;
  Tertiary: IButtonToneConfig;
  Quaternary: IButtonToneConfig;
  Extra: IButtonToneConfig;
  AI: IButtonToneConfig;
}

export interface IButtonToneConfig {
  active: {
    backgroundColor: string;
    textColor: string;
  };
  disabled: {
    backgroundColor: string;
    textColor: string;
  };
}

/**
 * Complete Theme interface
 */
export interface ITheme {
  colors: ISemanticColors;
  colorSystem: IColorSystem;
  spacing: ISpacingTokens;
  shape: IShapeTokens;
  font: IFontTokens;
  typography: ITypographyTokens;
  buttonSizes: IButtonSizeTokens;
  buttonTones: IButtonToneTokens;
}
