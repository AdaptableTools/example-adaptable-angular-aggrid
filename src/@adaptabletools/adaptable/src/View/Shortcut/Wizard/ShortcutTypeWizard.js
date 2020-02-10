"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
/// <reference path="../../typings/index.d.ts" />
var React = require("react");
var Enums_1 = require("../../../PredefinedConfig/Common/Enums");
var WizardPanel_1 = require("../../../components/WizardPanel");
var Radio_1 = require("../../../components/Radio");
var HelpBlock_1 = require("../../../components/HelpBlock");
var rebass_1 = require("rebass");
var ShortcutTypeWizard = /** @class */ (function (_super) {
    tslib_1.__extends(ShortcutTypeWizard, _super);
    function ShortcutTypeWizard(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            ColumnType: _this.props.Data.ColumnType,
        };
        return _this;
    }
    ShortcutTypeWizard.prototype.render = function () {
        var _this = this;
        return (React.createElement(WizardPanel_1.default, null,
            React.createElement(rebass_1.Flex, { flexDirection: "column", padding: 2 },
                React.createElement(HelpBlock_1.default, { marginBottom: 2 },
                    "Select Where Shortcut is Applied Numeric column shortuts perform a mathematical operation based on the ",
                    React.createElement("b", null, "current contents"),
                    " of the cell."),
                React.createElement(Radio_1.default, { marginBottom: 2, value: "Number", checked: this.state.ColumnType == Enums_1.DataType.Number, onChange: function (_, e) { return _this.onColumTypeChanged(e); } }, "Numeric Columns"),
                React.createElement(HelpBlock_1.default, { marginBottom: 2 },
                    "Date shortcuts ",
                    React.createElement("b", null, "replace the cell contents"),
                    " with a new Date value."),
                React.createElement(Radio_1.default, { marginBottom: 2, value: "Date", checked: this.state.ColumnType == Enums_1.DataType.Date, onChange: function (_, e) { return _this.onColumTypeChanged(e); } }, "Date Columns"))));
    };
    ShortcutTypeWizard.prototype.onColumTypeChanged = function (event) {
        var _this = this;
        var e = event.target;
        if (e.value == 'Number') {
            this.setState({ ColumnType: Enums_1.DataType.Number }, function () {
                return _this.props.UpdateGoBackState();
            });
        }
        else {
            this.setState({ ColumnType: Enums_1.DataType.Date }, function () {
                return _this.props.UpdateGoBackState();
            });
        }
    };
    ShortcutTypeWizard.prototype.canNext = function () {
        return this.state.ColumnType != null;
    };
    ShortcutTypeWizard.prototype.canBack = function () {
        return true;
    };
    ShortcutTypeWizard.prototype.Next = function () {
        this.props.Data.ColumnType = this.state.ColumnType;
        if (this.state.ColumnType == Enums_1.DataType.Date) {
            this.props.Data.ShortcutOperation = Enums_1.MathOperation.Replace;
        }
    };
    ShortcutTypeWizard.prototype.Back = function () {
        /* no implementation */
    };
    ShortcutTypeWizard.prototype.GetIndexStepIncrement = function () {
        return 1;
    };
    ShortcutTypeWizard.prototype.GetIndexStepDecrement = function () {
        return 1;
    };
    return ShortcutTypeWizard;
}(React.Component));
exports.ShortcutTypeWizard = ShortcutTypeWizard;
