import type { RefObject } from 'react';
import type { StyleProp, View, ViewStyle } from 'react-native';
import type { RNHole } from 'react-native-hole-view';

export type HoleStyle = Partial<RNHole> & {
  paddingX?: number;
  paddingY?: number;
};

export type IStep = {
  disableInteraction?: boolean;
  holeStyle?: HoleStyle;
  index: number;
  ref: RefObject<View>;
  style?: StyleProp<ViewStyle>;
  tooltipBottomOffset?: number;
  tooltipStyle?: StyleProp<ViewStyle>;
};
