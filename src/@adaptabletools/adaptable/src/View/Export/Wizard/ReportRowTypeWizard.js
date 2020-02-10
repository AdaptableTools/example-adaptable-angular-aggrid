"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var Enums_1 = require("../../../PredefinedConfig/Common/Enums");
var ExpressionHelper_1 = require("../../../Utilities/Helpers/ExpressionHelper");
var WizardPanel_1 = require("../../../components/WizardPanel");
var Radio_1 = require("../../../components/Radio");
var rebass_1 = require("rebass");
var HelpBlock_1 = require("../../../components/HelpBlock");
var ReportRowTypeWizard = /** @class */ (function (_super) {
    tslib_1.__extends(ReportRowTypeWizard, _super);
    function ReportRowTypeWizard(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            ReportRowScope: _this.props.Data.ReportRowScope,
        };
        return _this;
    }
    ReportRowTypeWizard.prototype.render = function () {
        var _this = this;
        return (React.createElement(WizardPanel_1.default, null,
            React.createElement(rebass_1.Flex, { flexDirection: "column", padding: 2 },
                React.createElement(HelpBlock_1.default, { marginBottom: 1 }, "All rows in the datasource will be included in the report, whether visible or not at time of export."),
                React.createElement(Radio_1.default, { value: "All", checked: this.state.ReportRowScope == Enums_1.ReportRowScope.AllRows, onChange: function (_, e) { return _this.onScopeSelectChanged(e); }, marginRight: 3 }, "All Rows"),
                ' ',
                React.createElement(HelpBlock_1.default, { marginBottom: 1 }, "Only rows that are visible at the time the Report is exported will be included in the Export"),
                React.createElement(Radio_1.default, { value: "Visible", checked: this.state.ReportRowScope == Enums_1.ReportRowScope.VisibleRows, onChange: function (_, e) { return _this.onScopeSelectChanged(e); }, marginRight: 3 }, "Visible Rows Only"),
                ' ',
                React.createElement(HelpBlock_1.default, { marginBottom: 1 }, "Only the rows which match the Query (built in next step) will be exported - whether visible or not."),
                React.createElement(Radio_1.default, { value: "Expression", checked: this.state.ReportRowScope == Enums_1.ReportRowScope.ExpressionRows, onChange: function (_, e) { return _this.onScopeSelectChanged(e); }, marginRight: 3 }, "By Query - built by you in next step"),
                ' ')));
    };
    ReportRowTypeWizard.prototype.onScopeSelectChanged = function (event) {
        var _this = this;
        var e = event.target;
        if (e.value == 'All') {
            this.setState({
                ReportRowScope: Enums_1.ReportRowScope.AllRows,
                SelectedColumnValues: [],
            }, function () { return _this.props.UpdateGoBackState(); });
        }
        else if (e.value == 'Visible') {
            this.setState({
                ReportRowScope: Enums_1.ReportRowScope.VisibleRows,
                SelectedColumnValues: [],
            }, function () { return _this.props.UpdateGoBackState(); });
        }
        else {
            this.setState({ ReportRowScope: Enums_1.ReportRowScope.ExpressionRows }, function () { return _this.props.UpdateGoBackState(); });
        }
    };
    ReportRowTypeWizard.prototype.canNext = function () {
        return (this.state.ReportRowScope == Enums_1.ReportRowScope.AllRows ||
            this.state.ReportRowScope == Enums_1.ReportRowScope.VisibleRows ||
            this.state.ReportRowScope == Enums_1.ReportRowScope.ExpressionRows);
    };
    ReportRowTypeWizard.prototype.canBack = function () {
        return true;
    };
    ReportRowTypeWizard.prototype.Next = function () {
        this.props.Data.ReportRowScope = this.state.ReportRowScope;
        if (this.props.Data.Expression == null ||
            this.state.ReportRowScope != Enums_1.ReportRowScope.ExpressionRows) {
            this.props.Data.Expression = ExpressionHelper_1.ExpressionHelper.CreateEmptyExpression();
        }
    };
    ReportRowTypeWizard.prototype.Back = function () {
        //todo
    };
    ReportRowTypeWizard.prototype.GetIndexStepIncrement = function () {
        return this.state.ReportRowScope == Enums_1.ReportRowScope.ExpressionRows ? 1 : 2;
    };
    ReportRowTypeWizard.prototype.GetIndexStepDecrement = function () {
        return this.props.Data.ReportColumnScope == Enums_1.ReportColumnScope.BespokeColumns ? 1 : 2;
    };
    return ReportRowTypeWizard;
}(React.Component));
exports.ReportRowTypeWizard = ReportRowTypeWizard;
