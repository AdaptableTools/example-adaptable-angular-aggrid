"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var StringExtensions_1 = require("../../../Utilities/Extensions/StringExtensions");
var Enums_1 = require("../../../PredefinedConfig/Common/Enums");
var ColumnSelector_1 = require("../../Components/Selectors/ColumnSelector");
var WizardPanel_1 = require("../../../components/WizardPanel");
var PercentBarSelectColumnWizard = /** @class */ (function (_super) {
    tslib_1.__extends(PercentBarSelectColumnWizard, _super);
    function PercentBarSelectColumnWizard(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            ColumnId: _this.props.Data.ColumnId,
            PositiveValue: _this.props.Data.PositiveValue,
            NegativeValue: _this.props.Data.NegativeValue,
        };
        return _this;
    }
    PercentBarSelectColumnWizard.prototype.render = function () {
        var _this = this;
        return (React.createElement(WizardPanel_1.default, null,
            React.createElement(ColumnSelector_1.ColumnSelector, { SelectedColumnIds: [this.state.ColumnId], ColumnList: this.props.Adaptable.api.gridApi.getNumericColumns(), onColumnChange: function (columns) { return _this.onColumnSelectedChanged(columns); }, SelectionMode: Enums_1.SelectionMode.Single })));
    };
    PercentBarSelectColumnWizard.prototype.onColumnSelectedChanged = function (columns) {
        var _this = this;
        if (columns.length > 0) {
            var distinctColumnsValues = this.props.Adaptable.StrategyService.getDistinctColumnValues(columns[0].ColumnId);
            var minValue = Math.min.apply(Math, tslib_1.__spread(distinctColumnsValues));
            var maxValue = Math.max.apply(Math, tslib_1.__spread(distinctColumnsValues));
            this.setState({
                ColumnId: columns[0].ColumnId,
                PositiveValue: maxValue >= 0 ? maxValue : undefined,
                NegativeValue: minValue < 0 ? minValue : undefined,
            }, function () { return _this.props.UpdateGoBackState(); });
        }
        else {
            this.setState({ ColumnId: '' }, function () {
                return _this.props.UpdateGoBackState();
            });
        }
    };
    PercentBarSelectColumnWizard.prototype.canNext = function () {
        return StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.state.ColumnId);
    };
    PercentBarSelectColumnWizard.prototype.canBack = function () {
        return true;
    };
    PercentBarSelectColumnWizard.prototype.Next = function () {
        this.props.Data.ColumnId = this.state.ColumnId;
        this.props.Data.PositiveValue = this.state.PositiveValue;
        this.props.Data.NegativeValue = this.state.NegativeValue;
        if (!this.state.NegativeValue) {
            this.props.Data.NegativeColor = undefined;
        }
    };
    PercentBarSelectColumnWizard.prototype.Back = function () {
        //todo
    };
    PercentBarSelectColumnWizard.prototype.GetIndexStepIncrement = function () {
        return 1;
    };
    PercentBarSelectColumnWizard.prototype.GetIndexStepDecrement = function () {
        return 1;
    };
    return PercentBarSelectColumnWizard;
}(React.Component));
exports.PercentBarSelectColumnWizard = PercentBarSelectColumnWizard;
