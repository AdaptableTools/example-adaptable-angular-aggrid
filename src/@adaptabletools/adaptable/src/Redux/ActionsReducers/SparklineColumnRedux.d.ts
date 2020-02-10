import * as Redux from 'redux';
import { SparklineColumnState, SparklineColumn } from '../../PredefinedConfig/SparklineColumnState';
export declare const SPARKLINE_COLUMNS_SET = "SPARKLINE_COLUMNS_SET";
export declare const SPARKLINE_COLUMNS_ADD = "SPARKLINE_COLUMNS_ADD";
export declare const SPARKLINE_COLUMNS_EDIT = "SPARKLINE_COLUMNS_EDIT";
export declare const SPARKLINE_COLUMNS_DELETE = "SPARKLINE_COLUMNS_DELETE";
export interface SparklineColumnAction extends Redux.Action {
}
export interface SparklineColumnAddAction extends SparklineColumnAction {
    sparklineColumn: SparklineColumn;
}
export interface SparklineColumnEditAction extends SparklineColumnAction {
    sparklineColumn: SparklineColumn;
}
export interface SparklineColumnDeleteAction extends SparklineColumnAction {
    sparklineColumn: SparklineColumn;
}
export interface SparklineColumnsSetAction extends SparklineColumnAction {
    Columns: SparklineColumn[];
}
export declare const SparklineColumnsSet: (Columns: SparklineColumn[]) => SparklineColumnsSetAction;
export declare const SparklineColumnsAdd: (sparklineColumn: SparklineColumn) => SparklineColumnAddAction;
export declare const SparklineColumnsEdit: (sparklineColumn: SparklineColumn) => SparklineColumnAddAction;
export declare const SparklineColumnsDelete: (sparklineColumn: SparklineColumn) => SparklineColumnAddAction;
export declare const SparklineColumnReducer: Redux.Reducer<SparklineColumnState>;
