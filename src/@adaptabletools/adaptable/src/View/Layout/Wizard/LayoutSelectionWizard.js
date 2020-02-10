"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var Enums_1 = require("../../../PredefinedConfig/Common/Enums");
var WizardPanel_1 = require("../../../components/WizardPanel");
var HelpBlock_1 = require("../../../components/HelpBlock");
var rebass_1 = require("rebass");
var Radio_1 = require("../../../components/Radio");
var LayoutSelectionWizard = /** @class */ (function (_super) {
    tslib_1.__extends(LayoutSelectionWizard, _super);
    function LayoutSelectionWizard(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            LayoutSource: Enums_1.LayoutSource.Existing,
        };
        return _this;
    }
    LayoutSelectionWizard.prototype.render = function () {
        var _this = this;
        return (React.createElement(WizardPanel_1.default, null,
            React.createElement(HelpBlock_1.default, null, "Create a new layout using the Grid's current Columns and Sort Order (but not any Grouping or Pivoting details)."),
            React.createElement(rebass_1.Flex, { alignItems: "center", marginLeft: 2, marginTop: 2 },
                React.createElement(Radio_1.default, { value: "Existing", marginRight: 2, checked: this.state.LayoutSource == Enums_1.LayoutSource.Existing, onChange: function (_, e) { return _this.onScopeSelectChanged(e); } }, "Copy current Grid setup")),
            React.createElement(HelpBlock_1.default, { marginTop: 2 }, "Build a new layout from scratch. You will select the Columns, Sort Order, Grouping and Pivoting in the following steps."),
            React.createElement(rebass_1.Flex, { alignItems: "center", marginLeft: 2, marginTop: 2 },
                React.createElement(Radio_1.default, { value: "New", marginRight: 2, checked: this.state.LayoutSource == Enums_1.LayoutSource.New, onChange: function (_, e) { return _this.onScopeSelectChanged(e); } }, "Create a new Layout"))));
    };
    LayoutSelectionWizard.prototype.onScopeSelectChanged = function (event) {
        var _this = this;
        var e = event.target;
        if (e.value == 'Existing') {
            this.setState({ LayoutSource: Enums_1.LayoutSource.Existing }, function () {
                return _this.props.UpdateGoBackState();
            });
        }
        else {
            this.setState({ LayoutSource: Enums_1.LayoutSource.New, ColumnId: '' }, function () { return _this.props.UpdateGoBackState(); });
        }
    };
    LayoutSelectionWizard.prototype.canNext = function () {
        return true;
    };
    LayoutSelectionWizard.prototype.canBack = function () {
        return true;
    };
    LayoutSelectionWizard.prototype.Next = function () {
        if (this.state.LayoutSource == Enums_1.LayoutSource.Existing) {
            // need to popuplate the layout
            var visibleColumns = this.props.Columns.filter(function (c) { return c.Visible; }).map(function (c) { return c.ColumnId; });
            this.props.Data.Columns = visibleColumns;
            this.props.Data.ColumnSorts = this.props.ColumnSorts;
        }
    };
    LayoutSelectionWizard.prototype.Back = function () {
        // todo
    };
    LayoutSelectionWizard.prototype.GetIndexStepIncrement = function () {
        return this.state.LayoutSource == Enums_1.LayoutSource.Existing ? 7 : 1;
    };
    LayoutSelectionWizard.prototype.GetIndexStepDecrement = function () {
        return 1;
    };
    return LayoutSelectionWizard;
}(React.Component));
exports.LayoutSelectionWizard = LayoutSelectionWizard;
