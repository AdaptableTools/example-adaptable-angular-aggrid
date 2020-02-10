import * as Redux from 'redux';
import { AdvancedSearchState, AdvancedSearch } from '../../PredefinedConfig/AdvancedSearchState';
export declare const ADVANCED_SEARCH_ADD = "ADVANCED_SEARCH_ADD";
export declare const ADVANCED_SEARCH_EDIT = "ADVANCED_SEARCH_EDIT";
export declare const ADVANCED_SEARCH_DELETE = "ADVANCED_SEARCH_DELETE";
export declare const ADVANCED_SEARCH_SELECT = "ADVANCED_SEARCH_SELECT";
export interface AdvancedSearchAction extends Redux.Action {
    advancedSearch: AdvancedSearch;
}
export interface AdvancedSearchAddAction extends AdvancedSearchAction {
}
export interface AdvancedSearchEditAction extends AdvancedSearchAddAction {
}
export interface AdvancedSearchDeleteAction extends AdvancedSearchAddAction {
}
export interface AdvancedSearchSelectAction extends Redux.Action {
    selectedSearchName: string;
}
export declare const AdvancedSearchAdd: (advancedSearch: AdvancedSearch) => AdvancedSearchAddAction;
export declare const AdvancedSearchEdit: (advancedSearch: AdvancedSearch) => AdvancedSearchEditAction;
export declare const AdvancedSearchDelete: (advancedSearch: AdvancedSearch) => AdvancedSearchDeleteAction;
export declare const AdvancedSearchSelect: (selectedSearchName: string) => AdvancedSearchSelectAction;
export declare const AdvancedSearchReducer: Redux.Reducer<AdvancedSearchState>;
