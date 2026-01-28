import React, { type ReactNode } from 'react';

import type { IButtonRendererOptions, ButtonTagName } from '@aijinet/bodoc-agent-parser-renderers';
import { parseImagePattern, removeImagePatterns, buildImageUrl } from '@aijinet/bodoc-agent-parser';

export const isButtonTag = (tagName: string): tagName is ButtonTagName => {
  const buttonTags: ButtonTagName[] = ['button', 'button1', 'button2'];
  return buttonTags.includes(tagName.toLowerCase() as ButtonTagName);
};

export const renderButtonTag = (
  tagName: ButtonTagName,
  innerContent: string,
  key: number,
  options: IButtonRendererOptions,
): ReactNode => {
  const { context, onButtonPress, cdata } = options;
  const { theme, components } = context;

  const BDView = components.View;
  const BDImage = components.Image;
  const ButtonComponent =
    tagName === 'button1' ? components.OutlineButton : components.FilledButton;

  const buttonImagePattern = parseImagePattern(innerContent);
  const buttonText = removeImagePatterns(innerContent);
  let buttonLeftIcon: ReactNode | undefined;

  if (buttonImagePattern) {
    const buttonImageUrl = buildImageUrl(
      context.imageBaseUrl,
      buttonImagePattern.id,
      buttonImagePattern.seq,
    );
    buttonLeftIcon = (
      <BDImage
        source={{ uri: buttonImageUrl }}
        width={buttonImagePattern.width}
        height={buttonImagePattern.height}
      />
    );
  }

  const spacing = theme?.spacing || { s10: 10 };
  const shape = theme?.shape || { r9999: 9999 };

  const alignItems = tagName === 'button1' ? 'flex-end' : 'flex-start';
  const textColor = tagName === 'button1' ? theme?.colors.text_tertiary : undefined;
  const height = tagName === 'button1' ? 42 : 46;
  const textStyle =
    tagName === 'button1' ? theme?.typography.body4_medium : theme?.typography.body3_bold;

  return (
    <BDView key={key} mt={spacing.s10} alignItems={alignItems} width="100%">
      <ButtonComponent
        size={theme?.buttonSizes?.Medium}
        tone={theme?.buttonTones?.AI}
        title={buttonText}
        textStyle={textStyle}
        leftIcon={buttonLeftIcon}
        textColor={textColor}
        style={{ borderRadius: shape.r9999, height }}
        onPress={() => onButtonPress?.(buttonText, cdata)}
      />
    </BDView>
  );
};
