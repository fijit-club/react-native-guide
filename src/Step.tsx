import type { FC, PropsWithChildren } from 'react';

import type { IStep } from './types';

type StepProps = PropsWithChildren<IStep>;

// {
// name: string;
// order: number;
// text: string;
// tourKey: string;
// shape?: Shape;
// active?: boolean;
// maskOffset?: number | Offset;
// borderRadius?: number;
// children: React.ReactNode;
// keepTooltipPosition?: boolean;
// tooltipBottomOffset?: number;
// borderRadiusObject?: BorderRadiusObject;
// tooltipArrowPosition?: ArrowPositions;
// }

const Step: FC<StepProps> = ({ children }) => {
  // const context = useContext(TourGuideContext);
  // return <ConnectedStep {...{ ...props, context }} />;

  return children;
};

export default Step;
