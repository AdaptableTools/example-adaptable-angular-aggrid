import * as Redux from 'redux';
import { PopupState } from '../../PredefinedConfig/PopupState';
import { InputAction, IUIPrompt, IUIConfirmation, AdaptableAlert } from '../../Utilities/Interface/IMessage';
import { StrategyParams } from '../../View/Components/SharedProps/StrategyViewPopupProps';
import { AdaptableFunctionName } from '../../PredefinedConfig/Common/Types';
export declare const POPUP_SHOW_SCREEN = "POPUP_SHOW_SCREEN";
export declare const POPUP_HIDE_SCREEN = "POPUP_HIDE_SCREEN";
export declare const POPUP_SHOW_LOADING = "POPUP_SHOW_LOADING";
export declare const POPUP_HIDE_LOADING = "POPUP_HIDE_LOADING";
export declare const POPUP_SHOW_GRID_INFO = "POPUP_SHOW_GRID_INFO";
export declare const POPUP_HIDE_GRID_INFO = "POPUP_HIDE_GRID_INFO";
export declare const POPUP_SHOW_ALERT = "POPUP_SHOW_ALERT";
export declare const POPUP_HIDE_ALERT = "POPUP_HIDE_ALERT";
export declare const POPUP_SHOW_PROMPT = "POPUP_SHOW_PROMPT";
export declare const POPUP_HIDE_PROMPT = "POPUP_HIDE_PROMPT";
export declare const POPUP_CONFIRM_PROMPT = "POPUP_CONFIRM_PROMPT";
export declare const POPUP_SHOW_CONFIRMATION = "POPUP_SHOW_CONFIRMATION";
export declare const POPUP_CONFIRM_CONFIRMATION = "POPUP_CONFIRM_CONFIRMATION";
export declare const POPUP_CANCEL_CONFIRMATION = "POPUP_CANCEL_CONFIRMATION";
export declare const POPUP_CLEAR_PARAM = "POPUP_CLEAR_PARAM";
export interface PopupShowScreenAction extends Redux.Action {
    ComponentStrategy: AdaptableFunctionName;
    ComponentName: string;
    Params?: StrategyParams;
    PopupProps?: {
        [key: string]: any;
    };
}
export interface PopupHideScreenAction extends Redux.Action {
}
export interface PopupShowLoadingAction extends Redux.Action {
}
export interface PopupHideLoadingAction extends Redux.Action {
}
export interface PopupShowGridInfoAction extends Redux.Action {
}
export interface PopupHideGridInfoAction extends Redux.Action {
}
export interface PopupShowAlertAction extends Redux.Action {
    Alert: AdaptableAlert;
}
export interface PopupHideAlertAction extends Redux.Action {
}
export interface PopupHidePromptAction extends Redux.Action {
}
export interface PopupConfirmPromptAction extends InputAction {
}
export interface PopupConfirmConfirmationAction extends Redux.Action {
    comment: string;
}
export interface PopupCancelConfirmationAction extends Redux.Action {
}
export interface PopupShowPromptAction extends Redux.Action {
    Prompt: IUIPrompt;
}
export interface PopupShowConfirmationAction extends Redux.Action {
    Confirmation: IUIConfirmation;
}
export interface PopupClearParamAction extends Redux.Action {
}
export interface PopupChartClearParamAction extends Redux.Action {
}
export declare const PopupShowScreen: (ComponentStrategy: AdaptableFunctionName, ComponentName: string, Params?: StrategyParams, PopupProps?: {
    [key: string]: any;
}) => PopupShowScreenAction;
export declare const PopupHideScreen: () => PopupHideScreenAction;
export declare const PopupShowAlert: (Alert: AdaptableAlert) => PopupShowAlertAction;
export declare const PopupHideAlert: () => PopupHideAlertAction;
export declare const PopupShowLoading: () => PopupShowLoadingAction;
export declare const PopupHideLoading: () => PopupHideLoadingAction;
export declare const PopupShowGridInfo: () => PopupShowGridInfoAction;
export declare const PopupHideGridInfo: () => PopupHideGridInfoAction;
export declare const PopupShowPrompt: (Prompt: IUIPrompt) => PopupShowPromptAction;
export declare const PopupHidePrompt: () => PopupHidePromptAction;
export declare const PopupConfirmPrompt: (InputText: string) => PopupConfirmPromptAction;
export declare const PopupShowConfirmation: (Confirmation: IUIConfirmation) => PopupShowConfirmationAction;
export declare const PopupConfirmConfirmation: (comment: string) => PopupConfirmConfirmationAction;
export declare const PopupCancelConfirmation: () => PopupCancelConfirmationAction;
export declare const PopupClearParam: () => PopupClearParamAction;
export declare const PopupReducer: Redux.Reducer<PopupState>;
