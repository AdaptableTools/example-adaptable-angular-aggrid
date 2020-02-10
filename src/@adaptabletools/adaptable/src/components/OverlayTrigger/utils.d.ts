import { BoundingClientRect } from '../utils/getAvailableSizeInfo';
export declare const getRect: (node: HTMLElement) => BoundingClientRect;
export declare const getDocRect: () => BoundingClientRect;
export declare const getIntersection: (rect1: BoundingClientRect, rect2: BoundingClientRect) => BoundingClientRect;
