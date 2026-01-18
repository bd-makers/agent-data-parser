/**
 * CDATA tag parsing utility
 */

import { parseAttributes } from './attributeUtils';

/**
 * Parses CDATA tag content and returns as object
 * Parses self-closing format attributes or normal tag JSON content
 * @param content CDATA tag content (attribute string or JSON string)
 * @returns Parsed object or null (on parse failure)
 */
export const parseCdataContent = (content: string): object | null => {
  if (!content || !content.trim()) {
    return null;
  }

  const trimmed = content.trim();

  // Self-closing format (attribute parsing)
  // e.g.: question="CANCER_COVERAGE_AMOUNT" or question='CANCER_COVERAGE_AMOUNT'
  if (trimmed.includes('=')) {
    const attrs = parseAttributes(trimmed);
    return Object.keys(attrs).length > 0 ? attrs : null;
  }

  // Normal tag format (JSON parsing)
  try {
    const parsed = JSON.parse(trimmed) as unknown;
    return typeof parsed === 'object' && parsed !== null ? (parsed as object) : null;
  } catch {
    // Return null on JSON parse failure
    return null;
  }
};
