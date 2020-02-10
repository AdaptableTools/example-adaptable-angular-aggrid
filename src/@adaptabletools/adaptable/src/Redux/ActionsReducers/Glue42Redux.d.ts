import * as Redux from 'redux';
import { Glue42State, Glue42Report, Glue42Schedule } from '../../PredefinedConfig/Glue42State';
export declare const GLUE42_LOGIN = "GLUE42_LOGIN";
export declare const GLUE42_SET_LOGIN_ERROR_MESSAGE = "GLUE42_SET_LOGIN_ERROR_MESSAGE";
export declare const GLUE42_SET_THROTTLE_TIME = "GLUE42_SET_THROTTLE_TIME";
export declare const GLUE42_SEND_SNAPSHOT = "GLUE42_SEND_SNAPSHOT";
export declare const GLUE42_START_LIVE_DATA = "GLUE42_START_LIVE_DATA";
export declare const GLUE42_STOP_LIVE_DATA = "GLUE42_STOP_LIVE_DATA";
export declare const GLUE42_LIVE_REPORT_SET = "GLUE42_LIVE_REPORT_SET";
export declare const GLUE42_LIVE_REPORT_CLEAR = "GLUE42_LIVE_REPORT_CLEAR";
export declare const SET_GLUE42_AVAILABLE_ON = "SET_GLUE42_AVAILABLE_ON";
export declare const SET_GLUE42_AVAILABLE_OFF = "SET_GLUE42_AVAILABLE_OFF";
export declare const SET_GLUE42_RUNNING_ON = "SET_GLUE42_RUNNING_ON";
export declare const SET_GLUE42_RUNNING_OFF = "SET_GLUE42_RUNNING_OFF";
export declare const GLUE42_SCHEDULE_ADD = "GLUE42_SCHEDULE_ADD";
export declare const GLUE42_SCHEDULE_EDIT = "GLUE42_SCHEDULE_EDIT";
export declare const GLUE42_SCHEDULE_DELETE = "GLUE42_SCHEDULE_DELETE";
export interface Glue42LoginAction extends Redux.Action {
    username: string;
    password: string;
}
export interface Glue42SetLoginErrorMessageAction extends Redux.Action {
    errorMessage: string;
}
export interface Glue42SetThrottleTimeAction extends Redux.Action {
    throttleTime: number;
}
export interface Glue42SendSnapshotAction extends Redux.Action {
    glue42Report: Glue42Report;
}
export interface Glue42StartLiveDataAction extends Redux.Action {
    glue42Report: Glue42Report;
}
export interface Glue42StopLiveDataAction extends Redux.Action {
}
export interface Glue42LiveReportSetAction extends Redux.Action {
    glue42Report: Glue42Report;
}
export interface Glue42LiveReportClearAction extends Redux.Action {
}
export interface SetGlue42AvailableOnAction extends Redux.Action {
}
export interface SetGlue42AvailableOffAction extends Redux.Action {
}
export interface SetGlue42RunningOnAction extends Redux.Action {
}
export interface SetGlue42RunningOffAction extends Redux.Action {
}
export interface Glue42ScheduleAction extends Redux.Action {
    glue42Schedule: Glue42Schedule;
}
export interface Glue42ScheduleAddAction extends Glue42ScheduleAction {
}
export interface Glue42ScheduleEditAction extends Glue42ScheduleAction {
}
export interface Glue42ScheduleDeleteAction extends Glue42ScheduleAction {
}
export declare const Glue42Login: (username: string, password: string) => Glue42LoginAction;
export declare const Glue42SetLoginErrorMessage: (errorMessage: string) => Glue42SetLoginErrorMessageAction;
export declare const Glue42SetThrottleTime: (throttleTime: number) => Glue42SetThrottleTimeAction;
export declare const Glue42SendSnapshot: (glue42Report: Glue42Report) => Glue42SendSnapshotAction;
export declare const Glue42StartLiveData: (glue42Report: Glue42Report) => Glue42StartLiveDataAction;
export declare const Glue42StopLiveData: () => Glue42StopLiveDataAction;
export declare const Glue42LiveReportSet: (glue42Report: Glue42Report) => Glue42LiveReportSetAction;
export declare const Glue42LiveReportClear: () => Glue42LiveReportClearAction;
export declare const SetGlue42AvailableOn: () => SetGlue42AvailableOnAction;
export declare const SetGlue42AvailableOff: () => SetGlue42AvailableOffAction;
export declare const SetGlue42RunningOn: () => SetGlue42RunningOnAction;
export declare const SetGlue42RunningOff: () => SetGlue42RunningOffAction;
export declare const Glue42ScheduleAdd: (glue42Schedule: Glue42Schedule) => Glue42ScheduleAddAction;
export declare const Glue42ScheduleEdit: (glue42Schedule: Glue42Schedule) => Glue42ScheduleEditAction;
export declare const Glue42ScheduleDelete: (glue42Schedule: Glue42Schedule) => Glue42ScheduleDeleteAction;
export declare const Glue42Reducer: Redux.Reducer<Glue42State>;
