/**
 * Utility Functions - Public API
 */

// Text utilities
export {
  detectContentType,
  replacePlaceholders,
  parseInlineMarkdownToSegments,
  replaceWithNonBreakingSpaces,
} from './textUtils';
export type { ParsedInlineSegment } from './textUtils';

// Image utilities
export {
  getImageDefaultSize,
  parseImagePattern,
  buildImageUrl,
  removeImagePatterns,
  buildAgentImageUrl,
  findAllImagePatterns,
} from './imageUtils';

// Attribute utilities
export { parseAttributes, cleanColorAttribute } from './attributeUtils';

// Tag finder utilities
export {
  BLOCK_TAGS,
  findHrTags,
  findBlockTags,
  findCdataTags,
  collectAndSortPositions,
} from './tagFinders';
export type { TagPosition, HrMatch, BlockMatch, CdataMatch, BlockTagName } from './tagFinders';

// CDATA utilities
export { parseCdataContent } from './cdataUtils';
