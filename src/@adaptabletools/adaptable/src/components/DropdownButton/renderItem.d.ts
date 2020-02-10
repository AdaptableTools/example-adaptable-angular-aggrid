import * as React from 'react';
import DropdownButtonItem from './DropdownButtonItem';
declare type Params = {
    item: DropdownButtonItem;
    index: number;
    columns: string[];
    style: React.CSSProperties;
    className: string;
    idProperty?: string;
    onItemClick?: (...args: any[]) => void;
    domProps?: any;
};
declare const _default: ({ domProps, item, onItemClick, index, columns, className, idProperty, style, }: Params) => JSX.Element;
export default _default;
