import { UserFilterState, UserFilter } from '../../PredefinedConfig/UserFilterState';
import * as Redux from 'redux';
import { InputAction } from '../../Utilities/Interface/IMessage';
import { ColumnFilter } from '../../PredefinedConfig/ColumnFilterState';
export declare const USER_FILTER_ADD = "USER_FILTER_ADD";
export declare const USER_FILTER_EDIT = "USER_FILTER_EDIT";
export declare const USER_FILTER_DELETE = "USER_FILTER_DELETE";
export declare const USER_FILTER_CREATE_FROM_COLUMN_FILTER = "USER_FILTER_CREATE_FROM_COLUMN_FILTER";
export interface UserFilterAction extends Redux.Action {
    userFilter: UserFilter;
}
export interface UserFilterAddAction extends UserFilterAction {
}
export interface UserFilterEditAction extends UserFilterAction {
}
export interface UserFilterDeleteAction extends UserFilterAction {
}
export interface CreateUserFilterFromColumnFilterAction extends InputAction {
    ColumnFilter: ColumnFilter;
}
export declare const UserFilterAdd: (userFilter: UserFilter) => UserFilterAddAction;
export declare const UserFilterEdit: (userFilter: UserFilter) => UserFilterEditAction;
export declare const UserFilterDelete: (userFilter: UserFilter) => UserFilterDeleteAction;
export declare const CreateUserFilterFromColumnFilter: (ColumnFilter: ColumnFilter, InputText: string) => CreateUserFilterFromColumnFilterAction;
export declare const UserFilterReducer: Redux.Reducer<UserFilterState>;
