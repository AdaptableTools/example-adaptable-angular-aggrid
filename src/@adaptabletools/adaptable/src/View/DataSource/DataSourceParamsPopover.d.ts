import * as React from 'react';
import { DataSourceParams } from '../../PredefinedConfig/DataSourceState';
export interface DataSourceParamsPopoverProps extends React.ClassAttributes<DataSourceParamsPopover> {
    dataSourceParams: DataSourceParams[];
}
export declare class DataSourceParamsPopover extends React.Component<DataSourceParamsPopoverProps, {}> {
    render(): any;
}
