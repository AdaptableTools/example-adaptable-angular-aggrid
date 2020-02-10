import { ApiBase } from './ApiBase';
import { ApplicationState, ApplicationDataEntry } from '../../PredefinedConfig/ApplicationState';
import { ApplicationApi } from '../ApplicationAPI';
export declare class ApplicationApiImpl extends ApiBase implements ApplicationApi {
    getApplicationState(): ApplicationState;
    getApplicationDataEntries(): ApplicationDataEntry[];
    addApplicationDataEntry(keyValuePair: ApplicationDataEntry): void;
    createApplicationDataEntry(key: string, value: any): void;
    editApplicationDataEntry(applicationDataEntry: ApplicationDataEntry): void;
    deleteApplicationDataEntry(applicationDataEntry: ApplicationDataEntry): void;
    getApplicationDataEntryByKey(key: string): ApplicationDataEntry | undefined;
    getApplicationDataEntriesByValue(value: any): ApplicationDataEntry[];
}
