/**
 * Parser Types
 * Core type definitions for the parser system
 */

import type { ReactNode } from 'react';

import type {
  IRendererContext,
  ParseInlineContentFn,
  IBlockRendererOptions,
} from '@aijinet/bodoc-agent-parser-renderers';

/**
 * Parse HTML options
 */
export interface ParseHtmlOptions {
  context: IRendererContext;
  parseInlineContent: ParseInlineContentFn;
  onButtonPress?: (title: string, cdata?: object) => void;
  onLinkPress?: (href: string, cdata?: object) => void;
  placeholders?: Record<string, string>;
}

/**
 * Block renderer function type
 */
export type BlockRendererFn = (
  tagName: string,
  innerContent: string,
  key: number,
  options: IBlockRendererOptions,
  attributes?: string,
  cdata?: object | null,
) => ReactNode;

/**
 * Inline tags parser options
 */
export interface ParseInlineTagsOptions {
  context: IRendererContext;
  keyStart: number;
  onLinkPress?: (href: string, cdata?: object) => void;
  linkCdataMap?: Map<string, object | null>;
  originalText?: string;
}

/**
 * Inline tags parser result
 */
export interface ParseInlineTagsResult {
  parts: ReactNode[];
  nextKey: number;
}

/**
 * Inline tags parser function type
 */
export type ParseInlineTagsFn = (
  text: string,
  options: ParseInlineTagsOptions,
) => ParseInlineTagsResult;

/**
 * Render inline markdown function type
 */
export type RenderInlineMarkdownFn = (text: string, keyStart?: number) => ReactNode;

/**
 * Parser factory options
 */
export interface ParserFactoryOptions {
  context: IRendererContext;
  blockRenderer: BlockRendererFn;
  parseInlineTags: ParseInlineTagsFn;
  renderInlineMarkdown: RenderInlineMarkdownFn;
}

/**
 * Processed section data (for platform-specific rendering)
 */
export interface ProcessedSection {
  type: 'text' | 'block' | 'hr' | 'spacer' | 'image';
  content?: string;
  tagName?: string;
  attributes?: string;
  cdata?: object | null;
  height?: number;
  imageData?: {
    id: string;
    seq: string;
    width: number;
    height: number;
  };
}

/**
 * Parsed content result (abstract, platform-agnostic)
 */
export interface ParsedContent {
  sections: ProcessedSection[];
  brHeights: number[];
}

/**
 * Tag type guards
 */
export const isTypographyTag = (tagName: string): boolean => {
  const typographyTags = [
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
  ];
  return typographyTags.includes(tagName.toLowerCase());
};

export const isHeadingTag = (tagName: string): boolean => {
  const headingTags = ['h1', 'h2', 'h3'];
  return headingTags.includes(tagName.toLowerCase());
};

export const isButtonTag = (tagName: string): boolean => {
  const buttonTags = ['button', 'button1', 'button2'];
  return buttonTags.includes(tagName.toLowerCase());
};

export const isDivTag = (tagName: string): boolean => {
  return tagName.toLowerCase() === 'div';
};
