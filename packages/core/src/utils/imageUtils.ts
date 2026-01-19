/**
 * Image pattern parsing utility functions
 */

import type { IImagePattern } from '@bdmakers/agent-data-parser-renderers';

/**
 * Returns default size based on image type
 */
export const getImageDefaultSize = (type: string): { width: number; height: number } => {
  if (type === 'image' || type === 'img') {
    return { width: 20, height: 20 };
  }
  return { width: 30, height: 30 };
};

/**
 * Parses image pattern from text
 * [image_{id}_{seq}|{width}x{height}] or [logo_{id}_{seq}|{width}x{height}] pattern
 */
export const parseImagePattern = (text: string): IImagePattern | null => {
  // [image_{id}_{seq}|{width}x{height}] or [logo_{id}_{seq}|{width}x{height}] pattern
  // Without pipeline: image_ is 20x20, logo_ is 30x30
  const imageRegex = /\[(image|logo|img)_(\d+)_(\d+)(?:\|(\d+)x(\d+))?\]/;
  const match = imageRegex.exec(text);

  if (match) {
    const type = match[1] as 'image' | 'logo' | 'img';
    const id = match[2]!;
    const seq = match[3]!;
    const defaultSize = getImageDefaultSize(type);
    const width = match[4] ? Number.parseInt(match[4], 10) : defaultSize.width;
    const height = match[5] ? Number.parseInt(match[5], 10) : defaultSize.height;

    return {
      id,
      seq,
      width,
      height,
      type,
    };
  }
  return null;
};

/**
 * Builds image URL
 * @param baseUrl - Image base URL (dependency injection)
 * @param id - Image ID
 * @param seq - Image sequence
 * Example: https://test-api.bodoc.co.kr/image/ai/1/image?seq=1
 */
export const buildImageUrl = (baseUrl: string, id: string, seq: string): string =>
  `${baseUrl}ai/${id}/image?seq=${seq}`;

/**
 * Removes image patterns from text
 */
export const removeImagePatterns = (text: string): string =>
  text.replace(/\[(?:image|logo|img)_\d+_\d+(?:\|\d+x\d+)?\]/g, '').trim();

/**
 * Creates AI image URL from image pattern string
 * @param imagePattern - e.g.: "[image_51_1|20x20]" or "image_51_1"
 * @param baseUrl - Image base URL
 * @returns Image URL or null (if pattern matching fails)
 */
export const buildAgentImageUrl = (imagePattern: string, baseUrl: string): string | null => {
  const match = imagePattern.match(/image_(\d+)_(\d+)/);
  if (!match) return null;

  const [, targetId, seq] = match;
  return buildImageUrl(baseUrl, targetId!, seq!);
};

/**
 * Finds all image patterns in text
 */
export const findAllImagePatterns = (text: string): IImagePattern[] => {
  const imageRegex = /\[(image|logo|img)_(\d+)_(\d+)(?:\|(\d+)x(\d+))?\]/g;
  const patterns: IImagePattern[] = [];
  let match;

  while ((match = imageRegex.exec(text)) !== null) {
    const type = match[1] as 'image' | 'logo' | 'img';
    const id = match[2]!;
    const seq = match[3]!;
    const defaultSize = getImageDefaultSize(type);
    const width = match[4] ? Number.parseInt(match[4], 10) : defaultSize.width;
    const height = match[5] ? Number.parseInt(match[5], 10) : defaultSize.height;

    patterns.push({ id, seq, width, height, type });
  }

  return patterns;
};
