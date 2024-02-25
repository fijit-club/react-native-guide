import type { FC } from 'react';

import type { IStep } from './types';

type ModalProps = {
  currentStep: IStep | undefined;
  isFirstStep: boolean;
  isLastStep: boolean;
  next: () => void;
  prev: () => void;
  stop: () => void;
  tourKey: string;
  visible: boolean;
};

const Modal: FC<ModalProps> = () => {
  return null;
};

export default Modal;
