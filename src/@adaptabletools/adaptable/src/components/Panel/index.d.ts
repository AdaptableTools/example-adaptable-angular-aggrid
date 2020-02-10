import { BoxProps, FlexProps } from 'rebass';
import { ReactNode, HTMLProps } from 'react';
export declare const baseClassName = "ab-Panel";
export interface HeaderProps extends FlexProps {
}
export declare type PanelProps = HTMLProps<HTMLElement> & {
    header?: ReactNode | string;
    headerProps?: HeaderProps;
    bodyProps?: BoxProps;
    variant?: 'default' | 'primary';
    border?: string | number;
    borderRadius?: string | number;
    bodyScroll?: string | boolean;
} & BoxProps;
declare const Panel: (props: PanelProps) => JSX.Element;
export default Panel;
