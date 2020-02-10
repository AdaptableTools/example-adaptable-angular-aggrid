import { KeyValuePair } from '../Interface/KeyValuePair';
import { LeafExpressionOperator } from '../../PredefinedConfig/Common/Enums';
import { AdaptableColumn } from '../../PredefinedConfig/Common/AdaptableColumn';
import { QueryRange } from '../../PredefinedConfig/Common/Expression';
export declare function CreateValueRange(operator: LeafExpressionOperator, operand1: any, operand2: any): QueryRange;
export declare function GetNumberOperatorPairs(): KeyValuePair[];
export declare function GetStringOperatorPairs(): KeyValuePair[];
export declare function GetDateOperatorPairs(): KeyValuePair[];
export declare function CreateValueRangeFromOperand(rangeText: string): QueryRange;
export declare function IsColumnAppropriateForRange(range: QueryRange, column: AdaptableColumn): boolean;
export declare const RangeHelper: {
    CreateValueRange: typeof CreateValueRange;
    GetNumberOperatorPairs: typeof GetNumberOperatorPairs;
    GetStringOperatorPairs: typeof GetStringOperatorPairs;
    GetDateOperatorPairs: typeof GetDateOperatorPairs;
    CreateValueRangeFromOperand: typeof CreateValueRangeFromOperand;
    IsColumnAppropriateForRange: typeof IsColumnAppropriateForRange;
};
export default RangeHelper;
