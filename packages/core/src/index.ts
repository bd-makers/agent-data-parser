/**
 * @aijinet/bodoc-agent-parser
 *
 * Platform-agnostic message parser core library for React Native and Web.
 * This package provides the parsing logic and utilities.
 * Platform-specific rendering is handled by companion packages:
 * - @aijinet/bodoc-agent-parser-react-native
 * - @aijinet/bodoc-agent-parser-web
 */

// Re-export types from renderers package
export type {
  // Component interfaces
  IViewProps,
  ITextProps,
  IImageProps,
  IButtonProps,
  ISpacerProps,
  IShimmerTextProps,
  ILinkProps,
  ITypographyStyle,
  IButtonSize,
  IImageSource,
  ViewStyleProps,
  TextStyleProps,
  ImageStyleProps,
  StyleProp,
  SpacingValue,
  ColorValue,
  BorderRadiusValue,
  FlexAlignType,
  FlexJustifyType,
  FlexDirectionType,
  TextAlignType,
  // Theme types
  ITheme,
  IColorSystem,
  ISemanticColors,
  ISpacingTokens,
  IShapeTokens,
  IFontTokens,
  ITypographyStyleDef,
  ITypographyTokens,
  IButtonSizeTokens,
  IButtonSizeConfig,
  IButtonToneTokens,
  IButtonToneConfig,
  // Context types
  IComponentProvider,
  IParserStyles,
  MessageType,
  IRendererContext,
  IRendererContextConfig,
  ParseInlineContentFn,
  IImagePattern,
  ParseImagePatternFn,
  IBlockRendererOptions,
  ParseFunction,
  IMessageParser,
  ParserType,
  TypographyTagName,
  HeadingTagName,
  ButtonTagName,
} from '@aijinet/bodoc-agent-parser-renderers';

// Utilities
export {
  // Text utilities
  detectContentType,
  replacePlaceholders,
  parseInlineMarkdownToSegments,
  replaceWithNonBreakingSpaces,
  // Image utilities
  getImageDefaultSize,
  parseImagePattern,
  buildImageUrl,
  removeImagePatterns,
  buildAgentImageUrl,
  findAllImagePatterns,
  // Attribute utilities
  parseAttributes,
  cleanColorAttribute,
  // Tag finder utilities
  BLOCK_TAGS,
  findHrTags,
  findBlockTags,
  findCdataTags,
  collectAndSortPositions,
  // CDATA utilities
  parseCdataContent,
} from './utils';

export type {
  ParsedInlineSegment,
  TagPosition,
  HrMatch,
  BlockMatch,
  CdataMatch,
  BlockTagName,
} from './utils';

// Parsers
export {
  // Type guards
  isTypographyTag,
  isHeadingTag,
  isButtonTag,
  isDivTag,
  // HTML Parser
  calculateBrHeight,
  extractSizeFromBrTag,
  splitByBrTags,
  processSection,
  createParseInlineContentFactory,
  DEFAULT_BR_HEIGHT,
  // Markdown Parser
  detectLineType,
  extractLineContent,
  extractListNumber,
  parseMarkdownLine,
  normalizeMarkdown,
  parseMarkdownToSections,
  parseInlineMarkdown,
  LRUCache,
} from './parsers';

export type {
  // Parser types
  ParseHtmlOptions,
  BlockRendererFn,
  ParseInlineTagsOptions,
  ParseInlineTagsResult,
  ParseInlineTagsFn,
  RenderInlineMarkdownFn,
  ParserFactoryOptions,
  ProcessedSection,
  ParsedContent,
  // Markdown types
  MarkdownLineType,
  ParsedMarkdownLine,
  MarkdownSection,
  InlineMarkdownSegment,
} from './parsers';
