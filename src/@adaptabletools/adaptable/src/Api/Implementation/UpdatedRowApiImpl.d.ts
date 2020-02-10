import { ApiBase } from './ApiBase';
import { UpdatedRowState } from '../../PredefinedConfig/UpdatedRowState';
import { UpdatedRowApi } from '../UpdatedRowApi';
import { UpdatedRowInfo } from '../../Utilities/Services/Interface/IDataService';
/**
 * Provides full and comprehensive run-time access to the Updated Rows function (which colours rows as they change based on a scheme set by the user).
 *
 * Also provides access to the associated Updated Row state (from Predefined Config).
 */
export declare class UpdatedRowApiImpl extends ApiBase implements UpdatedRowApi {
    getUpdatedRowState(): UpdatedRowState;
    updatedRowEnable(): void;
    updatedRowDisable(): void;
    jumpToRowEnable(): void;
    jumpToRowDisable(): void;
    setUpColor(upColor: string): void;
    setDownColor(downColor: string): void;
    setNeutralColor(neutralColor: string): void;
    addUpdatedRowInfo(updatedRowInfo: UpdatedRowInfo): void;
    deleteUpdatedRowInfo(updatedRowInfo: UpdatedRowInfo): void;
    deleteAllUpdatedRowInfo(): void;
}
