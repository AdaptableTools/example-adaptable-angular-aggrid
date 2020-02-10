import { ApiBase } from './ApiBase';
import { CellSummaryApi } from '../CellSummaryApi';
import { CellSummaryState, CellSummaryOperationDefinition } from '../../PredefinedConfig/CellSummaryState';
import { CellSummaryOperation } from '../../PredefinedConfig/Common/Enums';
export declare class CellSummaryApiImpl extends ApiBase implements CellSummaryApi {
    getCellSummaryState(): CellSummaryState;
    getCellSummaryOperation(): CellSummaryOperation | string;
    getCellSummaryOperationDefinitions(): CellSummaryOperationDefinition[];
    addCellSummaryOperationDefinitions(cellSummaryOperationDefinitions: CellSummaryOperationDefinition[]): void;
    showCellSummaryPopup(): void;
}
