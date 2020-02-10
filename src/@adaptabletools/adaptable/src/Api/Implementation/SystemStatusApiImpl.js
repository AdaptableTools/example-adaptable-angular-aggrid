"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var SystemStatusRedux = require("../../Redux/ActionsReducers/SystemStatusRedux");
var ApiBase_1 = require("./ApiBase");
var Enums_1 = require("../../PredefinedConfig/Common/Enums");
var StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
var ScreenPopups = require("../../Utilities/Constants/ScreenPopups");
var StringExtensions_1 = require("../../Utilities/Extensions/StringExtensions");
var LoggingHelper_1 = require("../../Utilities/Helpers/LoggingHelper");
var Helper_1 = require("../../Utilities/Helpers/Helper");
var SystemStatusApiImpl = /** @class */ (function (_super) {
    tslib_1.__extends(SystemStatusApiImpl, _super);
    function SystemStatusApiImpl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SystemStatusApiImpl.prototype.getSystemStatusState = function () {
        return this.getAdaptableState().SystemStatus;
    };
    SystemStatusApiImpl.prototype.setSystemStatus = function (statusMessage, messageType, statusFurtherInformation) {
        if (StringExtensions_1.default.IsNullOrEmpty(statusMessage)) {
            if (this.adaptable.isInitialised) {
                LoggingHelper_1.default.LogAdaptableWarning('System Status Message cannot be empty.');
            }
            return;
        }
        var systemStatus = {
            StatusMessage: statusMessage,
            StatusType: messageType,
            StatusFurtherInformation: statusFurtherInformation,
        };
        this.dispatchAction(SystemStatusRedux.SystemStatusSetUpdate(systemStatus));
        if (this.getSystemStatusState().ShowAlert) {
            if (statusMessage !== this.getSystemStatusState().DefaultStatusMessage ||
                messageType !== this.getSystemStatusState().DefaultStatusType) {
                var fullMessage = statusMessage;
                if (StringExtensions_1.default.IsNotNullOrEmpty(statusFurtherInformation)) {
                    fullMessage += '\n' + statusFurtherInformation;
                }
                switch (messageType) {
                    case Enums_1.MessageType.Success:
                        this.adaptable.api.alertApi.showAlertSuccess('System Status Success', fullMessage);
                        return;
                    case Enums_1.MessageType.Info:
                        this.adaptable.api.alertApi.showAlertInfo('System Status Info', fullMessage);
                        return;
                    case Enums_1.MessageType.Warning:
                        this.adaptable.api.alertApi.showAlertWarning('System Status Warning', fullMessage);
                        return;
                    case Enums_1.MessageType.Error:
                        this.adaptable.api.alertApi.showAlertError('System Status Error', fullMessage);
                        return;
                }
            }
        }
    };
    SystemStatusApiImpl.prototype.setErrorSystemStatus = function (statusMessage, statusFurtherInformation) {
        this.setSystemStatus(statusMessage, Enums_1.MessageType.Error, statusFurtherInformation);
    };
    SystemStatusApiImpl.prototype.setWarningSystemStatus = function (statusMessage, statusFurtherInformation) {
        this.setSystemStatus(statusMessage, Enums_1.MessageType.Warning, statusFurtherInformation);
    };
    SystemStatusApiImpl.prototype.setSuccessSystemStatus = function (statusMessage, statusFurtherInformation) {
        this.setSystemStatus(statusMessage, Enums_1.MessageType.Success, statusFurtherInformation);
    };
    SystemStatusApiImpl.prototype.setInfoSystemStatus = function (statusMessage, statusFurtherInformation) {
        this.setSystemStatus(statusMessage, Enums_1.MessageType.Info, statusFurtherInformation);
    };
    SystemStatusApiImpl.prototype.clearSystemStatus = function () {
        this.dispatchAction(SystemStatusRedux.SystemStatusClear());
    };
    SystemStatusApiImpl.prototype.setDefaultMessage = function () {
        if (StringExtensions_1.default.IsNullOrEmpty(this.getSystemStatusState().StatusMessage) &&
            StringExtensions_1.default.IsNotNullOrEmpty(this.getSystemStatusState().DefaultStatusMessage) &&
            Helper_1.default.objectExists(this.getSystemStatusState().DefaultStatusType)) {
            this.setSystemStatus(this.getSystemStatusState().DefaultStatusMessage, this.getSystemStatusState().DefaultStatusType);
        }
    };
    SystemStatusApiImpl.prototype.showSystemStatusPopup = function () {
        this.adaptable.api.internalApi.showPopupScreen(StrategyConstants.SystemStatusStrategyId, ScreenPopups.SystemStatusPopup);
    };
    return SystemStatusApiImpl;
}(ApiBase_1.ApiBase));
exports.SystemStatusApiImpl = SystemStatusApiImpl;
