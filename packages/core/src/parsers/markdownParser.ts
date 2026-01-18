/**
 * Markdown Parser Core Logic
 * Platform-agnostic markdown parsing utilities
 */

/**
 * Line type detection
 */
export type MarkdownLineType =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'bullet-list'
  | 'ordered-list'
  | 'text'
  | 'empty';

/**
 * Parsed markdown line
 */
export interface ParsedMarkdownLine {
  type: MarkdownLineType;
  content: string;
  listNumber?: string;
  raw: string;
}

/**
 * Markdown section (group of lines)
 */
export interface MarkdownSection {
  lines: ParsedMarkdownLine[];
  marginBottom: number;
}

/**
 * Detects the type of a markdown line
 */
export const detectLineType = (line: string): MarkdownLineType => {
  const trimmed = line.trim();

  if (!trimmed) return 'empty';
  if (trimmed.startsWith('# ')) return 'h1';
  if (trimmed.startsWith('## ')) return 'h2';
  if (trimmed.startsWith('### ')) return 'h3';
  if (trimmed.startsWith('#### ')) return 'h4';
  if (trimmed.startsWith('- ')) return 'bullet-list';
  if (/^\d+\. /.test(trimmed)) return 'ordered-list';

  return 'text';
};

/**
 * Extracts content from markdown line
 */
export const extractLineContent = (line: string, type: MarkdownLineType): string => {
  const trimmed = line.trim();

  switch (type) {
    case 'h1':
      return trimmed.slice(2);
    case 'h2':
      return trimmed.slice(3);
    case 'h3':
      return trimmed.slice(4);
    case 'h4':
      return trimmed.slice(5);
    case 'bullet-list':
      return trimmed.slice(2);
    case 'ordered-list':
      return trimmed.replace(/^\d+\. /, '');
    default:
      return trimmed;
  }
};

/**
 * Extracts list number from ordered list line
 */
export const extractListNumber = (line: string): string | undefined => {
  const match = /^(\d+)\. /.exec(line.trim());
  return match ? match[1] : undefined;
};

/**
 * Parses a single markdown line
 */
export const parseMarkdownLine = (line: string): ParsedMarkdownLine => {
  const type = detectLineType(line);
  const content = extractLineContent(line, type);
  const listNumber = type === 'ordered-list' ? extractListNumber(line) : undefined;

  return {
    type,
    content,
    listNumber,
    raw: line,
  };
};

/**
 * Normalizes markdown text (converts line endings, adds newlines before lists)
 */
export const normalizeMarkdown = (markdown: string): string => {
  return markdown
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .replace(/\\n/g, '\n')
    .replace(/([^\n])\s*-\s/g, '$1\n- ') // Add newline before list (-)
    .replace(/([^\n])\s*(\d+\.)\s/g, '$1\n$2 '); // Add newline before numbered list (1.)
};

/**
 * Parses markdown into sections
 */
export const parseMarkdownToSections = (markdown: string): MarkdownSection[] => {
  const normalized = normalizeMarkdown(markdown);
  const lines = normalized.split('\n');
  const sections: MarkdownSection[] = [];

  let currentLines: ParsedMarkdownLine[] = [];
  let isInList = false;

  const closeCurrentSection = () => {
    if (currentLines.length > 0) {
      sections.push({
        lines: [...currentLines],
        marginBottom: 10,
      });
      currentLines = [];
    }
  };

  lines.forEach((line) => {
    const parsed = parseMarkdownLine(line);

    if (parsed.type === 'empty') {
      closeCurrentSection();
      isInList = false;
      return;
    }

    const isListItem = parsed.type === 'bullet-list' || parsed.type === 'ordered-list';
    const isHeading = ['h1', 'h2', 'h3', 'h4'].includes(parsed.type);

    // Headings always start a new section
    if (isHeading && currentLines.length > 0) {
      closeCurrentSection();
    }

    // List items start a new section when not already in a list
    if (isListItem && !isInList) {
      closeCurrentSection();
    }

    // Reset list state for non-list items
    if (!isListItem) {
      if (isInList) {
        closeCurrentSection();
      }
      isInList = false;
    } else {
      isInList = true;
    }

    currentLines.push(parsed);
  });

  // Add remaining section
  if (currentLines.length > 0) {
    closeCurrentSection();
  }

  return sections;
};

/**
 * Parses inline markdown bold syntax (**text**)
 * Returns segments for platform-specific rendering
 */
export interface InlineMarkdownSegment {
  type: 'text' | 'bold';
  content: string;
}

export const parseInlineMarkdown = (text: string): InlineMarkdownSegment[] => {
  const segments: InlineMarkdownSegment[] = [];
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
 * LRU Cache implementation for parsed results
 */
export class LRUCache<K, V> {
  private cache: Map<K, V>;
  private maxSize: number;

  constructor(maxSize: number) {
    this.cache = new Map();
    this.maxSize = maxSize;
  }

  get(key: K): V | undefined {
    return this.cache.get(key);
  }

  set(key: K, value: V): void {
    if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value;
      if (firstKey !== undefined) {
        this.cache.delete(firstKey);
      }
    }
    this.cache.set(key, value);
  }

  has(key: K): boolean {
    return this.cache.has(key);
  }

  clear(): void {
    this.cache.clear();
  }
}
