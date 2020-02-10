"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var AdaptableStore_1 = require("../../Redux/Store/AdaptableStore");
var ApiBase_1 = require("./ApiBase");
var Helper_1 = require("../../Utilities/Helpers/Helper");
var ConfigApiImpl = /** @class */ (function (_super) {
    tslib_1.__extends(ConfigApiImpl, _super);
    function ConfigApiImpl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ConfigApiImpl.prototype.configInit = function () {
        this.dispatchAction(AdaptableStore_1.InitState());
    };
    ConfigApiImpl.prototype.configClear = function () {
        //this doesnt work but should!
        this.dispatchAction(AdaptableStore_1.ResetUserData());
    };
    ConfigApiImpl.prototype.configCopyAllStateToClipboard = function () {
        var state = this.getAdaptableState();
        var stringifiedState = JSON.stringify(state);
        Helper_1.default.copyToClipboard(stringifiedState);
    };
    ConfigApiImpl.prototype.configCopyUserStateToClipboard = function () {
        // This doesnt currently work...
        var state = this.getAdaptableState();
        //  let userState = state
        var stringifiedState = JSON.stringify(state);
        Helper_1.default.copyToClipboard(stringifiedState);
    };
    ConfigApiImpl.prototype.configDeleteLocalStorage = function () {
        //   a horrible rough and ready method which clears local storage and refreshes but is not nice.
        localStorage.removeItem(this.adaptable.adaptableOptions.adaptableId);
        window.location.reload();
    };
    ConfigApiImpl.prototype.configGetAllState = function () {
        return this.getAdaptableState();
    };
    // im sure we can do this better
    ConfigApiImpl.prototype.getUserStateKeys = function () {
        return [
            'AdvancedSearch',
            'Alert',
            'BulkUpdate',
            'CalculatedColumn',
            'Calendar',
            'CellValidation',
            'Chart',
            'ColumnFilter',
            'ConditionalStyle',
            'CustomSort',
            'Dashboard',
            'DataSource',
            'Export',
            'FlashingCell',
            'FormatColumn',
            'Layout',
            'PlusMinus',
            'IPushPull',
            'Glue42',
            'QuickSearch',
            'SelectedCells',
            'Shortcut',
            'SmartEdit',
            'SparklineColumn',
            'Theme',
            'UserFilter',
        ];
    };
    ConfigApiImpl.prototype.configGetAllUserState = function () {
        var userStateKeys = this.getUserStateKeys();
        var allState = this.configGetAllState();
        return userStateKeys.map(function (k) { return allState[k]; });
    };
    ConfigApiImpl.prototype.configloadUserState = function (state) {
        var userStateKeys = this.getUserStateKeys();
        var userState = Object.keys(state).reduce(function (xs, x) {
            var _a;
            return (userStateKeys.indexOf(x) !== -1 ? tslib_1.__assign(tslib_1.__assign({}, xs), (_a = {}, _a[x] = state[x], _a)) : xs);
        }, {});
        this.dispatchAction(AdaptableStore_1.LoadState(userState));
    };
    ConfigApiImpl.prototype.configGetUserStateByStateKey = function (stateKey, returnJson) {
        if (returnJson === void 0) { returnJson = false; }
        switch (stateKey) {
            case 'ActionColumn':
                return returnJson
                    ? JSON.stringify(this.getAdaptableState().ActionColumn)
                    : this.getAdaptableState().ActionColumn;
            case 'AdvancedSearch':
                return returnJson
                    ? JSON.stringify(this.getAdaptableState().AdvancedSearch)
                    : this.getAdaptableState().AdvancedSearch;
            case 'Alert':
                return returnJson
                    ? JSON.stringify(this.getAdaptableState().Alert)
                    : this.getAdaptableState().Alert;
            case 'Application':
                return returnJson
                    ? JSON.stringify(this.getAdaptableState().Application)
                    : this.getAdaptableState().Application;
            case 'BulkUpdate':
                return returnJson
                    ? JSON.stringify(this.getAdaptableState().BulkUpdate)
                    : this.getAdaptableState().BulkUpdate;
            case 'CalculatedColumn':
                return returnJson
                    ? JSON.stringify(this.getAdaptableState().CalculatedColumn)
                    : this.getAdaptableState().CalculatedColumn;
            case 'Calendar':
                return returnJson
                    ? JSON.stringify(this.getAdaptableState().Calendar)
                    : this.getAdaptableState().Calendar;
            case 'CellValidation':
                return returnJson
                    ? JSON.stringify(this.getAdaptableState().CellValidation)
                    : this.getAdaptableState().CellValidation;
            case 'Chart':
                return returnJson
                    ? JSON.stringify(this.getAdaptableState().Chart)
                    : this.getAdaptableState().Chart;
            case 'ColumnFilter':
                return returnJson
                    ? JSON.stringify(this.getAdaptableState().ColumnFilter)
                    : this.getAdaptableState().ColumnFilter;
            case 'ConditionalStyle':
                return returnJson
                    ? JSON.stringify(this.getAdaptableState().ConditionalStyle)
                    : this.getAdaptableState().ConditionalStyle;
            case 'CustomSort':
                return returnJson
                    ? JSON.stringify(this.getAdaptableState().CustomSort)
                    : this.getAdaptableState().CustomSort;
            case 'Dashboard':
                return returnJson
                    ? JSON.stringify(this.getAdaptableState().Dashboard)
                    : this.getAdaptableState().Dashboard;
            case 'DataSource':
                return returnJson
                    ? JSON.stringify(this.getAdaptableState().DataSource)
                    : this.getAdaptableState().DataSource;
            case 'Export':
                return returnJson
                    ? JSON.stringify(this.getAdaptableState().Export)
                    : this.getAdaptableState().Export;
            case 'FlashingCell':
                return returnJson
                    ? JSON.stringify(this.getAdaptableState().FlashingCell)
                    : this.getAdaptableState().FlashingCell;
            case 'FormatColumn':
                return returnJson
                    ? JSON.stringify(this.getAdaptableState().FormatColumn)
                    : this.getAdaptableState().FormatColumn;
            case 'Layout':
                return returnJson
                    ? JSON.stringify(this.getAdaptableState().Layout)
                    : this.getAdaptableState().Layout;
            case 'IPushPull':
                return returnJson
                    ? JSON.stringify(this.getAdaptableState().IPushPull)
                    : this.getAdaptableState().IPushPull;
            case 'Glue42':
                return returnJson
                    ? JSON.stringify(this.getAdaptableState().Glue42)
                    : this.getAdaptableState().Glue42;
            case 'PlusMinus':
                return returnJson
                    ? JSON.stringify(this.getAdaptableState().PlusMinus)
                    : this.getAdaptableState().PlusMinus;
            case 'QuickSearch':
                return returnJson
                    ? JSON.stringify(this.getAdaptableState().QuickSearch)
                    : this.getAdaptableState().QuickSearch;
            case 'CellSummary':
                return returnJson
                    ? JSON.stringify(this.getAdaptableState().SelectedCells)
                    : this.getAdaptableState().CellSummary;
            case 'Shortcut':
                return returnJson
                    ? JSON.stringify(this.getAdaptableState().Shortcut)
                    : this.getAdaptableState().Shortcut;
            case 'SmartEdit':
                return returnJson
                    ? JSON.stringify(this.getAdaptableState().SmartEdit)
                    : this.getAdaptableState().SmartEdit;
            case 'SparklineColumn':
                return returnJson
                    ? JSON.stringify(this.getAdaptableState().SparklineColumn)
                    : this.getAdaptableState().SparklineColumn;
            case 'Theme':
                return returnJson
                    ? JSON.stringify(this.getAdaptableState().Theme)
                    : this.getAdaptableState().Theme;
            case 'UpdatedRow':
                return returnJson
                    ? JSON.stringify(this.getAdaptableState().UpdatedRow)
                    : this.getAdaptableState().UpdatedRow;
            case 'UserFilter':
                return returnJson
                    ? JSON.stringify(this.getAdaptableState().UserFilter)
                    : this.getAdaptableState().UserFilter;
        }
    };
    ConfigApiImpl.prototype.configGetActionColumnState = function (returnJson) {
        if (returnJson === void 0) { returnJson = false; }
        return this.configGetUserStateByStateKey('ActionColumn', returnJson);
    };
    ConfigApiImpl.prototype.configGetAdvancedSearchState = function (returnJson) {
        if (returnJson === void 0) { returnJson = false; }
        return this.configGetUserStateByStateKey('AdvancedSearch', returnJson);
    };
    ConfigApiImpl.prototype.configGetAlertState = function (returnJson) {
        if (returnJson === void 0) { returnJson = false; }
        return this.configGetUserStateByStateKey('Alert', returnJson);
    };
    ConfigApiImpl.prototype.configGetApplicationState = function (returnJson) {
        if (returnJson === void 0) { returnJson = false; }
        return this.configGetUserStateByStateKey('Application', returnJson);
    };
    ConfigApiImpl.prototype.configGetBulkUpdateState = function (returnJson) {
        if (returnJson === void 0) { returnJson = false; }
        return this.configGetUserStateByStateKey('BulkUpdate', returnJson);
    };
    ConfigApiImpl.prototype.configGetCalculatedColumnState = function (returnJson) {
        if (returnJson === void 0) { returnJson = false; }
        return this.configGetUserStateByStateKey('CalculatedColumn', returnJson);
    };
    ConfigApiImpl.prototype.configGetCalendarState = function (returnJson) {
        if (returnJson === void 0) { returnJson = false; }
        return this.configGetUserStateByStateKey('Calendar', returnJson);
    };
    ConfigApiImpl.prototype.configGetCellSummaryState = function (returnJson) {
        if (returnJson === void 0) { returnJson = false; }
        return this.configGetUserStateByStateKey('CellSummary', returnJson);
    };
    ConfigApiImpl.prototype.configGetCellValidationState = function (returnJson) {
        if (returnJson === void 0) { returnJson = false; }
        return this.configGetUserStateByStateKey('CellValidation', returnJson);
    };
    ConfigApiImpl.prototype.configGetChartState = function (returnJson) {
        if (returnJson === void 0) { returnJson = false; }
        return this.configGetUserStateByStateKey('Chart', returnJson);
    };
    ConfigApiImpl.prototype.configGetColumnFilterState = function (returnJson) {
        if (returnJson === void 0) { returnJson = false; }
        return this.configGetUserStateByStateKey('ColumnFilter', returnJson);
    };
    ConfigApiImpl.prototype.configGetColumnCategoryState = function (returnJson) {
        return this.configGetUserStateByStateKey('ColumnCategory', returnJson);
    };
    ConfigApiImpl.prototype.configGetConditionalStyleState = function (returnJson) {
        if (returnJson === void 0) { returnJson = false; }
        return this.configGetUserStateByStateKey('ConditionalStyle', returnJson);
    };
    ConfigApiImpl.prototype.configGetCustomSortState = function (returnJson) {
        if (returnJson === void 0) { returnJson = false; }
        return this.configGetUserStateByStateKey('CustomSort', returnJson);
    };
    ConfigApiImpl.prototype.configGetDashboardState = function (returnJson) {
        if (returnJson === void 0) { returnJson = false; }
        return this.configGetUserStateByStateKey('Dashboard', returnJson);
    };
    ConfigApiImpl.prototype.configGetDataSourceState = function (returnJson) {
        if (returnJson === void 0) { returnJson = false; }
        return this.configGetUserStateByStateKey('DataSource', returnJson);
    };
    ConfigApiImpl.prototype.configGetEntitlementState = function (returnJson) {
        return this.configGetUserStateByStateKey('Entitlement', returnJson);
    };
    ConfigApiImpl.prototype.configGetExportState = function (returnJson) {
        if (returnJson === void 0) { returnJson = false; }
        return this.configGetUserStateByStateKey('Export', returnJson);
    };
    ConfigApiImpl.prototype.configGetFlashingCellState = function (returnJson) {
        if (returnJson === void 0) { returnJson = false; }
        return this.configGetUserStateByStateKey('FlashingCell', returnJson);
    };
    ConfigApiImpl.prototype.configGetFreeTextColumnState = function (returnJson) {
        if (returnJson === void 0) { returnJson = false; }
        return this.configGetUserStateByStateKey('FreeTextColumn', returnJson);
    };
    ConfigApiImpl.prototype.configGetFormatColumnState = function (returnJson) {
        if (returnJson === void 0) { returnJson = false; }
        return this.configGetUserStateByStateKey('FormatColumn', returnJson);
    };
    ConfigApiImpl.prototype.configGetLayoutState = function (returnJson) {
        if (returnJson === void 0) { returnJson = false; }
        return this.configGetUserStateByStateKey('Layout', returnJson);
    };
    ConfigApiImpl.prototype.configGetNamedFilterState = function (returnJson) {
        if (returnJson === void 0) { returnJson = false; }
        return this.configGetUserStateByStateKey('NamedFilter', returnJson);
    };
    ConfigApiImpl.prototype.configGetIPushPullState = function (returnJson) {
        if (returnJson === void 0) { returnJson = false; }
        return this.configGetUserStateByStateKey('IPushPull', returnJson);
    };
    ConfigApiImpl.prototype.configGetGlue42State = function (returnJson) {
        if (returnJson === void 0) { returnJson = false; }
        return this.configGetUserStateByStateKey('Glue42', returnJson);
    };
    ConfigApiImpl.prototype.configGetPercentBarState = function (returnJson) {
        if (returnJson === void 0) { returnJson = false; }
        return this.configGetUserStateByStateKey('PercentBar', returnJson);
    };
    ConfigApiImpl.prototype.configGetPlusMinusState = function (returnJson) {
        if (returnJson === void 0) { returnJson = false; }
        return this.configGetUserStateByStateKey('PlusMinus', returnJson);
    };
    ConfigApiImpl.prototype.configGetQuickSearchState = function (returnJson) {
        if (returnJson === void 0) { returnJson = false; }
        return this.configGetUserStateByStateKey('QuickSearch', returnJson);
    };
    ConfigApiImpl.prototype.configGetReminderState = function (returnJson) {
        if (returnJson === void 0) { returnJson = false; }
        return this.configGetUserStateByStateKey('Reminder', returnJson);
    };
    ConfigApiImpl.prototype.configGetShortcutState = function (returnJson) {
        if (returnJson === void 0) { returnJson = false; }
        return this.configGetUserStateByStateKey('Shortcut', returnJson);
    };
    ConfigApiImpl.prototype.configGetSmartEditState = function (returnJson) {
        if (returnJson === void 0) { returnJson = false; }
        return this.configGetUserStateByStateKey('SmartEdit', returnJson);
    };
    ConfigApiImpl.prototype.configGetSparklineColumnState = function (returnJson) {
        if (returnJson === void 0) { returnJson = false; }
        return this.configGetUserStateByStateKey('SparklineColumn', returnJson);
    };
    ConfigApiImpl.prototype.configGetSystemFilterState = function (returnJson) {
        if (returnJson === void 0) { returnJson = false; }
        return this.configGetUserStateByStateKey('SystemFilter', returnJson);
    };
    ConfigApiImpl.prototype.configGetSystemStatusState = function (returnJson) {
        if (returnJson === void 0) { returnJson = false; }
        return this.configGetUserStateByStateKey('SystemStatus', returnJson);
    };
    ConfigApiImpl.prototype.configGetThemeState = function (returnJson) {
        if (returnJson === void 0) { returnJson = false; }
        return this.configGetUserStateByStateKey('Theme', returnJson);
    };
    ConfigApiImpl.prototype.configGetToolPanelState = function (returnJson) {
        if (returnJson === void 0) { returnJson = false; }
        return this.configGetUserStateByStateKey('ToolPanel', returnJson);
    };
    ConfigApiImpl.prototype.configGetUpdatedRowState = function (returnJson) {
        if (returnJson === void 0) { returnJson = false; }
        return this.configGetUserStateByStateKey('UpdatedRow', returnJson);
    };
    ConfigApiImpl.prototype.configGetUserFilterState = function (returnJson) {
        if (returnJson === void 0) { returnJson = false; }
        return this.configGetUserStateByStateKey('UserFilter', returnJson);
    };
    ConfigApiImpl.prototype.configGetUserInterfaceState = function (returnJson) {
        if (returnJson === void 0) { returnJson = false; }
        return this.configGetUserStateByStateKey('UserInterface', returnJson);
    };
    return ConfigApiImpl;
}(ApiBase_1.ApiBase));
exports.ConfigApiImpl = ConfigApiImpl;
