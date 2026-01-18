/**
 * Spacer Component
 * Web (React DOM) spacing component
 */

import { type CSSProperties } from 'react';

export interface SpacerProps {
  size?: number;
  horizontal?: boolean;
  $height?: number;
  $width?: number;
  style?: CSSProperties;
}

export const Spacer = ({ size, horizontal = false, style, $height, $width }: SpacerProps) => {
  const spacerStyle: CSSProperties = horizontal
    ? { width: $width ?? size ?? 8, flexShrink: 0 }
    : { height: $height ?? size ?? 8, flexShrink: 0 };

  return <div style={{ ...spacerStyle, ...style }} />;
};

Spacer.displayName = 'Spacer';
