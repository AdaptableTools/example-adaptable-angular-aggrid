import { RunTimeState } from './RunTimeState';
import { AdaptableObject } from './Common/AdaptableObject';
import { Expression } from './Common/Expression';
export interface PlusMinusState extends RunTimeState {
    PlusMinusRules?: PlusMinusRule[];
}
export interface PlusMinusRule extends AdaptableObject {
    ColumnId: string;
    IsDefaultNudge: boolean;
    NudgeValue: number;
    Expression?: Expression;
}
