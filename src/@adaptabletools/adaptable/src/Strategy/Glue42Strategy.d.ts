import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import { IAdaptable } from '../AdaptableInterfaces/IAdaptable';
import { AdaptableMenuItem } from '../PredefinedConfig/Common/Menu';
import { IGlue42Strategy } from './Interface/IGlue42Strategy';
import { Glue42Report } from '../PredefinedConfig/Glue42State';
export declare class Glue42Strategy extends AdaptableStrategyBase implements IGlue42Strategy {
    private isSendingData;
    private throttledRecomputeAndSendLiveDataEvent;
    constructor(adaptable: IAdaptable);
    addFunctionMenuItem(): AdaptableMenuItem | undefined;
    private sendNewLiveData;
    sendSnapshot(glue42Report: Glue42Report): void;
    startLiveData(glue42Report: Glue42Report): void;
    private ConvertReportToArray;
    private getThrottleTimeFromState;
}
