import type { FC, PropsWithChildren } from 'react';

import { useCallback, useMemo, useState } from 'react';

import type { IStep } from './types';

import Modal from './Modal';
import TourGuideContext from './TourGuideContext';
import { DEFAULT_TOUR_KEY } from './config';

const getOrder = (step?: IStep) => step?.tourIndex ?? -1;

type TourGuideProviderProps = PropsWithChildren<{
  //
}>;

export type Keyed<T> = Record<string, T | undefined>;

const TourGuideProvider: FC<TourGuideProviderProps> = ({ children, ...props }) => {
  const [tourKey, setTourKey] = useState<string>(DEFAULT_TOUR_KEY);
  const [currentStep, setCurrentStep] = useState<Keyed<IStep>>({});
  const [steps, setSteps] = useState<Keyed<Record<number, IStep | undefined>>>({});
  const [visible, setVisible] = useState<Keyed<boolean>>({});

  // useEffect(() => {
  //   if (visible[tourKey] || currentStep[tourKey]) {
  //     moveToCurrentStep(tourKey)
  //   }
  // }, [visible, currentStep])

  // const moveToCurrentStep = async (key: string) => {
  //   const size = await currentStep[key]?.target.measure()
  //   if (
  //     isNaN(size.width) ||
  //     isNaN(size.height) ||
  //     isNaN(size.x) ||
  //     isNaN(size.y)
  //   ) {
  //     return
  //   }
  //   await modal.current?.animateMove({
  //     width: size.width + OFFSET_WIDTH,
  //     height: size.height + OFFSET_WIDTH,
  //     left: Math.round(size.x) - OFFSET_WIDTH / 2,
  //     top: Math.round(size.y) - OFFSET_WIDTH / 2 + (verticalOffset || 0),
  //   })
  // }

  const updateVisible = useCallback(
    (key: string, value: boolean) => setVisible((prevState) => ({ ...prevState, [key]: value })),
    [],
  );
  const updateCurrentStep = useCallback(
    (key: string, value: IStep | undefined) => setCurrentStep((prevState) => ({ ...prevState, [key]: value })),
    [],
  );

  const getCurrentStep = useCallback((key: string) => currentStep[key], [currentStep]);

  const registerStep = useCallback(
    (key: string, step: IStep) =>
      setSteps((prevState) => ({ ...prevState, [key]: { ...prevState[key], [step.tourIndex]: step } })),
    [],
  );

  const unregisterStep = useCallback(
    (key: string, stepIndex: string) =>
      setSteps((prevState) => ({ ...prevState, [key]: { ...prevState[key], [stepIndex]: undefined } })),
    [],
  );

  const stop = useCallback(
    (key = tourKey) => {
      updateVisible(key, false);
      updateCurrentStep(key, undefined);
    },
    [updateCurrentStep, updateVisible, tourKey],
  );

  const canStart = useMemo(() => Object.values(steps[tourKey] ?? {}).length > 0, [steps, tourKey]);

  const currStep = useMemo(() => currentStep[tourKey], [currentStep, tourKey]);

  const sortedSteps = useMemo(
    () => Object.values(steps[tourKey] ?? {}).sort((a, b) => getOrder(a) - getOrder(b)),
    [steps, tourKey],
  );

  const prev = useCallback(() => {
    const prevStep = sortedSteps.findLast((value) => getOrder(value) < getOrder(currStep));
    updateCurrentStep(tourKey, prevStep ?? currStep);
  }, [currStep, sortedSteps, tourKey, updateCurrentStep]);

  const next = useCallback(() => {
    const nextStep = sortedSteps.find((value) => getOrder(value) > getOrder(currStep));
    updateCurrentStep(tourKey, nextStep ?? currStep);
  }, [currStep, sortedSteps, tourKey, updateCurrentStep]);

  const start = useCallback(
    (key: string, fromStep: number) => {
      const initStep = steps[key]?.[fromStep];
      if (!initStep) return;

      updateCurrentStep(key, initStep);
      updateVisible(key, true);
    },
    [steps, updateCurrentStep, updateVisible],
  );

  const isFirstStep = useMemo(() => getOrder(currStep) === getOrder(sortedSteps.at(0)), [currStep, sortedSteps]);
  const isLastStep = useMemo(() => getOrder(currStep) === getOrder(sortedSteps.at(-1)), [currStep, sortedSteps]);

  return (
    <TourGuideContext.Provider
      value={{
        registerStep,
        unregisterStep,
        getCurrentStep,
        start,
        stop,
        canStart,
        setTourKey,
      }}
    >
      {children}
      <Modal
        // ref={modal}
        currentStep={currStep}
        isFirstStep={isFirstStep}
        isLastStep={isLastStep}
        next={next}
        prev={prev}
        stop={stop}
        tourKey={tourKey}
        visible={visible[tourKey] ?? false}
        {...props}
      />
    </TourGuideContext.Provider>
  );
};

export default TourGuideProvider;
