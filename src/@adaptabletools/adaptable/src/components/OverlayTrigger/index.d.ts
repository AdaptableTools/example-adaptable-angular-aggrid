import * as React from 'react';
import { ReactNode, CSSProperties } from 'react';
import { BoundingClientRect } from '../utils/getAvailableSizeInfo';
export declare type ConstrainToType = ((node: HTMLElement) => HTMLElement) | string;
export declare const getConstrainRect: (target: HTMLElement, constrainTo?: ConstrainToType) => BoundingClientRect;
export interface OverlayTriggerProps extends React.HTMLAttributes<HTMLElement> {
    opacityTransitionDuration?: string | number;
    children: React.ReactNode;
    visible?: boolean;
    showTriangle?: boolean;
    style?: CSSProperties;
    onVisibleChange?: (visible: boolean) => void;
    showEvent: 'click' | 'mousedown' | 'mouseenter' | 'focus';
    hideEvent: 'mouseleave' | 'blur';
    render: () => ReactNode;
    targetOffset?: number;
    defaultZIndex?: number;
    anchor: 'vertical' | 'horizontal';
    constrainTo?: ConstrainToType;
}
declare const OverlayTrigger: {
    (props: OverlayTriggerProps): JSX.Element;
    defaultProps: {
        showEvent: string;
        hideEvent: string;
        anchor: string;
        targetOffset: number;
        defaultZIndex: number;
        opacityTransitionDuration: string;
    };
};
export default OverlayTrigger;
