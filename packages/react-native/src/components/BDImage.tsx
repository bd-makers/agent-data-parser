import React from 'react';
import {
  Image,
  type ImageStyle,
  type ImageSourcePropType,
  type ImageURISource,
} from 'react-native';

export interface BDImageProps {
  source: ImageSourcePropType;
  defaultSource?: ImageURISource | number;
  style?: ImageStyle | ImageStyle[];
  width?: number;
  height?: number;
  resizeMode?: 'cover' | 'contain' | 'stretch' | 'repeat' | 'center';
  borderRadius?: number;
  testID?: string;
  accessibilityLabel?: string;
}

export const BDImage = ({
  source,
  style,
  width,
  height,
  resizeMode = 'cover',
  borderRadius,
  defaultSource,
  testID,
  accessibilityLabel,
}: BDImageProps) => {
  const imageStyle: ImageStyle = {
    width,
    height,
    borderRadius,
  };

  return (
    <Image
      source={source}
      defaultSource={defaultSource}
      style={[imageStyle, style]}
      resizeMode={resizeMode}
      testID={testID}
      accessibilityLabel={accessibilityLabel}
    />
  );
};

BDImage.displayName = 'BDImage';
