import type { FC } from 'react';
import type { LayoutRectangle, StyleProp, ViewStyle } from 'react-native';
import type { RNHole } from 'react-native-hole-view';

import { useEffect, useState } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { ERNHoleViewTimingFunction, RNHoleView } from 'react-native-hole-view';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import type { HoleStyle, IStep } from './types';

import TooltipPlaceholder from './TooltipPlaceholder';
import { calcPosition, parseProperty } from './utils';

export type TourGuideModalProps = {
  TooltipComponent?: FC;
  animationDuration?: number;
  backdropColor?: string;
  holeStyle?: HoleStyle;
  step: IStep;
  tooltipContainerStyle?: StyleProp<ViewStyle>;
};

const isHoleOutsideScreen = (modalLayout: LayoutRectangle, stepLayout: LayoutRectangle) => {
  // Check if the hole's right edge is to the left of the screen's left edge
  const isLeftOfScreen = stepLayout.x + stepLayout.width < 0;

  // Check if the hole's left edge is to the right of the screen's right edge
  const isRightOfScreen = stepLayout.x > modalLayout.width;

  // Check if the hole's bottom edge is above the screen's top edge
  const isAboveScreen = stepLayout.y + stepLayout.height < 0;

  // Check if the hole's top edge is below the screen's bottom edge
  const isBelowScreen = stepLayout.y > modalLayout.height;

  // If any of these conditions are true, the hole is completely outside the screen
  return isLeftOfScreen || isRightOfScreen || isAboveScreen || isBelowScreen;
};

const Modal: FC<TourGuideModalProps> = ({
  step,
  backdropColor,
  holeStyle,
  tooltipContainerStyle,
  TooltipComponent = TooltipPlaceholder,
  animationDuration = 400,
}) => {
  const tooltipTranslateY = useSharedValue(400);
  const opacity = useSharedValue(0);
  const [stepLayout, setStepLayout] = useState<LayoutRectangle | null>(null);
  const [modalLayout, setModalLayout] = useState<LayoutRectangle | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      step.ref.current?.measureInWindow((x, y, width, height) => {
        const stepLayoutNext = {
          x: Math.round(x),
          y: Math.round(y) + (StatusBar.currentHeight ?? 0),
          width: Math.round(width),
          height: Math.round(height),
        };
        if (JSON.stringify(stepLayoutNext) !== JSON.stringify(stepLayout)) setStepLayout(stepLayoutNext);
      });
    }, 300);

    return () => clearInterval(interval);
  }, [stepLayout, step.index, step.ref]);

  useEffect(() => {
    if (!stepLayout) return;
    const toValue = calcPosition(stepLayout).toValue - (step.tooltipBottomOffset || 0);

    tooltipTranslateY.value = withTiming(toValue, {
      duration: animationDuration,
      easing: Easing.inOut(Easing.ease),
    });

    opacity.value = withTiming(1, {
      duration: animationDuration,
      easing: Easing.inOut(Easing.ease),
    });
  }, [opacity, tooltipTranslateY, step.tooltipBottomOffset, stepLayout, animationDuration]);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateY: tooltipTranslateY.value }],
    opacity: opacity.value,
  }));

  if (!stepLayout) return null;

  const paddingX = parseProperty(step.holeStyle, holeStyle, 'paddingHorizontal');
  const paddingY = parseProperty(step.holeStyle, holeStyle, 'paddingVertical');
  const hole: RNHole = {
    x: stepLayout.x - paddingX / 2,
    y: stepLayout.y - paddingY / 2,
    width: stepLayout.width + paddingX,
    height: stepLayout.height + paddingY,
    ...holeStyle,
    ...step.holeStyle,
  };

  if (modalLayout !== null && isHoleOutsideScreen(modalLayout, stepLayout)) return null;

  return (
    <View
      onLayout={(event) => setModalLayout(event.nativeEvent.layout)}
      pointerEvents={step.disableInteraction ? 'box-only' : 'none'}
      style={[StyleSheet.absoluteFill, styles.zIndex]}
    >
      <RNHoleView
        animation={{ timingFunction: ERNHoleViewTimingFunction.EASE_IN_OUT, duration: animationDuration }}
        holes={[hole]}
        style={[styles.hole, { backgroundColor: backdropColor }]}
      />

      <Animated.View
        pointerEvents="box-none"
        style={[styles.tooltip, tooltipContainerStyle, step.tooltipStyle, animatedStyles]}
      >
        <TooltipComponent />
      </Animated.View>
    </View>
  );
};

export default Modal;

const styles = StyleSheet.create({
  zIndex: {
    zIndex: 1000,
  },
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
