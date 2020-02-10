"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var SystemRedux = require("../../Redux/ActionsReducers/SystemRedux");
var PopupRedux = require("../../Redux/ActionsReducers/PopupRedux");
var ApiBase_1 = require("./ApiBase");
var Enums_1 = require("../../PredefinedConfig/Common/Enums");
var StringExtensions_1 = require("../../Utilities/Extensions/StringExtensions");
var LoggingHelper_1 = require("../../Utilities/Helpers/LoggingHelper");
var StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
var ScreenPopups = require("../../Utilities/Constants/ScreenPopups");
var OpenfinHelper_1 = require("../../Utilities/Helpers/OpenfinHelper");
var ObjectFactory_1 = require("../../Utilities/ObjectFactory");
var AdaptableHelper_1 = require("../../Utilities/Helpers/AdaptableHelper");
var AlertApiImpl = /** @class */ (function (_super) {
    tslib_1.__extends(AlertApiImpl, _super);
    function AlertApiImpl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AlertApiImpl.prototype.getAlertState = function () {
        return this.getAdaptableState().Alert;
    };
    AlertApiImpl.prototype.getAlertDefinitions = function () {
        return this.getAlertState().AlertDefinitions;
    };
    AlertApiImpl.prototype.displayAlert = function (alertToShow) {
        var maxAlerts = this.getAlertState().MaxAlertsInStore;
        // 3 things we always do with an alert are:
        // 1. Dispatch the Alert (so it appears in the toolbar)
        this.dispatchAction(SystemRedux.SystemAlertAdd(alertToShow, maxAlerts));
        // 2. Publish the Alert Fired Event
        var alertFiredInfo = {
            alert: alertToShow,
        };
        var alertFiredArgs = AdaptableHelper_1.default.createFDC3Message('Alert Fired Args', alertFiredInfo);
        this.adaptable.api.eventApi.emit('AlertFired', alertFiredArgs);
        // 3. Log it to the Console
        LoggingHelper_1.LoggingHelper.LogAlert(alertToShow.Header + ': ' + alertToShow.Msg, alertToShow.AlertDefinition.MessageType);
        if (alertToShow.AlertDefinition && alertToShow.AlertDefinition.AlertProperties != undefined) {
            var alertProperties = alertToShow.AlertDefinition.AlertProperties;
            // There are 4 possible other actions that could happen
            // 1. Show a Popup
            if (alertProperties.ShowPopup) {
                this.dispatchAction(PopupRedux.PopupShowAlert(alertToShow));
            }
            // 1. Show it in a Div (if one has been set)
            if (alertProperties.ShowInDiv) {
                if (StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.getAdaptableState().Alert.AlertDisplayDiv)) {
                    var alertString = alertToShow.Header + ': ' + alertToShow.Msg;
                    var alertDiv = document.getElementById(this.getAdaptableState().Alert.AlertDisplayDiv);
                    if (alertDiv) {
                        alertDiv.innerHTML = alertString;
                    }
                }
            }
            // 3: Jump to the Cell
            if (alertProperties.JumpToCell && alertToShow.DataChangedInfo) {
                this.adaptable.jumpToCell(alertToShow.DataChangedInfo.ColumnId, alertToShow.DataChangedInfo.RowNode);
            }
        }
    };
    // 4: Hight the cell - though that is taken care of in the Style Service
    AlertApiImpl.prototype.displayMessageAlertPopup = function (alertToDisplayAsPopup) {
        this.dispatchAction(PopupRedux.PopupShowAlert(alertToDisplayAsPopup));
    };
    AlertApiImpl.prototype.showAlert = function (alertHeader, alertMessage, alertDefinition, dataChangedInfo) {
        var alertToShow = ObjectFactory_1.default.CreateAlert(alertHeader, alertMessage, alertDefinition, dataChangedInfo);
        this.displayAlert(alertToShow);
        // tmp
        if (OpenfinHelper_1.default.isRunningInOpenfin) {
            /*
            createOpenFinNotification({
              id: String(Math.random()),
              title: alertToShow.Header,
              body: alertToShow.Msg,
              icon: 'https://openfin.co/favicon.ico',
            });
            */
        }
    };
    AlertApiImpl.prototype.showAlertInfo = function (alertHeader, alertMessage) {
        var alertDefinition = ObjectFactory_1.default.CreateInternalAlertDefinitionForMessages(Enums_1.MessageType.Info);
        this.showAlert(alertHeader, alertMessage, alertDefinition);
    };
    AlertApiImpl.prototype.showAlertSuccess = function (alertHeader, alertMessage) {
        var alertDefinition = ObjectFactory_1.default.CreateInternalAlertDefinitionForMessages(Enums_1.MessageType.Success);
        this.showAlert(alertHeader, alertMessage, alertDefinition);
    };
    AlertApiImpl.prototype.showAlertWarning = function (alertHeader, alertMessage) {
        var alertDefinition = ObjectFactory_1.default.CreateInternalAlertDefinitionForMessages(Enums_1.MessageType.Warning);
        this.showAlert(alertHeader, alertMessage, alertDefinition);
    };
    AlertApiImpl.prototype.showAlertError = function (alertHeader, alertMessage) {
        var alertDefinition = ObjectFactory_1.default.CreateInternalAlertDefinitionForMessages(Enums_1.MessageType.Error);
        this.showAlert(alertHeader, alertMessage, alertDefinition);
    };
    AlertApiImpl.prototype.showAlertPopup = function () {
        this.adaptable.api.internalApi.showPopupScreen(StrategyConstants.AlertStrategyId, ScreenPopups.AlertPopup);
    };
    return AlertApiImpl;
}(ApiBase_1.ApiBase));
exports.AlertApiImpl = AlertApiImpl;
