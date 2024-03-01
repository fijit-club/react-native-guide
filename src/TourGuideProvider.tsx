import type { FC, PropsWithChildren } from 'react';

import Modal, { type TourGuideModalProps } from './Modal';
import useTourGuideStore from './store';

const TourGuideProvider: FC<PropsWithChildren<Omit<TourGuideModalProps, 'step'>>> = ({ children, ...props }) => {
  const {
    computed: { currentStep },
  } = useTourGuideStore();

  return (
    <>
      {children}
      {currentStep && <Modal step={currentStep} {...props} />}
    </>
  );
};

export default TourGuideProvider;
