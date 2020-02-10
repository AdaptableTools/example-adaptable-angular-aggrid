import { BoxProps } from 'rebass';
import { HTMLProps } from 'react';
export declare const baseClassName = "ab-Textarea";
export declare type TextareaProps = HTMLProps<HTMLTextAreaElement> & {
    placehoder?: string;
    type?: string;
    disabled?: boolean;
} & BoxProps;
declare const Textarea: (props: TextareaProps) => JSX.Element;
export default Textarea;
