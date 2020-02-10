"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var Enums_1 = require("../../../PredefinedConfig/Common/Enums");
var AdaptablePopover_1 = require("../../AdaptablePopover");
var ColumnSelector_1 = require("../../Components/Selectors/ColumnSelector");
var StringExtensions_1 = require("../../../Utilities/Extensions/StringExtensions");
var WizardPanel_1 = require("../../../components/WizardPanel");
var Panel_1 = require("../../../components/Panel");
var Radio_1 = require("../../../components/Radio");
var rebass_1 = require("rebass");
var Input_1 = require("../../../components/Input");
var ColorPicker_1 = require("../../ColorPicker");
var PercentBarPositiveValuesWizard = /** @class */ (function (_super) {
    tslib_1.__extends(PercentBarPositiveValuesWizard, _super);
    function PercentBarPositiveValuesWizard(props) {
        var _this = _super.call(this, props) || this;
        _this.onMaxValueChanged = function (e) {
            _this.setState({ PositiveValue: e.target.value }, function () {
                return _this.props.UpdateGoBackState();
            });
        };
        _this.state = {
            PositiveColor: _this.props.Data.PositiveColor,
            PositiveValue: _this.props.Data.PositiveValue,
            PositiveValueColumnId: _this.props.Data.PositiveValueColumnId,
            UseColumn: StringExtensions_1.StringExtensions.IsNotNullOrEmpty(_this.props.Data.PositiveValueColumnId),
        };
        return _this;
    }
    PercentBarPositiveValuesWizard.prototype.render = function () {
        var _this = this;
        return (React.createElement(WizardPanel_1.default, null,
            React.createElement(Panel_1.default, { header: "Positive Value", marginTop: 2 },
                React.createElement(rebass_1.Flex, { flexDirection: "row", alignItems: "center" },
                    React.createElement(rebass_1.Text, { style: { flex: 3 }, textAlign: "end", marginRight: 2 }, "Use:"),
                    React.createElement(rebass_1.Flex, { flex: 7, alignItems: "center" },
                        React.createElement(Radio_1.default, { marginRight: 2, value: "value", checked: this.state.UseColumn == false, onChange: function (checked, e) { return _this.onUsePositiveColumnSelectChanged(e); } }, "Static Value"),
                        ' ',
                        React.createElement(Radio_1.default, { marginRight: 2, value: "column", checked: this.state.UseColumn == true, onChange: function (checked, e) { return _this.onUsePositiveColumnSelectChanged(e); } }, "Another Column Value"),
                        React.createElement(AdaptablePopover_1.AdaptablePopover, { headerText: 'Percent Bar: Positive Value', bodyText: [
                                'The maximum positive value of the bar.  Defaults to the currently largest value in the column.  Additionally, you can set the value to be that in another column.',
                            ] }))),
                React.createElement(rebass_1.Flex, { flexDirection: "row", alignItems: "center", marginTop: 2 },
                    React.createElement(rebass_1.Text, { style: { flex: 3 }, textAlign: "end", marginRight: 2 }, this.state.UseColumn == false ? 'Value' : 'Column'),
                    React.createElement(rebass_1.Flex, { flex: 7, alignItems: "center" }, this.state.UseColumn == false ? (React.createElement(Input_1.default, { type: "number", placeholder: "Enter Number", onChange: this.onMaxValueChanged, value: this.state.PositiveValue })) : (React.createElement(ColumnSelector_1.ColumnSelector, { SelectedColumnIds: [this.state.PositiveValueColumnId], ColumnList: this.props.Columns, onColumnChange: function (columns) { return _this.onPositiveColumnSelectedChanged(columns); }, SelectionMode: Enums_1.SelectionMode.Single })))),
                React.createElement(rebass_1.Flex, { flexDirection: "row", alignItems: "center", marginTop: 3 },
                    React.createElement(rebass_1.Text, { style: { flex: 3 }, textAlign: "end", marginRight: 2 }, "Colour:"),
                    React.createElement(rebass_1.Flex, { flex: 7, alignItems: "center" },
                        React.createElement(ColorPicker_1.ColorPicker, { ColorPalette: this.props.ColorPalette, value: this.state.PositiveColor, onChange: function (x) { return _this.onPositiveColorSelectChanged(x); } }))))));
    };
    PercentBarPositiveValuesWizard.prototype.onUsePositiveColumnSelectChanged = function (event) {
        var _this = this;
        var e = event.target;
        this.setState({ UseColumn: e.value == 'column' }, function () {
            return _this.props.UpdateGoBackState();
        });
    };
    PercentBarPositiveValuesWizard.prototype.onPositiveColumnSelectedChanged = function (columns) {
        var _this = this;
        this.setState({
            PositiveValueColumnId: columns.length > 0 ? columns[0].ColumnId : '',
        }, function () { return _this.props.UpdateGoBackState(); });
    };
    PercentBarPositiveValuesWizard.prototype.onPositiveColorSelectChanged = function (event) {
        var _this = this;
        var e = event.target;
        this.setState({ PositiveColor: e.value }, function () {
            return _this.props.UpdateGoBackState();
        });
    };
    PercentBarPositiveValuesWizard.prototype.canNext = function () {
        if (StringExtensions_1.StringExtensions.IsNullOrEmpty(this.props.Data.ColumnId)) {
            return false;
        }
        if (this.state.UseColumn && StringExtensions_1.StringExtensions.IsNullOrEmpty(this.state.PositiveValueColumnId)) {
            return false;
        }
        if (!this.state.UseColumn && this.state.PositiveValue && this.state.PositiveValue < 0) {
            return false;
        }
        if (StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.state.PositiveValueColumnId) ||
            this.state.PositiveValue) {
            if (StringExtensions_1.StringExtensions.IsNullOrEmpty(this.state.PositiveColor)) {
                return false;
            }
        }
        return true;
    };
    PercentBarPositiveValuesWizard.prototype.canBack = function () {
        return true;
    };
    PercentBarPositiveValuesWizard.prototype.Next = function () {
        this.props.Data.PositiveColor = this.state.PositiveColor;
        this.props.Data.PositiveValue = this.state.UseColumn ? 0 : this.state.PositiveValue;
        this.props.Data.PositiveValueColumnId = this.state.UseColumn
            ? this.state.PositiveValueColumnId
            : undefined;
    };
    PercentBarPositiveValuesWizard.prototype.Back = function () {
        //todo
    };
    PercentBarPositiveValuesWizard.prototype.GetIndexStepIncrement = function () {
        return 1;
    };
    PercentBarPositiveValuesWizard.prototype.GetIndexStepDecrement = function () {
        return 1;
    };
    return PercentBarPositiveValuesWizard;
}(React.Component));
exports.PercentBarPositiveValuesWizard = PercentBarPositiveValuesWizard;
