"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var LoggingHelper_1 = require("../Helpers/LoggingHelper");
var env_1 = require("../../env");
var StringExtensions_1 = require("../Extensions/StringExtensions");
var ServiceStatus;
(function (ServiceStatus) {
    ServiceStatus["Unknown"] = "Unknown";
    ServiceStatus["Disconnected"] = "Disconnected";
    ServiceStatus["Connected"] = "Connected";
    ServiceStatus["Error"] = "Error";
})(ServiceStatus = exports.ServiceStatus || (exports.ServiceStatus = {}));
var PushPullService = /** @class */ (function () {
    function PushPullService(adaptable) {
        var _this = this;
        this.adaptable = adaptable;
        this.ppInstance = null;
        this.pages = new Map();
        this.adaptable = adaptable;
        this.adaptable.api.eventApi.on('AdaptableReady', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var instance, userPushPullConfig, autoLogin, userName, password;
            return tslib_1.__generator(this, function (_a) {
                // turn off and clear everything
                this.adaptable.api.iPushPullApi.clearIPushPullInternalState();
                this.adaptable.api.iPushPullApi.setIPushPullAvailableOff();
                if (!this.ppInstance) {
                    instance = this.adaptable.api.iPushPullApi.getIPushPullInstance();
                    if (instance) {
                        userPushPullConfig = instance.config;
                        instance.config.set({
                            api_url: userPushPullConfig.api_url || 'https://www.ipushpull.com/api/1.0',
                            ws_url: userPushPullConfig.ws_url || 'https://www.ipushpull.com',
                            web_url: userPushPullConfig.web_url || 'https://www.ipushpull.com',
                            docs_url: userPushPullConfig.docs_url || 'https://docs.ipushpull.com',
                            storage_prefix: userPushPullConfig.storage_prefix || 'ipp_local',
                            api_key: userPushPullConfig.api_key || this.getApiKey(),
                            api_secret: userPushPullConfig.api_secret || this.getApiSecret(),
                            transport: userPushPullConfig.transport || 'polling',
                            hsts: false,
                        });
                        this.ppInstance = instance;
                        // set that it is available
                        this.adaptable.api.iPushPullApi.setIPushPullAvailableOn();
                        autoLogin = this.adaptable.api.iPushPullApi.getAutoLogin();
                        if (autoLogin) {
                            userName = this.adaptable.api.iPushPullApi.getIPushPullUsername();
                            password = this.adaptable.api.iPushPullApi.getIPushPullPassword();
                            if (StringExtensions_1.default.IsNotNullOrEmpty(userName) &&
                                StringExtensions_1.default.IsNotNullOrEmpty(password)) {
                                try {
                                    // slightly circular but it means tht we do the logic in one go..
                                    this.adaptable.api.iPushPullApi.loginToIPushPull(userName, password);
                                }
                                catch (err) {
                                    // set that it is not running (but still available)
                                    this.adaptable.api.iPushPullApi.setIPushPullRunningOff();
                                }
                            }
                        }
                    }
                }
                return [2 /*return*/];
            });
        }); });
    }
    PushPullService.prototype.getIPushPullStatus = function () {
        if (!this.ppInstance) {
            return ServiceStatus.Error;
        }
        return this.ppInstance.__status;
    };
    // Logs in to ipushpull
    PushPullService.prototype.login = function (login, password) {
        var _this = this;
        if (!this.ppInstance) {
            return Promise.reject('No ipushpull instance found!');
        }
        return this.ppInstance.auth
            .login(login, password)
            .then(function (result) {
            _this.ppInstance.__status = ServiceStatus.Connected;
            LoggingHelper_1.default.LogAdaptableSuccess('Logged in to ipushpull');
            return result;
        })
            .catch(function (err) {
            _this.ppInstance.__status = ServiceStatus.Error;
            _this.adaptable.api.iPushPullApi.setIPushPullLoginErrorMessage(err.data ? err.data.error_description || err.message : err.message);
            // prefer a more descriptive error, which IPP generally provides
            throw err.data ? err.data.error_description || err.message : err.message;
        });
    };
    // Retrieves domain pages from ipushpull
    PushPullService.prototype.getDomainPages = function () {
        if (!this.ppInstance) {
            return Promise.reject('No ipushpull instance found!');
        }
        return this.ppInstance.api
            .getDomainsAndPages(this.ppInstance.config.api_key)
            .then(function (response) {
            LoggingHelper_1.default.LogAdaptableSuccess('Retrieved ipushpull Folder/Page info');
            return response.data.domains.map(function (domain) { return ({
                Name: domain.name,
                FolderId: domain.id,
                Pages: domain.current_user_domain_page_access.pages
                    .filter(function (page) { return page.special_page_type == 0 && page.write_access; })
                    .map(function (page) { return page.name; }),
            }); });
        })
            .catch(function (error) {
            LoggingHelper_1.default.LogAdaptableError("Couldn't get Domain/Pages from ipushpull : ", error);
            throw error.message;
        });
    };
    PushPullService.prototype.loadPage = function (folderIPP, pageIPP) {
        var _this = this;
        if (!this.ppInstance) {
            return Promise.reject('No ipushpull instance found!');
        }
        return new Promise(function (resolve, reject) {
            var page = new _this.ppInstance.Page(pageIPP, folderIPP);
            page.on(page.EVENT_NEW_CONTENT, function () {
                LoggingHelper_1.default.LogAdaptableInfo("Page Ready : " + pageIPP);
                _this.pages.set(pageIPP, page);
                resolve(page);
                // we return true so it removes the listener for new content.
                // IPP should add that line to their wiki
                return true;
            });
        });
    };
    PushPullService.prototype.unloadPage = function (page) {
        var pageIPP = this.pages.get(page);
        if (pageIPP) {
            pageIPP.destroy();
            this.pages.delete(page);
            LoggingHelper_1.default.LogAdaptableInfo("Page Unloaded : " + page);
        }
    };
    PushPullService.prototype.addNewPage = function (folderId, page) {
        var _this = this;
        if (!this.ppInstance) {
            return Promise.reject('No ipushpull instance found!');
        }
        this.ppInstance.Page.create(folderId, page)
            .then(function (createdPage) {
            var message = page + "' successfully created.";
            _this.adaptable.api.alertApi.showAlertSuccess('ipushpull Page', message);
            _this.adaptable.api.internalApi.hidePopupScreen();
            _this.adaptable.api.iPushPullApi.retrieveIPushPullDomainsFromIPushPull();
        })
            .catch(function (err) {
            LoggingHelper_1.default.LogAdaptableError("Couldn't create Page: '" + page + "'. Reason: " + err);
        });
    };
    PushPullService.prototype.pushData = function (page, data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var newData = [];
            var style = data && data.length > 1
                ? _this.adaptable.getCurrentIPPStyle()
                : _this.adaptable.getDefaultIPPStyle();
            newData = data.map(function (row, i) {
                return row.map(function (cell, y) {
                    var col = i == 0
                        ? style.Header.Columns.find(function (x) { return x.columnFriendlyName == data[0][y]; })
                        : style.Row.Columns.find(function (x) { return x.columnFriendlyName == data[0][y]; });
                    var styleIPP;
                    if (i == 0) {
                        styleIPP = {
                            'background-color': style.Header.headerBackColor,
                            bbc: '000000',
                            bbs: 'none',
                            bbw: 'none',
                            lbc: '000000',
                            lbs: 'none',
                            lbw: 'none',
                            rbc: '000000',
                            rbs: 'none',
                            rbw: 'none',
                            tbc: '000000',
                            tbs: 'none',
                            tbw: 'none',
                            color: style.Header.headerColor,
                            'font-family': style.Header.headerFontFamily,
                            'font-size': style.Header.headerFontSize,
                            'font-style': style.Header.headerFontStyle,
                            'font-weight': style.Header.headerFontWeight,
                            height: String(style.Header.height / 3) + "px",
                            'text-align': col.textAlign,
                            'vertical-align': 'middle',
                            'white-space': 'nowrap',
                            width: String(col.width) + "px",
                            'text-wrap': 'normal',
                            'word-wrap': 'normal',
                        };
                    }
                    else if (i == 1) {
                        styleIPP = {
                            'background-color': i % 2 ? style.Row.backColor : style.Row.altBackColor,
                            color: style.Row.color,
                            'font-family': style.Row.fontFamily,
                            'font-size': style.Row.fontSize,
                            'font-style': style.Row.fontStyle,
                            'font-weight': style.Row.fontWeight,
                            'text-align': col.textAlign,
                        };
                    }
                    else {
                        styleIPP = {
                            'background-color': i % 2 ? style.Row.backColor : style.Row.altBackColor,
                        };
                    }
                    return {
                        value: cell,
                        formatted_value: cell,
                        style: styleIPP,
                    };
                });
            });
            var pageIPP = _this.pages.get(page);
            pageIPP.Content.canDoDelta = false;
            pageIPP.Content.update(newData, true);
            pageIPP.push().then(function () {
                LoggingHelper_1.default.LogAdaptableSuccess("Data pushed for ipushpull page : " + page);
                resolve();
            }, function (err) {
                LoggingHelper_1.default.LogAdaptableInfo("Error pushing data for ipushpull page : " + page);
                reject();
            });
        });
    };
    PushPullService.prototype.getApiKey = function () {
        var key = env_1.default.IPUSHPULL_API_KEY; // need to make sure that is always there
        return key;
    };
    PushPullService.prototype.getApiSecret = function () {
        var secret = env_1.default.IPUSHPULL_API_SECRET; // need to make sure that is always there
        return secret;
    };
    return PushPullService;
}());
exports.PushPullService = PushPullService;
