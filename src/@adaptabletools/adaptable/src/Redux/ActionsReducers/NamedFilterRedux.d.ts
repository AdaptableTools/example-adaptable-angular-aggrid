import * as Redux from 'redux';
import { NamedFilterState } from '../../PredefinedConfig/NamedFilterState';
export declare const NAMED_FILTER_SET = "NAMED_FILTER_SET";
export interface NamedFilterSetAction extends Redux.Action {
    NamedFilters: string[];
}
export declare const NamedFilterSet: (NamedFilters: string[]) => NamedFilterSetAction;
export declare const NamedFilterReducer: Redux.Reducer<NamedFilterState>;
