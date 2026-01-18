/**
 * BDView Component
 * React Native View component with design token support
 */

import { useMemo, memo, type ReactNode } from 'react';
import {
  View,
  type ViewProps,
  type ViewStyle,
  type DimensionValue,
  type FlexStyle,
} from 'react-native';

type MarginStyle = Partial<
  Pick<
    ViewStyle,
    | 'margin'
    | 'marginTop'
    | 'marginBottom'
    | 'marginLeft'
    | 'marginRight'
    | 'marginVertical'
    | 'marginHorizontal'
  >
>;

type PaddingStyle = Partial<
  Pick<
    ViewStyle,
    | 'padding'
    | 'paddingTop'
    | 'paddingBottom'
    | 'paddingLeft'
    | 'paddingRight'
    | 'paddingVertical'
    | 'paddingHorizontal'
  >
>;

export interface BDViewProps extends Omit<ViewProps, 'style'> {
  style?: ViewStyle | ViewStyle[];
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
  flex?: number;
  alignItems?: FlexStyle['alignItems'];
  justifyContent?: FlexStyle['justifyContent'];
  flexDirection?: FlexStyle['flexDirection'];
  width?: DimensionValue;
  height?: DimensionValue;
  gap?: number;
  // Styling props
  backgroundColor?: string;
  borderRadius?: number;
  borderWidth?: number;
  borderColor?: string;
}

const useBDView = ({
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
  ...rest
}: BDViewProps) => {
  const bdViewStyles = useMemo(() => {
    const getMargin = (): MarginStyle => {
      const obj: MarginStyle = {};
      if (m) obj.margin = m;
      if (mt) obj.marginTop = mt;
      if (mb) obj.marginBottom = mb;
      if (ml) obj.marginLeft = ml;
      if (mr) obj.marginRight = mr;
      if (mv) obj.marginVertical = mv;
      if (mh) obj.marginHorizontal = mh;
      return obj;
    };

    const getPadding = (): PaddingStyle => {
      const obj: PaddingStyle = {};
      if (p) obj.padding = p;
      if (pt) obj.paddingTop = pt;
      if (pb) obj.paddingBottom = pb;
      if (pl) obj.paddingLeft = pl;
      if (pr) obj.paddingRight = pr;
      if (pv) obj.paddingVertical = pv;
      if (ph) obj.paddingHorizontal = ph;
      return obj;
    };

    return [
      {
        flex,
        justifyContent,
        alignItems,
        flexDirection,
        width,
        height,
        gap,
        backgroundColor,
        borderRadius,
        borderColor,
        borderWidth,
      } as ViewStyle,
      getMargin(),
      getPadding(),
    ] as ViewStyle[];
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

  return {
    bdViewStyles,
    children,
    style,
    ...rest,
  };
};

export const BDView = memo((props: BDViewProps) => {
  const { bdViewStyles, children, style, testID, ...rest } = useBDView(props);

  return (
    <View style={[bdViewStyles, style]} testID={testID} {...rest}>
      {children}
    </View>
  );
});

BDView.displayName = 'BDView';
