import { ApiBase } from './ApiBase';
import { EntitlementsApi } from '../EntitlementsApi';
import { EntitlementState, Entitlement } from '../../PredefinedConfig/EntitlementState';
import { AdaptableFunctionName } from '../../PredefinedConfig/Common/Types';
export declare class EntitlementsApiImpl extends ApiBase implements EntitlementsApi {
    getEntitlementsState(): EntitlementState;
    getAllEntitlements(): Entitlement[];
    getEntitlementByAdaptableFunctionName(adaptableFunctionName: AdaptableFunctionName): Entitlement;
    getEntitlementAccessLevelForAdaptableFunctionName(adaptableFunctionName: AdaptableFunctionName): string;
    addEntitlements(entitlements: Entitlement[]): void;
    addEntitlement(entitlement: Entitlement): void;
    createEntitlement(adaptableFunctionName: AdaptableFunctionName, accessLevel: 'ReadOnly' | 'Hidden' | 'Full'): void;
    editEntitlement(adaptableFunctionName: AdaptableFunctionName, accessLevel: 'ReadOnly' | 'Hidden' | 'Full'): void;
    deleteEntitlement(adaptableFunctionName: AdaptableFunctionName): void;
}
