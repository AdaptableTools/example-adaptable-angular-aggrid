"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var AdaptableStrategyBase_1 = require("./AdaptableStrategyBase");
var StrategyConstants = require("../Utilities/Constants/StrategyConstants");
var ScreenPopups = require("../Utilities/Constants/ScreenPopups");
var SystemStatusRedux = require("../Redux/ActionsReducers/SystemStatusRedux");
var StringExtensions_1 = require("../Utilities/Extensions/StringExtensions");
var Helper_1 = require("../Utilities/Helpers/Helper");
var SystemStatusStrategy = /** @class */ (function (_super) {
    tslib_1.__extends(SystemStatusStrategy, _super);
    function SystemStatusStrategy(adaptable) {
        var _this = _super.call(this, StrategyConstants.SystemStatusStrategyId, adaptable) || this;
        adaptable.AdaptableStore.onAny(function (eventName) {
            if (eventName == SystemStatusRedux.SYSTEM_SYSTEM_SET_UPDATE ||
                eventName == SystemStatusRedux.SYSTEM_SYSTEM_SET_SHOW_ALERT ||
                eventName == SystemStatusRedux.SYSTEM_STATUS_CLEAR) {
                _this.setSystemMessage();
            }
        });
        _this.adaptable.api.eventApi.on('AdaptableReady', function () {
            setTimeout(function () {
                _this.adaptable.api.systemStatusApi.setDefaultMessage();
            }, 300);
        });
        return _this;
    }
    SystemStatusStrategy.prototype.setSystemMessage = function () {
        var systemStatusState = this.adaptable.api.systemStatusApi.getSystemStatusState();
        if (StringExtensions_1.default.IsNullOrEmpty(systemStatusState.StatusMessage)) {
            this.adaptable.api.systemStatusApi.setSystemStatus(systemStatusState.DefaultStatusMessage, systemStatusState.StatusType);
        }
        if (Helper_1.default.objectNotExists(systemStatusState.StatusType)) {
            this.adaptable.api.systemStatusApi.setSystemStatus(systemStatusState.StatusMessage, systemStatusState.DefaultStatusType);
        }
    };
    SystemStatusStrategy.prototype.InitStateOld = function () {
        if (this.systemStatusState != this.adaptable.api.systemStatusApi.getSystemStatusState()) {
            this.systemStatusState = this.adaptable.api.systemStatusApi.getSystemStatusState();
            if (StringExtensions_1.default.IsNullOrEmpty(this.systemStatusState.StatusMessage)) {
                this.adaptable.api.systemStatusApi.setSystemStatus(this.systemStatusState.DefaultStatusMessage, this.systemStatusState.StatusType);
            }
            if (Helper_1.default.objectNotExists(this.systemStatusState.StatusType)) {
                this.adaptable.api.systemStatusApi.setSystemStatus(this.systemStatusState.StatusMessage, this.systemStatusState.DefaultStatusType);
            }
        }
    };
    SystemStatusStrategy.prototype.addFunctionMenuItem = function () {
        return this.createMainMenuItemShowPopup({
            Label: StrategyConstants.SystemStatusStrategyFriendlyName,
            ComponentName: ScreenPopups.SystemStatusPopup,
            Icon: StrategyConstants.SystemStatusGlyph,
        });
    };
    SystemStatusStrategy.prototype.addColumnMenuItem = function (column) {
        return this.createColumnMenuItemShowPopup('Show ' + StrategyConstants.SystemStatusStrategyFriendlyName, ScreenPopups.SystemStatusPopup, StrategyConstants.SystemStatusGlyph);
    };
    SystemStatusStrategy.prototype.addContextMenuItem = function (menuInfo) {
        var popUpParams = {
            source: 'ContextMenu',
        };
        return this.createMainMenuItemShowPopup({
            Label: 'Show ' + StrategyConstants.SystemStatusStrategyFriendlyName,
            ComponentName: ScreenPopups.SystemStatusPopup,
            Icon: StrategyConstants.SystemStatusGlyph,
            PopupParams: popUpParams,
        });
    };
    return SystemStatusStrategy;
}(AdaptableStrategyBase_1.AdaptableStrategyBase));
exports.SystemStatusStrategy = SystemStatusStrategy;
