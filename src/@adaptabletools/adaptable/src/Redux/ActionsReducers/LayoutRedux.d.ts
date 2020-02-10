import * as Redux from 'redux';
import { LayoutState, Layout } from '../../PredefinedConfig/LayoutState';
export declare const LAYOUT_ADD = "LAYOUT_ADD";
export declare const LAYOUT_EDIT = "LAYOUT_EDIT";
export declare const LAYOUT_DELETE = "LAYOUT_DELETE";
export declare const LAYOUT_SELECT = "LAYOUT_SELECT";
export declare const LAYOUT_SAVE = "LAYOUT_SAVE";
export declare const LAYOUT_RESTORE = "LAYOUT_RESTORE";
export interface LayoutAction extends Redux.Action {
    layout: Layout;
}
export interface LayoutAddAction extends LayoutAction {
}
export interface LayoutEditAction extends LayoutAction {
}
export interface LayoutDeleteAction extends LayoutAction {
}
export interface LayoutSaveAction extends LayoutAction {
}
export interface LayoutRestoreAction extends LayoutAction {
}
export interface LayoutSelectAction extends Redux.Action {
    LayoutName: string;
}
export interface LayoutIncludeVendorStateAction extends Redux.Action {
}
export interface LayoutExcludeVendorStateAction extends Redux.Action {
}
export declare const LayoutAdd: (layout: Layout) => LayoutAddAction;
export declare const LayoutEdit: (layout: Layout) => LayoutEditAction;
export declare const LayoutDelete: (layout: Layout) => LayoutDeleteAction;
export declare const LayoutSave: (layout: Layout) => LayoutSaveAction;
export declare const LayoutSelect: (LayoutName: string) => LayoutSelectAction;
export declare const LayoutRestore: (layout: Layout) => LayoutRestoreAction;
export declare const LayoutReducer: Redux.Reducer<LayoutState>;
