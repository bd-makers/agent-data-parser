/**
 * @aijinet/bodoc-agent-parser-react-native
 *
 * React Native implementation for Bodoc Agent Parser.
 * Provides React Native components and context for message parsing and rendering.
 */

// Re-export core utilities and types
export * from '@aijinet/bodoc-agent-parser';

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
