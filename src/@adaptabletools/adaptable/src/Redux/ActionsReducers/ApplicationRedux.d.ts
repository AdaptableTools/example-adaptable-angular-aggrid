import * as Redux from 'redux';
import { ApplicationState, ApplicationDataEntry } from '../../PredefinedConfig/ApplicationState';
export declare const APPLICATION_DATA_ENTRY_ADD = "APPLICATION_DATA_ENTRY_ADD";
export declare const APPLICATION_DATA_ENTRY_EDIT = "APPLICATION_DATA_ENTRY_EDIT";
export declare const APPLICATION_DATA_ENTRY_DELETE = "APPLICATION_DATA_ENTRY_DELETE";
export interface ApplicationDataEntryAddAction extends Redux.Action {
    applicationDataEntry: ApplicationDataEntry;
}
export interface ApplicationDataEntryEditAction extends Redux.Action {
    applicationDataEntry: ApplicationDataEntry;
}
export interface ApplicationDataEntryDeleteAction extends Redux.Action {
    applicationDataEntry: ApplicationDataEntry;
}
export declare const ApplicationDataEntryAdd: (applicationDataEntry: ApplicationDataEntry) => ApplicationDataEntryAddAction;
export declare const ApplicationDataEntryEdit: (applicationDataEntry: ApplicationDataEntry) => ApplicationDataEntryEditAction;
export declare const ApplicationDataEntryDelete: (applicationDataEntry: ApplicationDataEntry) => ApplicationDataEntryDeleteAction;
export declare const ApplicationReducer: Redux.Reducer<ApplicationState>;
