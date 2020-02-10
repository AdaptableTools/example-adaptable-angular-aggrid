import { ApiBase } from './ApiBase';
import { FlashingCellApi } from '../FlashingCellApi';
import { FlashingCellState, FlashingCell } from '../../PredefinedConfig/FlashingCellState';
export declare class FlashingCellApiImpl extends ApiBase implements FlashingCellApi {
    getFlashingCellState(): FlashingCellState;
    getAllFlashingCell(): FlashingCell[];
    showFlashingCellPopup(): void;
}
