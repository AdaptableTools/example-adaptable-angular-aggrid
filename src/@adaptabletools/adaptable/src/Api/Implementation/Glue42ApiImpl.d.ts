import { ApiBase } from './ApiBase';
import { Glue42State, Glue42Report, Glue42Schedule } from '../../PredefinedConfig/Glue42State';
import { Glue42Api } from '../Glue42Api';
export declare class Glue42ApiImpl extends ApiBase implements Glue42Api {
    getGlue42State(): Glue42State | undefined;
    isGlue42Running(): boolean;
    isGlue42Available(): boolean;
    loginToGlue42(userName: string, password: string): Promise<void>;
    logoutFromGlue42(): void;
    clearGlue42InternalState(): void;
    setGlue42LoginErrorMessage(loginErrorMessage: string): void;
    getGlue42ThrottleTime(): number | undefined;
    setGlue42ThrottleTime(throttleTime: number): void;
    getCurrentLiveGlue42Report(): Glue42Report | undefined;
    setGlue42AvailableOn(): void;
    setGlue42AvailableOff(): void;
    setGlue42RunningOn(): void;
    setGlue42RunningOff(): void;
    getGlue42Schedules(): Glue42Schedule[];
    startLiveData(glue42Report: Glue42Report): void;
    stopLiveData(): void;
    showGlue42Popup(): void;
}
