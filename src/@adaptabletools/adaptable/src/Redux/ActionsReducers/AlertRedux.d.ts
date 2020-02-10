import { AlertState, AlertDefinition } from '../../PredefinedConfig/AlertState';
import * as Redux from 'redux';
export declare const ALERT_DEFIINITION_ADD = "ALERT_DEFIINITION_ADD";
export declare const ALERT_DEFIINITION_EDIT = "ALERT_DEFIINITION_EDIT";
export declare const ALERT_DEFIINITION_DELETE = "ALERT_DEFIINITION_DELETE";
export interface AlertDefinitionAction extends Redux.Action {
    alertDefinition: AlertDefinition;
}
export interface AlertDefinitionAddAction extends AlertDefinitionAction {
}
export interface AlertDefinitionEditAction extends AlertDefinitionAction {
}
export interface AlertDefinitionDeleteAction extends AlertDefinitionAction {
}
export declare const AlertDefinitionAdd: (alertDefinition: AlertDefinition) => AlertDefinitionAddAction;
export declare const AlertDefinitionEdit: (alertDefinition: AlertDefinition) => AlertDefinitionEditAction;
export declare const AlertDefinitionDelete: (alertDefinition: AlertDefinition) => AlertDefinitionDeleteAction;
export declare const AlertReducer: Redux.Reducer<AlertState>;
