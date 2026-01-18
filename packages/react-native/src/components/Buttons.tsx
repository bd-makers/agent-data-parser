/**
 * Button Components
 * React Native button implementations
 */

import {
  TouchableOpacity,
  Text,
  View,
  type ViewStyle,
  type TextStyle,
  StyleSheet,
} from 'react-native';

import type { ReactNode } from 'react';

import type { IButtonSize } from '@aijinet/bodoc-agent-parser-renderers';

export interface RNButtonProps {
  title: string;
  onPress?: () => void;
  disabled?: boolean;
  style?: ViewStyle | ViewStyle[];
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  testID?: string;
  backgroundColor?: string;
  textColor?: string;
  size?: IButtonSize;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  filledContainer: {
    backgroundColor: '#16c5ff',
    height: 46,
    paddingHorizontal: 16,
    borderRadius: 16,
  },
  outlineContainer: {
    backgroundColor: 'transparent',
    height: 42,
    paddingHorizontal: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e1e3e7',
  },
  filledText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  outlineText: {
    color: '#1d2024',
    fontSize: 16,
    fontWeight: '600',
  },
  disabledContainer: {
    backgroundColor: '#d4d7dc',
  },
  disabledText: {
    color: '#a4a8af',
  },
  iconGap: {
    marginRight: 4,
  },
});

/**
 * Base Button component
 */
const BaseButton = ({
  title,
  onPress,
  disabled = false,
  style,
  leftIcon,
  rightIcon,
  testID,
  containerStyle,
  textStyle,
}: RNButtonProps & {
  containerStyle: ViewStyle;
  textStyle: TextStyle;
}) => {
  return (
    <TouchableOpacity
      style={[styles.container, containerStyle, disabled && styles.disabledContainer, style]}
      onPress={onPress}
      disabled={disabled}
      testID={testID}
      activeOpacity={0.7}
    >
      {leftIcon && <View style={styles.iconGap}>{leftIcon}</View>}
      <Text style={[textStyle, disabled && styles.disabledText]}>{title}</Text>
      {rightIcon}
    </TouchableOpacity>
  );
};

/**
 * Filled Button (Primary style)
 */
export const FilledButton = ({
  title,
  onPress,
  disabled,
  style,
  leftIcon,
  rightIcon,
  testID,
  backgroundColor,
  textColor,
  size,
}: RNButtonProps) => {
  const containerStyle: ViewStyle = {
    ...styles.filledContainer,
    ...(backgroundColor ? { backgroundColor } : {}),
    ...(size?.container ?? {}),
  };

  const textStyle: TextStyle = {
    ...styles.filledText,
    ...(textColor ? { color: textColor } : {}),
    ...((size?.text?.style as TextStyle | undefined) ?? {}),
  };

  return (
    <BaseButton
      title={title}
      onPress={onPress}
      disabled={disabled}
      style={style}
      leftIcon={leftIcon}
      rightIcon={rightIcon}
      testID={testID}
      containerStyle={containerStyle}
      textStyle={textStyle}
    />
  );
};

FilledButton.displayName = 'FilledButton';

/**
 * Outline Button (Secondary style)
 */
export const OutlineButton = ({
  title,
  onPress,
  disabled,
  style,
  leftIcon,
  rightIcon,
  testID,
  backgroundColor,
  textColor,
  size,
}: RNButtonProps) => {
  const containerStyle: ViewStyle = {
    ...styles.outlineContainer,
    ...(backgroundColor ? { backgroundColor } : {}),
    ...(size?.container ?? {}),
  };

  const textStyle: TextStyle = {
    ...styles.outlineText,
    ...(textColor ? { color: textColor } : {}),
    ...((size?.text?.style as TextStyle | undefined) ?? {}),
  };

  return (
    <BaseButton
      title={title}
      onPress={onPress}
      disabled={disabled}
      style={style}
      leftIcon={leftIcon}
      rightIcon={rightIcon}
      testID={testID}
      containerStyle={containerStyle}
      textStyle={textStyle}
    />
  );
};

OutlineButton.displayName = 'OutlineButton';
