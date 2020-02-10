import { ApiBase } from './ApiBase';
import { CellValidationApi } from '../CellValidationApi';
import { CellValidationState, CellValidationRule } from '../../PredefinedConfig/CellValidationState';
export declare class CellValidationApiImpl extends ApiBase implements CellValidationApi {
    getCellValidationState(): CellValidationState;
    getAllCellValidation(): CellValidationRule[];
    addCellValidation(cellValidationRule: CellValidationRule): void;
    deleteCellValidation(cellValidationRule: CellValidationRule): void;
    showCellValidationPopup(): void;
}
