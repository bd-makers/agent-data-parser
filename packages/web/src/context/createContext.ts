/**
 * Web Context Factory
 * Creates a renderer context with Web (React DOM) components
 */

import type {
  IRendererContext,
  IRendererContextConfig,
  IComponentProvider,
  IParserStyles,
} from '@aijinet/bodoc-agent-parser-renderers';

import { BDView, BDText, BDImage, FilledButton, OutlineButton, Spacer } from '../components';
import { defaultTheme } from '../theme';

/**
 * Default parser styles for web
 */
const defaultParserStyles: IParserStyles = {
  hr: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginTop: 15,
    marginBottom: 15,
    width: '100%',
  },
  imageWithBlockRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 5,
  },
};

/**
 * Default component provider for Web
 * Type assertions are used because Web components have platform-specific types
 * that are subtypes of the generic interface
 */
const defaultComponentProvider: IComponentProvider = {
  View: BDView as unknown as IComponentProvider['View'],
  Text: BDText as unknown as IComponentProvider['Text'],
  Image: BDImage as unknown as IComponentProvider['Image'],
  FilledButton: FilledButton as unknown as IComponentProvider['FilledButton'],
  OutlineButton: OutlineButton as unknown as IComponentProvider['OutlineButton'],
  Spacer: Spacer as unknown as IComponentProvider['Spacer'],
};

/**
 * Default URL opener using window.open
 */
const defaultOpenUrl = (url: string): void => {
  if (typeof window !== 'undefined') {
    window.open(url, '_blank', 'noopener,noreferrer');
  }
};

/**
 * Creates a Web renderer context
 */
export const createWebContext = (config: IRendererContextConfig): IRendererContext => {
  const {
    imageBaseUrl,
    openUrl = defaultOpenUrl,
    theme,
    styles,
    components,
    messageType,
    messageId,
    defaultImageSource,
  } = config;

  return {
    imageBaseUrl,
    openUrl,
    styles: {
      ...defaultParserStyles,
      ...styles,
    },
    theme: theme ? { ...defaultTheme, ...theme } : defaultTheme,
    components: {
      ...defaultComponentProvider,
      ...components,
    },
    messageType,
    messageId,
    defaultImageSource,
  };
};

/**
 * Creates a default Web context
 * Requires imageBaseUrl to be provided
 */
export const createDefaultWebContext = (imageBaseUrl: string): IRendererContext => {
  return createWebContext({ imageBaseUrl });
};
