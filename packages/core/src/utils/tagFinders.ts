/**
 * HTML tag finding utility functions
 */

/**
 * Tag position information type
 */
export interface TagPosition {
  index: number;
  type: 'hr' | 'block';
  match?: RegExpExecArray;
  hrLength?: number;
}

/**
 * HR match information
 */
export interface HrMatch {
  index: number;
  length: number;
}

/**
 * Block match information
 */
export interface BlockMatch {
  index: number;
  match: RegExpExecArray;
}

/**
 * CDATA match information
 */
export interface CdataMatch {
  index: number;
  content: string;
  fullMatch: string;
}

/**
 * Supported block tag list
 */
export const BLOCK_TAGS = [
  'h1',
  'h2',
  'h3',
  'div',
  'button',
  'button1',
  'button2',
  'b1b',
  'b1m',
  'b2b',
  'b2m',
  'b3b',
  'b3m',
  'b4b',
  'b4m',
  'b5b',
  'b5m',
  'c1b',
  'c1m',
  'c2b',
  'c2m',
] as const;

export type BlockTagName = (typeof BLOCK_TAGS)[number];

/**
 * Finds HR tags
 */
export const findHrTags = (text: string): HrMatch[] => {
  const hrRegex = /<hr\s*\/?>/gi;
  const hrMatches: HrMatch[] = [];
  let hrMatch;

  while ((hrMatch = hrRegex.exec(text)) !== null) {
    hrMatches.push({ index: hrMatch.index, length: hrMatch[0].length });
  }

  return hrMatches;
};

/**
 * Finds block tags
 */
export const findBlockTags = (text: string): BlockMatch[] => {
  const blockMatches: BlockMatch[] = [];

  // Match each tag individually (improved nested tag handling)
  // Sort tags by priority (longer tag names first for more specific matching)
  const sortedTags = [...BLOCK_TAGS].sort((a, b) => b.length - a.length);

  sortedTags.forEach((tag) => {
    // Escape tag name
    const escapedTag = tag.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    // Regex patterns: use tag name directly instead of backreference for case handling
    const patterns = [
      // Normal closing tag: </tag> or </tag >
      new RegExp(`<(${escapedTag})([^>]*)>(.*?)</${escapedTag}\\s*>`, 'gsi'),
      // Wrong format: closed with <tag>
      new RegExp(`<(${escapedTag})([^>]*)>(.*?)<${escapedTag}\\s*>`, 'gsi'),
    ];

    patterns.forEach((pattern) => {
      let match;
      let lastIndex = 0;

      while ((match = pattern.exec(text)) !== null) {
        // Prevent duplicate matching due to global flag
        if (match.index < lastIndex) {
          continue;
        }

        const fullMatch = match[0];
        const startIndex = match.index;
        const endIndex = startIndex + fullMatch.length;
        lastIndex = endIndex;

        // Check for overlap with already matched ranges
        const shouldSkip = blockMatches.some((existing) => {
          const existingStart = existing.index;
          const existingEnd = existingStart + existing.match[0].length;

          // Current match is completely inside existing match (nested inner tag) - skip
          const isCompletelyInside = startIndex >= existingStart && endIndex <= existingEnd;

          // Existing match is completely inside current match (outer tag is bigger)
          const isCompletelyOutside = existingStart >= startIndex && existingEnd <= endIndex;

          // Partial overlap - skip
          const hasPartialOverlap =
            (startIndex >= existingStart && startIndex < existingEnd && endIndex > existingEnd) ||
            (endIndex > existingStart && endIndex <= existingEnd && startIndex < existingStart);

          if (isCompletelyOutside) {
            // Current match is bigger, existing match will be removed
            return false;
          }

          return isCompletelyInside || hasPartialOverlap;
        });

        if (!shouldSkip) {
          // Remove existing matches that are completely inside current match
          const filteredMatches = blockMatches.filter((existing) => {
            const existingStart = existing.index;
            const existingEnd = existingStart + existing.match[0].length;
            const isCompletelyInside = existingStart >= startIndex && existingEnd <= endIndex;
            return !isCompletelyInside;
          });

          // Reflect removed matches
          blockMatches.length = 0;
          blockMatches.push(...filteredMatches);

          blockMatches.push({ index: startIndex, match });
        }
      }
    });
  });

  // Sort by index
  return blockMatches.sort((a, b) => a.index - b.index);
};

/**
 * Finds CDATA tags
 * Supports both self-closing and normal tag formats
 */
export const findCdataTags = (text: string): CdataMatch[] => {
  const cdataMatches: CdataMatch[] = [];

  // Self-closing format: <CDATA .../>
  const selfClosingRegex = /<CDATA\s+([^>]*?)\/>/gis;
  let match;

  while ((match = selfClosingRegex.exec(text)) !== null) {
    cdataMatches.push({
      index: match.index,
      content: match[1] || '',
      fullMatch: match[0],
    });
  }

  // Normal tag format: <CDATA>...</CDATA>
  const normalRegex = /<CDATA>(.*?)<\/CDATA>/gis;

  while ((match = normalRegex.exec(text)) !== null) {
    // Skip if already matched as self-closing
    const isAlreadyMatched = cdataMatches.some((existing) => existing.index === match!.index);
    if (!isAlreadyMatched) {
      cdataMatches.push({
        index: match.index,
        content: match[1] || '',
        fullMatch: match[0],
      });
    }
  }

  return cdataMatches.sort((a, b) => a.index - b.index);
};

/**
 * Collects and sorts HR and block tag positions
 */
export const collectAndSortPositions = (
  hrMatches: HrMatch[],
  blockMatches: BlockMatch[],
): TagPosition[] => {
  const allPositions: TagPosition[] = [];

  for (let i = 0; i < hrMatches.length; i++) {
    const hrMatch = hrMatches[i]!;
    allPositions.push({
      index: hrMatch.index,
      type: 'hr',
      hrLength: hrMatch.length,
    });
  }

  for (let i = 0; i < blockMatches.length; i++) {
    const blockMatch = blockMatches[i]!;
    allPositions.push({
      index: blockMatch.index,
      type: 'block',
      match: blockMatch.match,
    });
  }

  return allPositions.sort((a, b) => a.index - b.index);
};
