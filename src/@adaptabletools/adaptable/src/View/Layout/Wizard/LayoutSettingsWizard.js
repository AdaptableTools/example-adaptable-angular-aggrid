"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var StringExtensions_1 = require("../../../Utilities/Extensions/StringExtensions");
var ArrayExtensions_1 = require("../../../Utilities/Extensions/ArrayExtensions");
var WizardPanel_1 = require("../../../components/WizardPanel");
var rebass_1 = require("rebass");
var Input_1 = require("../../../components/Input");
var ErrorBox_1 = require("../../../components/ErrorBox");
var HelpBlock_1 = require("../../../components/HelpBlock");
var LayoutSettingsWizard = /** @class */ (function (_super) {
    tslib_1.__extends(LayoutSettingsWizard, _super);
    function LayoutSettingsWizard(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            LayoutName: props.Data.Name,
            ErrorMessage: null,
        };
        return _this;
    }
    LayoutSettingsWizard.prototype.render = function () {
        var _this = this;
        return (React.createElement(WizardPanel_1.default, null,
            React.createElement(HelpBlock_1.default, { marginBottom: 2 },
                "Choose a ",
                React.createElement("b", null, "Name"),
                " for the Layout. This is what will appear in the dropdown in the Layout toolbar."),
            React.createElement(rebass_1.Flex, { alignItems: "center" },
                React.createElement(rebass_1.Text, { marginRight: 2 }, "Layout Name: "),
                React.createElement(Input_1.default, { style: { flex: 1 }, value: this.state.LayoutName, type: "string", placeholder: "Enter layout name", onChange: function (e) { return _this.onLayoutNameChange(e); } })),
            this.state.ErrorMessage ? (React.createElement(ErrorBox_1.default, { marginTop: 2 }, this.state.ErrorMessage)) : null));
    };
    LayoutSettingsWizard.prototype.onLayoutNameChange = function (event) {
        var _this = this;
        var e = event.target;
        this.setState({
            LayoutName: e.value,
            ErrorMessage: ArrayExtensions_1.ArrayExtensions.ContainsItem(this.props.Layouts.map(function (l) { return l.Name; }), e.value)
                ? 'A Layout already exists with that name'
                : null,
        }, function () { return _this.props.UpdateGoBackState(); });
    };
    LayoutSettingsWizard.prototype.canNext = function () {
        return (StringExtensions_1.StringExtensions.IsNotEmpty(this.state.LayoutName) &&
            StringExtensions_1.StringExtensions.IsNullOrEmpty(this.state.ErrorMessage));
    };
    LayoutSettingsWizard.prototype.canBack = function () {
        return true;
    };
    LayoutSettingsWizard.prototype.Next = function () {
        this.props.Data.Name = this.state.LayoutName;
    };
    LayoutSettingsWizard.prototype.Back = function () {
        // todo
    };
    LayoutSettingsWizard.prototype.GetIndexStepIncrement = function () {
        return 1;
    };
    LayoutSettingsWizard.prototype.GetIndexStepDecrement = function () {
        // this is wrong as its only decrementing on pivot - but we need someway to know whether its ne or existing
        return this.props.Adaptable.LayoutService.isPivotedLayout(this.props.Data.PivotDetails) ? 1 : 3;
    };
    return LayoutSettingsWizard;
}(React.Component));
exports.LayoutSettingsWizard = LayoutSettingsWizard;
