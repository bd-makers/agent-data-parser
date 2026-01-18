/**
 * Spacer Component
 * React Native spacing component
 */

import { View, type ViewStyle } from 'react-native';

export interface SpacerProps {
  size?: number;
  horizontal?: boolean;
  $height?: number;
  $width?: number;
  style?: ViewStyle | ViewStyle[];
}

export const Spacer = ({ size, horizontal = false, style, $height, $width }: SpacerProps) => {
  const spacerStyle: ViewStyle = horizontal
    ? { width: $width ?? size ?? 8 }
    : { height: $height ?? size ?? 8 };

  return <View style={[spacerStyle, style]} />;
};

Spacer.displayName = 'Spacer';
