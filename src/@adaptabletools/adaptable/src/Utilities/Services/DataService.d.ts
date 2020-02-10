import { IDataService, ChangeDirection } from './Interface/IDataService';
import { IAdaptable } from '../../AdaptableInterfaces/IAdaptable';
import { DataChangedInfo } from '../../PredefinedConfig/Common/DataChangedInfo';
import { EmitterCallback } from '../../Utilities/Emitter';
export declare class DataService implements IDataService {
    private adaptable;
    private _columnValueList;
    private emitter;
    constructor(adaptable: IAdaptable);
    on: (eventName: string, callback: EmitterCallback) => () => void;
    emit: (eventName: string, data?: any) => Promise<any>;
    CreateDataChangedEvent(dataChangedInfo: DataChangedInfo): void;
    GetPreviousColumnValue(columnId: string, identifierValue: any, newValue: number, changeDirection: ChangeDirection): number;
    private getCellValuesForColumn;
}
