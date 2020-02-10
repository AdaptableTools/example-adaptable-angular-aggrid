"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var ColumnSelector_1 = require("@adaptabletools/adaptable/src/View/Components/Selectors/ColumnSelector");
var Enums_1 = require("@adaptabletools/adaptable/src/PredefinedConfig/Common/Enums");
var ArrayExtensions_1 = require("@adaptabletools/adaptable/src/Utilities/Extensions/ArrayExtensions");
var ChartEnums_1 = require("@adaptabletools/adaptable/src/PredefinedConfig/Common/ChartEnums");
var StringExtensions_1 = require("@adaptabletools/adaptable/src/Utilities/Extensions/StringExtensions");
var ColumnHelper_1 = require("@adaptabletools/adaptable/src/Utilities/Helpers/ColumnHelper");
var rebass_1 = require("rebass");
var WizardPanel_1 = require("@adaptabletools/adaptable/src/components/WizardPanel");
var HelpBlock_1 = require("@adaptabletools/adaptable/src/components/HelpBlock");
var Radio_1 = require("@adaptabletools/adaptable/src/components/Radio");
var PieChartSecondaryColumnWizard = /** @class */ (function (_super) {
    tslib_1.__extends(PieChartSecondaryColumnWizard, _super);
    function PieChartSecondaryColumnWizard(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            SecondaryColumnId: props.Data.SecondaryColumnId,
            SecondaryColumnOperation: props.Data.SecondaryColumnOperation,
        };
        return _this;
    }
    PieChartSecondaryColumnWizard.prototype.render = function () {
        var _this = this;
        var secondaryColumnDataType = StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.state.SecondaryColumnId)
            ? ColumnHelper_1.ColumnHelper.getColumnDataTypeFromColumnId(this.state.SecondaryColumnId, this.props.Columns)
            : 'Unknown';
        return (React.createElement(WizardPanel_1.default, null,
            React.createElement(rebass_1.Flex, { paddingLeft: 2, marginTop: 3, flexDirection: "row", alignItems: "center" },
                React.createElement(rebass_1.Text, { style: { flex: 2 } }, "Secondary Column (optional): "),
                React.createElement(rebass_1.Flex, { flex: 7 },
                    React.createElement(ColumnSelector_1.ColumnSelector, { SelectedColumnIds: [this.state.SecondaryColumnId], ColumnList: this.props.Columns, onColumnChange: function (columns) { return _this.onSecondaryColumnChanged(columns); }, SelectionMode: Enums_1.SelectionMode.Single }))),
            StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.state.SecondaryColumnId) &&
                secondaryColumnDataType == Enums_1.DataType.Number && (React.createElement(rebass_1.Flex, { marginTop: 3, flexDirection: "column" },
                React.createElement(HelpBlock_1.default, null, "Choose whether to show a count for these values or to sum them"),
                React.createElement(rebass_1.Flex, { alignItems: "center", flexDirection: "row", marginTop: 3, paddingLeft: 2 },
                    React.createElement(rebass_1.Text, { style: { flex: 2 } }, "Summary Type:"),
                    React.createElement(rebass_1.Flex, { flex: 7, flexDirection: "row", alignItems: "center" },
                        React.createElement(Radio_1.default, { marginRight: 3, value: "Count", checked: this.state.SecondaryColumnOperation == ChartEnums_1.SecondaryColumnOperation.Count, onChange: function (_, e) { return _this.onSecondaryColumnOperationChanged(e); } }, "Count"),
                        React.createElement(Radio_1.default, { value: "Sum", checked: this.state.SecondaryColumnOperation == ChartEnums_1.SecondaryColumnOperation.Sum, onChange: function (_, e) { return _this.onSecondaryColumnOperationChanged(e); } }, "Sum")))))));
    };
    PieChartSecondaryColumnWizard.prototype.onSecondaryColumnOperationChanged = function (event) {
        var _this = this;
        var e = event.target;
        this.setState({
            SecondaryColumnOperation: e.value,
        }, function () { return _this.props.UpdateGoBackState(); });
    };
    PieChartSecondaryColumnWizard.prototype.onSecondaryColumnChanged = function (columns) {
        var _this = this;
        var isColumn = ArrayExtensions_1.ArrayExtensions.IsNotNullOrEmpty(columns);
        var secondaryColumnOperation = ChartEnums_1.SecondaryColumnOperation.Count;
        if (isColumn) {
            if (columns[0].DataType == Enums_1.DataType.Number) {
                secondaryColumnOperation = ChartEnums_1.SecondaryColumnOperation.Sum;
            }
        }
        this.setState({
            SecondaryColumnId: isColumn ? columns[0].ColumnId : '',
            SecondaryColumnOperation: secondaryColumnOperation,
        }, function () { return _this.props.UpdateGoBackState(); });
    };
    PieChartSecondaryColumnWizard.prototype.canNext = function () {
        return true;
    };
    PieChartSecondaryColumnWizard.prototype.canBack = function () {
        return true;
    };
    PieChartSecondaryColumnWizard.prototype.Next = function () {
        this.props.Data.SecondaryColumnId = this.state.SecondaryColumnId;
        this.props.Data.SecondaryColumnOperation = this.state.SecondaryColumnOperation;
    };
    PieChartSecondaryColumnWizard.prototype.Back = function () {
        // todo
    };
    PieChartSecondaryColumnWizard.prototype.GetIndexStepIncrement = function () {
        return 1;
    };
    PieChartSecondaryColumnWizard.prototype.GetIndexStepDecrement = function () {
        return 1;
    };
    return PieChartSecondaryColumnWizard;
}(React.Component));
exports.PieChartSecondaryColumnWizard = PieChartSecondaryColumnWizard;
