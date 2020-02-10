"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var Enums_1 = require("../../../PredefinedConfig/Common/Enums");
var WizardPanel_1 = require("../../../components/WizardPanel");
var Radio_1 = require("../../../components/Radio");
var rebass_1 = require("rebass");
var HelpBlock_1 = require("../../../components/HelpBlock");
var ReportColumnTypeWizard = /** @class */ (function (_super) {
    tslib_1.__extends(ReportColumnTypeWizard, _super);
    function ReportColumnTypeWizard(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            ReportColumnScope: _this.props.Data.ReportColumnScope,
        };
        return _this;
    }
    ReportColumnTypeWizard.prototype.render = function () {
        var _this = this;
        return (React.createElement(WizardPanel_1.default, null,
            React.createElement(rebass_1.Flex, { flexDirection: "column", padding: 2 },
                React.createElement(HelpBlock_1.default, { marginBottom: 1 }, "All columns in the datasource will be included in the report, whether visible or not at time of export"),
                React.createElement(Radio_1.default, { value: "All", checked: this.state.ReportColumnScope == Enums_1.ReportColumnScope.AllColumns, onChange: function (_, e) { return _this.onScopeSelectChanged(e); }, marginRight: 3 }, "All Columns"),
                ' ',
                React.createElement(HelpBlock_1.default, { marginBottom: 1 }, "Only columns that are visible at the time the Report is exported will be included"),
                React.createElement(Radio_1.default, { value: "Visible", checked: this.state.ReportColumnScope == Enums_1.ReportColumnScope.VisibleColumns, onChange: function (_, e) { return _this.onScopeSelectChanged(e); }, marginRight: 3 }, "Visible Columns Only"),
                ' ',
                React.createElement(HelpBlock_1.default, { marginBottom: 1 }, "Only selected columns (which you will choose in the next step) will be exported - whether visible or not"),
                React.createElement(Radio_1.default, { value: "Bespoke", marginRight: 3, checked: this.state.ReportColumnScope == Enums_1.ReportColumnScope.BespokeColumns, onChange: function (_, e) { return _this.onScopeSelectChanged(e); } }, "Bespoke Columns"),
                ' ')));
    };
    ReportColumnTypeWizard.prototype.onScopeSelectChanged = function (event) {
        var _this = this;
        var e = event.target;
        if (e.value == 'All') {
            this.setState({
                ReportColumnScope: Enums_1.ReportColumnScope.AllColumns,
                SelectedColumnValues: [],
            }, function () { return _this.props.UpdateGoBackState(); });
        }
        else if (e.value == 'Visible') {
            this.setState({
                ReportColumnScope: Enums_1.ReportColumnScope.VisibleColumns,
                SelectedColumnValues: [],
            }, function () { return _this.props.UpdateGoBackState(); });
        }
        else {
            this.setState({ ReportColumnScope: Enums_1.ReportColumnScope.BespokeColumns }, function () { return _this.props.UpdateGoBackState(); });
        }
    };
    ReportColumnTypeWizard.prototype.canNext = function () {
        return (this.state.ReportColumnScope == Enums_1.ReportColumnScope.AllColumns ||
            this.state.ReportColumnScope == Enums_1.ReportColumnScope.VisibleColumns ||
            this.state.ReportColumnScope == Enums_1.ReportColumnScope.BespokeColumns);
    };
    ReportColumnTypeWizard.prototype.canBack = function () {
        return true;
    };
    ReportColumnTypeWizard.prototype.Next = function () {
        this.props.Data.ReportColumnScope = this.state.ReportColumnScope;
        if (this.state.ReportColumnScope != Enums_1.ReportColumnScope.BespokeColumns) {
            this.props.Data.ColumnIds = [];
        }
    };
    ReportColumnTypeWizard.prototype.Back = function () {
        //todo
    };
    ReportColumnTypeWizard.prototype.GetIndexStepIncrement = function () {
        return this.state.ReportColumnScope == Enums_1.ReportColumnScope.BespokeColumns ? 1 : 2;
    };
    ReportColumnTypeWizard.prototype.GetIndexStepDecrement = function () {
        return 1;
    };
    return ReportColumnTypeWizard;
}(React.Component));
exports.ReportColumnTypeWizard = ReportColumnTypeWizard;
