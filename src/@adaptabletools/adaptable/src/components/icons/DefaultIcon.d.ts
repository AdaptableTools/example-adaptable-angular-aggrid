import * as React from 'react';
import { ReactNode } from 'react';
export declare type IconProps = {
    size?: number;
    children?: ReactNode;
    name?: string;
    style?: React.CSSProperties;
};
export declare const getSize: (size: number) => number;
declare const _default: ({ children, size, name, ...props }: IconProps) => JSX.Element;
export default _default;
