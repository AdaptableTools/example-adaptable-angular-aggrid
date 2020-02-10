"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var react_redux_1 = require("react-redux");
var styled_components_1 = require("styled-components");
var theme_1 = require("../theme");
var PopupRedux = require("../Redux/ActionsReducers/PopupRedux");
var SystemRedux = require("../Redux/ActionsReducers/SystemRedux");
var AdaptablePopup_1 = require("./Components/Popups/AdaptablePopup");
var AdaptablePopupPrompt_1 = require("./Components/Popups/AdaptablePopupPrompt");
var Dashboard_1 = require("./Dashboard/Dashboard");
var AdaptablePopupConfirmation_1 = require("./Components/Popups/AdaptablePopupConfirmation");
var AdaptablePopupAlert_1 = require("./Components/Popups/AdaptablePopupAlert");
var AdaptableChart_1 = require("./Components/Popups/AdaptableChart");
var ChartEnums_1 = require("../PredefinedConfig/Common/ChartEnums");
var AdaptableGridInfo_1 = require("./Components/Popups/AdaptableGridInfo");
var AdaptableLoadingScreen_1 = require("./Components/Popups/AdaptableLoadingScreen");
//PLEASE NO LOGIC HERE!!! I keep removing stuf... Search , filter, quick search and now layouts.......
var AdaptableView = /** @class */ (function (_super) {
    tslib_1.__extends(AdaptableView, _super);
    function AdaptableView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AdaptableView.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", null,
            React.createElement(Dashboard_1.Dashboard, { Adaptable: this.props.Adaptable }),
            this.props.SystemState.ChartVisibility != ChartEnums_1.ChartVisibility.Hidden && (React.createElement(AdaptableChart_1.AdaptableChart, { Adaptable: this.props.Adaptable, onClose: this.props.onCloseChartPopup, showChart: this.props.SystemState.ChartVisibility == ChartEnums_1.ChartVisibility.Maximised, showModal: this.props.Adaptable.adaptableOptions.chartOptions.showModal })),
            React.createElement(AdaptableGridInfo_1.AdaptableGridInfo, { Adaptable: this.props.Adaptable, onClose: this.props.onCloseGridInfoPopup, showAbout: this.props.PopupState.GridInfoPopup.ShowGridInfoPopup }),
            React.createElement(AdaptableLoadingScreen_1.AdaptableLoadingScreen, { Adaptable: this.props.Adaptable, onClose: this.props.onCloseLoadingPopup, showLoadingScreen: this.props.PopupState.LoadingPopup.ShowLoadingPopup }),
            React.createElement(AdaptablePopupAlert_1.AdaptablePopupAlert, { Header: this.props.PopupState.AlertPopup.Header, Msg: this.props.PopupState.AlertPopup.Msg, onClose: this.props.onCloseAlertPopup, ShowPopup: this.props.PopupState.AlertPopup.ShowAlertPopup, MessageType: this.props.PopupState.AlertPopup.MessageType, Adaptable: this.props.Adaptable }),
            React.createElement(AdaptablePopupPrompt_1.AdaptablePopupPrompt, { Msg: this.props.PopupState.PromptPopup.Msg, Header: this.props.PopupState.PromptPopup.Header, onClose: this.props.onClosePromptPopup, onConfirm: this.props.onConfirmPromptPopup, ShowPopup: this.props.PopupState.PromptPopup.ShowPromptPopup, Adaptable: this.props.Adaptable }),
            React.createElement(AdaptablePopupConfirmation_1.AdaptablePopupConfirmation, { Header: this.props.PopupState.ConfirmationPopup.Header, Msg: this.props.PopupState.ConfirmationPopup.Msg, ShowPopup: this.props.PopupState.ConfirmationPopup.ShowConfirmationPopup, CancelButtonText: this.props.PopupState.ConfirmationPopup.CancelButtonText, ConfirmButtonText: this.props.PopupState.ConfirmationPopup.ConfirmButtonText, onCancel: this.props.onCancelConfirmationPopup, onConfirm: this.props.onConfirmConfirmationPopup, ShowInputBox: this.props.PopupState.ConfirmationPopup.ShowInputBox, MessageType: this.props.PopupState.ConfirmationPopup.MessageType, Adaptable: this.props.Adaptable }),
            React.createElement(AdaptablePopup_1.AdaptablePopup, { showModal: this.props.PopupState.ScreenPopup.ShowScreenPopup, ComponentName: this.props.PopupState.ScreenPopup.ComponentName, ComponentStrategy: this.props.PopupState.ScreenPopup.ComponentStrategy, onHide: this.props.onCloseScreenPopup, Adaptable: this.props.Adaptable, onClearPopupParams: function () { return _this.props.onClearPopupParams(); }, PopupParams: this.props.PopupState.ScreenPopup.Params, PopupProps: this.props.PopupState.ScreenPopup.PopupProps })));
    };
    return AdaptableView;
}(React.Component));
function mapStateToProps(state, ownProps) {
    return {
        PopupState: state.Popup,
        SystemState: state.System,
        ChartState: state.Chart,
        Adaptable: ownProps.Adaptable,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        onCloseScreenPopup: function () { return dispatch(PopupRedux.PopupHideScreen()); },
        onCloseAlertPopup: function () { return dispatch(PopupRedux.PopupHideAlert()); },
        onCloseGridInfoPopup: function () { return dispatch(PopupRedux.PopupHideGridInfo()); },
        onCloseChartPopup: function () { return dispatch(SystemRedux.ChartSetChartVisibility(ChartEnums_1.ChartVisibility.Hidden)); },
        onClosePromptPopup: function () { return dispatch(PopupRedux.PopupHidePrompt()); },
        onConfirmPromptPopup: function (inputText) { return dispatch(PopupRedux.PopupConfirmPrompt(inputText)); },
        onConfirmConfirmationPopup: function (comment) {
            return dispatch(PopupRedux.PopupConfirmConfirmation(comment));
        },
        onCancelConfirmationPopup: function () { return dispatch(PopupRedux.PopupCancelConfirmation()); },
        showPopup: function (componentStrategy, componentName, params) {
            return dispatch(PopupRedux.PopupShowScreen(componentStrategy, componentName, params));
        },
        onClearPopupParams: function () { return dispatch(PopupRedux.PopupClearParam()); },
    };
}
var AdaptableWrapper = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(AdaptableView);
exports.AdaptableApp = function (_a) {
    var Adaptable = _a.Adaptable;
    return (React.createElement(react_redux_1.Provider, { store: Adaptable.AdaptableStore.TheStore },
        React.createElement(styled_components_1.ThemeProvider, { theme: theme_1.default },
            React.createElement(AdaptableWrapper, { Adaptable: Adaptable }))));
};
