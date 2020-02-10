import * as Redux from 'redux';
import { IPushPullState, IPushPullSchedule, IPushPullReport, IPushPullDomain } from '../../PredefinedConfig/IPushPullState';
export declare const IPUSHPULL_SET_THROTTLE_TIME = "IPUSHPULL_SET_THROTTLE_TIME";
export declare const IPUSHPULL_SEND_SNAPSHOT = "IPUSHPULL_SEND_SNAPSHOT";
export declare const IPUSHPULL_REPORT_SELECT = "IPUSHPULL_REPORT_SELECT";
export declare const IPUSHPULL_START_LIVE_DATA = "IPUSHPULL_START_LIVE_DATA";
export declare const IPUSHPULL_STOP_LIVE_DATA = "IPUSHPULL_STOP_LIVE_DATA";
export declare const IPUSHPULL_SCHEDULE_ADD = "IPUSHPULL_SCHEDULE_ADD";
export declare const IPUSHPULL_SCHEDULE_EDIT = "IPUSHPULL_SCHEDULE_EDIT";
export declare const IPUSHPULL_SCHEDULE_DELETE = "IPUSHPULL_SCHEDULE_DELETE";
export declare const IPUSHPULL_ADD_PAGE = "IPUSHPULL_ADD_PAGE";
export declare const IPUSHPULL_LOGIN = "IPUSHPULL_LOGIN";
export declare const IPUSHPULL_SET_LOGIN_ERROR_MESSAGE = "IPUSHPULL_SET_LOGIN_ERROR_MESSAGE";
export declare const SET_IPUSHPULL_AVAILABLE_ON = "SET_IPUSHPULL_AVAILABLE_ON";
export declare const SET_IPUSHPULL_AVAILABLE_OFF = "SET_IPUSHPULL_AVAILABLE_OFF";
export declare const SET_IPUSHPULL_RUNNING_ON = "SET_IPUSHPULL_RUNNING_ON";
export declare const SET_IPUSHPULL_RUNNING_OFF = "SET_IPUSHPULL_RUNNING_OFF";
export declare const IPUSHPULL_LIVE_REPORT_SET = "IPUSHPULL_LIVE_REPORT_SET";
export declare const IPUSHPULL_LIVE_REPORT_CLEAR = "IPUSHPULL_LIVE_REPORT_CLEAR";
export declare const IPUSHPULL_DOMAIN_PAGES_SET = "IPUSHPULL_DOMAIN_PAGES_SET";
export declare const IPUSHPULL_DOMAIN_PAGES_CLEAR = "IPUSHPULL_DOMAIN_PAGES_CLEAR";
export interface IPushPullSetThrottleTimeAction extends Redux.Action {
    throttleTime: number;
}
export interface IPushPullScheduleAction extends Redux.Action {
    iPushPullSchedule: IPushPullSchedule;
}
export interface IPushPullScheduleAddAction extends IPushPullScheduleAction {
}
export interface IPushPullScheduleEditAction extends IPushPullScheduleAction {
}
export interface IPushPullScheduleDeleteAction extends IPushPullScheduleAction {
}
export interface IPushPullSendSnapshotAction extends Redux.Action {
    iPushPullReport: IPushPullReport;
}
export interface IPushPullStartLiveDataAction extends Redux.Action {
    iPushPullReport: IPushPullReport;
}
export interface IPushPullStopLiveDataAction extends Redux.Action {
}
export interface IPushPullLoginAction extends Redux.Action {
    username: string;
    password: string;
}
export interface IPushPullSetLoginErrorMessageAction extends Redux.Action {
    errorMessage: string;
}
export interface IPushPullAddPageAction extends Redux.Action {
    folder: string;
    page: string;
}
export interface SetIPushPullAvailableOnAction extends Redux.Action {
}
export interface SetIPushPullAvailableOffAction extends Redux.Action {
}
export interface SetIPushPullRunningOnAction extends Redux.Action {
}
export interface SetIPushPullRunningOffAction extends Redux.Action {
}
export interface IPushPullDomainsPagesSetAction extends Redux.Action {
    IPushPullDomainsPages: IPushPullDomain[];
}
export interface IPushPullDomainsPagesClearAction extends Redux.Action {
}
export interface IPushPullLiveReportSetAction extends Redux.Action {
    iPushPullReport: IPushPullReport;
}
export interface IPushPullLiveReportClearAction extends Redux.Action {
}
export declare const IPushPullSetThrottleTime: (throttleTime: number) => IPushPullSetThrottleTimeAction;
export declare const IPushPullSendSnapshot: (iPushPullReport: IPushPullReport) => IPushPullSendSnapshotAction;
export declare const IPushPullStartLiveData: (iPushPullReport: IPushPullReport) => IPushPullStartLiveDataAction;
export declare const IPushPullStopLiveData: () => IPushPullStopLiveDataAction;
export declare const IPushPullLogin: (username: string, password: string) => IPushPullLoginAction;
export declare const IPushPullSetLoginErrorMessage: (errorMessage: string) => IPushPullSetLoginErrorMessageAction;
export declare const IPushPullAddPage: (folder: string, page: string) => IPushPullAddPageAction;
export declare const IPushPullScheduleAdd: (iPushPullSchedule: IPushPullSchedule) => IPushPullScheduleAddAction;
export declare const IPushPullScheduleEdit: (iPushPullSchedule: IPushPullSchedule) => IPushPullScheduleEditAction;
export declare const IPushPullScheduleDelete: (iPushPullSchedule: IPushPullSchedule) => IPushPullScheduleDeleteAction;
export declare const SetIPushPullAvailableOn: () => SetIPushPullAvailableOnAction;
export declare const SetIPushPullAvailableOff: () => SetIPushPullAvailableOffAction;
export declare const SetIPushPullRunningOn: () => SetIPushPullRunningOnAction;
export declare const SetIPushPullRunningOff: () => SetIPushPullRunningOffAction;
export declare const IPushPullSetDomainsPages: (IPushPullDomainsPages: IPushPullDomain[]) => IPushPullDomainsPagesSetAction;
export declare const IPushPullClearDomainsPages: () => IPushPullDomainsPagesClearAction;
export declare const IPushPullLiveReportSet: (iPushPullReport: IPushPullReport) => IPushPullLiveReportSetAction;
export declare const IPushPullLiveReportClear: () => IPushPullLiveReportClearAction;
export declare const IPushPullReducer: Redux.Reducer<IPushPullState>;
