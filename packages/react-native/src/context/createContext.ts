/**
 * React Native Context Factory
 * Creates a renderer context with React Native components
 */

import { Linking } from 'react-native';

import type {
  IRendererContext,
  IRendererContextConfig,
  IComponentProvider,
  IParserStyles,
} from '@aijinet/bodoc-agent-parser-renderers';

import { BDView, BDText, BDImage, FilledButton, OutlineButton, Spacer } from '../components';
import { defaultTheme } from '../theme';

/**
 * Default parser styles
 */
const defaultParserStyles: IParserStyles = {
  hr: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 15,
    width: '100%',
  },
  imageWithBlockRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
};

/**
 * Default component provider for React Native
 * Type assertions are used because RN components have platform-specific types
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
 * Default URL opener using React Native Linking
 */
const defaultOpenUrl = (url: string): void => {
  Linking.openURL(url).catch(() => {
    // Fail silently
  });
};

/**
 * Creates a React Native renderer context
 */
export const createReactNativeContext = (config: IRendererContextConfig): IRendererContext => {
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
 * Creates a default React Native context
 * Requires imageBaseUrl to be provided
 */
export const createDefaultReactNativeContext = (imageBaseUrl: string): IRendererContext => {
  return createReactNativeContext({ imageBaseUrl });
};
