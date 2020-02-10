import { LeafExpressionOperator } from '../../PredefinedConfig/Common/Enums';
import { Expression, QueryRange } from '../../PredefinedConfig/Common/Expression';
import { AdaptableColumn } from '../../PredefinedConfig/Common/AdaptableColumn';
import { IAdaptable } from '../../AdaptableInterfaces/IAdaptable';
import { UserFilter } from '../../PredefinedConfig/UserFilterState';
import { NamedFilter } from '../../PredefinedConfig/NamedFilterState';
export interface IRangeEvaluation {
    operand1: any;
    operand2: any;
    newValue: any;
    operator: LeafExpressionOperator;
    initialValue: any;
    columnId: string;
}
/**
 * This is the main Helper class dealing with Expressions (a.k.a. Queries)
 * This class allows you to create and evalute (i.e. see if they are satisfied) Expressions and represent them as strings
 */
export declare function CreateSingleColumnExpression(columnId: string, columnDisplayValues: Array<string>, columnRawValues: Array<string>, userFilters: Array<string>, ranges: Array<QueryRange>): Expression;
export declare function ConvertExpressionToString(Expression: Expression, columns: Array<AdaptableColumn>, includeColumnName?: boolean): string;
export declare function ConvertRangeToString(range: QueryRange, columns: AdaptableColumn[]): string;
export declare function checkForExpression(Expression: Expression, identifierValue: any, columns: AdaptableColumn[], adaptable: IAdaptable): boolean;
export declare function checkForExpressionFromRowNode(Expression: Expression, rowNode: any, columns: AdaptableColumn[], adaptable: IAdaptable): boolean;
export declare function IsSatisfied(Expression: Expression, getColumnValue: (columnId: string) => any, getDisplayColumnValue: (columnId: string) => string, getOtherColumnValue: (columnId: string) => any, columnadaptableList: AdaptableColumn[], userFilters: UserFilter[], systemFilters: string[], namedFilters: NamedFilter[], adaptable: IAdaptable, rowNode?: any): boolean;
export declare function OperatorToOneCharacterString(operator: LeafExpressionOperator): string;
export declare function OperatorToShortFriendlyString(operator: LeafExpressionOperator): string;
export declare function OperatorToLongFriendlyString(leafExpressionOperator: LeafExpressionOperator, dataType: 'String' | 'Number' | 'NumberArray' | 'Boolean' | 'Date' | 'Object' | 'Unknown'): string;
export declare function GetOperatorsForDataType(dataType: 'String' | 'Number' | 'NumberArray' | 'Boolean' | 'Date' | 'Object' | 'Unknown'): LeafExpressionOperator[];
export declare function GetColumnListFromExpression(expression: Expression): Array<string>;
export declare function IsNullOrEmptyExpression(expression: Expression): boolean;
export declare function IsEmptyExpression(expression: Expression): boolean;
export declare function IsNotNullOrEmptyExpression(expression: Expression): boolean;
export declare function IsNotEmptyExpression(expression: Expression): boolean;
export declare function IsNotEmptyOrInvalidExpression(expression: Expression): boolean;
export declare function IsNullOrEmptyOrValidExpression(expression: Expression): boolean;
export declare function IsEmptyOrValidExpression(expression: Expression): boolean;
export declare function IsExpressionValid(expression: Expression): boolean;
export declare function IsEmptyRange(range: QueryRange): boolean;
export declare function CreateEmptyExpression(): Expression;
export declare function CreateEmptyRange(): QueryRange;
export declare function GetRangeEvaluation(rangeExpression: QueryRange, newValue: any, initialValue: any, column: AdaptableColumn, adaptable: IAdaptable, getOtherColumnValue: (columnId: string) => any): IRangeEvaluation;
export declare function TestRangeEvaluation(rangeEvaluation: IRangeEvaluation, adaptable: IAdaptable): boolean;
export declare function ExpressionContainsFilter(expression: Expression, filter: UserFilter): boolean;
export declare function OperatorRequiresValue(operator: LeafExpressionOperator): boolean;
export declare function AddMissingProperties(expression: Expression): void;
export declare const ExpressionHelper: {
    CreateSingleColumnExpression: typeof CreateSingleColumnExpression;
    ConvertExpressionToString: typeof ConvertExpressionToString;
    ConvertRangeToString: typeof ConvertRangeToString;
    checkForExpression: typeof checkForExpression;
    checkForExpressionFromRowNode: typeof checkForExpressionFromRowNode;
    IsSatisfied: typeof IsSatisfied;
    OperatorToOneCharacterString: typeof OperatorToOneCharacterString;
    OperatorToShortFriendlyString: typeof OperatorToShortFriendlyString;
    OperatorToLongFriendlyString: typeof OperatorToLongFriendlyString;
    GetOperatorsForDataType: typeof GetOperatorsForDataType;
    GetColumnListFromExpression: typeof GetColumnListFromExpression;
    IsNullOrEmptyExpression: typeof IsNullOrEmptyExpression;
    IsEmptyExpression: typeof IsEmptyExpression;
    IsNotNullOrEmptyExpression: typeof IsNotNullOrEmptyExpression;
    IsNotEmptyExpression: typeof IsNotEmptyExpression;
    IsNotEmptyOrInvalidExpression: typeof IsNotEmptyOrInvalidExpression;
    IsNullOrEmptyOrValidExpression: typeof IsNullOrEmptyOrValidExpression;
    IsEmptyOrValidExpression: typeof IsEmptyOrValidExpression;
    IsExpressionValid: typeof IsExpressionValid;
    IsEmptyRange: typeof IsEmptyRange;
    CreateEmptyExpression: typeof CreateEmptyExpression;
    CreateEmptyRange: typeof CreateEmptyRange;
    GetRangeEvaluation: typeof GetRangeEvaluation;
    TestRangeEvaluation: typeof TestRangeEvaluation;
    ExpressionContainsFilter: typeof ExpressionContainsFilter;
    OperatorRequiresValue: typeof OperatorRequiresValue;
    AddMissingProperties: typeof AddMissingProperties;
};
export default ExpressionHelper;
