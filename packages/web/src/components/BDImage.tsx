/**
 * BDImage Component
 * Web (React DOM) img component with fallback support
 */

import { useState, type CSSProperties, type ImgHTMLAttributes } from 'react';

interface ImageSource {
  uri?: string;
}

export interface BDImageProps extends Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  'style' | 'width' | 'height'
> {
  source: ImageSource | string;
  defaultSource?: ImageSource | string;
  style?: CSSProperties;
  width?: number;
  height?: number;
  resizeMode?: 'cover' | 'contain' | 'stretch' | 'repeat' | 'center';
  borderRadius?: number;
  testID?: string;
  accessibilityLabel?: string;
}

/**
 * Gets URI from source
 */
const getSourceUri = (source: ImageSource | string | undefined): string | undefined => {
  if (!source) return undefined;
  if (typeof source === 'string') return source;
  return source.uri;
};

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
  ...rest
}: BDImageProps) => {
  const [hasError, setHasError] = useState(false);

  const imageStyle: CSSProperties = {
    width,
    height,
    borderRadius,
    objectFit: resizeMode === 'contain' ? 'contain' : resizeMode === 'stretch' ? 'fill' : 'cover',
    ...style,
  };

  const srcUri = getSourceUri(source);
  const fallbackUri = getSourceUri(defaultSource);

  const handleError = () => {
    if (!hasError && fallbackUri) {
      setHasError(true);
    }
  };

  return (
    <img
      src={hasError && fallbackUri ? fallbackUri : srcUri}
      style={imageStyle}
      onError={handleError}
      data-testid={testID}
      alt={accessibilityLabel || ''}
      {...rest}
    />
  );
};

BDImage.displayName = 'BDImage';
