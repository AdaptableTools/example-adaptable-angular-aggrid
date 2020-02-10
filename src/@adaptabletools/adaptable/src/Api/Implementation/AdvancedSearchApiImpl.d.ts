import { ApiBase } from './ApiBase';
import { AdvancedSearchApi } from '../AdvancedSearchApi';
import { AdvancedSearchState, AdvancedSearch } from '../../PredefinedConfig/AdvancedSearchState';
import { TypeUuid } from '../../PredefinedConfig/Uuid';
export declare class AdvancedSearchApiImpl extends ApiBase implements AdvancedSearchApi {
    getAdvancedSearchState(): AdvancedSearchState;
    setAdvancedSearchState(advancedSearchState: AdvancedSearchState): void;
    setAdvancedSearch(advancedSearchName: string): void;
    clearAdvancedSearch(): void;
    addAdvancedSearch(advancedSearch: AdvancedSearch): void;
    editAdvancedSearch(advancedSearch: AdvancedSearch): void;
    deleteAdvancedSearch(advancedSearch: AdvancedSearch | undefined): void;
    deleteAdvancedSearchByName(advancedSearchName: string): void;
    deleteAdvancedSearchByUuid(uid: TypeUuid): void;
    getCurrentAdvancedSearch(): AdvancedSearch | undefined;
    getCurrentAdvancedSearchName(): string | undefined;
    getAdvancedSearchByName(advancedSearchName: string | undefined): AdvancedSearch | undefined;
    getAdvancedSearchByUuid(uuid: TypeUuid): AdvancedSearch | undefined;
    getAllAdvancedSearch(): AdvancedSearch[];
    showAdvancedSearchPopup(): void;
}
