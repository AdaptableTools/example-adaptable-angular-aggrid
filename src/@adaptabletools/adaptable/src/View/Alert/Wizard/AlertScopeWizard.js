"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var CheckBox_1 = require("../../../components/CheckBox");
var WizardPanel_1 = require("../../../components/WizardPanel");
var HelpBlock_1 = require("../../../components/HelpBlock");
var rebass_1 = require("rebass");
var AlertScopeWizard = /** @class */ (function (_super) {
    tslib_1.__extends(AlertScopeWizard, _super);
    function AlertScopeWizard(props) {
        var _this = _super.call(this, props) || this;
        _this.onShowPopupChanged = function (checked) {
            _this.setState({ ShowPopup: checked }, function () {
                return _this.props.UpdateGoBackState();
            });
        };
        _this.onHighlightCellChanged = function (checked) {
            _this.setState({ HighlightCell: checked }, function () {
                return _this.props.UpdateGoBackState();
            });
        };
        _this.onJumpToCellChanged = function (checked) {
            _this.setState({ JumpToCell: checked }, function () {
                return _this.props.UpdateGoBackState();
            });
        };
        _this.onShowInDivChanged = function (checked) {
            _this.setState({ ShowInDiv: checked }, function () {
                return _this.props.UpdateGoBackState();
            });
        };
        _this.state = {
            ShowPopup: _this.props.Data.AlertProperties.ShowPopup,
            HighlightCell: _this.props.Data.AlertProperties.HighlightCell,
            JumpToCell: _this.props.Data.AlertProperties.JumpToCell,
            ShowInDiv: _this.props.Data.AlertProperties.ShowInDiv,
        };
        return _this;
    }
    AlertScopeWizard.prototype.render = function () {
        return (React.createElement(React.Fragment, null,
            React.createElement(WizardPanel_1.default, { border: "none" },
                React.createElement(rebass_1.Flex, { flexDirection: "column", padding: 2 },
                    React.createElement(rebass_1.Box, null,
                        React.createElement(HelpBlock_1.default, null, 'Display Alert as a Popup - coloured according to the message type.'),
                        React.createElement(CheckBox_1.default, { marginLeft: 2, checked: this.state.ShowPopup == true, onChange: this.onShowPopupChanged }, "Show as Popup")),
                    React.createElement(rebass_1.Box, { marginTop: 2 },
                        React.createElement(HelpBlock_1.default, null, 'Colour the cell that triggered the Alert according to the Alert message type'),
                        React.createElement(CheckBox_1.default, { marginLeft: 2, checked: this.state.HighlightCell == true, onChange: this.onHighlightCellChanged }, "Highight Cell")),
                    React.createElement(rebass_1.Box, { marginTop: 2 },
                        React.createElement(HelpBlock_1.default, null, 'Make Grid move in order to display the row which contains the cell that raiggered the Alert'),
                        React.createElement(CheckBox_1.default, { marginLeft: 2, checked: this.state.JumpToCell == true, onChange: this.onJumpToCellChanged }, "Jump To Cell")),
                    React.createElement(rebass_1.Box, { marginTop: 2 },
                        React.createElement(HelpBlock_1.default, null, 'Show the Alert in a separate <Div> (as specified in the "AlertDisplayDiv" property in Alert Config)'),
                        React.createElement(CheckBox_1.default, { marginLeft: 2, checked: this.state.ShowInDiv == true, onChange: this.onShowInDivChanged }, "Show in Div"))))));
    };
    AlertScopeWizard.prototype.canNext = function () {
        return true;
    };
    AlertScopeWizard.prototype.canBack = function () {
        return true;
    };
    AlertScopeWizard.prototype.Next = function () {
        this.props.Data.AlertProperties.ShowPopup = this.state.ShowPopup;
        this.props.Data.AlertProperties.HighlightCell = this.state.HighlightCell;
        this.props.Data.AlertProperties.JumpToCell = this.state.JumpToCell;
        this.props.Data.AlertProperties.ShowInDiv = this.state.ShowInDiv;
    };
    AlertScopeWizard.prototype.Back = function () {
        // todo
    };
    AlertScopeWizard.prototype.GetIndexStepIncrement = function () {
        return 1;
    };
    AlertScopeWizard.prototype.GetIndexStepDecrement = function () {
        return 1;
    };
    return AlertScopeWizard;
}(React.Component));
exports.AlertScopeWizard = AlertScopeWizard;
