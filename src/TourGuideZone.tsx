import type { FC, PropsWithChildren } from 'react';
import type { LayoutRectangle } from 'react-native';

import { useContext, useEffect, useRef, useState } from 'react';
import { View } from 'react-native';

import type { IStep } from './types';

import TourGuideContext from './TourGuideContext';

type StepProps = PropsWithChildren<Omit<IStep, 'layout'>>;

const Step: FC<StepProps> = ({ children, index, style, ...props }) => {
  const { registerStep, unregisterStep } = useContext(TourGuideContext);
  const [layout, setLayout] = useState<LayoutRectangle | null>(null);
  const ref = useRef<View>(null);

  useEffect(() => {
    if (!layout) return;
    registerStep({ layout, index, ...props });

    return () => {
      unregisterStep(index);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, layout, registerStep, unregisterStep, JSON.stringify(props)]);

  const onLayout = () => {
    ref.current?.measure((_x, _y, width, height, pageX, pageY) => setLayout({ x: pageX, y: pageY, width, height }));
  };

  return (
    <View onLayout={onLayout} ref={ref} style={style}>
      {children}
    </View>
  );
};

type TourGuideZoneProps = StepProps & {
  isActive?: boolean;
};

const TourGuideZone: FC<TourGuideZoneProps> = ({ children, isActive = true, ...props }) =>
  isActive ? <Step {...props}>{children}</Step> : children;

export default TourGuideZone;
