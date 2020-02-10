import { HTMLAttributes } from 'react';
import { BoundingClientRect } from '../utils/getAvailableSizeInfo';
export interface OverlayProps extends HTMLAttributes<HTMLElement> {
    visible: boolean;
    anchor: 'vertical' | 'horizontal';
    position: 'top' | 'bottom' | 'left' | 'right';
    getConstrainRect: () => BoundingClientRect;
}
export declare const useRefresh: () => () => void;
declare const Overlay: (props: OverlayProps) => JSX.Element;
export default Overlay;
