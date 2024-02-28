import type { FC, PropsWithChildren } from 'react';

import { useCallback, useMemo, useState } from 'react';

import type { IStep } from './types';

import Modal, { type TourGuideModalProps } from './Modal';
import TourGuideContext from './TourGuideContext';

const getOrder = (step?: IStep) => step?.index ?? -1;

const TourGuideProvider: FC<PropsWithChildren<TourGuideModalProps>> = ({ children, ...props }) => {
  const [currentStep, setCurrentStep] = useState<IStep>();
  const [steps, setSteps] = useState<Record<number, IStep | undefined>>({});
  const [visible, setVisible] = useState<boolean>();

  const registerStep = useCallback(
    (step: IStep) => setSteps((prevState) => ({ ...prevState, [step.index]: step })),
    [],
  );

  const unregisterStep = useCallback(
    (stepIndex: number) => setSteps((prevState) => ({ ...prevState, [stepIndex]: undefined })),
    [],
  );

  const stop = useCallback(() => {
    setVisible(false);
    setCurrentStep(undefined);
  }, []);

  const canStart = useMemo(() => Object.values(steps).length > 0, [steps]);

  const sortedSteps = useMemo(() => Object.values(steps ?? {}).sort((a, b) => getOrder(a) - getOrder(b)), [steps]);

  const prev = useCallback(() => {
    const prevStep = sortedSteps.findLast((value) => getOrder(value) < getOrder(currentStep));
    setCurrentStep(prevStep ?? currentStep);
  }, [currentStep, sortedSteps]);

  const next = useCallback(() => {
    const nextStep = sortedSteps.find((value) => getOrder(value) > getOrder(currentStep));
    setCurrentStep(nextStep ?? currentStep);
  }, [currentStep, sortedSteps]);

  const start = useCallback(
    (fromStep: number) => {
      const initStep = steps?.[fromStep];
      if (!initStep) return;

      setCurrentStep(initStep);
      setVisible(true);
    },
    [steps],
  );

  const isFirstStep = useMemo(() => getOrder(currentStep) === getOrder(sortedSteps.at(0)), [currentStep, sortedSteps]);
  const isLastStep = useMemo(() => getOrder(currentStep) === getOrder(sortedSteps.at(-1)), [currentStep, sortedSteps]);

  return (
    <TourGuideContext.Provider value={{ registerStep, unregisterStep, start, stop, currentStep, canStart }}>
      {children}

      {visible && currentStep && (
        <Modal
          isFirstStep={isFirstStep}
          isLastStep={isLastStep}
          next={next}
          prev={prev}
          step={currentStep}
          stop={stop}
          {...props}
        />
      )}
    </TourGuideContext.Provider>
  );
};

export default TourGuideProvider;
