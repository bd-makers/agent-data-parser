/**
 * Default Theme for Web
 * Based on Bodoc design system foundation tokens
 * Same as React Native theme for consistency
 */

import type {
  ITheme,
  IColorSystem,
  ISemanticColors,
  ISpacingTokens,
  IShapeTokens,
  IFontTokens,
  ITypographyTokens,
  IButtonSizeTokens,
  IButtonToneTokens,
} from '@bdmakers/agent-data-parser-renderers';

/**
 * Color System
 */
export const colorSystem: IColorSystem = {
  common_100: '#ffffff',
  common_0: '#000000',

  cool_neutral_50: '#f9f9f9',
  cool_neutral_100: '#f2f4f6',
  cool_neutral_150: '#e9ebef',
  cool_neutral_200: '#e1e3e7',
  cool_neutral_250: '#d4d7dc',
  cool_neutral_300: '#c6c9ce',
  cool_neutral_350: '#b5b9bf',
  cool_neutral_400: '#a4a8af',
  cool_neutral_450: '#969a9f',
  cool_neutral_500: '#898d93',
  cool_neutral_550: '#7d8085',
  cool_neutral_600: '#6f7177',
  cool_neutral_650: '#61656a',
  cool_neutral_700: '#54585e',
  cool_neutral_750: '#494d53',
  cool_neutral_800: '#3d4147',
  cool_neutral_850: '#31353a',
  cool_neutral_900: '#26282d',
  cool_neutral_950: '#1d2024',
  cool_neutral_990: '#16181c',

  light_blue_50: '#e5f7ff',
  light_blue_100: '#d1f0fd',
  light_blue_200: '#b4e9fa',
  light_blue_300: '#7cdbfb',
  light_blue_400: '#16c5ff',
  light_blue_500: '#00aeff',
  light_blue_600: '#008bcc',
  light_blue_700: '#006796',
  light_blue_800: '#004261',
  light_blue_900: '#002130',

  blue_50: '#ecf4ff',
  blue_100: '#d8e6fb',
  blue_200: '#b9d2f8',
  blue_300: '#7dacf3',
  blue_400: '#4087f2',
  blue_500: '#1e6bde',
  blue_600: '#1358be',
  blue_700: '#134a9d',
  blue_800: '#0d3571',
  blue_900: '#051f46',

  blue_dim_50: '#eaf2f7',
  blue_dim_100: '#d8e4ed',
  blue_dim_200: '#b8cddd',
  blue_dim_300: '#a2bacc',
  blue_dim_400: '#7b98ae',
  blue_dim_500: '#67859b',
  blue_dim_600: '#476984',
  blue_dim_700: '#29506d',
  blue_dim_800: '#113653',
  blue_dim_900: '#052238',

  cyan_50: '#ebfafc',
  cyan_100: '#cff3f9',
  cyan_200: '#aaeaf5',
  cyan_300: '#6eddf1',
  cyan_400: '#20c8e5',
  cyan_500: '#05b0ce',
  cyan_600: '#0b92a9',
  cyan_700: '#006f82',
  cyan_800: '#004854',
  cyan_900: '#083239',

  green_50: '#eefbf2',
  green_100: '#cdf6db',
  green_200: '#9feeba',
  green_300: '#68e191',
  green_400: '#33d267',
  green_500: '#16be4e',
  green_600: '#009632',
  green_700: '#006e25',
  green_800: '#004517',
  green_900: '#00240c',

  lime_50: '#f8fff2',
  lime_100: '#eff9e7',
  lime_150: '#DEF3CE',
  lime_200: '#bbe999',
  lime_300: '#96e35e',
  lime_400: '#7ad33a',
  lime_500: '#6bbb32',
  lime_600: '#4b9e0f',
  lime_700: '#347d00',
  lime_800: '#225200',
  lime_900: '#112900',

  amber_50: '#fffdee',
  amber_100: '#fff5cb',
  amber_200: '#ffe393',
  amber_300: '#ffc53d',
  amber_400: '#ffa938',
  amber_500: '#ff9200',
  amber_600: '#d47800',
  amber_700: '#9c5800',
  amber_800: '#663a00',
  amber_900: '#361e00',

  orange_50: '#fff6f1',
  orange_100: '#ffe3d3',
  orange_200: '#ffbd96',
  orange_300: '#ff9b61',
  orange_400: '#f87e36',
  orange_500: '#eb6517',
  orange_600: '#c94a00',
  orange_700: '#913500',
  orange_800: '#592100',
  orange_900: '#290f00',

  red_50: '#fff6f6',
  red_100: '#fde2e5',
  red_200: '#f6cacf',
  red_300: '#fc9c9c',
  red_400: '#ff7070',
  red_500: '#f34b5b',
  red_600: '#d93242',
  red_700: '#b62a37',
  red_800: '#741212',
  red_900: '#450e0e',

  magenta_50: '#fbeaf8',
  magenta_100: '#f7d2f1',
  magenta_200: '#f5b6eb',
  magenta_300: '#f289e0',
  magenta_400: '#ea69d4',
  magenta_500: '#db4ec4',
  magenta_600: '#c72dae',
  magenta_700: '#a81690',
  magenta_800: '#730560',
  magenta_900: '#560e4a',

  purple_50: '#f8eafc',
  purple_100: '#efdbf9',
  purple_200: '#e7c1f9',
  purple_300: '#d89bf4',
  purple_400: '#d081f4',
  purple_500: '#bb61e4',
  purple_600: '#a547d0',
  purple_700: '#8b36b3',
  purple_800: '#682488',
  purple_900: '#46186a',

  violet_50: '#f1eeff',
  violet_100: '#dbd1fc',
  violet_200: '#b5a7f2',
  violet_300: '#947ded',
  violet_400: '#7e61f1',
  violet_500: '#6a4dda',
  violet_600: '#5b3ecf',
  violet_700: '#4e34b3',
  violet_800: '#3b2694',
  violet_900: '#2f1f72',

  alpha_white_0: '#ffffff00',
  alpha_white_50: '#ffffff0d',
  alpha_white_100: '#ffffff1a',
  alpha_white_200: '#ffffff33',
  alpha_white_300: '#ffffff4d',
  alpha_white_400: '#ffffff66',
  alpha_white_500: '#ffffff80',
  alpha_white_600: '#ffffff99',
  alpha_white_700: '#ffffffb3',
  alpha_white_800: '#ffffffcc',
  alpha_white_900: '#ffffffe6',

  alpha_black_0: '#00000000',
  alpha_black_50: '#0000000d',
  alpha_black_100: '#0000001a',
  alpha_black_200: '#00000033',
  alpha_black_300: '#0000004d',
  alpha_black_400: '#00000066',
  alpha_black_500: '#00000080',
  alpha_black_600: '#00000099',
  alpha_black_700: '#000000b3',
  alpha_black_800: '#000000cc',
  alpha_black_900: '#000000e6',
};

/**
 * Semantic Colors
 */
export const semanticColors: ISemanticColors = {
  bg_primary: colorSystem.common_100,
  bg_secondary: colorSystem.cool_neutral_50,
  bg_tertiary: colorSystem.cool_neutral_100,
  bg_chatting: colorSystem.blue_dim_100,
  bg_emphasis_primary: colorSystem.light_blue_50,
  bg_emphasis_secondary: colorSystem.blue_50,

  text_primary: colorSystem.cool_neutral_950,
  text_secondary: colorSystem.cool_neutral_750,
  text_tertiary: colorSystem.cool_neutral_550,
  text_quaternary: colorSystem.cool_neutral_400,
  text_disabled: colorSystem.cool_neutral_300,
  text_inverse_primary: colorSystem.common_100,
  text_inverse_secondary: colorSystem.alpha_white_600,
  text_inverse_tertiary: colorSystem.alpha_white_400,
  text_accent: colorSystem.light_blue_500,

  icon_enabled: colorSystem.cool_neutral_950,
  icon_subtle: colorSystem.cool_neutral_550,
  icon_inactive: colorSystem.cool_neutral_400,
  icon_active: colorSystem.light_blue_400,
  icon_accent: colorSystem.light_blue_500,
  icon_disabled: colorSystem.cool_neutral_300,
  icon_pressed: colorSystem.cool_neutral_600,
  icon_inverse: colorSystem.common_100,

  border_primary: colorSystem.cool_neutral_150,
  border_subtle: colorSystem.cool_neutral_250,
  border_selected: colorSystem.cool_neutral_300,
  border_transparent: colorSystem.alpha_black_100,

  overlay_50: colorSystem.alpha_black_500,

  modal_background: colorSystem.common_100,
  modal_surface_primary: colorSystem.cool_neutral_50,
  modal_surface_secondary: colorSystem.cool_neutral_100,

  button_accent_primary: colorSystem.light_blue_400,
  button_accent_secondary: colorSystem.light_blue_50,
  button_accent_tertiary: colorSystem.cool_neutral_700,
  button_accent_extra: colorSystem.alpha_black_50,
  button_surface_accent_disabled: colorSystem.cool_neutral_250,
  button_surface_neutral: colorSystem.cool_neutral_150,
  button_surface_neutral_disabled: colorSystem.cool_neutral_100,

  toast_background: colorSystem.alpha_black_900,

  list_overlay_disabled: colorSystem.alpha_black_800,
  accent: colorSystem.light_blue_400,
  error: colorSystem.red_600,
  warning: colorSystem.red_500,

  static_white: colorSystem.common_100,
  static_black: colorSystem.common_0,
  static_white_bold: colorSystem.alpha_white_800,
  static_white_subtle: colorSystem.alpha_white_400,
  static_white_subtler: colorSystem.alpha_white_300,
  static_black_bold: colorSystem.alpha_black_800,
  static_black_subtler: colorSystem.alpha_black_300,
};

/**
 * Spacing Tokens
 */
export const spacing: ISpacingTokens = {
  s1: 1,
  s2: 2,
  s4: 4,
  s6: 6,
  s8: 8,
  s9: 9,
  s10: 10,
  s12: 12,
  s14: 14,
  s16: 16,
  s18: 18,
  s20: 20,
  s24: 24,
  s28: 28,
  s30: 30,
  s32: 32,
  s34: 34,
  s38: 38,
  s40: 40,
  s44: 44,
  s45: 45,
  s48: 48,
  s50: 50,
  s52: 52,
  s56: 56,
  s60: 60,
  s64: 64,
  s66: 66,
};

/**
 * Shape Tokens
 */
export const shape: IShapeTokens = {
  r4: 4,
  r6: 6,
  r8: 8,
  r10: 10,
  r12: 12,
  r16: 16,
  r20: 20,
  r24: 24,
  r38: 38,
  r9999: 9999,
  border_05: 0.5,
  border_10: 1,
};

/**
 * Font Tokens
 */
export const font: IFontTokens = {
  size_38: 38,
  size_34: 34,
  size_24: 24,
  size_22: 22,
  size_20: 20,
  size_18: 18,
  size_16: 16,
  size_14: 14,
  size_13: 13,
  size_12: 12,
  size_10: 10,
  size_8: 8,

  line_height_40: 40,
  line_height_36: 36,
  line_height_32: 32,
  line_height_30: 30,
  line_height_28: 28,
  line_height_24: 24,
  line_height_22: 22,
  line_height_20: 20,
  line_height_18: 18,
  line_height_14: 14,
  line_height_12: 12,

  weight_600: '600',
  weight_500: '500',
  weight_400: '400',

  letter_spacing_m10: -1,
  letter_spacing_m05: -0.5,
  letter_spacing_0: 0,

  text_decoration_underline: 'underline',
};

/**
 * Typography Tokens
 */
export const typography: ITypographyTokens = {
  h1_bold: {
    fontSize: font.size_38,
    lineHeight: font.line_height_40,
    fontWeight: font.weight_600,
    letterSpacing: font.letter_spacing_m05,
  },
  h2_bold: {
    fontSize: font.size_34,
    lineHeight: font.line_height_40,
    fontWeight: font.weight_600,
    letterSpacing: font.letter_spacing_m05,
  },
  h2: {
    fontSize: font.size_34,
    lineHeight: font.line_height_40,
    fontWeight: font.weight_500,
    letterSpacing: font.letter_spacing_m05,
  },
  h3: {
    fontSize: font.size_24,
    lineHeight: font.line_height_36,
    fontWeight: font.weight_500,
    letterSpacing: font.letter_spacing_m05,
  },
  h3_bold: {
    fontSize: font.size_24,
    lineHeight: font.line_height_36,
    fontWeight: font.weight_600,
    letterSpacing: font.letter_spacing_m05,
  },
  h4: {
    fontSize: font.size_22,
    lineHeight: font.line_height_32,
    fontWeight: font.weight_600,
    letterSpacing: font.letter_spacing_m05,
    color: semanticColors.text_primary,
  },
  h5_bold: {
    fontSize: font.size_20,
    lineHeight: font.line_height_30,
    fontWeight: font.weight_600,
    letterSpacing: font.letter_spacing_m05,
  },
  h5_bold_underline: {
    fontSize: font.size_20,
    lineHeight: font.line_height_30,
    fontWeight: font.weight_600,
    letterSpacing: font.letter_spacing_m05,
    textDecorationLine: font.text_decoration_underline,
  },
  h5_medium: {
    fontSize: font.size_20,
    lineHeight: font.line_height_30,
    fontWeight: font.weight_500,
    letterSpacing: font.letter_spacing_m05,
  },
  h5: {
    fontSize: font.size_20,
    lineHeight: font.line_height_30,
    fontWeight: font.weight_400,
    letterSpacing: font.letter_spacing_m05,
  },
  body1_bold: {
    fontSize: font.size_18,
    lineHeight: font.line_height_28,
    fontWeight: font.weight_600,
    letterSpacing: font.letter_spacing_m05,
    color: semanticColors.text_primary,
  },
  body1_bold_underline: {
    fontSize: font.size_18,
    lineHeight: font.line_height_28,
    fontWeight: font.weight_600,
    letterSpacing: font.letter_spacing_m05,
    textDecorationLine: font.text_decoration_underline,
  },
  body1: {
    fontSize: font.size_18,
    lineHeight: font.line_height_28,
    fontWeight: font.weight_500,
    letterSpacing: font.letter_spacing_m05,
  },
  body2_bold: {
    fontSize: font.size_16,
    lineHeight: font.line_height_24,
    fontWeight: font.weight_600,
    letterSpacing: font.letter_spacing_m05,
    color: semanticColors.text_primary,
  },
  body2_bold_underline: {
    fontSize: font.size_16,
    lineHeight: font.line_height_24,
    fontWeight: font.weight_600,
    letterSpacing: font.letter_spacing_m05,
    textDecorationLine: font.text_decoration_underline,
  },
  body2_medium: {
    fontSize: font.size_16,
    lineHeight: font.line_height_24,
    fontWeight: font.weight_500,
    letterSpacing: font.letter_spacing_m05,
    color: semanticColors.text_primary,
  },
  body2_normal: {
    fontSize: font.size_16,
    lineHeight: font.line_height_24,
    fontWeight: font.weight_400,
    letterSpacing: font.letter_spacing_m05,
  },
  body2_reading: {
    fontSize: font.size_16,
    lineHeight: font.line_height_24,
    fontWeight: font.weight_400,
    letterSpacing: font.letter_spacing_m10,
  },
  body3_bold: {
    fontSize: font.size_14,
    lineHeight: font.line_height_22,
    fontWeight: font.weight_600,
    letterSpacing: font.letter_spacing_m05,
  },
  body3_bold_underline: {
    fontSize: font.size_14,
    lineHeight: font.line_height_22,
    fontWeight: font.weight_600,
    letterSpacing: font.letter_spacing_m05,
    textDecorationLine: font.text_decoration_underline,
  },
  body3_medium: {
    fontSize: font.size_14,
    lineHeight: font.line_height_22,
    fontWeight: font.weight_500,
    letterSpacing: font.letter_spacing_m05,
  },
  body3_underline: {
    fontSize: font.size_14,
    lineHeight: font.line_height_22,
    fontWeight: font.weight_400,
    letterSpacing: font.letter_spacing_m05,
    textDecorationLine: font.text_decoration_underline,
  },
  body3_reading: {
    fontSize: font.size_14,
    lineHeight: font.line_height_24,
    fontWeight: font.weight_400,
    letterSpacing: font.letter_spacing_m10,
  },
  body3_normal: {
    fontSize: font.size_14,
    lineHeight: font.line_height_22,
    fontWeight: font.weight_400,
    letterSpacing: font.letter_spacing_m05,
  },
  body4_bold: {
    fontSize: font.size_13,
    lineHeight: font.line_height_20,
    fontWeight: font.weight_600,
    letterSpacing: font.letter_spacing_m05,
  },
  body4_medium: {
    fontSize: font.size_13,
    lineHeight: font.line_height_18,
    fontWeight: font.weight_500,
    letterSpacing: font.letter_spacing_m05,
  },
  body4_underline: {
    fontSize: font.size_13,
    lineHeight: font.line_height_18,
    fontWeight: font.weight_400,
    letterSpacing: font.letter_spacing_m05,
    textDecorationLine: font.text_decoration_underline,
  },
  body4_normal: {
    fontSize: font.size_13,
    lineHeight: font.line_height_18,
    fontWeight: font.weight_400,
    letterSpacing: font.letter_spacing_m05,
  },
  body4_reading: {
    fontSize: font.size_13,
    lineHeight: font.line_height_18,
    fontWeight: font.weight_400,
    letterSpacing: font.letter_spacing_m10,
  },
  body5_bold: {
    fontSize: font.size_12,
    lineHeight: font.line_height_20,
    fontWeight: font.weight_600,
    letterSpacing: font.letter_spacing_m05,
  },
  body5_medium: {
    fontSize: font.size_12,
    lineHeight: font.line_height_18,
    fontWeight: font.weight_500,
    letterSpacing: font.letter_spacing_m05,
  },
  body5_underline: {
    fontSize: font.size_12,
    lineHeight: font.line_height_18,
    fontWeight: font.weight_400,
    letterSpacing: font.letter_spacing_m05,
    textDecorationLine: font.text_decoration_underline,
  },
  body5_normal: {
    fontSize: font.size_12,
    lineHeight: font.line_height_18,
    fontWeight: font.weight_400,
    letterSpacing: font.letter_spacing_m05,
  },
  body5_reading: {
    fontSize: font.size_12,
    lineHeight: font.line_height_18,
    fontWeight: font.weight_400,
    letterSpacing: font.letter_spacing_m10,
  },
  caption1_bold: {
    fontSize: font.size_10,
    lineHeight: font.line_height_18,
    fontWeight: font.weight_600,
    letterSpacing: font.letter_spacing_m05,
  },
  caption1: {
    fontSize: font.size_10,
    lineHeight: font.line_height_18,
    fontWeight: font.weight_400,
    letterSpacing: font.letter_spacing_m05,
  },
  caption1_underline: {
    fontSize: font.size_10,
    lineHeight: font.line_height_18,
    fontWeight: font.weight_400,
    letterSpacing: font.letter_spacing_m05,
    textDecorationLine: font.text_decoration_underline,
  },
  caption2_medium: {
    fontSize: font.size_8,
    lineHeight: font.line_height_12,
    fontWeight: font.weight_400,
    letterSpacing: font.letter_spacing_m05,
  },
};

/**
 * Button Size Tokens
 */
export const buttonSizes: IButtonSizeTokens = {
  FullWidth: {
    container: {
      height: 56,
      paddingHorizontal: spacing.s24,
      borderRadius: shape.r16,
      flex: 1,
    },
    text: { style: typography.body2_bold },
    icon: { size: 16, gap: 4 },
  },
  XXLarge: {
    container: {
      height: 56,
      paddingHorizontal: spacing.s24,
      borderRadius: shape.r16,
      minWidth: 24,
    },
    text: { style: typography.body2_bold },
    icon: { size: 16, gap: 4 },
  },
  Xlarge: {
    container: {
      height: 52,
      paddingHorizontal: spacing.s24,
      borderRadius: shape.r16,
      minWidth: 24,
    },
    text: { style: typography.body2_bold },
    icon: { size: 16, gap: 4 },
  },
  Large: {
    container: {
      height: 48,
      paddingHorizontal: spacing.s16,
      borderRadius: shape.r16,
      minWidth: 24,
    },
    text: { style: typography.body2_bold },
    icon: { size: 16, gap: 4 },
  },
  Medium: {
    container: {
      height: 40,
      paddingHorizontal: spacing.s16,
      borderRadius: shape.r16,
      minWidth: 24,
    },
    text: { style: typography.body3_bold },
    icon: { size: 16, gap: 4 },
  },
  Small: {
    container: {
      height: 36,
      paddingHorizontal: spacing.s16,
      borderRadius: shape.r16,
      minWidth: 16,
    },
    text: { style: typography.body3_bold },
    icon: { size: 12, gap: 4 },
  },
  XSmall: {
    container: {
      height: 32,
      paddingHorizontal: spacing.s16,
      borderRadius: shape.r10,
      minWidth: 16,
    },
    text: { style: typography.body5_bold },
    icon: { size: 12, gap: 4 },
  },
};

/**
 * Button Tone Tokens
 */
export const buttonTones: IButtonToneTokens = {
  Primary: {
    active: {
      backgroundColor: semanticColors.button_accent_primary,
      textColor: semanticColors.text_inverse_primary,
    },
    disabled: {
      backgroundColor: semanticColors.button_surface_accent_disabled,
      textColor: semanticColors.text_quaternary,
    },
  },
  Secondary: {
    active: {
      backgroundColor: semanticColors.bg_emphasis_primary,
      textColor: semanticColors.text_accent,
    },
    disabled: {
      backgroundColor: semanticColors.button_surface_neutral_disabled,
      textColor: semanticColors.text_disabled,
    },
  },
  Tertiary: {
    active: {
      backgroundColor: semanticColors.button_surface_neutral,
      textColor: semanticColors.text_secondary,
    },
    disabled: {
      backgroundColor: semanticColors.button_surface_neutral_disabled,
      textColor: semanticColors.text_disabled,
    },
  },
  Quaternary: {
    active: {
      backgroundColor: semanticColors.button_accent_tertiary,
      textColor: semanticColors.text_inverse_primary,
    },
    disabled: {
      backgroundColor: semanticColors.button_surface_accent_disabled,
      textColor: semanticColors.text_quaternary,
    },
  },
  Extra: {
    active: {
      backgroundColor: semanticColors.button_accent_extra,
      textColor: semanticColors.text_secondary,
    },
    disabled: {
      backgroundColor: semanticColors.button_accent_extra,
      textColor: semanticColors.text_disabled,
    },
  },
  AI: {
    active: {
      backgroundColor: semanticColors.button_accent_primary,
      textColor: semanticColors.text_inverse_primary,
    },
    disabled: {
      backgroundColor: semanticColors.button_surface_accent_disabled,
      textColor: semanticColors.text_quaternary,
    },
  },
};

/**
 * Default Theme
 */
export const defaultTheme: ITheme = {
  colors: semanticColors,
  colorSystem,
  spacing,
  shape,
  font,
  typography,
  buttonSizes,
  buttonTones,
};
