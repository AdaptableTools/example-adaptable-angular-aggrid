import { ApiBase } from './ApiBase';
import { SystemFilterApi } from '../SystemFilterApi';
import { SystemFilterState } from '../../PredefinedConfig/SystemFilterState';
export declare class SystemFilterApiImpl extends ApiBase implements SystemFilterApi {
    getSystemFilterState(): SystemFilterState;
    setSystemFilters(systemFilters: string[]): void;
    clearSystemFilters(): void;
    getAllSystemFilter(): string[];
    getAllPotentialSystemFilters(): string[];
}
