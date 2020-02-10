"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var ColumnSelector_1 = require("@adaptabletools/adaptable/src/View/Components/Selectors/ColumnSelector");
var Enums_1 = require("@adaptabletools/adaptable/src/PredefinedConfig/Common/Enums");
var ArrayExtensions_1 = require("@adaptabletools/adaptable/src/Utilities/Extensions/ArrayExtensions");
var StringExtensions_1 = require("@adaptabletools/adaptable/src/Utilities/Extensions/StringExtensions");
var WizardPanel_1 = require("@adaptabletools/adaptable/src/components/WizardPanel");
var rebass_1 = require("rebass");
var PieChartPrimaryColumnWizard = /** @class */ (function (_super) {
    tslib_1.__extends(PieChartPrimaryColumnWizard, _super);
    function PieChartPrimaryColumnWizard(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            PrimaryColumnId: props.Data.PrimaryColumnId,
        };
        return _this;
    }
    PieChartPrimaryColumnWizard.prototype.render = function () {
        var _this = this;
        return (React.createElement(WizardPanel_1.default, null,
            React.createElement(rebass_1.Flex, { paddingLeft: 2, marginTop: 3, flexDirection: "row", alignItems: "center" },
                React.createElement(rebass_1.Text, { marginRight: 2 }, "Primary Column:"),
                React.createElement(ColumnSelector_1.ColumnSelector, { SelectedColumnIds: [this.state.PrimaryColumnId], ColumnList: this.props.Columns, onColumnChange: function (columns) { return _this.onPrimaryColumnChanged(columns); }, SelectionMode: Enums_1.SelectionMode.Single }))));
    };
    PieChartPrimaryColumnWizard.prototype.onPrimaryColumnChanged = function (columns) {
        var _this = this;
        var isColumn = ArrayExtensions_1.ArrayExtensions.IsNotNullOrEmpty(columns);
        this.setState({
            PrimaryColumnId: isColumn ? columns[0].ColumnId : '',
        }, function () { return _this.props.UpdateGoBackState(); });
    };
    PieChartPrimaryColumnWizard.prototype.canNext = function () {
        return StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.state.PrimaryColumnId);
    };
    PieChartPrimaryColumnWizard.prototype.canBack = function () {
        return true;
    };
    PieChartPrimaryColumnWizard.prototype.Next = function () {
        this.props.Data.PrimaryColumnId = this.state.PrimaryColumnId;
    };
    PieChartPrimaryColumnWizard.prototype.Back = function () {
        // todo
    };
    PieChartPrimaryColumnWizard.prototype.GetIndexStepIncrement = function () {
        return 1;
    };
    PieChartPrimaryColumnWizard.prototype.GetIndexStepDecrement = function () {
        return 1;
    };
    return PieChartPrimaryColumnWizard;
}(React.Component));
exports.PieChartPrimaryColumnWizard = PieChartPrimaryColumnWizard;
