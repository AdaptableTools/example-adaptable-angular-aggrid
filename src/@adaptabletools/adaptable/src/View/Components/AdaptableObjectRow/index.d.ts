import * as React from 'react';
import { IColItem } from '../../UIInterfaces';
export interface AdaptableObjectRowProps extends React.ClassAttributes<AdaptableObjectRow> {
    colItems: IColItem[];
    fontSize?: string;
    onClick?: (e: React.SyntheticEvent) => void;
    style?: React.CSSProperties;
}
export declare class AdaptableObjectRow extends React.Component<AdaptableObjectRowProps, {}> {
    render(): any;
}
