import { ApiBase } from './ApiBase';
import { PlusMinusState, PlusMinusRule } from '../../PredefinedConfig/PlusMinusState';
import { PlusMinusApi } from '../PlusMinusApi';
import { GridCell } from '../../PredefinedConfig/Selection/GridCell';
export declare class PlusMinusApiImpl extends ApiBase implements PlusMinusApi {
    getPlusMinusState(): PlusMinusState;
    getAllPlusMinus(): PlusMinusRule[];
    applyPlusMinus(cellsToUpdate: GridCell[]): void;
    showPlusMinusPopup(): void;
}
