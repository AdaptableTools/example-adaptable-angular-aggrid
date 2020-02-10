/// <reference types="react" />
import { BoxProps } from 'rebass';
import { ModalProps } from '../Modal';
declare type TypeProps = {
    modal?: boolean;
    autoFocus?: boolean;
    fixed?: boolean;
    modalProps?: ModalProps;
    isOpen?: boolean;
    defaultIsOpen?: boolean;
    showCloseButton?: boolean;
    onDismiss?: () => void;
    dismissOnClickOutside?: boolean;
};
export interface DialogProps extends BoxProps, TypeProps {
}
declare const Dialog: (props: DialogProps) => JSX.Element;
export default Dialog;
