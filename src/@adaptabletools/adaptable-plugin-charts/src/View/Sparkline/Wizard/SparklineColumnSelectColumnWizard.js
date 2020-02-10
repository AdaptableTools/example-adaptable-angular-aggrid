"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var StringExtensions_1 = require("@adaptabletools/adaptable/src/Utilities/Extensions/StringExtensions");
var Enums_1 = require("@adaptabletools/adaptable/src/PredefinedConfig/Common/Enums");
var ColumnSelector_1 = require("@adaptabletools/adaptable/src/View/Components/Selectors/ColumnSelector");
var ColumnHelper_1 = require("@adaptabletools/adaptable/src/Utilities/Helpers/ColumnHelper");
var WizardPanel_1 = require("@adaptabletools/adaptable/src/components/WizardPanel");
var SparklineColumnSelectColumnWizard = /** @class */ (function (_super) {
    tslib_1.__extends(SparklineColumnSelectColumnWizard, _super);
    function SparklineColumnSelectColumnWizard(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            ColumnId: _this.props.Data.ColumnId,
            SparklineType: _this.props.Data.SparklineType,
            MinimumValue: _this.props.Data.MinimumValue,
            MaximumValue: _this.props.Data.MaximumValue,
        };
        return _this;
    }
    SparklineColumnSelectColumnWizard.prototype.render = function () {
        var _this = this;
        return (React.createElement(WizardPanel_1.default, null,
            React.createElement(ColumnSelector_1.ColumnSelector, { SelectedColumnIds: [this.state.ColumnId], ColumnList: ColumnHelper_1.ColumnHelper.getNumericArrayColumns(this.props.Columns), onColumnChange: function (columns) { return _this.onColumnSelectedChanged(columns); }, SelectionMode: Enums_1.SelectionMode.Single })));
    };
    SparklineColumnSelectColumnWizard.prototype.onColumnSelectedChanged = function (columns) {
        var _this = this;
        if (columns.length > 0) {
            // let distinctColumnsValues: number[] = this.props.Adaptable.getColumnValueDisplayValuePairDistinctList(
            //   columns[0].ColumnId,
            //   DistinctCriteriaPairValue.RawValue,
            //   false
            // ).map(pair => {
            //   return pair.RawValue;
            // });
            // let minValue = Math.min(...distinctColumnsValues);
            // let maxValue = Math.max(...distinctColumnsValues);
            this.setState({
                ColumnId: columns[0].ColumnId,
            }, function () { return _this.props.UpdateGoBackState(); });
        }
        else {
            this.setState({ ColumnId: '' }, function () {
                return _this.props.UpdateGoBackState();
            });
        }
    };
    SparklineColumnSelectColumnWizard.prototype.canNext = function () {
        return StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.state.ColumnId);
    };
    SparklineColumnSelectColumnWizard.prototype.canBack = function () {
        return true;
    };
    SparklineColumnSelectColumnWizard.prototype.Next = function () {
        this.props.Data.ColumnId = this.state.ColumnId;
        this.props.Data.SparklineType = this.state.SparklineType;
        this.props.Data.MinimumValue = this.state.MinimumValue;
        this.props.Data.MaximumValue = this.state.MaximumValue;
    };
    SparklineColumnSelectColumnWizard.prototype.Back = function () {
        //todo
    };
    SparklineColumnSelectColumnWizard.prototype.GetIndexStepIncrement = function () {
        return 1;
    };
    SparklineColumnSelectColumnWizard.prototype.GetIndexStepDecrement = function () {
        return 1;
    };
    return SparklineColumnSelectColumnWizard;
}(React.Component));
exports.SparklineColumnSelectColumnWizard = SparklineColumnSelectColumnWizard;
