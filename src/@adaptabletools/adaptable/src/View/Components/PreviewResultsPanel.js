"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var Enums_1 = require("../../PredefinedConfig/Common/Enums");
var AdaptablePopover_1 = require("../AdaptablePopover");
var ExpressionHelper_1 = require("../../Utilities/Helpers/ExpressionHelper");
var Table_1 = require("../../components/Table");
var check_1 = require("../../components/icons/check");
var UIHelper_1 = require("../UIHelper");
var Panel_1 = require("../../components/Panel");
var PreviewResultsPanel = /** @class */ (function (_super) {
    tslib_1.__extends(PreviewResultsPanel, _super);
    function PreviewResultsPanel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PreviewResultsPanel.prototype.render = function () {
        var _this = this;
        var previewHeader = this.props.ShowHeader && this.props.PreviewInfo != null
            ? 'Preview Results: ' +
                (this.props.SelectedColumn ? this.props.SelectedColumn.FriendlyName : '')
            : '';
        var successColor = UIHelper_1.default.getColorByMessageType(Enums_1.MessageType.Success);
        var previewItems = this.props.PreviewInfo.PreviewResults.map(function (previewResult, index) {
            return (React.createElement("tr", { key: index },
                React.createElement("td", null, previewResult.InitialValue),
                React.createElement("td", null, previewResult.ComputedValue),
                previewResult.ValidationRules.length > 0 ? (React.createElement("td", { style: { textAlign: 'center' } },
                    _this.props.PreviewInfo.PreviewValidationSummary.HasValidationPrevent == true && (React.createElement(AdaptablePopover_1.AdaptablePopover, { showEvent: "mouseenter", hideEvent: "mouseleave", headerText: 'Validation Error', bodyText: [
                            _this.getValidationErrorMessage(previewResult.ValidationRules, _this.props.Columns),
                        ], MessageType: Enums_1.MessageType.Error })),
                    _this.props.PreviewInfo.PreviewValidationSummary.HasValidationWarning == true && (React.createElement(AdaptablePopover_1.AdaptablePopover, { showEvent: "mouseenter", hideEvent: "mouseleave", headerText: 'Validation Error', bodyText: [
                            _this.getValidationErrorMessage(previewResult.ValidationRules, _this.props.Columns),
                        ], MessageType: Enums_1.MessageType.Warning })))) : (React.createElement("td", { style: { textAlign: 'center' } },
                    ' ',
                    React.createElement(check_1.default, { style: { color: successColor, fill: 'currentColor' } })))));
        });
        var header = (React.createElement("thead", null,
            React.createElement("tr", null,
                React.createElement("th", null, "Old"),
                React.createElement("th", null, "New"),
                React.createElement("th", { style: { width: '10%' } }, "Valid"))));
        return (React.createElement("div", { style: tslib_1.__assign({ flex: 1, overflow: 'auto' }, this.props.style) }, this.props.ShowPanel && (React.createElement(Panel_1.default, { header: previewHeader, bodyScroll: true },
            React.createElement(Table_1.default, { style: { width: '100%' } },
                header,
                React.createElement("tbody", { style: { minWidth: 500 } }, previewItems))))));
    };
    PreviewResultsPanel.prototype.getValidationErrorMessage = function (CellValidations, columns) {
        var e_1, _a;
        var returnString = [];
        try {
            for (var CellValidations_1 = tslib_1.__values(CellValidations), CellValidations_1_1 = CellValidations_1.next(); !CellValidations_1_1.done; CellValidations_1_1 = CellValidations_1.next()) {
                var CellValidation = CellValidations_1_1.value;
                var expressionDescription = ExpressionHelper_1.ExpressionHelper.IsNotNullOrEmptyExpression(CellValidation.Expression)
                    ? ' when ' +
                        ExpressionHelper_1.ExpressionHelper.ConvertExpressionToString(CellValidation.Expression, this.props.Columns)
                    : '';
                returnString.push(this.props.ValidationService.createCellValidationDescription(CellValidation, columns) +
                    expressionDescription);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (CellValidations_1_1 && !CellValidations_1_1.done && (_a = CellValidations_1.return)) _a.call(CellValidations_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return returnString.join('\n');
    };
    return PreviewResultsPanel;
}(React.Component));
exports.PreviewResultsPanel = PreviewResultsPanel;
