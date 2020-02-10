import { DataSourceState, DataSource } from '../../PredefinedConfig/DataSourceState';
import * as Redux from 'redux';
export declare const DATA_SOURCE_SELECT = "DATA_SOURCE_SELECT";
export declare const DATA_SOURCE_ADD = "DATA_SOURCE_ADD";
export declare const DATA_SOURCE_EDIT = "DATA_SOURCE_EDIT";
export declare const DATA_SOURCE_DELETE = "DATA_SOURCE_DELETE";
export interface DataSourceSelectAction extends Redux.Action {
    SelectedDataSource: string;
}
export interface DataSourceAction extends Redux.Action {
    dataSource: DataSource;
}
export interface DataSourceAddAction extends DataSourceAction {
}
export interface DataSourceEditAction extends DataSourceAction {
}
export interface DataSourceDeleteAction extends DataSourceAction {
}
export declare const DataSourceSelect: (SelectedDataSource: string) => DataSourceSelectAction;
export declare const DataSourceAdd: (dataSource: DataSource) => DataSourceAddAction;
export declare const DataSourceEdit: (dataSource: DataSource) => DataSourceEditAction;
export declare const DataSourceDelete: (dataSource: DataSource) => DataSourceDeleteAction;
export declare const DataSourceReducer: Redux.Reducer<DataSourceState>;
