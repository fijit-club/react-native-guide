import type { LayoutRectangle, StyleProp, ViewStyle } from 'react-native';
import type { RNHole } from 'react-native-hole-view';

export type HoleStyle = Partial<RNHole> & {
  paddingX?: number;
  paddingY?: number;
};

export type IStep = {
  disableInteraction?: boolean;
  holeStyle?: HoleStyle;
  index: number;
  layout: LayoutRectangle;
  style?: StyleProp<ViewStyle>;
  tooltipBottomOffset?: number;
  tooltipStyle?: StyleProp<ViewStyle>;
};
