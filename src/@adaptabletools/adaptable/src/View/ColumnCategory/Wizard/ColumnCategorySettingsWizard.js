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
var ColumnCategorySettingsWizard = /** @class */ (function (_super) {
    tslib_1.__extends(ColumnCategorySettingsWizard, _super);
    function ColumnCategorySettingsWizard(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            ColumnCategoryId: props.Data.ColumnCategoryId,
            ErrorMessage: null,
        };
        return _this;
    }
    ColumnCategorySettingsWizard.prototype.render = function () {
        var _this = this;
        var validationState = StringExtensions_1.StringExtensions.IsNullOrEmpty(this.state.ErrorMessage)
            ? null
            : 'error';
        return (React.createElement(WizardPanel_1.default, null,
            React.createElement(rebass_1.Flex, { flexDirection: "row", alignItems: "center" },
                React.createElement(rebass_1.Text, { marginRight: 3 }, "Name: "),
                React.createElement(Input_1.default, { value: this.state.ColumnCategoryId, style: { flex: 1 }, type: "string", placeholder: "Enter name for Column Category", onChange: function (e) { return _this.onColumnCategoryNameChange(e); } })),
            this.state.ErrorMessage ? (React.createElement(ErrorBox_1.default, { marginTop: 3 }, this.state.ErrorMessage)) : null));
    };
    ColumnCategorySettingsWizard.prototype.onColumnCategoryNameChange = function (event) {
        var _this = this;
        var e = event.target;
        this.setState({
            ColumnCategoryId: e.value,
            ErrorMessage: ArrayExtensions_1.ArrayExtensions.ContainsItem(this.props.ColumnCategorys.map(function (s) { return s.ColumnCategoryId; }), e.value)
                ? 'A Column Category already exists with that name'
                : null,
        }, function () { return _this.props.UpdateGoBackState(); });
    };
    ColumnCategorySettingsWizard.prototype.canNext = function () {
        return (StringExtensions_1.StringExtensions.IsNotEmpty(this.state.ColumnCategoryId) &&
            StringExtensions_1.StringExtensions.IsNullOrEmpty(this.state.ErrorMessage));
    };
    ColumnCategorySettingsWizard.prototype.canBack = function () {
        return true;
    };
    ColumnCategorySettingsWizard.prototype.Next = function () {
        this.props.Data.ColumnCategoryId = this.state.ColumnCategoryId;
    };
    ColumnCategorySettingsWizard.prototype.Back = function () {
        // todo
    };
    ColumnCategorySettingsWizard.prototype.GetIndexStepIncrement = function () {
        return 1;
    };
    ColumnCategorySettingsWizard.prototype.GetIndexStepDecrement = function () {
        return 1;
    };
    return ColumnCategorySettingsWizard;
}(React.Component));
exports.ColumnCategorySettingsWizard = ColumnCategorySettingsWizard;
