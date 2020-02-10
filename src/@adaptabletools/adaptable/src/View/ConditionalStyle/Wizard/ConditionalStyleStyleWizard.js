"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var StyleComponent_1 = require("../../Components/StyleComponent");
var UIHelper_1 = require("../../UIHelper");
var ConditionalStyleStyleWizard = /** @class */ (function (_super) {
    tslib_1.__extends(ConditionalStyleStyleWizard, _super);
    function ConditionalStyleStyleWizard(props) {
        var _this = _super.call(this, props) || this;
        _this.state = { Style: _this.props.Data.Style };
        return _this;
    }
    ConditionalStyleStyleWizard.prototype.render = function () {
        var _this = this;
        var canUseClassName = true; // get from somewhere...
        return (React.createElement("div", { style: { height: '100%' } },
            React.createElement(StyleComponent_1.StyleComponent, { style: { height: '100%' }, ColorPalette: this.props.ColorPalette, StyleClassNames: this.props.StyleClassNames, Style: this.props.Data.Style, UpdateStyle: function (style) { return _this.onUpdateStyle(style); }, CanUseClassName: canUseClassName })));
    };
    ConditionalStyleStyleWizard.prototype.onUpdateStyle = function (style) {
        var _this = this;
        this.setState({ Style: style }, function () {
            return _this.props.UpdateGoBackState();
        });
    };
    ConditionalStyleStyleWizard.prototype.canNext = function () {
        return UIHelper_1.UIHelper.IsNotEmptyStyle(this.state.Style);
    };
    ConditionalStyleStyleWizard.prototype.canBack = function () {
        return true;
    };
    ConditionalStyleStyleWizard.prototype.Next = function () {
        this.props.Data.Style = this.state.Style;
    };
    ConditionalStyleStyleWizard.prototype.Back = function () {
        // todod
    };
    ConditionalStyleStyleWizard.prototype.GetIndexStepIncrement = function () {
        return 1;
    };
    ConditionalStyleStyleWizard.prototype.GetIndexStepDecrement = function () {
        return 1;
    };
    return ConditionalStyleStyleWizard;
}(React.Component));
exports.ConditionalStyleStyleWizard = ConditionalStyleStyleWizard;
