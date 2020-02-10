import { ApiBase } from './ApiBase';
import { NamedFilterApi } from '../NamedFilterApi';
import { NamedFilter, NamedFilterState } from '../../PredefinedConfig/NamedFilterState';
export declare class NamedFilterApiImpl extends ApiBase implements NamedFilterApi {
    getNamedFilterState(): NamedFilterState;
    getAllNamedFilter(): NamedFilter[];
    getNamedFilterByName(name: string): NamedFilter;
}
