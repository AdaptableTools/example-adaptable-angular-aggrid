import { BoxProps } from 'rebass';
import { HTMLProps } from 'react';
export declare const baseClassName = "ab-Input";
export declare type InputProps = HTMLProps<HTMLInputElement> & {
    placehoder?: string;
    type?: string;
    disabled?: boolean;
    list?: any;
} & BoxProps;
declare const Input: (props: InputProps) => JSX.Element;
export default Input;
