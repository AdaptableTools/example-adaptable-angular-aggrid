import * as React from 'react';
import { IColItem } from '../../UIInterfaces';
export interface AdaptableObjectCollectionProps extends React.ClassAttributes<AdaptableObjectCollection> {
    colItems: IColItem[];
    items: any[];
    reducedPanel?: boolean;
    allowOverflow?: boolean;
    style?: React.CSSProperties;
}
export declare class AdaptableObjectCollection extends React.Component<AdaptableObjectCollectionProps, {}> {
    render(): any;
}
