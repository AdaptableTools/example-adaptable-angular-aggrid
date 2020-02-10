"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var Enums_1 = require("../../../PredefinedConfig/Common/Enums");
var rebass_1 = require("rebass");
var Radio_1 = require("../../../components/Radio");
var WizardPanel_1 = require("../../../components/WizardPanel");
var HelpBlock_1 = require("../../../components/HelpBlock");
var AlertTypeWizard = /** @class */ (function (_super) {
    tslib_1.__extends(AlertTypeWizard, _super);
    function AlertTypeWizard(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            MessageType: _this.props.Data.MessageType,
        };
        return _this;
    }
    AlertTypeWizard.prototype.render = function () {
        var _this = this;
        return (React.createElement(React.Fragment, null,
            React.createElement(WizardPanel_1.default, { border: "none" },
                React.createElement(rebass_1.Flex, { flexDirection: "column", padding: 2 },
                    React.createElement(HelpBlock_1.default, null, 'Define what type of message will be shown when the Alert is triggered.'),
                    React.createElement(rebass_1.Box, null,
                        React.createElement(Radio_1.default, { marginLeft: 1, value: "Info", name: "type", checked: this.state.MessageType == Enums_1.MessageType.Info, onChange: function (x, e) { return _this.onMessageTypeSelectChanged(e); } }, "Info")),
                    React.createElement(rebass_1.Box, null,
                        React.createElement(Radio_1.default, { marginLeft: 1, value: "Success", name: "type", checked: this.state.MessageType == Enums_1.MessageType.Success, onChange: function (x, e) { return _this.onMessageTypeSelectChanged(e); } }, "Success"),
                        ' '),
                    React.createElement(rebass_1.Box, null,
                        React.createElement(Radio_1.default, { marginLeft: 1, name: "type", value: "Warning", checked: this.state.MessageType == Enums_1.MessageType.Warning, onChange: function (x, e) { return _this.onMessageTypeSelectChanged(e); } }, "Warning"),
                        ' '),
                    React.createElement(rebass_1.Box, null,
                        React.createElement(Radio_1.default, { marginLeft: 1, value: "Error", name: "type", checked: this.state.MessageType == Enums_1.MessageType.Error, onChange: function (x, e) { return _this.onMessageTypeSelectChanged(e); } }, "Error"))))));
    };
    AlertTypeWizard.prototype.onMessageTypeSelectChanged = function (event) {
        var _this = this;
        var e = event.target;
        if (e.value == 'Info') {
            this.setState({ MessageType: Enums_1.MessageType.Info }, function () {
                return _this.props.UpdateGoBackState();
            });
        }
        else if (e.value == 'Success') {
            this.setState({ MessageType: Enums_1.MessageType.Success }, function () {
                return _this.props.UpdateGoBackState();
            });
        }
        else if (e.value == 'Warning') {
            this.setState({ MessageType: Enums_1.MessageType.Warning }, function () {
                return _this.props.UpdateGoBackState();
            });
        }
        else if (e.value == 'Error') {
            this.setState({ MessageType: Enums_1.MessageType.Error }, function () {
                return _this.props.UpdateGoBackState();
            });
        }
    };
    AlertTypeWizard.prototype.canNext = function () {
        return this.state.MessageType != null;
    };
    AlertTypeWizard.prototype.canBack = function () {
        return true;
    };
    AlertTypeWizard.prototype.Next = function () {
        this.props.Data.MessageType = this.state.MessageType;
    };
    AlertTypeWizard.prototype.Back = function () {
        // todo
    };
    AlertTypeWizard.prototype.GetIndexStepIncrement = function () {
        return 1;
    };
    AlertTypeWizard.prototype.GetIndexStepDecrement = function () {
        return 1;
    };
    return AlertTypeWizard;
}(React.Component));
exports.AlertTypeWizard = AlertTypeWizard;
