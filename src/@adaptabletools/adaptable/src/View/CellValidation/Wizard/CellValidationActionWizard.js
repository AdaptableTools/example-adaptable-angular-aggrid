"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var Enums_1 = require("../../../PredefinedConfig/Common/Enums");
var rebass_1 = require("rebass");
var WizardPanel_1 = require("../../../components/WizardPanel");
var Radio_1 = require("../../../components/Radio");
var HelpBlock_1 = require("../../../components/HelpBlock");
var CellValidationActionWizard = /** @class */ (function (_super) {
    tslib_1.__extends(CellValidationActionWizard, _super);
    function CellValidationActionWizard(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            ActionMode: _this.props.Data.ActionMode,
        };
        return _this;
    }
    CellValidationActionWizard.prototype.render = function () {
        var _this = this;
        return (React.createElement(WizardPanel_1.default, null,
            React.createElement(rebass_1.Flex, { flexDirection: "column", padding: 2 },
                React.createElement(HelpBlock_1.default, null, "Disallow all cell edits that break the validation rule - with no override available."),
                React.createElement(Radio_1.default, { value: Enums_1.ActionMode.StopEdit, marginRight: 3, checked: this.state.ActionMode == Enums_1.ActionMode.StopEdit, onChange: function (_, e) { return _this.onActionModeChanged(e); } }, "Prevent the cell edit"),
                ' ',
                React.createElement(HelpBlock_1.default, null, "Display a warning that the validation rule has been broken. If this is overriden, the edit will be allowed."),
                React.createElement(Radio_1.default, { marginRight: 3, value: Enums_1.ActionMode.WarnUser, checked: this.state.ActionMode == Enums_1.ActionMode.WarnUser, onChange: function (_, e) { return _this.onActionModeChanged(e); } }, "Show a warning"),
                ' ')));
    };
    CellValidationActionWizard.prototype.onActionModeChanged = function (event) {
        var _this = this;
        var e = event.target;
        this.setState({ ActionMode: e.value }, function () {
            return _this.props.UpdateGoBackState();
        });
    };
    CellValidationActionWizard.prototype.canNext = function () {
        return true;
    };
    CellValidationActionWizard.prototype.canBack = function () {
        return true;
    };
    CellValidationActionWizard.prototype.Next = function () {
        this.props.Data.ActionMode = this.state.ActionMode;
    };
    CellValidationActionWizard.prototype.Back = function () {
        //
    };
    CellValidationActionWizard.prototype.GetIndexStepIncrement = function () {
        return 1;
    };
    CellValidationActionWizard.prototype.GetIndexStepDecrement = function () {
        return 1;
    };
    return CellValidationActionWizard;
}(React.Component));
exports.CellValidationActionWizard = CellValidationActionWizard;
