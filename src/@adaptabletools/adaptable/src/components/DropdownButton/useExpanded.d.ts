import { RefObject } from 'react';
import { ConstrainToType } from '../OverlayTrigger';
export interface PositionInfo {
    verticalPosition: 'top' | 'bottom';
    horizontalPosition: 'left' | 'right';
    maxHeight: number | string;
    maxWidth: number | string;
}
export declare type ExpandedProps = {
    expanded?: boolean;
    constrainTo?: ConstrainToType;
    defaultExpanded?: boolean;
    onExpand?: () => void;
    onCollapse?: () => void;
    onExpandedChange?: (expanded: boolean) => void;
    onToggle?: (expanded: boolean) => void;
};
declare const _default: (props: ExpandedProps, positionerRef: RefObject<HTMLDivElement>) => {
    expanded: boolean;
    setExpanded: (newExpanded: boolean) => void;
    toggle: () => void;
    positionInfo: PositionInfo;
};
export default _default;
