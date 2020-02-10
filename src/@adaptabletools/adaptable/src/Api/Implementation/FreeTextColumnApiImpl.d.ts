import { ApiBase } from './ApiBase';
import { FreeTextColumnApi } from '../FreeTextColumnApi';
import { FreeTextColumnState, FreeTextColumn, FreeTextStoredValue } from '../../PredefinedConfig/FreeTextColumnState';
export declare class FreeTextColumnApiImpl extends ApiBase implements FreeTextColumnApi {
    getFreeTextColumnState(): FreeTextColumnState;
    getAllFreeTextColumn(): FreeTextColumn[];
    addFreeTextColumn(freeTextColumn: FreeTextColumn): void;
    addEditFreeTextColumnStoredValue(freeTextColumn: FreeTextColumn, storedValue: FreeTextStoredValue): void;
    createFreeTextColumn(columnId: string, defaultValue?: string): void;
    deleteFreeTextColumn(columnId: string): void;
    showFreeTextColumnPopup(): void;
}
