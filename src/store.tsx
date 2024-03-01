import type { StateCreator } from 'zustand';

import { createStore, useStore } from 'zustand';

import type { IStep } from './types';

type TourGuideStore = {
  computed: {
    canStart: boolean;
    currentStep: IStep | null;
    isFirstStep: boolean;
    isLastStep: boolean;
  };
  currentStepIndex: null | number;
  next: () => void;
  prev: () => void;
  setStep: (stepIndex: number, step: IStep | undefined) => void;
  start: (fromStep: number) => void;
  steps: Record<number, IStep | undefined>;
  stop: () => void;
};

const initializer: StateCreator<TourGuideStore> = (setState, getState) => ({
  computed: {
    get canStart() {
      return Object.keys(getState().steps).length > 0;
    },
    get currentStep() {
      const { currentStepIndex, steps } = getState();
      if (currentStepIndex === null) return null;
      return steps[currentStepIndex] ?? null;
    },
    // TODO: Optimize this
    get isFirstStep() {
      const { currentStepIndex, steps } = getState();
      if (currentStepIndex === null) return false;

      const indexes = Object.keys(steps).map(Number);
      indexes.sort((a, b) => a - b);
      return indexes[0] === currentStepIndex;
    },
    // TODO: Optimize this
    get isLastStep() {
      const { currentStepIndex, steps } = getState();
      if (currentStepIndex === null) return false;

      const indexes = Object.keys(steps).map(Number);
      indexes.sort((a, b) => a - b);
      return indexes[indexes.length - 1] === currentStepIndex;
    },
  },
  steps: {},
  currentStepIndex: null,
  setStep: (stepIndex, step) => {
    setState((state) => ({ steps: { ...state.steps, [stepIndex]: step } }));
  },
  start: (stepIndex: number) => {
    setState({ currentStepIndex: stepIndex });
  },
  stop: () => {
    setState({ currentStepIndex: null });
  },
  next: () => {
    setState((state) => {
      const { currentStepIndex, steps } = state;
      if (currentStepIndex === null) return state;

      const indexes = Object.keys(steps).map(Number);
      indexes.sort((a, b) => a - b);
      const nextStepIndex = indexes.find((key) => key > currentStepIndex);

      return { currentStepIndex: nextStepIndex ?? currentStepIndex };
    });
  },
  prev: () => {
    setState((state) => {
      const { currentStepIndex, steps } = state;
      if (currentStepIndex === null) return state;

      const indexes = Object.keys(steps).map(Number);
      indexes.sort((a, b) => a - b);
      const prevStepIndex = indexes.findLast((key) => key < currentStepIndex);

      return { currentStepIndex: prevStepIndex ?? currentStepIndex };
    });
  },
});

export const tourGuideStore = createStore<TourGuideStore>(initializer);

const useTourGuideStore = () => useStore(tourGuideStore);

export default useTourGuideStore;
