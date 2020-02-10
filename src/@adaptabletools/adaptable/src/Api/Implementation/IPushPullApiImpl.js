"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ApiBase_1 = require("./ApiBase");
var StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
var ScreenPopups = require("../../Utilities/Constants/ScreenPopups");
var IPushPullRedux = require("../../Redux/ActionsReducers/IPushPullRedux");
var ArrayExtensions_1 = require("../../Utilities/Extensions/ArrayExtensions");
var Helper_1 = require("../../Utilities/Helpers/Helper");
var IPushPullApiImpl = /** @class */ (function (_super) {
    tslib_1.__extends(IPushPullApiImpl, _super);
    function IPushPullApiImpl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    IPushPullApiImpl.prototype.getIPushPullState = function () {
        return this.getAdaptableState().IPushPull;
    };
    IPushPullApiImpl.prototype.getIPushPullUsername = function () {
        return this.getIPushPullState().Username;
    };
    IPushPullApiImpl.prototype.getIPushPullPassword = function () {
        return this.getIPushPullState().Password;
    };
    IPushPullApiImpl.prototype.getAutoLogin = function () {
        return this.getIPushPullState().AutoLogin;
    };
    IPushPullApiImpl.prototype.getCurrentLiveIPushPullReport = function () {
        return this.getIPushPullState().CurrentLiveIPushPullReport;
    };
    IPushPullApiImpl.prototype.getIPushPullInstance = function () {
        var pushpullState = this.getIPushPullState();
        if (pushpullState != undefined) {
            return pushpullState.iPushPullInstance;
        }
        else {
            return pushpullState;
        }
    };
    IPushPullApiImpl.prototype.sendSnapshot = function (iPushPullReport) {
        if (this.checkItemExists(iPushPullReport, iPushPullReport.ReportName, 'IPushPull Report')) {
            this.dispatchAction(IPushPullRedux.IPushPullSendSnapshot(iPushPullReport));
        }
    };
    IPushPullApiImpl.prototype.startLiveData = function (iPushPullReport) {
        if (this.checkItemExists(iPushPullReport, iPushPullReport.ReportName, 'IPushPull Report')) {
            this.dispatchAction(IPushPullRedux.IPushPullLiveReportSet(iPushPullReport));
            this.adaptable.ReportService.PublishLiveLiveDataChangedEvent('iPushPull', 'LiveDataStarted', iPushPullReport);
        }
    };
    IPushPullApiImpl.prototype.stopLiveData = function () {
        var currentLiveReport = this.getCurrentLiveIPushPullReport();
        this.adaptable.PushPullService.unloadPage(currentLiveReport.Page);
        // clear the live report
        this.dispatchAction(IPushPullRedux.IPushPullLiveReportClear());
        // fire the Live Report event for Export Stopped
        this.adaptable.ReportService.PublishLiveLiveDataChangedEvent('iPushPull', 'LiveDataStopped', currentLiveReport);
    };
    IPushPullApiImpl.prototype.isIPushPullReportLive = function (iPushPullReport) {
        if (!iPushPullReport) {
            return false;
        }
        return (this.getIPushPullState().CurrentLiveIPushPullReport != null &&
            this.getIPushPullState().CurrentLiveIPushPullReport == iPushPullReport);
    };
    IPushPullApiImpl.prototype.isIPushPullAvailable = function () {
        return this.getIPushPullState().IsIPushPullAvailable;
    };
    IPushPullApiImpl.prototype.isIPushPullRunning = function () {
        return this.getIPushPullState().IsIPushPullRunning;
    };
    IPushPullApiImpl.prototype.getIPushPullDomains = function () {
        return this.getIPushPullState().IPushPullDomainsPages;
    };
    IPushPullApiImpl.prototype.getPagesForIPushPullDomain = function (folderName) {
        var returnArray = [];
        var iPushPullDomains = this.getIPushPullDomains();
        if (ArrayExtensions_1.default.IsNotNullOrEmpty(iPushPullDomains)) {
            var iPushPullDomain = iPushPullDomains.find(function (f) { return f.Name == folderName; });
            if (iPushPullDomain) {
                returnArray = iPushPullDomain.Pages;
            }
        }
        return returnArray;
    };
    IPushPullApiImpl.prototype.setIPushPullLoginErrorMessage = function (loginErrorMessage) {
        this.dispatchAction(IPushPullRedux.IPushPullSetLoginErrorMessage(loginErrorMessage));
    };
    IPushPullApiImpl.prototype.getFolderIdForName = function (folderName) {
        var iPushPullDomains = this.getIPushPullDomains();
        return iPushPullDomains.find(function (i) { return i.Name == folderName; }).FolderId;
    };
    IPushPullApiImpl.prototype.addNewIPushPullPage = function (folderName, pageName) {
        var folderId = this.getFolderIdForName(folderName);
        this.adaptable.PushPullService.addNewPage(folderId, pageName);
    };
    IPushPullApiImpl.prototype.getIPushPullThrottleTime = function () {
        return this.getIPushPullState().ThrottleTime;
    };
    IPushPullApiImpl.prototype.setIPushPullThrottleTime = function (throttleTime) {
        this.dispatchAction(IPushPullRedux.IPushPullSetThrottleTime(throttleTime));
    };
    IPushPullApiImpl.prototype.setIPushPullDomains = function (iPushPullDomains) {
        this.dispatchAction(IPushPullRedux.IPushPullSetDomainsPages(iPushPullDomains));
    };
    IPushPullApiImpl.prototype.clearIPushPullDomains = function () {
        this.dispatchAction(IPushPullRedux.IPushPullClearDomainsPages());
    };
    IPushPullApiImpl.prototype.getIPushPullSchedules = function () {
        return this.getIPushPullState().IPushPullSchedules;
    };
    IPushPullApiImpl.prototype.showIPushPullPopup = function () {
        this.adaptable.api.internalApi.showPopupScreen(StrategyConstants.IPushPullStrategyId, ScreenPopups.IPushPullLoginPopup);
    };
    IPushPullApiImpl.prototype.setIPushPullAvailableOn = function () {
        this.dispatchAction(IPushPullRedux.SetIPushPullAvailableOn());
    };
    IPushPullApiImpl.prototype.setIPushPullAvailableOff = function () {
        this.dispatchAction(IPushPullRedux.SetIPushPullAvailableOff());
    };
    IPushPullApiImpl.prototype.setIPushPullRunningOn = function () {
        this.dispatchAction(IPushPullRedux.SetIPushPullRunningOn());
        this.adaptable.ReportService.PublishLiveLiveDataChangedEvent('iPushPull', 'Connected');
    };
    IPushPullApiImpl.prototype.setIPushPullRunningOff = function () {
        this.dispatchAction(IPushPullRedux.SetIPushPullRunningOff());
        this.adaptable.ReportService.PublishLiveLiveDataChangedEvent('iPushPull', 'Disconnected');
    };
    IPushPullApiImpl.prototype.isIPushPullLiveDataRunning = function () {
        return Helper_1.default.objectExists(this.getIPushPullState().CurrentLiveIPushPullReport);
    };
    IPushPullApiImpl.prototype.loginToIPushPull = function (userName, password) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var domainpages;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.adaptable.PushPullService.login(userName, password)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.adaptable.PushPullService.getDomainPages()];
                    case 2:
                        domainpages = _a.sent();
                        this.setIPushPullDomains(domainpages);
                        this.setIPushPullRunningOn();
                        this.adaptable.api.internalApi.hidePopupScreen();
                        this.setIPushPullLoginErrorMessage('');
                        return [2 /*return*/];
                }
            });
        });
    };
    IPushPullApiImpl.prototype.retrieveIPushPullDomainsFromIPushPull = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var domainpages;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.clearIPushPullDomains();
                        return [4 /*yield*/, this.adaptable.PushPullService.getDomainPages()];
                    case 1:
                        domainpages = _a.sent();
                        this.setIPushPullDomains(domainpages);
                        return [2 /*return*/];
                }
            });
        });
    };
    IPushPullApiImpl.prototype.logoutFromIPushPull = function () {
        this.clearIPushPullInternalState();
        this.adaptable.api.internalApi.hidePopupScreen();
    };
    IPushPullApiImpl.prototype.clearIPushPullInternalState = function () {
        this.setIPushPullDomains([]);
        this.setIPushPullRunningOff();
        this.setIPushPullLoginErrorMessage('');
        this.dispatchAction(IPushPullRedux.IPushPullLiveReportClear());
    };
    return IPushPullApiImpl;
}(ApiBase_1.ApiBase));
exports.IPushPullApiImpl = IPushPullApiImpl;
