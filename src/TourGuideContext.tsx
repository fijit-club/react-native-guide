import { createContext } from 'react';

import type { IStep } from './types';

export type ITourGuideContext = {
  canStart: boolean;
  getCurrentStep: (key: string) => IStep | undefined;
  registerStep: (key: string, step: IStep) => void;
  setTourKey: (tourKey: string) => void;
  start: (key: string, fromStep: number) => void;
  stop: (key: string) => void;
  unregisterStep: (key: string, stepName: string) => void;
};

const TourGuideContext = createContext<ITourGuideContext>({
  canStart: false,
  getCurrentStep: () => undefined,
  registerStep: () => {},
  setTourKey: () => {},
  start: () => {},
  stop: () => {},
  unregisterStep: () => {},
});

export default TourGuideContext;
