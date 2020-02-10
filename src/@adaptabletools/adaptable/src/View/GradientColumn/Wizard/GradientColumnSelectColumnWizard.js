"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var StringExtensions_1 = require("../../../Utilities/Extensions/StringExtensions");
var Enums_1 = require("../../../PredefinedConfig/Common/Enums");
var ColumnSelector_1 = require("../../Components/Selectors/ColumnSelector");
var WizardPanel_1 = require("../../../components/WizardPanel");
var GradientColumnSelectColumnWizard = /** @class */ (function (_super) {
    tslib_1.__extends(GradientColumnSelectColumnWizard, _super);
    function GradientColumnSelectColumnWizard(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            ColumnId: _this.props.Data.ColumnId,
            NegativeValue: _this.props.Data.NegativeValue,
            PositiveValue: _this.props.Data.PositiveValue,
            BaseValue: _this.props.Data.BaseValue,
        };
        return _this;
    }
    GradientColumnSelectColumnWizard.prototype.render = function () {
        var _this = this;
        return (React.createElement(WizardPanel_1.default, null,
            React.createElement(ColumnSelector_1.ColumnSelector, { SelectedColumnIds: [this.state.ColumnId], ColumnList: this.props.Adaptable.api.gridApi.getNumericColumns(), onColumnChange: function (columns) { return _this.onColumnSelectedChanged(columns); }, SelectionMode: Enums_1.SelectionMode.Single })));
    };
    GradientColumnSelectColumnWizard.prototype.onColumnSelectedChanged = function (columns) {
        var _this = this;
        if (columns.length > 0) {
            var distinctColumnsValues = this.props.Adaptable.StrategyService.getDistinctColumnValues(columns[0].ColumnId);
            var smallestValue = Math.min.apply(Math, tslib_1.__spread(distinctColumnsValues));
            var negativeValue = smallestValue < 0 ? smallestValue : undefined;
            var largestValue = Math.max.apply(Math, tslib_1.__spread(distinctColumnsValues));
            var positiveValue = largestValue > 0 ? largestValue : undefined;
            var baseValue = void 0;
            // work out the base value
            if (smallestValue > 0) {
                baseValue = smallestValue;
            }
            else {
                var positiveValues = distinctColumnsValues.filter(function (f) { return f > 0; });
                baseValue = Math.min.apply(Math, tslib_1.__spread(positiveValues));
            }
            this.setState({
                ColumnId: columns[0].ColumnId,
                NegativeValue: negativeValue,
                PositiveValue: positiveValue,
                BaseValue: baseValue,
            }, function () { return _this.props.UpdateGoBackState(); });
        }
        else {
            this.setState({ ColumnId: '' }, function () {
                return _this.props.UpdateGoBackState();
            });
        }
    };
    GradientColumnSelectColumnWizard.prototype.canNext = function () {
        return StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.state.ColumnId);
    };
    GradientColumnSelectColumnWizard.prototype.canBack = function () {
        return true;
    };
    GradientColumnSelectColumnWizard.prototype.Next = function () {
        this.props.Data.ColumnId = this.state.ColumnId;
        this.props.Data.NegativeValue = this.state.NegativeValue;
        this.props.Data.PositiveValue = this.state.PositiveValue;
        this.props.Data.BaseValue = this.state.BaseValue;
        if (!this.state.NegativeValue) {
            this.props.Data.NegativeColor = undefined;
        }
        if (!this.state.PositiveValue) {
            this.props.Data.PositiveColor = undefined;
        }
    };
    GradientColumnSelectColumnWizard.prototype.Back = function () {
        //todo
    };
    GradientColumnSelectColumnWizard.prototype.GetIndexStepIncrement = function () {
        return 1;
    };
    GradientColumnSelectColumnWizard.prototype.GetIndexStepDecrement = function () {
        return 1;
    };
    return GradientColumnSelectColumnWizard;
}(React.Component));
exports.GradientColumnSelectColumnWizard = GradientColumnSelectColumnWizard;
