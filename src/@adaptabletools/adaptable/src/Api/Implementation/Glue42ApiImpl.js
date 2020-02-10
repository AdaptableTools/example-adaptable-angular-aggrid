"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ApiBase_1 = require("./ApiBase");
var StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
var ScreenPopups = require("../../Utilities/Constants/ScreenPopups");
var Glue42Redux = require("../../Redux/ActionsReducers/Glue42Redux");
var Glue42ApiImpl = /** @class */ (function (_super) {
    tslib_1.__extends(Glue42ApiImpl, _super);
    function Glue42ApiImpl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Glue42ApiImpl.prototype.getGlue42State = function () {
        return this.getAdaptableState().Glue42;
    };
    Glue42ApiImpl.prototype.isGlue42Running = function () {
        var glue42State = this.getGlue42State();
        if (glue42State) {
            return glue42State.IsGlue42Running;
        }
        return false;
    };
    Glue42ApiImpl.prototype.isGlue42Available = function () {
        var glue42State = this.getGlue42State();
        if (glue42State) {
            return glue42State.IsGlue42Available;
        }
        return false;
    };
    Glue42ApiImpl.prototype.loginToGlue42 = function (userName, password) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.adaptable.Glue42Service.login(userName, password, this.getGlue42State().GatewayURL)];
                    case 1:
                        _a.sent();
                        this.adaptable.api.internalApi.hidePopupScreen();
                        this.setGlue42LoginErrorMessage('');
                        return [2 /*return*/];
                }
            });
        });
    };
    Glue42ApiImpl.prototype.logoutFromGlue42 = function () {
        this.clearGlue42InternalState();
        this.adaptable.api.internalApi.hidePopupScreen();
    };
    Glue42ApiImpl.prototype.clearGlue42InternalState = function () {
        this.setGlue42RunningOff();
        this.setGlue42LoginErrorMessage('');
        this.dispatchAction(Glue42Redux.Glue42LiveReportClear());
    };
    Glue42ApiImpl.prototype.setGlue42LoginErrorMessage = function (loginErrorMessage) {
        this.dispatchAction(Glue42Redux.Glue42SetLoginErrorMessage(loginErrorMessage));
    };
    Glue42ApiImpl.prototype.getGlue42ThrottleTime = function () {
        return this.getGlue42State().ThrottleTime;
    };
    Glue42ApiImpl.prototype.setGlue42ThrottleTime = function (throttleTime) {
        this.dispatchAction(Glue42Redux.Glue42SetThrottleTime(throttleTime));
    };
    Glue42ApiImpl.prototype.getCurrentLiveGlue42Report = function () {
        return undefined; // need to do this
    };
    Glue42ApiImpl.prototype.setGlue42AvailableOn = function () {
        this.dispatchAction(Glue42Redux.SetGlue42AvailableOn());
    };
    Glue42ApiImpl.prototype.setGlue42AvailableOff = function () {
        this.dispatchAction(Glue42Redux.SetGlue42AvailableOff());
    };
    Glue42ApiImpl.prototype.setGlue42RunningOn = function () {
        this.dispatchAction(Glue42Redux.SetGlue42RunningOn());
    };
    Glue42ApiImpl.prototype.setGlue42RunningOff = function () {
        this.dispatchAction(Glue42Redux.SetGlue42RunningOff());
    };
    Glue42ApiImpl.prototype.getGlue42Schedules = function () {
        return this.getGlue42State().Glue42Schedules;
    };
    Glue42ApiImpl.prototype.startLiveData = function (glue42Report) {
        if (this.checkItemExists(glue42Report, glue42Report.ReportName, 'Glue42 Report')) {
            this.dispatchAction(Glue42Redux.Glue42LiveReportSet(glue42Report));
            this.adaptable.ReportService.PublishLiveLiveDataChangedEvent('Glue42', 'LiveDataStarted', glue42Report);
        }
    };
    Glue42ApiImpl.prototype.stopLiveData = function () {
        var currentLiveReport = this.getCurrentLiveGlue42Report();
        // anything here to do with the Glue42Service should be done
        //    this.adaptable.Glue42Service.stopLiveData()
        // fire the Live Report event for Export Stopped
        this.adaptable.ReportService.PublishLiveLiveDataChangedEvent('Glue42', 'LiveDataStopped', currentLiveReport);
    };
    Glue42ApiImpl.prototype.showGlue42Popup = function () {
        this.adaptable.api.internalApi.showPopupScreen(StrategyConstants.Glue42StrategyId, ScreenPopups.Glue42Popup);
    };
    return Glue42ApiImpl;
}(ApiBase_1.ApiBase));
exports.Glue42ApiImpl = Glue42ApiImpl;
