/**
 * Button Components
 * Web (React DOM) button implementations
 */

import { type CSSProperties, type ButtonHTMLAttributes, type ReactNode } from 'react';

import type { IButtonSize } from '@bdmakers/agent-data-parser-renderers';

export interface WebButtonProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'style' | 'title'
> {
  title: string;
  onPress?: () => void;
  disabled?: boolean;
  style?: CSSProperties;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  testID?: string;
  backgroundColor?: string;
  textColor?: string;
  size?: IButtonSize;
}

const baseButtonStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  border: 'none',
  cursor: 'pointer',
  outline: 'none',
  transition: 'opacity 0.2s ease',
};

const filledButtonStyle: CSSProperties = {
  ...baseButtonStyle,
  backgroundColor: '#16c5ff',
  height: 46,
  paddingLeft: 16,
  paddingRight: 16,
  borderRadius: 16,
  color: '#ffffff',
  fontSize: 16,
  fontWeight: 600,
};

const outlineButtonStyle: CSSProperties = {
  ...baseButtonStyle,
  backgroundColor: 'transparent',
  height: 42,
  paddingLeft: 16,
  paddingRight: 16,
  borderRadius: 16,
  border: '1px solid #e1e3e7',
  color: '#1d2024',
  fontSize: 16,
  fontWeight: 600,
};

const disabledStyle: CSSProperties = {
  backgroundColor: '#d4d7dc',
  color: '#a4a8af',
  cursor: 'not-allowed',
};

const iconGapStyle: CSSProperties = {
  marginRight: 4,
};

/**
 * Filled Button (Primary style)
 */
export const FilledButton = ({
  title,
  onPress,
  disabled = false,
  style,
  leftIcon,
  rightIcon,
  testID,
  backgroundColor,
  textColor,
  size,
  ...rest
}: WebButtonProps) => {
  const buttonStyle: CSSProperties = {
    ...filledButtonStyle,
    ...(backgroundColor ? { backgroundColor } : {}),
    ...(textColor ? { color: textColor } : {}),
    ...(size?.container
      ? {
          height: size.container.height,
          paddingLeft: size.container.paddingHorizontal,
          paddingRight: size.container.paddingHorizontal,
          borderRadius: size.container.borderRadius,
          minWidth: size.container.minWidth,
          flex: size.container.flex,
        }
      : {}),
    ...(size?.text?.style
      ? {
          fontSize: size.text.style.fontSize,
          fontWeight: size.text.style.fontWeight as CSSProperties['fontWeight'],
        }
      : {}),
    ...(disabled ? disabledStyle : {}),
    ...style,
  };

  return (
    <button
      style={buttonStyle}
      onClick={onPress}
      disabled={disabled}
      data-testid={testID}
      type="button"
      {...rest}
    >
      {leftIcon && <span style={iconGapStyle}>{leftIcon}</span>}
      {title}
      {rightIcon}
    </button>
  );
};

FilledButton.displayName = 'FilledButton';

/**
 * Outline Button (Secondary style)
 */
export const OutlineButton = ({
  title,
  onPress,
  disabled = false,
  style,
  leftIcon,
  rightIcon,
  testID,
  backgroundColor,
  textColor,
  size,
  ...rest
}: WebButtonProps) => {
  const buttonStyle: CSSProperties = {
    ...outlineButtonStyle,
    ...(backgroundColor ? { backgroundColor } : {}),
    ...(textColor ? { color: textColor } : {}),
    ...(size?.container
      ? {
          height: size.container.height,
          paddingLeft: size.container.paddingHorizontal,
          paddingRight: size.container.paddingHorizontal,
          borderRadius: size.container.borderRadius,
          minWidth: size.container.minWidth,
          flex: size.container.flex,
        }
      : {}),
    ...(size?.text?.style
      ? {
          fontSize: size.text.style.fontSize,
          fontWeight: size.text.style.fontWeight as CSSProperties['fontWeight'],
        }
      : {}),
    ...(disabled
      ? { ...disabledStyle, backgroundColor: 'transparent', borderColor: '#d4d7dc' }
      : {}),
    ...style,
  };

  return (
    <button
      style={buttonStyle}
      onClick={onPress}
      disabled={disabled}
      data-testid={testID}
      type="button"
      {...rest}
    >
      {leftIcon && <span style={iconGapStyle}>{leftIcon}</span>}
      {title}
      {rightIcon}
    </button>
  );
};

OutlineButton.displayName = 'OutlineButton';
