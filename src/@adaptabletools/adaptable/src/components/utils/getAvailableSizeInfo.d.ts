export interface PositionInfoParam {
    targetRect: BoundingClientRect;
    constrainRect: BoundingClientRect;
    maxSizeOffset?: number;
}
export interface SizeInfo {
    maxWidth: number;
    maxHeight: number;
    horizontalPosition: 'left' | 'right';
    verticalPosition: 'top' | 'bottom';
}
export interface BoundingClientRect {
    width: number;
    height: number;
    left: number;
    top: number;
    right: number;
    bottom: number;
}
declare const getAvailableSizeInfo: ({ targetRect, constrainRect, maxSizeOffset, }: PositionInfoParam) => SizeInfo;
export default getAvailableSizeInfo;
