/**
 * Renderer Context Types
 * Defines the context interface for dependency injection
 */

import type { ReactNode } from 'react';

import type {
  IViewProps,
  ITextProps,
  IImageProps,
  IButtonProps,
  ISpacerProps,
  IShimmerTextProps,
  ILinkProps,
  ViewStyleProps,
} from '../interfaces/components';
import type { ITheme } from '../theme/types';

/**
 * Component Provider interface
 * Provides platform-specific component implementations
 */
export interface IComponentProvider {
  View: React.ComponentType<IViewProps>;
  Text: React.ComponentType<ITextProps>;
  Image: React.ComponentType<IImageProps>;
  FilledButton: React.ComponentType<IButtonProps>;
  OutlineButton: React.ComponentType<IButtonProps>;
  Spacer: React.ComponentType<ISpacerProps>;
  // Optional components
  ShimmerText?: React.ComponentType<IShimmerTextProps>;
  Link?: React.ComponentType<ILinkProps>;
}

/**
 * Parser styles interface
 * Styles used by the parser for specific elements
 */
export interface IParserStyles {
  hr: ViewStyleProps;
  imageWithBlockRow: ViewStyleProps;
}

/**
 * Message type for shimmer control
 */
export type MessageType = 'jsx' | 'mid' | 'bt' | string;

/**
 * Renderer Context interface
 * Main context for dependency injection into renderers
 */
export interface IRendererContext {
  // External dependencies
  imageBaseUrl: string;
  openUrl: (url: string) => void;

  // Style injection
  styles: IParserStyles;

  // Theme (optional - for custom styling)
  theme?: ITheme;

  // Component provider
  components: IComponentProvider;

  // Shimmer control
  messageType?: MessageType;
  messageId?: string;

  // Default image placeholder (optional)
  defaultImageSource?: { uri?: string };
}

/**
 * Context configuration options
 * Used when creating a new context
 */
export interface IRendererContextConfig {
  imageBaseUrl: string;
  openUrl?: (url: string) => void;
  theme?: Partial<ITheme>;
  styles?: Partial<IParserStyles>;
  components?: Partial<IComponentProvider>;
  messageType?: MessageType;
  messageId?: string;
  defaultImageSource?: { uri?: string };
}

/**
 * Inline content parser function type
 */
export type ParseInlineContentFn = (
  text: string,
  onButtonPress?: (title: string, cdata?: object) => void,
  placeholders?: Record<string, string>,
  onLinkPress?: (href: string, cdata?: object) => void,
) => ReactNode;

/**
 * Image pattern result
 */
export interface IImagePattern {
  id: string;
  seq: string;
  width: number;
  height: number;
  type: 'image' | 'logo' | 'img';
}

/**
 * Image pattern parser function type
 */
export type ParseImagePatternFn = (text: string) => IImagePattern | null;

/**
 * Block renderer options
 */
export interface IBlockRendererOptions {
  context: IRendererContext;
  parseInlineContent: ParseInlineContentFn;
  parseImagePattern: ParseImagePatternFn;
  onButtonPress?: (title: string, cdata?: object) => void;
  onLinkPress?: (href: string, cdata?: object) => void;
  placeholders?: Record<string, string>;
}

/**
 * Parser function type
 */
export type ParseFunction = (
  content: string,
  onButtonPress?: (title: string, cdata?: object) => void,
  placeholders?: Record<string, string>,
  onLinkPress?: (href: string, cdata?: object) => void,
) => ReactNode[];

/**
 * Message parser interface
 */
export interface IMessageParser {
  parse(
    content: string,
    onButtonPress?: (title: string, cdata?: object) => void,
    placeholders?: Record<string, string>,
    onLinkPress?: (href: string, cdata?: object) => void,
  ): ReactNode | ReactNode[];
}

/**
 * Parser type enum
 */
export type ParserType = 'bodoc' | 'markdown-display' | 'streamdown';

/**
 * Typography tag names
 */
export type TypographyTagName =
  | 'b1b'
  | 'b1m'
  | 'b2b'
  | 'b2m'
  | 'b3b'
  | 'b3m'
  | 'b4b'
  | 'b4m'
  | 'b5b'
  | 'b5m'
  | 'c1b'
  | 'c1m'
  | 'c2b'
  | 'c2m';

/**
 * Heading tag names
 */
export type HeadingTagName = 'h1' | 'h2' | 'h3';

/**
 * Button tag names
 */
export type ButtonTagName = 'button' | 'button1' | 'button2';

/**
 * Block renderer function type
 * Used by platform-specific renderers to render block tags
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
export interface IParseInlineTagsOptions {
  context: IRendererContext;
  keyStart: number;
  depth?: number;
  onLinkPress?: (href: string, cdata?: object) => void;
  linkCdataMap?: Map<string, object | null>;
  originalText?: string;
}

/**
 * Inline tags parser result
 */
export interface IParseInlineTagsResult {
  parts: ReactNode[];
  nextKey: number;
}

/**
 * Inline tags parser function type
 */
export type ParseInlineTagsFn = (
  text: string,
  options: IParseInlineTagsOptions,
) => IParseInlineTagsResult;

/**
 * Render inline markdown function type
 */
export type RenderInlineMarkdownFn = (text: string, keyStart?: number) => ReactNode;

/**
 * Div renderer options (extended for recursive rendering)
 */
export interface IDivRendererOptions {
  context: IRendererContext;
  parseInlineContent: ParseInlineContentFn;
  parseImagePattern: ParseImagePatternFn;
  renderBlockTagFn: BlockRendererFn;
  onButtonPress?: (title: string, cdata?: object) => void;
  onLinkPress?: (href: string, cdata?: object) => void;
  placeholders?: Record<string, string>;
}

/**
 * Typography renderer options
 */
export interface ITypographyRendererOptions {
  context: IRendererContext;
  parseInlineContent: ParseInlineContentFn;
  onButtonPress?: (title: string, cdata?: object) => void;
  onLinkPress?: (href: string, cdata?: object) => void;
  placeholders?: Record<string, string>;
}

/**
 * Heading renderer options
 */
export interface IHeadingRendererOptions {
  context: IRendererContext;
  parseInlineContent: ParseInlineContentFn;
  onButtonPress?: (title: string, cdata?: object) => void;
  onLinkPress?: (href: string, cdata?: object) => void;
  placeholders?: Record<string, string>;
}

/**
 * Button renderer options
 */
export interface IButtonRendererOptions {
  context: IRendererContext;
  onButtonPress?: (title: string, cdata?: object) => void;
  cdata?: object;
}
