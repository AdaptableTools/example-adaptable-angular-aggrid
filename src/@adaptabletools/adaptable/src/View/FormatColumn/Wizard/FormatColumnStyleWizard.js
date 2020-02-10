"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var StyleComponent_1 = require("../../Components/StyleComponent");
var UIHelper_1 = require("../../UIHelper");
var FormatColumnStyleWizard = /** @class */ (function (_super) {
    tslib_1.__extends(FormatColumnStyleWizard, _super);
    function FormatColumnStyleWizard(props) {
        var _this = _super.call(this, props) || this;
        _this.state = { Style: _this.props.Data.Style };
        return _this;
    }
    FormatColumnStyleWizard.prototype.render = function () {
        var _this = this;
        var canUseClassName = true; // get from somewhere...
        return (React.createElement("div", null,
            React.createElement(StyleComponent_1.StyleComponent, { ColorPalette: this.props.ColorPalette, StyleClassNames: this.props.StyleClassNames, Style: this.props.Data.Style, UpdateStyle: function (style) { return _this.onUpdateStyle(style); }, CanUseClassName: canUseClassName })));
    };
    FormatColumnStyleWizard.prototype.canNext = function () {
        return UIHelper_1.UIHelper.IsNotEmptyStyle(this.state.Style);
    };
    FormatColumnStyleWizard.prototype.canBack = function () {
        return true;
    };
    FormatColumnStyleWizard.prototype.Next = function () {
        this.props.Data.Style = this.state.Style;
    };
    FormatColumnStyleWizard.prototype.Back = function () {
        // todo
    };
    FormatColumnStyleWizard.prototype.GetIndexStepIncrement = function () {
        return 1;
    };
    FormatColumnStyleWizard.prototype.GetIndexStepDecrement = function () {
        return 1;
    };
    FormatColumnStyleWizard.prototype.onUpdateStyle = function (style) {
        var _this = this;
        this.setState({ Style: style }, function () {
            return _this.props.UpdateGoBackState();
        });
    };
    return FormatColumnStyleWizard;
}(React.Component));
exports.FormatColumnStyleWizard = FormatColumnStyleWizard;
