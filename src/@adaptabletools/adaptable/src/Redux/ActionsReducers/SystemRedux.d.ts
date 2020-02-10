import * as Redux from 'redux';
import { SystemState } from '../../PredefinedConfig/SystemState';
import { IPreviewInfo } from '../../Utilities/Interface/IPreview';
import { ChartVisibility } from '../../PredefinedConfig/Common/ChartEnums';
import { AdaptableAlert } from '../../Utilities/Interface/IMessage';
import { Expression, QueryRange } from '../../PredefinedConfig/Common/Expression';
import { AdaptableColumn } from '../../PredefinedConfig/Common/AdaptableColumn';
import { Report } from '../../PredefinedConfig/ExportState';
import { ChartData } from '../../PredefinedConfig/ChartState';
import { UpdatedRowInfo } from '../../Utilities/Services/Interface/IDataService';
import { BulkUpdateValidationResult } from '../../Strategy/Interface/IBulkUpdateStrategy';
export declare const SYSTEM_ALERT_ADD = "SYSTEM_ALERT_ADD";
export declare const SYSTEM_ALERT_DELETE = "SYSTEM_ALERT_DELETE";
export declare const SYSTEM_ALERT_DELETE_ALL = "SYSTEM_ALERT_DELETE_ALL";
export declare const SYSTEM_UPDATED_ROW_ADD = "SYSTEM_UPDATED_ROW_ADD";
export declare const SYSTEM_UPDATED_ROW_DELETE = "SYSTEM_UPDATED_ROW_DELETE";
export declare const SYSTEM_UPDATED_ROW_DELETE_ALL = "SYSTEM_UPDATED_ROW_DELETE_ALL";
export declare const REPORT_START_LIVE = "REPORT_START_LIVE";
export declare const REPORT_STOP_LIVE = "REPORT_STOP_LIVE";
export declare const REPORT_SET_ERROR_MESSAGE = "REPORT_SET_ERROR_MESSAGE";
export declare const SMARTEDIT_CHECK_CELL_SELECTION = "SMARTEDIT_CHECK_CELL_SELECTION";
export declare const SMARTEDIT_FETCH_PREVIEW = "SMARTEDIT_FETCH_PREVIEW";
export declare const SMARTEDIT_SET_VALID_SELECTION = "SMARTEDIT_SET_VALID_SELECTION";
export declare const SMARTEDIT_SET_PREVIEW = "SMARTEDIT_SET_PREVIEW";
export declare const BULK_UPDATE_CHECK_CELL_SELECTION = "BULK_UPDATE_CHECK_CELL_SELECTION";
export declare const BULK_UPDATE_SET_VALID_SELECTION = "BULK_UPDATE_SET_VALID_SELECTION";
export declare const BULK_UPDATE_SET_PREVIEW = "BULK_UPDATE_SET_PREVIEW";
export declare const CHART_SET_CHART_DATA = "CHART_SET_CHART_DATA";
export declare const CHART_SET_CHART_VISIBILITY = "CHART_SET_CHART_VISIBILITY";
export declare const CALCULATEDCOLUMN_SET_ERROR_MESSAGE = "CALCULATEDCOLUMN_SET_ERROR_MESSAGE";
export declare const CALCULATEDCOLUMN_IS_EXPRESSION_VALID = "CALCULATEDCOLUMN_IS_EXPRESSION_VALID";
export declare const QUICK_SEARCH_SET_RANGE = "QUICK_SEARCH_SET_RANGE";
export declare const QUICK_SEARCH_CLEAR_RANGE = "QUICK_SEARCH_CLEAR_RANGE";
export declare const QUICK_SEARCH_SET_VISIBLE_COLUMN_EXPRESSIONS = "QUICK_SEARCH_SET_VISIBLE_COLUMN_EXPRESSIONS";
export declare const QUICK_SEARCH_CLEAR_VISIBLE_COLUMN_EXPRESSIONS = "QUICK_SEARCH_CLEAR_VISIBLE_COLUMN_EXPRESSIONS";
export declare const SET_NEW_COLUMN_LIST_ORDER = "SET_NEW_COLUMN_LIST_ORDER";
export interface SystemAlertAddAction extends Redux.Action {
    Alert: AdaptableAlert;
    MaxAlerts: number;
}
export interface SystemAlertDeleteAction extends Redux.Action {
    Alert: AdaptableAlert;
}
export interface SystemAlertDeleteAllAction extends Redux.Action {
    Alerts: AdaptableAlert[];
}
export interface SystemUpdatedRowAddAction extends Redux.Action {
    updatedRowInfo: UpdatedRowInfo;
}
export interface SystemUpdatedRowDeleteAction extends Redux.Action {
    updatedRowInfo: UpdatedRowInfo;
}
export interface SystemUpdatedRowDeleteAllAction extends Redux.Action {
    updatedRowInfos: UpdatedRowInfo[];
}
export interface ReportStartLiveAction extends Redux.Action {
    Report: Report;
    ReportDestination: 'OpenfinExcel' | 'Glue42';
    PageName: string;
}
export interface ReportStopLiveAction extends Redux.Action {
    Report: Report;
    ReportDestination: 'OpenfinExcel' | 'Glue42';
}
export interface SmartEditCheckCellSelectionAction extends Redux.Action {
}
export interface SmartEditFetchPreviewAction extends Redux.Action {
}
export interface SmartEditSetPreviewAction extends Redux.Action {
    SmartEditPreviewInfo: IPreviewInfo;
}
export interface SmartEditSetValidSelectionAction extends Redux.Action {
    IsValidSmartEditSelection: boolean;
}
export interface BulkUpdateCheckCellSelectionAction extends Redux.Action {
}
export interface BulkUpdateSetPreviewAction extends Redux.Action {
    BulkUpdatePreviewInfo: IPreviewInfo;
}
export interface BulkUpdateSetValidSelectionAction extends Redux.Action {
    bulkUpdateValidationResult: BulkUpdateValidationResult;
}
export interface ChartSetChartDataAction extends Redux.Action {
    chartData: ChartData;
}
export interface ChartSetChartVisibiityAction extends Redux.Action {
    ChartVisibility: ChartVisibility;
}
export interface CalculatedColumnSetErrorMessageAction extends Redux.Action {
    ErrorMsg: string;
}
export interface CalculatedColumnIsExpressionValidAction extends Redux.Action {
    expression: string;
}
export interface ReportSetErrorMessageAction extends Redux.Action {
    ErrorMessage: string;
}
export interface QuickSearchSetRangeAction extends Redux.Action {
    QueryRange: QueryRange;
}
export interface QuickSearchClearRangeAction extends Redux.Action {
}
export interface QuickSearchSetVisibleColumnExpressionsAction extends Redux.Action {
    Expressions: Expression[];
}
export interface QuickSearchClearVisibleColumnExpressionsAction extends Redux.Action {
}
export interface SetNewColumnListOrderAction extends Redux.Action {
    VisibleColumnList: Array<AdaptableColumn>;
}
export declare const SystemAlertAdd: (Alert: AdaptableAlert, MaxAlerts: number) => SystemAlertAddAction;
export declare const SystemAlertDelete: (Alert: AdaptableAlert) => SystemAlertDeleteAction;
export declare const SystemAlertDeleteAll: (Alerts: AdaptableAlert[]) => SystemAlertDeleteAllAction;
export declare const SystemUpdatedRowAdd: (updatedRowInfo: UpdatedRowInfo) => SystemUpdatedRowAddAction;
export declare const SystemUpdatedRowDelete: (updatedRowInfo: UpdatedRowInfo) => SystemUpdatedRowDeleteAction;
export declare const SystemUpdatedRowDeleteAll: (updatedRowInfos: UpdatedRowInfo[]) => SystemUpdatedRowDeleteAllAction;
export declare const ReportStartLive: (Report: Report, PageName: string, ReportDestination: "Glue42" | "OpenfinExcel") => ReportStartLiveAction;
export declare const ReportStopLive: (Report: Report, ReportDestination: "Glue42" | "OpenfinExcel") => ReportStopLiveAction;
export declare const SmartEditCheckCellSelection: () => SmartEditCheckCellSelectionAction;
export declare const SmartEditSetValidSelection: (IsValidSmartEditSelection: boolean) => SmartEditSetValidSelectionAction;
export declare const SmartEditSetPreview: (SmartEditPreviewInfo: IPreviewInfo) => SmartEditSetPreviewAction;
export declare const BulkUpdateCheckCellSelection: () => BulkUpdateCheckCellSelectionAction;
export declare const BulkUpdateSetValidSelection: (bulkUpdateValidationResult: BulkUpdateValidationResult) => BulkUpdateSetValidSelectionAction;
export declare const BulkUpdateSetPreview: (BulkUpdatePreviewInfo: IPreviewInfo) => BulkUpdateSetPreviewAction;
export declare const ChartSetChartData: (chartData: ChartData) => ChartSetChartDataAction;
export declare const ChartSetChartVisibility: (ChartVisibility: ChartVisibility) => ChartSetChartVisibiityAction;
export declare const CalculatedColumnSetErrorMessage: (ErrorMsg: string) => CalculatedColumnSetErrorMessageAction;
export declare const CalculatedColumnIsExpressionValid: (expression: string) => CalculatedColumnIsExpressionValidAction;
export declare const ReportSetErrorMessage: (ErrorMessage: string) => ReportSetErrorMessageAction;
export declare const QuickSearchSetRange: (QueryRange: QueryRange) => QuickSearchSetRangeAction;
export declare const QuickSearchClearRange: () => QuickSearchClearRangeAction;
export declare const QuickSearchSetVisibleColumnExpressions: (Expressions: Expression[]) => QuickSearchSetVisibleColumnExpressionsAction;
export declare const QuickSearchClearVisibleColumnExpressions: () => QuickSearchClearVisibleColumnExpressionsAction;
export declare const SetNewColumnListOrder: (VisibleColumnList: AdaptableColumn[]) => SetNewColumnListOrderAction;
export declare const SystemReducer: Redux.Reducer<SystemState>;
