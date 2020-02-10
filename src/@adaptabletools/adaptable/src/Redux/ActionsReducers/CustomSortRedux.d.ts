import { CustomSortState, CustomSort } from '../../PredefinedConfig/CustomSortState';
import * as Redux from 'redux';
export declare const CUSTOM_SORT_ADD = "CUSTOM_SORT_ADD";
export declare const CUSTOM_SORT_EDIT = "CUSTOM_SORT_EDIT";
export declare const CUSTOM_SORT_DELETE = "CUSTOM_SORT_DELETE";
export interface CustomSortAction extends Redux.Action {
    customSort: CustomSort;
}
export interface CustomSortAddAction extends CustomSortAction {
}
export interface CustomSortEditAction extends CustomSortAction {
}
export interface CustomSortDeleteAction extends CustomSortAction {
}
export declare const CustomSortAdd: (customSort: CustomSort) => CustomSortAddAction;
export declare const CustomSortEdit: (customSort: CustomSort) => CustomSortEditAction;
export declare const CustomSortDelete: (customSort: CustomSort) => CustomSortDeleteAction;
export declare const CustomSortReducer: Redux.Reducer<CustomSortState>;
