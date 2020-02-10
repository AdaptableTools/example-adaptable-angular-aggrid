/// <reference types="react" />
export declare const baseClassName = "ab-Modal";
export declare type TypeBackdropHandle = {
    id: string;
    setBackdropOrder: (visible: boolean, zIndex: number) => void;
};
declare const Backdrop: (props: {
    zIndex: number;
    uuid: string;
    timestamp: number;
    onBringToFront?: () => void;
}) => JSX.Element;
declare type ModalStackingInfo = {
    timestamp: number;
    baseZIndex: number;
    setBackdropOrder: (visible: boolean, zIndex: number) => void;
};
export declare const updatePositionInStack: (id: string, data?: ModalStackingInfo) => void;
export default Backdrop;
