export * from '@aijinet/bodoc-agent-parser';

export { BDView, BDText, BDImage, FilledButton, OutlineButton, Spacer } from './components';
export type {
  BDViewProps,
  BDTextProps,
  BDImageProps,
  RNButtonProps,
  SpacerProps,
} from './components';

export { createReactNativeContext } from './context';
export type { IReactNativeContextConfig } from './context';

export {
  renderInlineMarkdown,
  parseInlineTags,
  renderTypographyTag,
  isTypographyTag,
  renderHeadingTag,
  isHeadingTag,
  renderButtonTag,
  isButtonTag,
  renderDivTag,
  renderBlockTag,
} from './renderers';

export {
  createBodocParser,
  BodocParserAdapter,
  createParseInlineContent,
  parseHtml,
  createParseMarkdown,
} from './parsers';
