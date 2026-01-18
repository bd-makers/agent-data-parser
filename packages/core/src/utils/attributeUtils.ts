/**
 * HTML/XML attribute parsing utility functions
 */

/**
 * Parses attribute string and returns as object
 * Supports both regular and unicode quotes
 */
export const parseAttributes = (attrString: string): Record<string, string> => {
  const attrs: Record<string, string> = {};
  if (!attrString) return attrs;

  // With quotes: halign="right" or halign='right'
  // Unicode quotes also supported: halign="right" or halign="right"
  // Without quotes: halign=right
  // Unicode quotes: " (U+201C), " (U+201D), ' (U+2018), ' (U+2019)
  const attrRegex =
    /(\w+)=(?:[""\u201C\u201D''\u2018\u2019]([^""\u201C\u201D''\u2018\u2019]*)[""\u201C\u201D''\u2018\u2019]|([^\s>]+))/g;
  let match;

  while ((match = attrRegex.exec(attrString)) !== null) {
    const [, key, quotedValue, unquotedValue] = match;
    // Use quotedValue if exists, otherwise use unquotedValue
    let value = quotedValue !== undefined && quotedValue !== '' ? quotedValue : unquotedValue || '';

    // Remove unicode quotes from both ends
    value = value
      .replace(/^[""\u201C\u201D''\u2018\u2019]+|[""\u201C\u201D''\u2018\u2019]+$/g, '')
      .replace(/\\"/g, '"')
      .replace(/\\'/g, "'");

    attrs[key!] = value;
  }

  return attrs;
};

/**
 * Removes unicode quotes from color attribute
 */
export const cleanColorAttribute = (colorAttr: string | undefined): string | undefined => {
  if (!colorAttr) return undefined;

  return colorAttr
    .replace(/^[""\u201C\u201D''\u2018\u2019]+|[""\u201C\u201D''\u2018\u2019]+$/g, '')
    .trim();
};
