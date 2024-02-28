import { createContext, useContext } from 'react';

import type { IStep } from './types';

export type ITourGuideContext = {
  canStart: boolean;
  currentStep: IStep | undefined;
  registerStep: (step: IStep) => void;
  start: (fromStep: number) => void;
  stop: () => void;
  unregisterStep: (stepIndex: number) => void;
};

const TourGuideContext = createContext<ITourGuideContext>({
  canStart: false,
  currentStep: undefined,
  registerStep: () => {},
  start: () => {},
  stop: () => {},
  unregisterStep: () => {},
});

export default TourGuideContext;

export const useTourGuideController = () => useContext(TourGuideContext);
