/**
 * @bdmakers/agent-data-parser-web
 *
 * Web (React DOM) implementation for Bodoc Agent Parser.
 * Provides React DOM components and context for message parsing and rendering.
 */

// Re-export core utilities and types
export * from '@bdmakers/agent-data-parser';

// Components
export { BDView, BDText, BDImage, FilledButton, OutlineButton, Spacer } from './components';
export type {
  BDViewProps,
  BDTextProps,
  BDImageProps,
  WebButtonProps,
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
export { createWebContext, createDefaultWebContext } from './context';
