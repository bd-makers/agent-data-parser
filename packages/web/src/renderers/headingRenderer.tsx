import type { ReactNode } from 'react';

import type {
  IHeadingRendererOptions,
  HeadingTagName,
  ITypographyStyleDef,
  IRendererContext,
} from '@bdmakers/agent-data-parser-renderers';

const getHeadingTypography = (
  tagName: string,
  context: IRendererContext,
): ITypographyStyleDef | null => {
  const { theme } = context;
  if (!theme) return null;

  const lowerTag = tagName.toLowerCase();
  if (lowerTag === 'h1') return theme.typography.body1_bold;
  if (lowerTag === 'h2') return theme.typography.body2_bold;
  return theme.typography.body3_bold;
};

export const isHeadingTag = (tagName: string): tagName is HeadingTagName => {
  const headingTags: HeadingTagName[] = ['h1', 'h2', 'h3'];
  return headingTags.includes(tagName.toLowerCase() as HeadingTagName);
};

export const renderHeadingTag = (
  tagName: HeadingTagName,
  innerContent: string,
  key: number,
  options: IHeadingRendererOptions,
): ReactNode => {
  const { context, parseInlineContent, onButtonPress, onLinkPress, placeholders } = options;
  const headingTypography = getHeadingTypography(tagName, context);

  const { components } = context;
  const BDText = components.Text;

  return (
    <BDText key={key} typography={headingTypography}>
      {parseInlineContent(innerContent, onButtonPress, placeholders, onLinkPress)}
    </BDText>
  );
};
