import { Dimensions, type LayoutRectangle } from 'react-native';

export const calcPosition = (size: LayoutRectangle) => {
  const layout = Dimensions.get('window');

  const OFFSET_WIDTH = 4;
  const MARGIN = 13;

  const obj = {
    width: size.width + OFFSET_WIDTH,
    height: size.height + OFFSET_WIDTH,
    left: Math.round(size.x) - OFFSET_WIDTH / 2,
    top: Math.round(size.y) - OFFSET_WIDTH / 2,
  };

  const center = {
    x: obj.left! + obj.width! / 2,
    y: obj.top! + obj.height! / 2,
  };

  const relativeToLeft = center.x;
  const relativeToTop = center.y;
  const relativeToBottom = Math.abs(center.y - layout.height);
  const relativeToRight = Math.abs(center.x - layout.width);

  const verticalPosition = relativeToBottom > relativeToTop ? 'bottom' : 'top';
  const horizontalPosition = relativeToLeft > relativeToRight ? 'left' : 'right';

  const tooltip = {
    top: 0,
    tooltip: 0,
    bottom: 0,
    right: 0,
    maxWidth: 0,
    left: 0,
  };

  if (verticalPosition === 'bottom') tooltip.top = obj.top + obj.height + MARGIN;
  else tooltip.bottom = layout.height! - (obj.top - MARGIN);

  if (horizontalPosition === 'left') {
    tooltip.right = Math.max(layout.width! - (obj.left + obj.width), 0);
    tooltip.right = tooltip.right === 0 ? tooltip.right + MARGIN : tooltip.right;
    tooltip.maxWidth = layout.width! - tooltip.right - MARGIN;
  } else {
    tooltip.left = Math.max(obj.left, 0);
    tooltip.left = tooltip.left === 0 ? tooltip.left + MARGIN : tooltip.left;
    tooltip.maxWidth = layout.width! - tooltip.left - MARGIN;
  }

  const toValue = verticalPosition === 'bottom' ? tooltip.top : obj.top - MARGIN - 135;

  return {
    toValue,
    tooltip,
    layout,
    size: {
      x: obj.width,
      y: obj.height,
    },
    position: {
      x: Math.floor(Math.max(obj.left, 0)),
      y: Math.floor(Math.max(obj.top, 0)),
    },
  };
};

export const parseProperty = <T extends Record<string, unknown>, U extends keyof T>(
  obj1: T | undefined,
  obj2: T | undefined,
  key: U,
) => {
  return obj1?.[key] ?? obj2?.[key] ?? 0;
};
