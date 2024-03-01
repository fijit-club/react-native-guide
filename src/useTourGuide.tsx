import useTourGuideStore from './store';

const useTourGuide = () => {
  const { computed, ...rest } = useTourGuideStore();

  return { ...computed, ...rest };
};

export default useTourGuide;
