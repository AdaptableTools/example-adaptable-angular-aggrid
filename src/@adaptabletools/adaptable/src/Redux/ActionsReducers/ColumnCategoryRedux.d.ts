import { ColumnCategoryState, ColumnCategory } from '../../PredefinedConfig/ColumnCategoryState';
import * as Redux from 'redux';
export declare const COLUMN_CATEGORY_ADD = "COLUMN_CATEGORY_ADD";
export declare const COLUMN_CATEGORY_EDIT = "COLUMN_CATEGORY_EDIT";
export declare const COLUMN_CATEGORY_DELETE = "COLUMN_CATEGORY_DELETE";
export interface ColumnCategoryAction extends Redux.Action {
    columnCategory: ColumnCategory;
}
export interface ColumnCategoryAddAction extends ColumnCategoryAction {
}
export interface ColumnCategoryEditAction extends ColumnCategoryAction {
}
export interface ColumnCategoryDeleteAction extends ColumnCategoryAction {
}
export declare const ColumnCategoryAdd: (columnCategory: ColumnCategory) => ColumnCategoryAddAction;
export declare const ColumnCategoryEdit: (columnCategory: ColumnCategory) => ColumnCategoryEditAction;
export declare const ColumnCategoryDelete: (columnCategory: ColumnCategory) => ColumnCategoryDeleteAction;
export declare const ColumnCategoryReducer: Redux.Reducer<ColumnCategoryState>;
