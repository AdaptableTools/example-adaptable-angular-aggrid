import { IFreeTextColumnService } from './Interface/IFreeTextColumnService';
import { DataChangedInfo } from '../../PredefinedConfig/Common/DataChangedInfo';
import { IAdaptable } from '../../types';
import { FreeTextColumn } from '../../PredefinedConfig/FreeTextColumnState';
export declare class FreeTextColumnService implements IFreeTextColumnService {
    private adaptable;
    constructor(adaptable: IAdaptable);
    GetFreeTextValue(freeTextColumn: FreeTextColumn, record: any): any;
    CheckIfDataChangingColumnIsFreeText(dataChangedEvent: DataChangedInfo): void;
}
