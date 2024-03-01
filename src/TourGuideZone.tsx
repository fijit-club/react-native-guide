import type { FC, PropsWithChildren } from 'react';

import { useEffect, useRef } from 'react';
import { View } from 'react-native';

import type { IStep } from './types';

import useTourGuideStore from './store';

type StepProps = PropsWithChildren<Omit<IStep, 'layout' | 'ref'>>;

const Step: FC<StepProps> = ({ children, index, style, ...props }) => {
  const { setStep } = useTourGuideStore();
  const ref = useRef<View>(null);

  useEffect(() => {
    if (ref.current === null) return;
    const step = { index, ref, ...props };
    setStep(index, step);

    return () => {
      setStep(index, undefined);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, setStep, JSON.stringify(props)]);

  return (
    <View ref={ref} style={style}>
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
