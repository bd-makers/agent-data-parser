/**
 * BDView Component
 * Web (React DOM) div component with design token support
 */

import { useMemo, memo, type CSSProperties, type HTMLAttributes, type ReactNode } from 'react';

export interface BDViewProps extends Omit<HTMLAttributes<HTMLDivElement>, 'style'> {
  style?: CSSProperties;
  children?: ReactNode;
  // Spacing props
  m?: number;
  mt?: number;
  mb?: number;
  ml?: number;
  mr?: number;
  mv?: number;
  mh?: number;
  p?: number;
  pt?: number;
  pb?: number;
  pl?: number;
  pr?: number;
  pv?: number;
  ph?: number;
  // Layout props
  flex?: CSSProperties['flex'];
  alignItems?: CSSProperties['alignItems'];
  justifyContent?: CSSProperties['justifyContent'];
  flexDirection?: CSSProperties['flexDirection'];
  width?: CSSProperties['width'];
  height?: CSSProperties['height'];
  gap?: number;
  // Styling props
  backgroundColor?: string;
  borderRadius?: number;
  borderWidth?: number;
  borderColor?: string;
  testID?: string;
}

export const BDView = memo(
  ({
    backgroundColor,
    p,
    pv,
    ph,
    pt,
    pb,
    pr,
    pl,
    m,
    mv,
    mh,
    mt,
    mb,
    ml,
    mr,
    children,
    style,
    flex,
    alignItems,
    justifyContent,
    flexDirection = 'column',
    borderRadius,
    borderWidth,
    borderColor,
    width,
    height,
    gap,
    testID,
    ...rest
  }: BDViewProps) => {
    const combinedStyle = useMemo((): CSSProperties => {
      const baseStyle: CSSProperties = {
        display: 'flex',
        flexDirection,
        boxSizing: 'border-box',
      };

      // Layout
      if (flex !== undefined) baseStyle.flex = flex;
      if (alignItems) baseStyle.alignItems = alignItems;
      if (justifyContent) baseStyle.justifyContent = justifyContent;
      if (gap !== undefined) baseStyle.gap = gap;

      // Size
      if (width !== undefined) baseStyle.width = width;
      if (height !== undefined) baseStyle.height = height;

      // Appearance
      if (backgroundColor) baseStyle.backgroundColor = backgroundColor;
      if (borderRadius !== undefined) baseStyle.borderRadius = borderRadius;
      if (borderWidth !== undefined) baseStyle.borderWidth = borderWidth;
      if (borderColor) baseStyle.borderColor = borderColor;
      if (borderWidth !== undefined) baseStyle.borderStyle = 'solid';

      // Padding
      if (p !== undefined) baseStyle.padding = p;
      if (pv !== undefined) {
        baseStyle.paddingTop = pv;
        baseStyle.paddingBottom = pv;
      }
      if (ph !== undefined) {
        baseStyle.paddingLeft = ph;
        baseStyle.paddingRight = ph;
      }
      if (pt !== undefined) baseStyle.paddingTop = pt;
      if (pb !== undefined) baseStyle.paddingBottom = pb;
      if (pl !== undefined) baseStyle.paddingLeft = pl;
      if (pr !== undefined) baseStyle.paddingRight = pr;

      // Margin
      if (m !== undefined) baseStyle.margin = m;
      if (mv !== undefined) {
        baseStyle.marginTop = mv;
        baseStyle.marginBottom = mv;
      }
      if (mh !== undefined) {
        baseStyle.marginLeft = mh;
        baseStyle.marginRight = mh;
      }
      if (mt !== undefined) baseStyle.marginTop = mt;
      if (mb !== undefined) baseStyle.marginBottom = mb;
      if (ml !== undefined) baseStyle.marginLeft = ml;
      if (mr !== undefined) baseStyle.marginRight = mr;

      return baseStyle;
    }, [
      backgroundColor,
      p,
      pv,
      ph,
      pt,
      pb,
      pr,
      pl,
      m,
      mv,
      mh,
      mt,
      mb,
      ml,
      mr,
      flex,
      alignItems,
      justifyContent,
      flexDirection,
      borderRadius,
      borderWidth,
      borderColor,
      width,
      height,
      gap,
    ]);

    return (
      <div style={{ ...combinedStyle, ...style }} data-testid={testID} {...rest}>
        {children}
      </div>
    );
  },
);

BDView.displayName = 'BDView';
