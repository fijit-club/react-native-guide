import type { FC } from 'react';
import type { LayoutRectangle } from 'react-native';

import { useEffect } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { RNHoleView } from 'react-native-hole-view';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import type { HoleStyle, IStep } from './types';

import Tooltip, { type TooltipProps } from './Tooltip';

export type TourGuideModalProps = {
  TooltipComponent?: FC<TooltipProps>;
  backdropColor?: string;
  holeStyle?: HoleStyle;
};

type ModalNavProps = {
  isFirstStep: boolean;
  isLastStep: boolean;
  next: () => void;
  prev: () => void;
  step: IStep;
  stop: () => void;
};

const calcPosition = (size: LayoutRectangle) => {
  const layout = Dimensions.get('window');

  const OFFSET_WIDTH = 4;
  const MARGIN = 13;

  const obj = {
    width: size.width + OFFSET_WIDTH,
    height: size.height + OFFSET_WIDTH,
    left: Math.round(size.x) - OFFSET_WIDTH / 2,
    top: Math.round(size.y) - OFFSET_WIDTH / 2,
  };

  const center = {
    x: obj.left! + obj.width! / 2,
    y: obj.top! + obj.height! / 2,
  };

  const relativeToLeft = center.x;
  const relativeToTop = center.y;
  const relativeToBottom = Math.abs(center.y - layout.height);
  const relativeToRight = Math.abs(center.x - layout.width);

  const verticalPosition = relativeToBottom > relativeToTop ? 'bottom' : 'top';
  const horizontalPosition = relativeToLeft > relativeToRight ? 'left' : 'right';

  const tooltip = {
    top: 0,
    tooltip: 0,
    bottom: 0,
    right: 0,
    maxWidth: 0,
    left: 0,
  };

  if (verticalPosition === 'bottom') tooltip.top = obj.top + obj.height + MARGIN;
  else tooltip.bottom = layout.height! - (obj.top - MARGIN);

  if (horizontalPosition === 'left') {
    tooltip.right = Math.max(layout.width! - (obj.left + obj.width), 0);
    tooltip.right = tooltip.right === 0 ? tooltip.right + MARGIN : tooltip.right;
    tooltip.maxWidth = layout.width! - tooltip.right - MARGIN;
  } else {
    tooltip.left = Math.max(obj.left, 0);
    tooltip.left = tooltip.left === 0 ? tooltip.left + MARGIN : tooltip.left;
    tooltip.maxWidth = layout.width! - tooltip.left - MARGIN;
  }

  const toValue = verticalPosition === 'bottom' ? tooltip.top : obj.top - MARGIN - 135;

  return {
    toValue,
    tooltip,
    layout,
    size: {
      x: obj.width,
      y: obj.height,
    },
    position: {
      x: Math.floor(Math.max(obj.left, 0)),
      y: Math.floor(Math.max(obj.top, 0)),
    },
  };
};

const Modal: FC<TourGuideModalProps & ModalNavProps> = ({
  step,
  backdropColor,
  holeStyle,
  TooltipComponent = Tooltip,
  ...props
}) => {
  const tooltipTranslateY = useSharedValue(400);
  const opacity = useSharedValue(0);

  useEffect(() => {
    const duration = 400 + 200;
    const toValue = calcPosition(step.layout).toValue - (step.tooltipBottomOffset || 0);

    tooltipTranslateY.value = withTiming(toValue, {
      duration,
      easing: Easing.elastic(0.7),
    });

    opacity.value = withTiming(1, {
      duration,
      easing: Easing.elastic(0.7),
    });
  }, [opacity, tooltipTranslateY, step]);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: tooltipTranslateY.value }],
      opacity: opacity.value,
    };
  });

  return (
    <View pointerEvents={step.disableInteraction ? 'box-only' : 'box-none'} style={StyleSheet.absoluteFill}>
      <RNHoleView
        holes={[{ ...step.layout, ...holeStyle, ...step.holeStyle }]}
        style={[styles.hole, { backgroundColor: backdropColor }, step.holeStyle]}
      />

      <Animated.View pointerEvents="box-none" style={[styles.tooltip, step.tooltipStyle, animatedStyles]}>
        <TooltipComponent step={step} {...props} />
      </Animated.View>
    </View>
  );
};

export default Modal;

const styles = StyleSheet.create({
  hole: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  tooltip: {
    position: 'absolute',
    paddingHorizontal: 15,
    overflow: 'hidden',
    width: '100%',
    borderRadius: 16,
    paddingTop: 24,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 16,
  },
});
