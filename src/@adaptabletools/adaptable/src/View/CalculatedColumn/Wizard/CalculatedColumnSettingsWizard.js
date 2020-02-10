"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var StringExtensions_1 = require("../../../Utilities/Extensions/StringExtensions");
var ArrayExtensions_1 = require("../../../Utilities/Extensions/ArrayExtensions");
var rebass_1 = require("rebass");
var Input_1 = require("../../../components/Input");
var WizardPanel_1 = require("../../../components/WizardPanel");
var ErrorBox_1 = require("../../../components/ErrorBox");
var CalculatedColumnSettingsWizard = /** @class */ (function (_super) {
    tslib_1.__extends(CalculatedColumnSettingsWizard, _super);
    function CalculatedColumnSettingsWizard(props) {
        var _this = _super.call(this, props) || this;
        _this.state = { ColumnId: _this.props.Data.ColumnId, ErrorMessage: null };
        return _this;
    }
    CalculatedColumnSettingsWizard.prototype.render = function () {
        var _this = this;
        return (React.createElement(WizardPanel_1.default, null,
            React.createElement(rebass_1.Flex, { flexDirection: "row", alignItems: "center" },
                React.createElement(rebass_1.Text, null, "Column Name"),
                React.createElement(rebass_1.Box, { style: { flex: 1 }, marginLeft: 2, marginRight: 2 },
                    React.createElement(Input_1.default, { style: { width: '100%' }, value: this.state.ColumnId, autoFocus: true, type: "text", placeholder: "Enter a name", onChange: function (e) { return _this.handleColumnNameChange(e); } }))),
            this.state.ErrorMessage ? (React.createElement(ErrorBox_1.default, { marginTop: 2 }, this.state.ErrorMessage)) : null));
    };
    CalculatedColumnSettingsWizard.prototype.handleColumnNameChange = function (event) {
        var _this = this;
        var e = event.target;
        this.setState({
            ColumnId: e.value,
            ErrorMessage: ArrayExtensions_1.ArrayExtensions.ContainsItem(this.props.Columns.map(function (c) { return c.ColumnId; }), e.value)
                ? 'A Column already exists with that name'
                : null,
        }, function () { return _this.props.UpdateGoBackState(); });
    };
    CalculatedColumnSettingsWizard.prototype.canNext = function () {
        return (StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.state.ColumnId) &&
            StringExtensions_1.StringExtensions.IsNullOrEmpty(this.state.ErrorMessage));
    };
    CalculatedColumnSettingsWizard.prototype.canBack = function () {
        return true;
    };
    CalculatedColumnSettingsWizard.prototype.Next = function () {
        this.props.Data.ColumnId = this.state.ColumnId;
    };
    CalculatedColumnSettingsWizard.prototype.Back = function () {
        //
    };
    CalculatedColumnSettingsWizard.prototype.GetIndexStepIncrement = function () {
        return 1;
    };
    CalculatedColumnSettingsWizard.prototype.GetIndexStepDecrement = function () {
        return 1;
    };
    return CalculatedColumnSettingsWizard;
}(React.Component));
exports.CalculatedColumnSettingsWizard = CalculatedColumnSettingsWizard;
