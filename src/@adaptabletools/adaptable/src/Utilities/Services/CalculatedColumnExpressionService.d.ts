import { ICalculatedColumnExpressionService } from './Interface/ICalculatedColumnExpressionService';
import { IAdaptable } from '../../AdaptableInterfaces/IAdaptable';
import { AdaptableColumn } from '../../PredefinedConfig/Common/AdaptableColumn';
export declare class CalculatedColumnExpressionService implements ICalculatedColumnExpressionService {
    private adaptable;
    private colFunctionValue;
    constructor(adaptable: IAdaptable, colFunctionValue: (columnId: string, record: any) => any);
    GetCalculatedColumnDataType(expression: string): 'String' | 'Number' | 'NumberArray' | 'Boolean' | 'Date' | 'Object' | 'Unknown';
    IsExpressionValid(expression: string): {
        IsValid: Boolean;
        ErrorMsg?: string;
    };
    ComputeExpressionValue(expression: string, record: any): any;
    GetColumnListFromExpression(expression: string): string[];
    CleanExpressionColumnNames(expression: string, columns: AdaptableColumn[]): string;
    GetExpressionString(expression: string, columns: AdaptableColumn[]): string;
}
