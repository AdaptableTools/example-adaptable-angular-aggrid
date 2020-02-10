import { RunTimeState } from './RunTimeState';
import { AdaptableObject } from './Common/AdaptableObject';
import { Expression } from './Common/Expression';
export interface ColumnFilterState extends RunTimeState {
    ColumnFilters?: ColumnFilter[];
}
export interface ColumnFilter extends AdaptableObject {
    ColumnId: string;
    Filter: Expression;
}
