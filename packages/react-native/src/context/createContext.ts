import { Linking } from 'react-native';

import type {
  IRendererContext,
  IComponentProvider,
  IParserStyles,
  ITheme,
} from '@bdmakers/agent-data-parser-renderers';

import { BDView, BDText, BDImage, FilledButton, OutlineButton, Spacer } from '../components';

export interface IReactNativeContextConfig {
  imageBaseUrl: string;
  theme?: ITheme;
  openUrl?: (url: string) => void;
  styles?: Partial<IParserStyles>;
  components?: Partial<IComponentProvider>;
  messageType?: 'jsx' | 'mid' | 'bt' | string;
  messageId?: string;
  defaultImageSource?: { uri?: string };
}

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

const defaultComponentProvider: IComponentProvider = {
  View: BDView as unknown as IComponentProvider['View'],
  Text: BDText as unknown as IComponentProvider['Text'],
  Image: BDImage as unknown as IComponentProvider['Image'],
  FilledButton: FilledButton as unknown as IComponentProvider['FilledButton'],
  OutlineButton: OutlineButton as unknown as IComponentProvider['OutlineButton'],
  Spacer: Spacer as unknown as IComponentProvider['Spacer'],
};

const defaultOpenUrl = (url: string): void => {
  Linking.openURL(url).catch(() => {
    // Silently ignore URL opening failures
  });
};

export const createReactNativeContext = (config: IReactNativeContextConfig): IRendererContext => {
  const {
    imageBaseUrl,
    theme,
    openUrl = defaultOpenUrl,
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
    theme,
    components: {
      ...defaultComponentProvider,
      ...components,
    },
    messageType,
    messageId,
    defaultImageSource,
  };
};
