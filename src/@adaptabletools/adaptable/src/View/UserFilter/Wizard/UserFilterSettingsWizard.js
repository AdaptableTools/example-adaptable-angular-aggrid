"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var StringExtensions_1 = require("../../../Utilities/Extensions/StringExtensions");
var ColumnHelper_1 = require("../../../Utilities/Helpers/ColumnHelper");
var ErrorBox_1 = require("../../../components/ErrorBox");
var WizardPanel_1 = require("../../../components/WizardPanel");
var rebass_1 = require("rebass");
var Input_1 = require("../../../components/Input");
var HelpBlock_1 = require("../../../components/HelpBlock");
var UserFilterSettingsWizard = /** @class */ (function (_super) {
    tslib_1.__extends(UserFilterSettingsWizard, _super);
    function UserFilterSettingsWizard(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            FilterName: _this.props.Data.Name,
            ErrorMessage: null,
        };
        return _this;
    }
    UserFilterSettingsWizard.prototype.render = function () {
        var _this = this;
        var validationState = StringExtensions_1.StringExtensions.IsNullOrEmpty(this.state.ErrorMessage)
            ? null
            : 'error';
        return (React.createElement(WizardPanel_1.default, null,
            React.createElement(HelpBlock_1.default, { marginBottom: 2 }, "Select a name for the User Filter - this is the name that will appear in Query Builder and Column Filter dropdowns."),
            React.createElement(rebass_1.Flex, { flexDirection: "row", alignItems: "center" },
                React.createElement(rebass_1.Text, { textAlign: "end", marginRight: 2 }, "Filter Name:"),
                React.createElement(Input_1.default, { style: { flex: 1 }, value: this.state.FilterName, type: "string", placeholder: "Enter filter name", onChange: function (e) { return _this.onFilterNameChange(e); } })),
            this.state.ErrorMessage ? (React.createElement(ErrorBox_1.default, { marginTop: 3 }, this.state.ErrorMessage)) : null));
    };
    UserFilterSettingsWizard.prototype.onFilterNameChange = function (event) {
        var _this = this;
        var e = event.target;
        this.setState({
            FilterName: e.value,
            ErrorMessage: this.props.UserFilters.findIndex(function (x) { return x.Name == e.value && x.ColumnId == _this.props.Data.ColumnId; }) > -1
                ? 'A User Filter already exists with that name for column: ' +
                    ColumnHelper_1.ColumnHelper.getFriendlyNameFromColumnId(this.props.Data.ColumnId, this.props.Columns)
                : null,
        }, function () { return _this.props.UpdateGoBackState(); });
    };
    UserFilterSettingsWizard.prototype.canNext = function () {
        return (StringExtensions_1.StringExtensions.IsNotEmpty(this.state.FilterName) &&
            StringExtensions_1.StringExtensions.IsNullOrEmpty(this.state.ErrorMessage));
    };
    UserFilterSettingsWizard.prototype.canBack = function () {
        return true;
    };
    UserFilterSettingsWizard.prototype.Next = function () {
        this.props.Data.Name = this.state.FilterName;
    };
    UserFilterSettingsWizard.prototype.Back = function () {
        /* no implementation */
    };
    UserFilterSettingsWizard.prototype.GetIndexStepIncrement = function () {
        return 1;
    };
    UserFilterSettingsWizard.prototype.GetIndexStepDecrement = function () {
        return 1;
    };
    return UserFilterSettingsWizard;
}(React.Component));
exports.UserFilterSettingsWizard = UserFilterSettingsWizard;
