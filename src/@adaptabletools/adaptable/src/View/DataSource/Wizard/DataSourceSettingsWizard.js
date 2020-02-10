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
var DataSourceSettingsWizard = /** @class */ (function (_super) {
    tslib_1.__extends(DataSourceSettingsWizard, _super);
    function DataSourceSettingsWizard(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            Name: _this.props.Data.Name,
            Description: _this.props.Data.Description,
            ErrorMessage: null,
        };
        return _this;
    }
    DataSourceSettingsWizard.prototype.render = function () {
        var _this = this;
        var validationState = StringExtensions_1.StringExtensions.IsNullOrEmpty(this.state.ErrorMessage)
            ? null
            : 'error';
        return (React.createElement(WizardPanel_1.default, null,
            React.createElement(rebass_1.Flex, { alignItems: "center", flexDirection: "row" },
                React.createElement(rebass_1.Text, { style: { flex: 2 }, textAlign: "end", marginRight: 2 }, "Name:"),
                React.createElement(Input_1.default, { style: { flex: 7 }, value: this.state.Name, type: "string", placeholder: "Enter DataSource name", onChange: function (e) { return _this.onDataSourceNameChange(e); } })),
            this.state.ErrorMessage ? (React.createElement(ErrorBox_1.default, { marginTop: 3 }, this.state.ErrorMessage)) : null,
            React.createElement(rebass_1.Flex, { alignItems: "center", flexDirection: "row", marginTop: 2 },
                React.createElement(rebass_1.Text, { style: { flex: 2 }, textAlign: "end", marginRight: 2 }, "Description:"),
                React.createElement(Input_1.default, { style: { flex: 7 }, type: "string", placeholder: "Enter description", onChange: function (e) { return _this.onDataSourceDescriptionChange(e); } }))));
    };
    DataSourceSettingsWizard.prototype.onDataSourceNameChange = function (event) {
        var _this = this;
        var e = event.target;
        this.setState({
            Name: e.value,
            ErrorMessage: ArrayExtensions_1.ArrayExtensions.ContainsItem(this.props.DataSourceNames, e.value)
                ? 'A data source already exists with that name'
                : null,
        }, function () { return _this.props.UpdateGoBackState(); });
    };
    DataSourceSettingsWizard.prototype.onDataSourceDescriptionChange = function (event) {
        var _this = this;
        var e = event.target;
        this.setState({ Description: e.value }, function () {
            return _this.props.UpdateGoBackState();
        });
    };
    DataSourceSettingsWizard.prototype.canNext = function () {
        return (StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.state.Name) &&
            StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.state.Description));
    };
    DataSourceSettingsWizard.prototype.canBack = function () {
        return true;
    };
    DataSourceSettingsWizard.prototype.Next = function () {
        this.props.Data.Name = this.state.Name;
        this.props.Data.Description = this.state.Description;
    };
    DataSourceSettingsWizard.prototype.Back = function () {
        /* no implementation required   */
    };
    DataSourceSettingsWizard.prototype.GetIndexStepIncrement = function () {
        return 1;
    };
    DataSourceSettingsWizard.prototype.GetIndexStepDecrement = function () {
        return 1;
    };
    return DataSourceSettingsWizard;
}(React.Component));
exports.DataSourceSettingsWizard = DataSourceSettingsWizard;
