/**
 * @aijinet/bodoc-agent-parser-renderers
 *
 * Platform-agnostic interfaces and types for the Bodoc Agent Parser.
 * This package defines the contracts that platform-specific implementations must follow.
 */

// Component Interfaces
export type {
  // Base types
  StyleProp,
  SpacingValue,
  ColorValue,
  BorderRadiusValue,
  FlexAlignType,
  FlexJustifyType,
  FlexDirectionType,
  TextAlignType,
  // View
  IViewProps,
  ViewStyleProps,
  // Text
  ITextProps,
  TextStyleProps,
  ITypographyStyle,
  // Image
  IImageProps,
  IImageSource,
  ImageStyleProps,
  // Button
  IButtonProps,
  IButtonSize,
  IButtonTone,
  // Spacer
  ISpacerProps,
  // ShimmerText
  IShimmerTextProps,
  // Link
  ILinkProps,
} from './interfaces';

// Theme Types
export type {
  // Color system
  IColorSystem,
  ISemanticColors,
  // Spacing & Shape
  ISpacingTokens,
  IShapeTokens,
  // Font
  IFontTokens,
  // Typography
  ITypographyStyleDef,
  ITypographyTokens,
  // Button
  IButtonSizeTokens,
  IButtonSizeConfig,
  IButtonToneTokens,
  IButtonToneConfig,
  // Theme
  ITheme,
} from './theme';

// Context Types
export type {
  // Component Provider
  IComponentProvider,
  // Parser Styles
  IParserStyles,
  // Message Type
  MessageType,
  // Renderer Context
  IRendererContext,
  IRendererContextConfig,
  // Parser Function Types
  ParseInlineContentFn,
  IImagePattern,
  ParseImagePatternFn,
  IBlockRendererOptions,
  ParseFunction,
  // Message Parser
  IMessageParser,
  ParserType,
  // Tag Types
  TypographyTagName,
  HeadingTagName,
  ButtonTagName,
  // Block Renderer
  BlockRendererFn,
  // Inline Parser
  IParseInlineTagsOptions,
  IParseInlineTagsResult,
  ParseInlineTagsFn,
  RenderInlineMarkdownFn,
  // Renderer Options
  IDivRendererOptions,
  ITypographyRendererOptions,
  IHeadingRendererOptions,
  IButtonRendererOptions,
} from './context';
