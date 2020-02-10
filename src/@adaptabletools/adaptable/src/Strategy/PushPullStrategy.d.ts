import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import { IAdaptable } from '../AdaptableInterfaces/IAdaptable';
import { AdaptableMenuItem } from '../PredefinedConfig/Common/Menu';
import { IPushPullStrategy } from './Interface/IPushPullStrategy';
import { IPushPullReport } from '../PredefinedConfig/IPushPullState';
export declare class PushPullStrategy extends AdaptableStrategyBase implements IPushPullStrategy {
    private isSendingData;
    private throttledRecomputeAndSendLiveDataEvent;
    constructor(adaptable: IAdaptable);
    addFunctionMenuItem(): AdaptableMenuItem | undefined;
    private sendNewLiveData;
    sendSnapshot(iPushPullReport: IPushPullReport): void;
    startLiveData(iPushPullReport: IPushPullReport): void;
    private ConvertReportToArray;
    private getThrottleTimeFromState;
}
