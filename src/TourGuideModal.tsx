import type { FC } from 'react';

import Modal, { type TourGuideModalProps } from './Modal';
import useTourGuide from './useTourGuide';

const TourGuideModal: FC<Omit<TourGuideModalProps, 'step'>> = (props) => {
  const { currentStep } = useTourGuide();
  return currentStep ? <Modal step={currentStep} {...props} /> : null;
};

export default TourGuideModal;
