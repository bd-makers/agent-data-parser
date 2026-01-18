/**
 * BDText Component
 * React Native Text component with typography support
 */

import type { ReactNode } from 'react';
import {
  Text,
  type TextProps,
  type TextStyle,
  type GestureResponderEvent,
  type FlexStyle,
} from 'react-native';

export interface BDTextProps extends Omit<TextProps, 'style'> {
  style?: TextStyle | TextStyle[];
  children?: ReactNode;
  typography?: TextStyle;
  color?: string;
  flex?: FlexStyle['flex'];
  textAlign?: TextStyle['textAlign'];
  onPress?: (event: GestureResponderEvent) => void;
}

export const BDText = ({
  typography,
  style,
  children,
  color,
  flex,
  textAlign,
  onPress,
  testID,
  accessibilityLabel,
  numberOfLines,
  ...rest
}: BDTextProps) => {
  const combinedStyle: TextStyle[] = [];

  if (typography) {
    combinedStyle.push(typography as TextStyle);
  }

  if (style) {
    if (Array.isArray(style)) {
      combinedStyle.push(...style);
    } else {
      combinedStyle.push(style);
    }
  }

  combinedStyle.push({ color, textAlign, flex });

  return (
    <Text
      style={combinedStyle}
      onPress={onPress}
      testID={testID}
      accessibilityLabel={accessibilityLabel}
      numberOfLines={numberOfLines}
      {...rest}
    >
      {children}
    </Text>
  );
};

BDText.displayName = 'BDText';
