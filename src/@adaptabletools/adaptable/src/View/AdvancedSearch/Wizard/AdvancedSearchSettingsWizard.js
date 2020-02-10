"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var Input_1 = require("../../../components/Input");
var StringExtensions_1 = require("../../../Utilities/Extensions/StringExtensions");
var ArrayExtensions_1 = require("../../../Utilities/Extensions/ArrayExtensions");
var rebass_1 = require("rebass");
var ErrorBox_1 = require("../../../components/ErrorBox");
var WizardPanel_1 = require("../../../components/WizardPanel");
var AdvancedSearchSettingsWizard = /** @class */ (function (_super) {
    tslib_1.__extends(AdvancedSearchSettingsWizard, _super);
    function AdvancedSearchSettingsWizard(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            AdvancedSearchName: props.Data.Name,
            ErrorMessage: null,
        };
        return _this;
    }
    AdvancedSearchSettingsWizard.prototype.render = function () {
        var _this = this;
        return (React.createElement(WizardPanel_1.default, null,
            React.createElement(rebass_1.Flex, { alignItems: "center", flexDirection: "row" },
                React.createElement(rebass_1.Box, null, "Name:"),
                React.createElement(Input_1.default, { marginLeft: 2, value: this.state.AdvancedSearchName, type: "string", placeholder: "Enter search name", style: { flex: 1 }, onChange: function (e) { return _this.onAdvancedSearchNameChange(e); } })),
            this.state.ErrorMessage ? (React.createElement(ErrorBox_1.default, { marginTop: 2 }, this.state.ErrorMessage)) : null));
    };
    AdvancedSearchSettingsWizard.prototype.onAdvancedSearchNameChange = function (event) {
        var _this = this;
        var e = event.target;
        this.setState({
            AdvancedSearchName: e.value,
            ErrorMessage: ArrayExtensions_1.ArrayExtensions.ContainsItem(this.props.AdvancedSearches.map(function (s) { return s.Name; }), e.value)
                ? 'A Search already exists with that name'
                : null,
        }, function () { return _this.props.UpdateGoBackState(); });
    };
    AdvancedSearchSettingsWizard.prototype.canNext = function () {
        return (StringExtensions_1.StringExtensions.IsNotEmpty(this.state.AdvancedSearchName) &&
            StringExtensions_1.StringExtensions.IsNullOrEmpty(this.state.ErrorMessage));
    };
    AdvancedSearchSettingsWizard.prototype.canBack = function () {
        return true;
    };
    AdvancedSearchSettingsWizard.prototype.Next = function () {
        this.props.Data.Name = this.state.AdvancedSearchName;
    };
    AdvancedSearchSettingsWizard.prototype.Back = function () {
        // todo
    };
    AdvancedSearchSettingsWizard.prototype.GetIndexStepIncrement = function () {
        return 1;
    };
    AdvancedSearchSettingsWizard.prototype.GetIndexStepDecrement = function () {
        return 1;
    };
    return AdvancedSearchSettingsWizard;
}(React.Component));
exports.AdvancedSearchSettingsWizard = AdvancedSearchSettingsWizard;
