import * as React from 'react';
import { FlexProps } from 'rebass';
export interface ModalProps extends FlexProps {
    isOpen?: boolean;
    baseZIndex?: number;
    backdropZIndexOffset?: number;
    onBringToFront?: () => void;
}
declare const Modal: (props: ModalProps) => React.ReactPortal;
export default Modal;
