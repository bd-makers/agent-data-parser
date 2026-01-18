/**
 * Parsers - Public API
 */

// Types
export type {
  ParseHtmlOptions,
  BlockRendererFn,
  ParseInlineTagsOptions,
  ParseInlineTagsResult,
  ParseInlineTagsFn,
  RenderInlineMarkdownFn,
  ParserFactoryOptions,
  ProcessedSection,
  ParsedContent,
} from './types';

export { isTypographyTag, isHeadingTag, isButtonTag, isDivTag } from './types';

// HTML Parser
export {
  calculateBrHeight,
  extractSizeFromBrTag,
  splitByBrTags,
  processHrTag,
  processSection,
  createParseInlineContentFactory,
  DEFAULT_BR_HEIGHT,
} from './htmlParser';

// Markdown Parser
export type {
  MarkdownLineType,
  ParsedMarkdownLine,
  MarkdownSection,
  InlineMarkdownSegment,
} from './markdownParser';

export {
  detectLineType,
  extractLineContent,
  extractListNumber,
  parseMarkdownLine,
  normalizeMarkdown,
  parseMarkdownToSections,
  parseInlineMarkdown,
  LRUCache,
} from './markdownParser';
