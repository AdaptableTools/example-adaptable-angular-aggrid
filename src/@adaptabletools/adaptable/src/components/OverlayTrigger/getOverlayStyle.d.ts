import { CSSProperties } from 'react';
import { BoundingClientRect } from '../utils/getAvailableSizeInfo';
interface OverlayStyleParam {
    targetRect: BoundingClientRect;
    constrainRect: BoundingClientRect;
    maxSizeOffset?: number;
    anchor: 'vertical' | 'horizontal';
    targetOffset?: number;
}
declare const getOverlayStyle: ({ targetRect, constrainRect, anchor, targetOffset, }: OverlayStyleParam) => CSSProperties;
export default getOverlayStyle;
