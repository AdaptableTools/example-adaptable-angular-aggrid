import { EntitlementState, Entitlement } from '../../PredefinedConfig/EntitlementState';
import * as Redux from 'redux';
import { AdaptableFunctionName } from '../../PredefinedConfig/Common/Types';
export declare const ENTITLEMENT_ADD = "ENTITLEMENT_ADD";
export declare const ENTITLEMENT_UPDATE = "ENTITLEMENT_UPDATE";
export declare const ENTITLEMENT_DELETE = "ENTITLEMENT_DELETE";
export interface EntitlementAddAction extends Redux.Action {
    entitlement: Entitlement;
}
export interface EntitlementUpdateAction extends Redux.Action {
    entitlement: Entitlement;
}
export interface EntitlementDeleteAction extends Redux.Action {
    functionName: AdaptableFunctionName;
}
export declare const EntitlementAdd: (entitlement: Entitlement) => EntitlementAddAction;
export declare const EntitlementUpdate: (entitlement: Entitlement) => EntitlementUpdateAction;
export declare const EntitlementDelete: (functionName: AdaptableFunctionName) => EntitlementDeleteAction;
export declare const EntitlementsReducer: Redux.Reducer<EntitlementState>;
