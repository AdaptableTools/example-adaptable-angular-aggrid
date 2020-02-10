import { GradientColumnState, GradientColumn } from '../../PredefinedConfig/GradientColumnState';
import * as Redux from 'redux';
export declare const GRADIENT_COLUMN_ADD = "GRADIENT_COLUMN_ADD";
export declare const GRADIENT_COLUMN_EDIT = "GRADIENT_COLUMN_EDIT";
export declare const GRADIENT_COLUMN_DELETE = "GRADIENT_COLUMN_DELETE";
export interface GradientColumnAction extends Redux.Action {
    GradientColumn: GradientColumn;
}
export interface GradientColumnAddAction extends GradientColumnAction {
}
export interface GradientColumnEditAction extends GradientColumnAction {
}
export interface GradientColumnDeleteAction extends GradientColumnAction {
}
export declare const GradientColumnAdd: (GradientColumn: GradientColumn) => GradientColumnAddAction;
export declare const GradientColumnEdit: (GradientColumn: GradientColumn) => GradientColumnEditAction;
export declare const GradientColumnDelete: (GradientColumn: GradientColumn) => GradientColumnDeleteAction;
export declare const GradientColumnReducer: Redux.Reducer<GradientColumnState>;
