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
var FreeTextColumnSettingsWizard = /** @class */ (function (_super) {
    tslib_1.__extends(FreeTextColumnSettingsWizard, _super);
    function FreeTextColumnSettingsWizard(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            ColumnId: _this.props.Data.ColumnId,
            ErrorMessage: null,
            DefaultValue: _this.props.Data.DefaultValue,
        };
        return _this;
    }
    FreeTextColumnSettingsWizard.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { style: { height: '100%' } },
            React.createElement(WizardPanel_1.default, null,
                React.createElement(rebass_1.Flex, { alignItems: "center", flexDirection: "row" },
                    React.createElement(rebass_1.Text, { style: { flex: 2 } }, "Column Name"),
                    React.createElement(rebass_1.Box, { style: { flex: 8 } },
                        React.createElement(Input_1.default, { value: this.state.ColumnId, style: { width: '100%', maxWidth: 500 }, type: "text", placeholder: "Enter a name", onChange: function (e) { return _this.handleColumnNameChange(e); } }))),
                this.state.ErrorMessage ? (React.createElement(ErrorBox_1.default, { marginTop: 2 }, this.state.ErrorMessage)) : null,
                React.createElement(rebass_1.Flex, { alignItems: "center", flexDirection: "row", marginTop: 3 },
                    React.createElement(rebass_1.Text, { style: { flex: 2 } }, "Default Value"),
                    React.createElement(rebass_1.Box, { style: { flex: 8 } },
                        React.createElement(Input_1.default, { value: this.state.DefaultValue, style: { width: '100%', maxWidth: 500 }, type: "text", placeholder: "Default Column Value (not required)", onChange: function (e) { return _this.handleDefaultValueChange(e); } }))))));
    };
    FreeTextColumnSettingsWizard.prototype.handleColumnNameChange = function (event) {
        var _this = this;
        var e = event.target;
        this.setState({
            ColumnId: e.value,
            ErrorMessage: ArrayExtensions_1.ArrayExtensions.ContainsItem(this.props.Columns.map(function (c) { return c.ColumnId; }), e.value)
                ? 'A Column already exists with that name'
                : null,
        }, function () { return _this.props.UpdateGoBackState(); });
    };
    FreeTextColumnSettingsWizard.prototype.handleDefaultValueChange = function (event) {
        var _this = this;
        var e = event.target;
        this.setState({
            DefaultValue: e.value,
        }, function () { return _this.props.UpdateGoBackState(); });
    };
    FreeTextColumnSettingsWizard.prototype.canNext = function () {
        return (StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.state.ColumnId) &&
            StringExtensions_1.StringExtensions.IsNullOrEmpty(this.state.ErrorMessage));
    };
    FreeTextColumnSettingsWizard.prototype.canBack = function () {
        return true;
    };
    FreeTextColumnSettingsWizard.prototype.Next = function () {
        this.props.Data.ColumnId = this.state.ColumnId;
        this.props.Data.DefaultValue = this.state.DefaultValue;
    };
    FreeTextColumnSettingsWizard.prototype.Back = function () {
        //
    };
    FreeTextColumnSettingsWizard.prototype.GetIndexStepIncrement = function () {
        return 1;
    };
    FreeTextColumnSettingsWizard.prototype.GetIndexStepDecrement = function () {
        return 1;
    };
    return FreeTextColumnSettingsWizard;
}(React.Component));
exports.FreeTextColumnSettingsWizard = FreeTextColumnSettingsWizard;
