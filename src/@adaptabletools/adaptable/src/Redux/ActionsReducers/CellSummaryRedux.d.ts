import { CellSummaryState, CellSummaryOperationDefinition } from '../../PredefinedConfig/CellSummaryState';
import { CellSummaryOperation } from '../../PredefinedConfig/Common/Enums';
import * as Redux from 'redux';
export declare const CELL_SUMMARY_CHANGE_OPERATION = "CELL_SUMMARY_CHANGE_OPERATION";
export declare const CELL_SUMMARY_OPERATION_DEFINITIONS_SET = "CELL_SUMMARY_OPERATION_DEFINITIONS_SET";
export interface CellSummaryChangeOperationAction extends Redux.Action {
    SummaryOperation: CellSummaryOperation | string;
}
export interface CellSummaryOperationDefinitionssSetAction extends Redux.Action {
    operationDefinitions: CellSummaryOperationDefinition[];
}
export declare const CellSummaryChangeOperation: (SummaryOperation: string) => CellSummaryChangeOperationAction;
export declare const CellSummaryOperationDefinitionsSet: (operationDefinitions: CellSummaryOperationDefinition[]) => CellSummaryOperationDefinitionssSetAction;
export declare const CellSummaryReducer: Redux.Reducer<CellSummaryState>;
