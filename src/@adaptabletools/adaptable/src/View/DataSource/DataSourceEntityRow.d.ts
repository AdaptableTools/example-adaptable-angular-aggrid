import * as React from 'react';
import { SharedEntityRowProps } from '../Components/SharedProps/ConfigEntityRowProps';
import { DataSource } from '../../PredefinedConfig/DataSourceState';
export interface DataSourceEntityRowProps extends SharedEntityRowProps<DataSourceEntityRow> {
    onChangeName: (DataSource: DataSource, Name: string) => void;
    onChangeDescription: (DataSource: DataSource, Description: string) => void;
}
export declare class DataSourceEntityRow extends React.Component<DataSourceEntityRowProps, {}> {
    render(): any;
    onDescriptionChange(event: React.FormEvent<any>): void;
    onNameChange(event: React.FormEvent<any>): void;
}
