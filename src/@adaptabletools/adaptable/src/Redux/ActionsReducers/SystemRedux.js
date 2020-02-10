"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var CalendarHelper_1 = require("../../Utilities/Helpers/CalendarHelper");
var GeneralConstants_1 = require("../../Utilities/Constants/GeneralConstants");
var ExpressionHelper_1 = require("../../Utilities/Helpers/ExpressionHelper");
var ObjectFactory_1 = require("../../Utilities/ObjectFactory");
/*
Bit of a mixed bag of actions but essentially its those that are related to Strategies but where we DONT want to persist state
This allows us to keep the other reducers pure in terms of everything persists
Not sure if its a good idea or not and perhaps we need 2 stores but I think its better than it was...
*/
// Alerts
exports.SYSTEM_ALERT_ADD = 'SYSTEM_ALERT_ADD';
exports.SYSTEM_ALERT_DELETE = 'SYSTEM_ALERT_DELETE';
exports.SYSTEM_ALERT_DELETE_ALL = 'SYSTEM_ALERT_DELETE_ALL';
// Updated Row
exports.SYSTEM_UPDATED_ROW_ADD = 'SYSTEM_UPDATED_ROW_ADD';
exports.SYSTEM_UPDATED_ROW_DELETE = 'SYSTEM_UPDATED_ROW_DELETE';
exports.SYSTEM_UPDATED_ROW_DELETE_ALL = 'SYSTEM_UPDATED_ROW_DELETE_ALL';
// Live Reports
exports.REPORT_START_LIVE = 'REPORT_START_LIVE';
exports.REPORT_STOP_LIVE = 'REPORT_STOP_LIVE';
exports.REPORT_SET_ERROR_MESSAGE = 'REPORT_SET_ERROR_MESSAGE';
// Smart Edit
exports.SMARTEDIT_CHECK_CELL_SELECTION = 'SMARTEDIT_CHECK_CELL_SELECTION';
exports.SMARTEDIT_FETCH_PREVIEW = 'SMARTEDIT_FETCH_PREVIEW';
exports.SMARTEDIT_SET_VALID_SELECTION = 'SMARTEDIT_SET_VALID_SELECTION';
exports.SMARTEDIT_SET_PREVIEW = 'SMARTEDIT_SET_PREVIEW';
// Bulk Update
exports.BULK_UPDATE_CHECK_CELL_SELECTION = 'BULK_UPDATE_CHECK_CELL_SELECTION';
exports.BULK_UPDATE_SET_VALID_SELECTION = 'BULK_UPDATE_SET_VALID_SELECTION';
exports.BULK_UPDATE_SET_PREVIEW = 'BULK_UPDATE_SET_PREVIEW';
// Chart Managemet
exports.CHART_SET_CHART_DATA = 'CHART_SET_CHART_DATA';
exports.CHART_SET_CHART_VISIBILITY = 'CHART_SET_CHART_VISIBILITY';
// Error Messages
exports.CALCULATEDCOLUMN_SET_ERROR_MESSAGE = 'CALCULATEDCOLUMN_SET_ERROR_MESSAGE';
exports.CALCULATEDCOLUMN_IS_EXPRESSION_VALID = 'CALCULATEDCOLUMN_IS_EXPRESSION_VALID';
// Quick Search
exports.QUICK_SEARCH_SET_RANGE = 'QUICK_SEARCH_SET_RANGE';
exports.QUICK_SEARCH_CLEAR_RANGE = 'QUICK_SEARCH_CLEAR_RANGE';
exports.QUICK_SEARCH_SET_VISIBLE_COLUMN_EXPRESSIONS = 'QUICK_SEARCH_SET_VISIBLE_COLUMN_EXPRESSIONS';
exports.QUICK_SEARCH_CLEAR_VISIBLE_COLUMN_EXPRESSIONS = 'QUICK_SEARCH_CLEAR_VISIBLE_COLUMN_EXPRESSIONS';
// Columns
exports.SET_NEW_COLUMN_LIST_ORDER = 'SET_NEW_COLUMN_LIST_ORDER';
exports.SystemAlertAdd = function (Alert, MaxAlerts) { return ({
    type: exports.SYSTEM_ALERT_ADD,
    Alert: Alert,
    MaxAlerts: MaxAlerts,
}); };
exports.SystemAlertDelete = function (Alert) { return ({
    type: exports.SYSTEM_ALERT_DELETE,
    Alert: Alert,
}); };
exports.SystemAlertDeleteAll = function (Alerts) { return ({
    type: exports.SYSTEM_ALERT_DELETE_ALL,
    Alerts: Alerts,
}); };
exports.SystemUpdatedRowAdd = function (updatedRowInfo) { return ({
    type: exports.SYSTEM_UPDATED_ROW_ADD,
    updatedRowInfo: updatedRowInfo,
}); };
exports.SystemUpdatedRowDelete = function (updatedRowInfo) { return ({
    type: exports.SYSTEM_UPDATED_ROW_DELETE,
    updatedRowInfo: updatedRowInfo,
}); };
exports.SystemUpdatedRowDeleteAll = function (updatedRowInfos) { return ({
    type: exports.SYSTEM_UPDATED_ROW_DELETE_ALL,
    updatedRowInfos: updatedRowInfos,
}); };
exports.ReportStartLive = function (Report, PageName, ReportDestination) { return ({
    type: exports.REPORT_START_LIVE,
    Report: Report,
    ReportDestination: ReportDestination,
    PageName: PageName,
}); };
exports.ReportStopLive = function (Report, ReportDestination) { return ({
    type: exports.REPORT_STOP_LIVE,
    Report: Report,
    ReportDestination: ReportDestination,
}); };
exports.SmartEditCheckCellSelection = function () { return ({
    type: exports.SMARTEDIT_CHECK_CELL_SELECTION,
}); };
exports.SmartEditSetValidSelection = function (IsValidSmartEditSelection) { return ({
    type: exports.SMARTEDIT_SET_VALID_SELECTION,
    IsValidSmartEditSelection: IsValidSmartEditSelection,
}); };
exports.SmartEditSetPreview = function (SmartEditPreviewInfo) { return ({
    type: exports.SMARTEDIT_SET_PREVIEW,
    SmartEditPreviewInfo: SmartEditPreviewInfo,
}); };
exports.BulkUpdateCheckCellSelection = function () { return ({
    type: exports.BULK_UPDATE_CHECK_CELL_SELECTION,
}); };
exports.BulkUpdateSetValidSelection = function (bulkUpdateValidationResult) { return ({
    type: exports.BULK_UPDATE_SET_VALID_SELECTION,
    bulkUpdateValidationResult: bulkUpdateValidationResult,
}); };
exports.BulkUpdateSetPreview = function (BulkUpdatePreviewInfo) { return ({
    type: exports.BULK_UPDATE_SET_PREVIEW,
    BulkUpdatePreviewInfo: BulkUpdatePreviewInfo,
}); };
exports.ChartSetChartData = function (chartData) { return ({
    type: exports.CHART_SET_CHART_DATA,
    chartData: chartData,
}); };
exports.ChartSetChartVisibility = function (ChartVisibility) { return ({
    type: exports.CHART_SET_CHART_VISIBILITY,
    ChartVisibility: ChartVisibility,
}); };
exports.CalculatedColumnSetErrorMessage = function (ErrorMsg) { return ({
    type: exports.CALCULATEDCOLUMN_SET_ERROR_MESSAGE,
    ErrorMsg: ErrorMsg,
}); };
exports.CalculatedColumnIsExpressionValid = function (expression) { return ({
    type: exports.CALCULATEDCOLUMN_IS_EXPRESSION_VALID,
    expression: expression,
}); };
exports.ReportSetErrorMessage = function (ErrorMessage) { return ({
    type: exports.REPORT_SET_ERROR_MESSAGE,
    ErrorMessage: ErrorMessage,
}); };
exports.QuickSearchSetRange = function (QueryRange) { return ({
    type: exports.QUICK_SEARCH_SET_RANGE,
    QueryRange: QueryRange,
}); };
exports.QuickSearchClearRange = function () { return ({
    type: exports.QUICK_SEARCH_CLEAR_RANGE,
}); };
exports.QuickSearchSetVisibleColumnExpressions = function (Expressions) { return ({
    type: exports.QUICK_SEARCH_SET_VISIBLE_COLUMN_EXPRESSIONS,
    Expressions: Expressions,
}); };
exports.QuickSearchClearVisibleColumnExpressions = function () { return ({
    type: exports.QUICK_SEARCH_CLEAR_VISIBLE_COLUMN_EXPRESSIONS,
}); };
exports.SetNewColumnListOrder = function (VisibleColumnList) { return ({
    type: exports.SET_NEW_COLUMN_LIST_ORDER,
    VisibleColumnList: VisibleColumnList,
}); };
var initialSystemState = {
    AdaptableAlerts: GeneralConstants_1.EMPTY_ARRAY,
    UpdatedRowInfos: GeneralConstants_1.EMPTY_ARRAY,
    AvailableCalendars: CalendarHelper_1.CalendarHelper.getSystemCalendars(),
    CurrentLiveReports: GeneralConstants_1.EMPTY_ARRAY,
    IsValidSmartEditSelection: false,
    SmartEditPreviewInfo: null,
    BulkUpdateValidationResult: { IsValid: false, Column: null },
    BulkUpdatePreviewInfo: null,
    ChartData: null,
    ChartVisibility: GeneralConstants_1.SYSTEM_DEFAULT_CHART_VISIBILITY,
    CalculatedColumnErrorMessage: GeneralConstants_1.EMPTY_STRING,
    SystemReports: ObjectFactory_1.ObjectFactory.CreateSystemReports(),
    ReportErrorMessage: GeneralConstants_1.EMPTY_STRING,
    QuickSearchRange: ExpressionHelper_1.ExpressionHelper.CreateEmptyRange(),
    QuickSearchVisibleColumnExpressions: GeneralConstants_1.EMPTY_ARRAY,
};
exports.SystemReducer = function (state, action) {
    if (state === void 0) { state = initialSystemState; }
    var alerts;
    switch (action.type) {
        case exports.SYSTEM_ALERT_ADD: {
            var actionTypedAdd = action;
            alerts = [].concat(state.AdaptableAlerts);
            if (alerts.length == actionTypedAdd.MaxAlerts) {
                // we have hit the maximum so remove first item (oldest)
                alerts.splice(0, 1);
            }
            alerts.push(actionTypedAdd.Alert);
            return Object.assign({}, state, { AdaptableAlerts: alerts });
        }
        case exports.SYSTEM_ALERT_DELETE: {
            var adaptableAlert_1 = action.Alert;
            return tslib_1.__assign(tslib_1.__assign({}, state), { AdaptableAlerts: state.AdaptableAlerts.filter(function (abObject) { return abObject.Uuid !== adaptableAlert_1.Uuid; }) });
        }
        case exports.SYSTEM_ALERT_DELETE_ALL: {
            return Object.assign({}, state, { AdaptableAlerts: [] });
        }
        case exports.SYSTEM_UPDATED_ROW_ADD: {
            var actionTypedAdd_1 = action;
            var updatedRowPrimaryKeyValues = [].concat(state.UpdatedRowInfos);
            var existingItem = updatedRowPrimaryKeyValues.find(function (ur) { return ur.primaryKeyValue == actionTypedAdd_1.updatedRowInfo.primaryKeyValue; });
            if (existingItem) {
                existingItem.changeDirection = actionTypedAdd_1.updatedRowInfo.changeDirection;
            }
            else {
                updatedRowPrimaryKeyValues.push(actionTypedAdd_1.updatedRowInfo);
            }
            return Object.assign({}, state, { UpdatedRowInfos: updatedRowPrimaryKeyValues });
        }
        case exports.SYSTEM_UPDATED_ROW_DELETE: {
            var primaryKeyValue_1 = action.updatedRowInfo
                .primaryKeyValue;
            var updatedRowPrimaryKeyValues = state.UpdatedRowInfos.filter(function (pkValue) { return pkValue.primaryKeyValue !== primaryKeyValue_1; });
            return tslib_1.__assign(tslib_1.__assign({}, state), { UpdatedRowInfos: updatedRowPrimaryKeyValues });
        }
        case exports.SYSTEM_UPDATED_ROW_DELETE_ALL: {
            return Object.assign({}, state, { UpdatedRowInfos: [] });
        }
        case exports.REPORT_START_LIVE: {
            var actionTyped = action;
            var currentLiveReports = [].concat(state.CurrentLiveReports);
            currentLiveReports.push({
                ReportDestination: actionTyped.ReportDestination,
                Report: actionTyped.Report,
                PageName: actionTyped.PageName,
            });
            return Object.assign({}, state, { CurrentLiveReports: currentLiveReports });
        }
        case exports.REPORT_STOP_LIVE: {
            var actionTyped_1 = action;
            var currentLiveReports = [].concat(state.CurrentLiveReports);
            var index = currentLiveReports.findIndex(function (x) { return x.Report == actionTyped_1.Report && x.ReportDestination == actionTyped_1.ReportDestination; });
            currentLiveReports.splice(index, 1);
            return Object.assign({}, state, { CurrentLiveReports: currentLiveReports });
        }
        case exports.SMARTEDIT_SET_VALID_SELECTION:
            return Object.assign({}, state, {
                IsValidSmartEditSelection: action
                    .IsValidSmartEditSelection,
            });
        case exports.SMARTEDIT_SET_PREVIEW:
            return Object.assign({}, state, {
                SmartEditPreviewInfo: action.SmartEditPreviewInfo,
            });
        case exports.BULK_UPDATE_SET_VALID_SELECTION:
            return Object.assign({}, state, {
                BulkUpdateValidationResult: action
                    .bulkUpdateValidationResult,
            });
        case exports.BULK_UPDATE_SET_PREVIEW:
            return Object.assign({}, state, {
                BulkUpdatePreviewInfo: action.BulkUpdatePreviewInfo,
            });
        // Chart Actions
        case exports.CHART_SET_CHART_DATA:
            return Object.assign({}, state, { ChartData: action.chartData });
        case exports.CHART_SET_CHART_VISIBILITY:
            return Object.assign({}, state, {
                ChartVisibility: action.ChartVisibility,
            });
        case exports.CALCULATEDCOLUMN_SET_ERROR_MESSAGE: {
            return Object.assign({}, state, {
                CalculatedColumnErrorMessage: action.ErrorMsg,
            });
        }
        case exports.REPORT_SET_ERROR_MESSAGE: {
            return Object.assign({}, state, {
                ReportErrorMessage: action.ErrorMessage,
            });
        }
        case exports.QUICK_SEARCH_SET_RANGE: {
            return Object.assign({}, state, {
                QuickSearchRange: action.QueryRange,
            });
        }
        case exports.QUICK_SEARCH_CLEAR_RANGE: {
            return Object.assign({}, state, { QuickSearchRange: ExpressionHelper_1.ExpressionHelper.CreateEmptyRange() });
        }
        case exports.QUICK_SEARCH_SET_VISIBLE_COLUMN_EXPRESSIONS: {
            return Object.assign({}, state, {
                QuickSearchVisibleColumnExpressions: action
                    .Expressions,
            });
        }
        case exports.QUICK_SEARCH_CLEAR_VISIBLE_COLUMN_EXPRESSIONS: {
            return Object.assign({}, state, { QuickSearchVisibleColumnExpressions: GeneralConstants_1.EMPTY_ARRAY });
        }
        default:
            return state;
    }
};
