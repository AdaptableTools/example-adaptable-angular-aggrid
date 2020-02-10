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
var PercentBarNegativeValuesWizard = /** @class */ (function (_super) {
    tslib_1.__extends(PercentBarNegativeValuesWizard, _super);
    function PercentBarNegativeValuesWizard(props) {
        var _this = _super.call(this, props) || this;
        _this.onMinValueChanged = function (e) {
            _this.setState({ NegativeValue: e.target.value }, function () {
                return _this.props.UpdateGoBackState();
            });
        };
        _this.state = {
            NegativeColor: _this.props.Data.NegativeColor,
            NegativeValue: _this.props.Data.NegativeValue,
            NegativeValueColumnId: _this.props.Data.NegativeValueColumnId,
            UseMinColumn: StringExtensions_1.StringExtensions.IsNotNullOrEmpty(_this.props.Data.NegativeValueColumnId),
        };
        return _this;
    }
    PercentBarNegativeValuesWizard.prototype.render = function () {
        var _this = this;
        return (React.createElement(WizardPanel_1.default, null,
            React.createElement(Panel_1.default, { header: 'Negative Value', marginTop: 2 },
                React.createElement(rebass_1.Flex, { flexDirection: "row", alignItems: "center" },
                    React.createElement(rebass_1.Text, { style: { flex: 3 }, textAlign: "end", marginRight: 2 }, "Use:"),
                    React.createElement(rebass_1.Flex, { flex: 7, alignItems: "center" },
                        React.createElement(Radio_1.default, { marginRight: 2, value: "value", checked: this.state.UseMinColumn == false, onChange: function (_, e) { return _this.onUseMinColumnSelectChanged(e); } }, "Static Value"),
                        ' ',
                        React.createElement(Radio_1.default, { marginRight: 2, value: "column", checked: this.state.UseMinColumn == true, onChange: function (_, e) { return _this.onUseMinColumnSelectChanged(e); } }, "Another Column Value"),
                        React.createElement(AdaptablePopover_1.AdaptablePopover, { headerText: 'Percent Bar: Minimum Value', bodyText: [
                                'The minimum value of the column (can be minus).  Defaults to the currenty smallest value in the column.  If the column only contains positive numbers use 0.  Additionally, you can set the value to be that in another column.',
                            ] }))),
                React.createElement(rebass_1.Flex, { flexDirection: "row", alignItems: "center" },
                    React.createElement(rebass_1.Text, { style: { flex: 3 }, textAlign: "end", marginRight: 2 }, this.state.UseMinColumn == false ? 'Value' : 'Column'),
                    React.createElement(rebass_1.Flex, { flex: 7, alignItems: "center" }, this.state.UseMinColumn == false ? (React.createElement(Input_1.default, { type: "number", placeholder: "Enter Number", onChange: this.onMinValueChanged, value: this.state.NegativeValue })) : (React.createElement(ColumnSelector_1.ColumnSelector, { SelectedColumnIds: [this.state.NegativeValueColumnId], ColumnList: this.props.Columns, onColumnChange: function (columns) { return _this.onColumnMinValueSelectedChanged(columns); }, SelectionMode: Enums_1.SelectionMode.Single })))),
                React.createElement(rebass_1.Flex, { flexDirection: "row", alignItems: "center", marginTop: 3 },
                    React.createElement(rebass_1.Text, { style: { flex: 3 }, textAlign: "end", marginRight: 2 }, "Colour:"),
                    React.createElement(rebass_1.Flex, { flex: 7, alignItems: "center" },
                        React.createElement(ColorPicker_1.ColorPicker, { ColorPalette: this.props.ColorPalette, value: this.state.NegativeColor, onChange: function (x) { return _this.onNegativeColorSelectChanged(x); } }))))));
    };
    PercentBarNegativeValuesWizard.prototype.onUseMinColumnSelectChanged = function (event) {
        var _this = this;
        var e = event.target;
        this.setState({ UseMinColumn: e.value == 'column' }, function () { return _this.props.UpdateGoBackState(); });
    };
    PercentBarNegativeValuesWizard.prototype.onColumnMinValueSelectedChanged = function (columns) {
        var _this = this;
        this.setState({
            NegativeValueColumnId: columns.length > 0 ? columns[0].ColumnId : '',
        }, function () { return _this.props.UpdateGoBackState(); });
    };
    PercentBarNegativeValuesWizard.prototype.onNegativeColorSelectChanged = function (event) {
        var _this = this;
        var e = event.target;
        this.setState({ NegativeColor: e.value }, function () {
            return _this.props.UpdateGoBackState();
        });
    };
    PercentBarNegativeValuesWizard.prototype.canNext = function () {
        if (StringExtensions_1.StringExtensions.IsNullOrEmpty(this.props.Data.ColumnId)) {
            return false;
        }
        if (this.state.UseMinColumn &&
            StringExtensions_1.StringExtensions.IsNullOrEmpty(this.state.NegativeValueColumnId)) {
            return false;
        }
        if (!this.state.UseMinColumn && this.state.NegativeValue && this.state.NegativeValue > 0) {
            return false;
        }
        if (StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.state.NegativeValueColumnId) ||
            this.state.NegativeValue) {
            if (StringExtensions_1.StringExtensions.IsNullOrEmpty(this.state.NegativeColor)) {
                return false;
            }
        }
        return true;
    };
    PercentBarNegativeValuesWizard.prototype.canBack = function () {
        return true;
    };
    PercentBarNegativeValuesWizard.prototype.Next = function () {
        this.props.Data.NegativeColor = this.state.NegativeColor;
        this.props.Data.NegativeValue = this.state.UseMinColumn ? 0 : this.state.NegativeValue;
        this.props.Data.NegativeValueColumnId = this.state.UseMinColumn
            ? this.state.NegativeValueColumnId
            : undefined;
    };
    PercentBarNegativeValuesWizard.prototype.Back = function () {
        //todo
    };
    PercentBarNegativeValuesWizard.prototype.GetIndexStepIncrement = function () {
        return 1;
    };
    PercentBarNegativeValuesWizard.prototype.GetIndexStepDecrement = function () {
        return 1;
    };
    return PercentBarNegativeValuesWizard;
}(React.Component));
exports.PercentBarNegativeValuesWizard = PercentBarNegativeValuesWizard;
