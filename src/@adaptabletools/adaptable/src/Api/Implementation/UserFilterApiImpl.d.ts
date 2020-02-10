import { UserFilterApi } from '../UserFilterApi';
import { UserFilterState, UserFilter } from '../../PredefinedConfig/UserFilterState';
import { ApiBase } from './ApiBase';
export declare class UserFilterApiImpl extends ApiBase implements UserFilterApi {
    getUserFilterState(): UserFilterState;
    getAllUserFilter(): UserFilter[];
    showUserFilterPopup(): void;
}
