"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var EntityListActionButtons_1 = require("../Components/Buttons/EntityListActionButtons");
var Enums_1 = require("../../PredefinedConfig/Common/Enums");
var AdaptableObjectRow_1 = require("../Components/AdaptableObjectRow");
var EntityRowItem_1 = require("../Components/EntityRowItem");
var icons_1 = require("../../components/icons");
var DropdownButton_1 = require("../../components/DropdownButton");
var ExportIcon = icons_1.default.export;
var ReportEntityRow = /** @class */ (function (_super) {
    tslib_1.__extends(ReportEntityRow, _super);
    function ReportEntityRow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ReportEntityRow.prototype.render = function () {
        var _this = this;
        var report = this.props.AdaptableObject;
        var csvMenuItem = {
            onClick: function () { return _this.props.onExport(Enums_1.ExportDestination.CSV); },
            label: 'CSV',
        };
        var jsonMenuItem = {
            onClick: function () { return _this.props.onExport(Enums_1.ExportDestination.JSON); },
            label: 'JSON',
        };
        var clipboardMenuItem = {
            onClick: function () { return _this.props.onExport(Enums_1.ExportDestination.Clipboard); },
            label: 'Clipboard',
        };
        var openfinExcelMenuItem = this.props.LiveReports.find(function (x) { return x.Report.Uuid == report.Uuid; })
            ? {
                onClick: function () { return _this.props.onReportStopLive(Enums_1.ExportDestination.OpenfinExcel); },
                label: 'Stop Live Openfin Excel',
            }
            : {
                onClick: function () { return _this.props.onExport(Enums_1.ExportDestination.OpenfinExcel); },
                label: 'Start Live Openfin Excel',
            };
        var glue42MenuItem = {
            onClick: function () { return _this.props.onExport(Enums_1.ExportDestination.Glue42); },
            label: 'Export to Excel (via Glue42)',
        };
        var isSystemReport = this.props.ReportService.IsSystemReport(report);
        var colItems = [].concat(this.props.colItems);
        colItems[0].Content = React.createElement(EntityRowItem_1.EntityRowItem, { Content: report.Name });
        colItems[1].Content = (React.createElement(EntityRowItem_1.EntityRowItem, { Content: this.props.ReportService.GetReportColumnsDescription(report, this.props.Columns) }));
        colItems[2].Content = (React.createElement(EntityRowItem_1.EntityRowItem, { Content: this.props.ReportService.GetReportExpressionDescription(report, this.props.Columns) }));
        var exportItems = [
            csvMenuItem,
            clipboardMenuItem,
            jsonMenuItem,
            this.props.ReportService.IsReportDestinationActive(Enums_1.ExportDestination.OpenfinExcel) &&
                openfinExcelMenuItem,
            this.props.ReportService.IsReportDestinationActive(Enums_1.ExportDestination.Glue42) &&
                glue42MenuItem,
        ].filter(function (x) { return !!x; });
        var exportButton = (React.createElement(DropdownButton_1.default, { tooltip: "Export Report", variant: "text", items: exportItems },
            React.createElement(ExportIcon, null)));
        colItems[3].Content = exportButton;
        var buttons = (React.createElement(EntityListActionButtons_1.EntityListActionButtons, { ConfirmDeleteAction: this.props.onDeleteConfirm, editClick: function () { return _this.props.onEdit(report); }, overrideDisableEdit: isSystemReport, overrideDisableDelete: isSystemReport, overrideDisableShare: isSystemReport, showShare: this.props.TeamSharingActivated, shareClick: function () { return _this.props.onShare(); }, EntityType: "Report", AccessLevel: this.props.AccessLevel }));
        colItems[4].Content = buttons;
        return React.createElement(AdaptableObjectRow_1.AdaptableObjectRow, { colItems: colItems });
    };
    return ReportEntityRow;
}(React.Component));
exports.ReportEntityRow = ReportEntityRow;
