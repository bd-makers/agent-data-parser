/**
 * Text processing utility functions
 * - No external dependencies
 * - Pure functions for easy testing
 */

/**
 * Detects content type (html, markdown, text)
 */
export const detectContentType = (content: string): 'html' | 'markdown' | 'text' => {
  // Markdown characteristic patterns
  const markdownPatterns = [
    /^#{1,6}\s+/m, // Headings (# ## ###)
    /\*\*.*?\*\*/, // Bold (**text**)
    /\[.*?\]\(.*?\)/, // Links [text](url)
    /^-\s+/m, // List (- item)
    /^\d+\.\s+/m, // Ordered list (1. item)
  ];

  const hasMarkdown = markdownPatterns.some((pattern) => pattern.test(content));
  const hasHtmlTags = /<[^>]+>/g.test(content);

  if (hasMarkdown && !hasHtmlTags) return 'markdown';
  if (hasHtmlTags) return 'html';

  return 'text';
};

/**
 * Replaces placeholders (protects image patterns)
 */
export const replacePlaceholders = (text: string, placeholders: Record<string, string>): string => {
  if (!text || !placeholders) return text;

  let result = text;

  // Protect image patterns during replacement
  // [image_...], [logo_...] patterns are temporarily protected
  const imagePatterns: Array<{ placeholder: string; original: string }> = [];
  const imageRegex = /\[(image|logo|img)_(\d+)_(\d+)(?:\|(\d+)x(\d+))?\]/g;
  let match;
  let tempIndex = 0;

  // Replace image patterns with temporary placeholders
  while ((match = imageRegex.exec(text)) !== null) {
    const tempPlaceholder = `__IMAGE_PLACEHOLDER_${tempIndex++}__`;
    imagePatterns.push({
      placeholder: tempPlaceholder,
      original: match[0],
    });
    result = result.replace(match[0], tempPlaceholder);
  }

  // Replace regular placeholders
  Object.keys(placeholders).forEach((key) => {
    const value = placeholders[key] || '';
    result = result.replace(new RegExp(`\\[${key}\\]`, 'g'), value);
  });

  // Restore image patterns
  for (let i = 0; i < imagePatterns.length; i++) {
    const { placeholder, original } = imagePatterns[i]!;
    result = result.replace(placeholder, original);
  }

  return result;
};

/**
 * Parsed inline segment type
 */
export interface ParsedInlineSegment {
  type: 'text' | 'bold';
  content: string;
}

/**
 * Parses inline markdown (bold processing)
 * Returns string array without React dependency
 */
export const parseInlineMarkdownToSegments = (text: string): ParsedInlineSegment[] => {
  const segments: ParsedInlineSegment[] = [];
  const boldRegex = /\*\*(.*?)\*\*/g;
  let lastIndex = 0;
  let match;

  while ((match = boldRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      segments.push({
        type: 'text',
        content: text.slice(lastIndex, match.index),
      });
    }
    segments.push({
      type: 'bold',
      content: match[1]!,
    });
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    segments.push({
      type: 'text',
      content: text.slice(lastIndex),
    });
  }

  return segments.length > 0 ? segments : [{ type: 'text', content: text }];
};

/**
 * Replaces spaces with non-breaking space (\u00a0)
 * - Prevents text from wrapping at spaces
 * - Prevents ellipsis (...) from cutting in the middle
 */
export const replaceWithNonBreakingSpaces = (text: string): string => text.replace(/\s/g, '\u00a0');
