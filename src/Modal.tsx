import type { FC } from 'react';
import type { LayoutRectangle } from 'react-native';
import type { RNHole } from 'react-native-hole-view';

import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ERNHoleViewTimingFunction, RNHoleView } from 'react-native-hole-view';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import type { HoleStyle, IStep } from './types';

import TooltipPlaceholder, { type TooltipPlaceholderProps } from './TooltipPlaceholder';
import useTourGuideStore from './store';
import { calcPosition, parseProperty } from './utils';

export type TourGuideModalProps = {
  TooltipComponent?: FC<TooltipPlaceholderProps>;
  animationDuration?: number;
  backdropColor?: string;
  holeStyle?: HoleStyle;
  step: IStep;
};

const Modal: FC<TourGuideModalProps> = ({
  step,
  backdropColor,
  holeStyle,
  TooltipComponent = TooltipPlaceholder,
  animationDuration = 400,
}) => {
  const tooltipTranslateY = useSharedValue(400);
  const opacity = useSharedValue(0);
  const [layout, setLayout] = useState<LayoutRectangle | null>(null);
  const {
    next,
    prev,
    stop,
    computed: { isFirstStep, isLastStep },
  } = useTourGuideStore();

  useEffect(() => {
    const interval = setInterval(() => {
      if (!step.ref.current) return;
      step.ref.current.measureInWindow((x, y, width, height) => {
        const newLayout = { x: Math.round(x), y: Math.round(y), width: Math.round(width), height: Math.round(height) };
        if (JSON.stringify(newLayout) === JSON.stringify(layout)) return;

        setLayout({ x, y, width, height });
      });
    }, 300);

    return () => clearInterval(interval);
  }, [layout, step.index, step.ref]);

  useEffect(() => {
    if (!layout) return;
    const toValue = calcPosition(layout).toValue - (step.tooltipBottomOffset || 0);

    tooltipTranslateY.value = withTiming(toValue, {
      duration: animationDuration,
      easing: Easing.inOut(Easing.ease),
    });

    opacity.value = withTiming(1, {
      duration: animationDuration,
      easing: Easing.inOut(Easing.ease),
    });
  }, [opacity, tooltipTranslateY, step.tooltipBottomOffset, layout, animationDuration]);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: tooltipTranslateY.value }],
      opacity: opacity.value,
    };
  });

  if (!layout) return null;

  const paddingX = parseProperty(step.holeStyle, holeStyle, 'paddingX');
  const paddingY = parseProperty(step.holeStyle, holeStyle, 'paddingY');
  const hole: RNHole = {
    x: layout.x - paddingX / 2,
    y: layout.y - paddingY / 2,
    width: layout.width + paddingX,
    height: layout.height + paddingY,
    ...holeStyle,
    ...step.holeStyle,
  };

  return (
    <View
      pointerEvents={step.disableInteraction ? 'box-only' : 'box-none'}
      style={[StyleSheet.absoluteFill, styles.zIndex]}
    >
      <RNHoleView
        animation={{ timingFunction: ERNHoleViewTimingFunction.EASE_IN_OUT, duration: animationDuration }}
        holes={[hole]}
        style={[styles.hole, { backgroundColor: backdropColor }]}
      />

      <Animated.View pointerEvents="box-none" style={[styles.tooltip, step.tooltipStyle, animatedStyles]}>
        <TooltipComponent
          isFirstStep={isFirstStep}
          isLastStep={isLastStep}
          next={next}
          prev={prev}
          step={step}
          stop={stop}
        />
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
