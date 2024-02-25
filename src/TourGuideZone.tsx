import type { FC, PropsWithChildren } from 'react';

import Step from './Step';
import { DEFAULT_TOUR_KEY } from './config';

type TourGuideZoneProps = PropsWithChildren<{
  isActive?: boolean;
  tourKey?: string;
  zone: number;
}>;

const TourGuideZone: FC<TourGuideZoneProps> = ({ isActive = false, children, tourKey = DEFAULT_TOUR_KEY, zone }) => {
  if (!isActive) return children;

  return (
    <Step tourIndex={zone} tourKey={tourKey}>
      {children}
    </Step>
  );
};

export default TourGuideZone;
