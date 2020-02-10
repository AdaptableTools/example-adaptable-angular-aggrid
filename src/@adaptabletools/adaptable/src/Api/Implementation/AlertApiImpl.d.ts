import { ApiBase } from './ApiBase';
import { AdaptableAlert } from '../../Utilities/Interface/IMessage';
import { AlertApi } from '../AlertApi';
import { AlertState, AlertDefinition } from '../../PredefinedConfig/AlertState';
import { DataChangedInfo } from '../../PredefinedConfig/Common/DataChangedInfo';
export declare class AlertApiImpl extends ApiBase implements AlertApi {
    getAlertState(): AlertState;
    getAlertDefinitions(): AlertDefinition[];
    displayAlert(alertToShow: AdaptableAlert): void;
    displayMessageAlertPopup(alertToDisplayAsPopup: AdaptableAlert): void;
    showAlert(alertHeader: string, alertMessage: string, alertDefinition: AlertDefinition, dataChangedInfo?: DataChangedInfo): void;
    showAlertInfo(alertHeader: string, alertMessage: string): void;
    showAlertSuccess(alertHeader: string, alertMessage: string): void;
    showAlertWarning(alertHeader: string, alertMessage: string): void;
    showAlertError(alertHeader: string, alertMessage: string): void;
    showAlertPopup(): void;
}
