import * as Redux from 'redux';
import { SystemStatusState } from '../../PredefinedConfig/SystemStatusState';
import { SystemStatusUpdate } from '../../Utilities/Interface/SystemStatusUpdate';
export declare const SYSTEM_SYSTEM_SET_UPDATE = "SYSTEM_SYSTEM_SET_UPDATE";
export declare const SYSTEM_SYSTEM_SET_SHOW_ALERT = "SYSTEM_SYSTEM_SET_SHOW_ALERT";
export declare const SYSTEM_STATUS_CLEAR = "SYSTEM_STATUS_CLEAR";
export interface SystemStatusSetUpdateAction extends Redux.Action {
    systemStatusUpdate: SystemStatusUpdate;
}
export interface SystemStatusSetMessageAction extends Redux.Action {
    systemStatusMessage: string;
}
export interface SystemStatusSetStatusTypeAction extends Redux.Action {
    systemStatusType: string;
}
export interface SystemStatusSetShowAlertAction extends Redux.Action {
    showAlert: boolean;
}
export interface SystemStatusClearAction extends Redux.Action {
}
export declare const SystemStatusSetUpdate: (systemStatusUpdate: SystemStatusUpdate) => SystemStatusSetUpdateAction;
export declare const SystemStatusSetShowAlert: (showAlert: boolean) => SystemStatusSetShowAlertAction;
export declare const SystemStatusClear: () => SystemStatusClearAction;
export declare const SystemStatusReducer: Redux.Reducer<SystemStatusState>;
