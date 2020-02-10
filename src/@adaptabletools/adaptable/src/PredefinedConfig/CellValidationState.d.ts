import { RunTimeState } from './RunTimeState';
import { AdaptableObject } from './Common/AdaptableObject';
import { Expression, QueryRange } from './Common/Expression';
export interface CellValidationState extends RunTimeState {
    CellValidations?: CellValidationRule[];
}
export interface CellValidationRule extends AdaptableObject {
    ColumnId: string;
    Range: QueryRange;
    ActionMode: 'Warn User' | 'Stop Edit';
    Expression?: Expression;
}
