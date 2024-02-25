import { useContext, useEffect } from 'react';

import TourGuideContext from './TourGuideContext';
import { DEFAULT_TOUR_KEY } from './config';

const useTourGuideController = (tourKey = DEFAULT_TOUR_KEY) => {
  const {
    start: _start,
    canStart,
    stop: _stop,
    getCurrentStep: _getCurrentStep,
    setTourKey,
  } = useContext(TourGuideContext);

  useEffect(() => {
    setTourKey(tourKey);
  }, [tourKey, setTourKey]);

  // const KeyedTourGuideZone: FC<Omit<TourGuideZoneProps, 'tourKey'>> = useCallback(
  //   ({ children, ...rest }) => {
  //     return (
  //       <TourGuideZone {...rest} tourKey={tourKey}>
  //         {children}
  //       </TourGuideZone>
  //     );
  //   },
  //   [tourKey],
  // );
  // const KeyedTourGuideZoneByPosition: FC<Omit<TourGuideZoneByPositionProps, 'tourKey'>> = useCallback(
  //   (props) => {
  //     return <TourGuideZoneByPosition {...props} tourKey={tourKey} />;
  //   },
  //   [tourKey],
  // );

  const start = (fromStep: number) => _start(tourKey, fromStep);
  const stop = () => _stop(tourKey);
  const getCurrentStep = () => _getCurrentStep(tourKey);

  return { start, stop, getCurrentStep, canStart, tourKey };
};

export default useTourGuideController;
