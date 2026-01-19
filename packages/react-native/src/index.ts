/**
 * @bdmakers/agent-data-parser-react-native
 *
 * React Native implementation for Agent Data Parser.
 * Provides React Native components and context for message parsing and rendering.
 */

// Re-export core utilities and types
export * from '@bdmakers/agent-data-parser';

// Components
export { BDView, BDText, BDImage, FilledButton, OutlineButton, Spacer } from './components';
export type {
  BDViewProps,
  BDTextProps,
  BDImageProps,
  RNButtonProps,
  SpacerProps,
} from './components';

// Theme
export {
  defaultTheme,
  colorSystem,
  semanticColors,
  spacing,
  shape,
  font,
  typography,
  buttonSizes,
  buttonTones,
} from './theme';

// Context
export { createReactNativeContext, createDefaultReactNativeContext } from './context';
