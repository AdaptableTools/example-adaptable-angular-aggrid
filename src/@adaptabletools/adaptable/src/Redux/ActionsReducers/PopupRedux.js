"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Enums_1 = require("../../PredefinedConfig/Common/Enums");
exports.POPUP_SHOW_SCREEN = 'POPUP_SHOW_SCREEN';
exports.POPUP_HIDE_SCREEN = 'POPUP_HIDE_SCREEN';
exports.POPUP_SHOW_LOADING = 'POPUP_SHOW_LOADING';
exports.POPUP_HIDE_LOADING = 'POPUP_HIDE_LOADING';
exports.POPUP_SHOW_GRID_INFO = 'POPUP_SHOW_GRID_INFO';
exports.POPUP_HIDE_GRID_INFO = 'POPUP_HIDE_GRID_INFO';
exports.POPUP_SHOW_ALERT = 'POPUP_SHOW_ALERT';
exports.POPUP_HIDE_ALERT = 'POPUP_HIDE_ALERT';
exports.POPUP_SHOW_PROMPT = 'POPUP_SHOW_PROMPT';
exports.POPUP_HIDE_PROMPT = 'POPUP_HIDE_PROMPT';
exports.POPUP_CONFIRM_PROMPT = 'POPUP_CONFIRM_PROMPT';
exports.POPUP_SHOW_CONFIRMATION = 'POPUP_SHOW_CONFIRMATION';
exports.POPUP_CONFIRM_CONFIRMATION = 'POPUP_CONFIRM_CONFIRMATION';
exports.POPUP_CANCEL_CONFIRMATION = 'POPUP_CANCEL_CONFIRMATION';
exports.POPUP_CLEAR_PARAM = 'POPUP_CLEAR_PARAM';
exports.PopupShowScreen = function (ComponentStrategy, ComponentName, Params, PopupProps) { return ({
    type: exports.POPUP_SHOW_SCREEN,
    ComponentStrategy: ComponentStrategy,
    ComponentName: ComponentName,
    Params: Params,
    PopupProps: PopupProps,
}); };
exports.PopupHideScreen = function () { return ({
    type: exports.POPUP_HIDE_SCREEN,
}); };
exports.PopupShowAlert = function (Alert) {
    return {
        type: exports.POPUP_SHOW_ALERT,
        Alert: Alert,
    };
};
exports.PopupHideAlert = function () { return ({
    type: exports.POPUP_HIDE_ALERT,
}); };
exports.PopupShowLoading = function () { return ({
    type: exports.POPUP_SHOW_LOADING,
}); };
exports.PopupHideLoading = function () { return ({
    type: exports.POPUP_HIDE_LOADING,
}); };
exports.PopupShowGridInfo = function () { return ({
    type: exports.POPUP_SHOW_GRID_INFO,
}); };
exports.PopupHideGridInfo = function () { return ({
    type: exports.POPUP_HIDE_GRID_INFO,
}); };
exports.PopupShowPrompt = function (Prompt) { return ({
    type: exports.POPUP_SHOW_PROMPT,
    Prompt: Prompt,
}); };
exports.PopupHidePrompt = function () { return ({
    type: exports.POPUP_HIDE_PROMPT,
}); };
exports.PopupConfirmPrompt = function (InputText) { return ({
    type: exports.POPUP_CONFIRM_PROMPT,
    InputText: InputText,
}); };
exports.PopupShowConfirmation = function (Confirmation) { return ({
    type: exports.POPUP_SHOW_CONFIRMATION,
    Confirmation: Confirmation,
}); };
exports.PopupConfirmConfirmation = function (comment) { return ({
    type: exports.POPUP_CONFIRM_CONFIRMATION,
    comment: comment,
}); };
exports.PopupCancelConfirmation = function () { return ({
    type: exports.POPUP_CANCEL_CONFIRMATION,
}); };
exports.PopupClearParam = function () { return ({
    type: exports.POPUP_CLEAR_PARAM,
}); };
var initialPopupState = {
    ScreenPopup: {
        ShowScreenPopup: false,
        ComponentStrategy: undefined,
        ComponentName: '',
        Params: null,
    },
    LoadingPopup: {
        ShowLoadingPopup: true,
    },
    GridInfoPopup: {
        ShowGridInfoPopup: false,
    },
    AlertPopup: {
        ShowAlertPopup: false,
        Header: '',
        Msg: '',
        MessageType: Enums_1.MessageType.Info,
    },
    ConfirmationPopup: {
        ShowConfirmationPopup: false,
        Msg: '',
        Header: '',
        ConfirmButtonText: '',
        CancelButtonText: '',
        CancelAction: null,
        ConfirmAction: null,
        ShowInputBox: false,
        ConfirmationComment: null,
        MessageType: Enums_1.MessageType.Info,
    },
    PromptPopup: {
        ShowPromptPopup: false,
        Header: '',
        Msg: '',
        ConfirmAction: null,
    },
};
exports.PopupReducer = function (state, action) {
    if (state === void 0) { state = initialPopupState; }
    switch (action.type) {
        case exports.POPUP_SHOW_SCREEN: {
            var actionTypedShowPopup = action;
            var newScreenPopup = {
                ShowScreenPopup: true,
                ComponentStrategy: actionTypedShowPopup.ComponentStrategy,
                ComponentName: actionTypedShowPopup.ComponentName,
                Params: actionTypedShowPopup.Params,
                PopupProps: actionTypedShowPopup.PopupProps,
            };
            return Object.assign({}, state, { ScreenPopup: newScreenPopup });
        }
        case exports.POPUP_HIDE_SCREEN: {
            var newScreenPopup = {
                ShowScreenPopup: false,
                ComponentStrategy: undefined,
                ComponentName: '',
                Params: null,
            };
            return Object.assign({}, state, { ScreenPopup: newScreenPopup });
        }
        case exports.POPUP_SHOW_PROMPT: {
            var actionTyped = action;
            var newPromptPopup = {
                ShowPromptPopup: true,
                Header: actionTyped.Prompt.Header,
                Msg: actionTyped.Prompt.Msg,
                ConfirmAction: actionTyped.Prompt.ConfirmAction,
            };
            return Object.assign({}, state, { PromptPopup: newPromptPopup });
        }
        case exports.POPUP_HIDE_PROMPT: {
            var newPromptPopup = {
                ShowPromptPopup: false,
                Header: '',
                Msg: '',
                ConfirmAction: null,
            };
            return Object.assign({}, state, { PromptPopup: newPromptPopup });
        }
        case exports.POPUP_CONFIRM_PROMPT: {
            //we dispatch the Action of ConfirmAction in the middelware in order to keep the reducer pure
            var newPromptPopup = {
                ShowPromptPopup: false,
                Header: '',
                Msg: '',
                ConfirmAction: null,
            };
            return Object.assign({}, state, { PromptPopup: newPromptPopup });
        }
        case exports.POPUP_SHOW_CONFIRMATION: {
            var actionTyped = action;
            var newConfirmationPopup = {
                ShowConfirmationPopup: true,
                Msg: actionTyped.Confirmation.Msg,
                Header: actionTyped.Confirmation.Header,
                ConfirmButtonText: actionTyped.Confirmation.ConfirmButtonText,
                CancelButtonText: actionTyped.Confirmation.CancelButtonText,
                ConfirmAction: actionTyped.Confirmation.ConfirmAction,
                CancelAction: actionTyped.Confirmation.CancelAction,
                ShowInputBox: actionTyped.Confirmation.ShowInputBox,
                ConfirmationComment: null,
                MessageType: actionTyped.Confirmation.MessageType,
            };
            return Object.assign({}, state, { ConfirmationPopup: newConfirmationPopup });
        }
        case exports.POPUP_CONFIRM_CONFIRMATION: {
            var actionTyped = action;
            //we dispatch the Action of ConfirmAction in the middelware in order to keep the reducer pure
            var newConfirmationPopup = {
                ShowConfirmationPopup: false,
                Msg: '',
                Header: '',
                ConfirmButtonText: '',
                CancelButtonText: '',
                ConfirmAction: null,
                CancelAction: null,
                ShowInputBox: false,
                ConfirmationComment: actionTyped.comment,
                MessageType: null,
            };
            return Object.assign({}, state, { ConfirmationPopup: newConfirmationPopup });
        }
        case exports.POPUP_CANCEL_CONFIRMATION: {
            //we dispatch the Action of CancelAction in the middelware in order to keep the reducer pure
            var newConfirmationPopup = {
                ShowConfirmationPopup: false,
                Msg: '',
                Header: '',
                ConfirmButtonText: '',
                CancelButtonText: '',
                ConfirmAction: null,
                CancelAction: null,
                ShowInputBox: false,
                ConfirmationComment: null,
                MessageType: null,
            };
            return Object.assign({}, state, { ConfirmationPopup: newConfirmationPopup });
        }
        case exports.POPUP_SHOW_ALERT: {
            var showAlertAction = action;
            var newAlertPopup = {
                ShowAlertPopup: true,
                Header: showAlertAction.Alert.Header,
                Msg: showAlertAction.Alert.Msg,
                MessageType: showAlertAction.Alert.AlertDefinition.MessageType,
            };
            return Object.assign({}, state, { AlertPopup: newAlertPopup });
        }
        case exports.POPUP_HIDE_ALERT: {
            var newAlertPopup = {
                ShowAlertPopup: false,
                Header: '',
                Msg: '',
                MessageType: Enums_1.MessageType.Info,
            };
            return Object.assign({}, state, { AlertPopup: newAlertPopup });
        }
        case exports.POPUP_SHOW_LOADING: {
            var newLoadingPopup = { ShowLoadingPopup: true };
            return Object.assign({}, state, { LoadingPopup: newLoadingPopup });
        }
        case exports.POPUP_HIDE_LOADING: {
            var newLoadingPopup = { ShowLoadingPopup: false };
            return Object.assign({}, state, { LoadingPopup: newLoadingPopup });
        }
        case exports.POPUP_SHOW_GRID_INFO: {
            var newGridInfoPopup = { ShowGridInfoPopup: true };
            return Object.assign({}, state, { GridInfoPopup: newGridInfoPopup });
        }
        case exports.POPUP_HIDE_GRID_INFO: {
            var newGridInfoPopup = { ShowGridInfoPopup: false };
            return Object.assign({}, state, { GridInfoPopup: newGridInfoPopup });
        }
        case exports.POPUP_CLEAR_PARAM: {
            var newScreenPopup = {
                ShowScreenPopup: state.ScreenPopup.ShowScreenPopup,
                ComponentStrategy: state.ScreenPopup.ComponentStrategy,
                ComponentName: state.ScreenPopup.ComponentName,
                Params: null,
            };
            return Object.assign({}, state, { ScreenPopup: newScreenPopup });
        }
        default:
            return state;
    }
};
