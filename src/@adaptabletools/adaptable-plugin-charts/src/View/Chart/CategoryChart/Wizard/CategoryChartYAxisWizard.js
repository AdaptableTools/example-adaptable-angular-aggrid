"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var ChartEnums_1 = require("@adaptabletools/adaptable/src/PredefinedConfig/Common/ChartEnums");
var ColumnHelper_1 = require("@adaptabletools/adaptable/src/Utilities/Helpers/ColumnHelper");
var ArrayExtensions_1 = require("@adaptabletools/adaptable/src/Utilities/Extensions/ArrayExtensions");
var AdaptablePopover_1 = require("@adaptabletools/adaptable/src/View/AdaptablePopover");
var DualListBoxEditor_1 = require("@adaptabletools/adaptable/src/View/Components/ListBox/DualListBoxEditor");
var WizardPanel_1 = require("@adaptabletools/adaptable/src/components/WizardPanel");
var Radio_1 = require("@adaptabletools/adaptable/src/components/Radio");
var rebass_1 = require("rebass");
var HelpBlock_1 = require("@adaptabletools/adaptable/src/components/HelpBlock");
var CategoryChartYAxisWizard = /** @class */ (function (_super) {
    tslib_1.__extends(CategoryChartYAxisWizard, _super);
    function CategoryChartYAxisWizard(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            YAxisColumnIds: props.Data.YAxisColumnIds,
            YAxisTotal: props.Data.YAxisTotal,
        };
        return _this;
    }
    CategoryChartYAxisWizard.prototype.render = function () {
        var _this = this;
        var numericColumnIds = this.props.Adaptable.api.gridApi.getNumericColumns().map(function (c) {
            return c.ColumnId;
        });
        var availableColumns = numericColumnIds
            .filter(function (c) { return ArrayExtensions_1.ArrayExtensions.NotContainsItem(_this.state.YAxisColumnIds, c); })
            .map(function (ac) {
            return ColumnHelper_1.ColumnHelper.getFriendlyNameFromColumnId(ac, _this.props.Columns);
        });
        var existingColumns = this.state.YAxisColumnIds.map(function (ec) {
            return ColumnHelper_1.ColumnHelper.getFriendlyNameFromColumnId(ec, _this.props.Columns);
        });
        return (React.createElement(WizardPanel_1.default, { header: "Chart: Y (Vertical) Axis Column(s)", bodyProps: { padding: 0, style: { display: 'flex', flexDirection: 'column' } } },
            React.createElement(rebass_1.Flex, { flexDirection: "row", alignItems: "center", padding: 3 },
                React.createElement(rebass_1.Text, { style: { flex: 3 } }, "Display Total:"),
                React.createElement(rebass_1.Flex, { style: { flex: 10 }, alignItems: "center", flexDirection: "row" },
                    React.createElement(Radio_1.default, { value: "Sum", checked: this.state.YAxisTotal == ChartEnums_1.AxisTotal.Sum, onChange: function (_, e) { return _this.onYAisTotalChanged(e); }, marginRight: 3 }, "Sum"),
                    React.createElement(Radio_1.default, { value: "Average", marginRight: 3, checked: this.state.YAxisTotal == ChartEnums_1.AxisTotal.Average, onChange: function (_, e) { return _this.onYAisTotalChanged(e); } }, "Average"),
                    ' ',
                    React.createElement(AdaptablePopover_1.AdaptablePopover, { headerText: 'Chart Y Axis: Display Total', bodyText: [
                            'Choose whether the X Axis is grouped according to the sum of it values (by X Axis) or their average.',
                        ] }))),
            React.createElement(rebass_1.Flex, { flex: 1, padding: 2, flexDirection: 'column' },
                React.createElement(HelpBlock_1.default, { marginBottom: 2 }, "Press ctrl/cmd key while clicking to select multiple items."),
                React.createElement(DualListBoxEditor_1.DualListBoxEditor, { style: { flex: 1, overflow: 'hidden' }, AvailableValues: availableColumns, SelectedValues: existingColumns, HeaderAvailable: "Numeric Columns", HeaderSelected: "Y Axis Columns", onChange: function (SelectedValues) { return _this.OnSelectedValuesChange(SelectedValues); }, DisplaySize: DualListBoxEditor_1.DisplaySize.XSmall }))));
    };
    CategoryChartYAxisWizard.prototype.OnSelectedValuesChange = function (newValues) {
        var _this = this;
        var yAxisColumnIds = ColumnHelper_1.ColumnHelper.getColumnIdsFromFriendlyNames(newValues, this.props.Columns);
        this.setState({ YAxisColumnIds: yAxisColumnIds }, function () {
            return _this.props.UpdateGoBackState();
        });
    };
    CategoryChartYAxisWizard.prototype.onYAisTotalChanged = function (event) {
        var _this = this;
        var e = event.target;
        var axisTotal = e.value == 'Sum' ? ChartEnums_1.AxisTotal.Sum : ChartEnums_1.AxisTotal.Average;
        this.setState({ YAxisTotal: axisTotal }, function () {
            return _this.props.UpdateGoBackState();
        });
    };
    CategoryChartYAxisWizard.prototype.canNext = function () {
        return ArrayExtensions_1.ArrayExtensions.IsNotNullOrEmpty(this.state.YAxisColumnIds);
    };
    CategoryChartYAxisWizard.prototype.canBack = function () {
        return true;
    };
    CategoryChartYAxisWizard.prototype.Next = function () {
        this.props.Data.YAxisColumnIds = this.state.YAxisColumnIds;
        this.props.Data.YAxisTotal = this.state.YAxisTotal;
    };
    CategoryChartYAxisWizard.prototype.Back = function () {
        // todo
    };
    CategoryChartYAxisWizard.prototype.GetIndexStepIncrement = function () {
        return 1;
    };
    CategoryChartYAxisWizard.prototype.GetIndexStepDecrement = function () {
        return 1;
    };
    return CategoryChartYAxisWizard;
}(React.Component));
exports.CategoryChartYAxisWizard = CategoryChartYAxisWizard;
