"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var StringExtensions_1 = require("../../../Utilities/Extensions/StringExtensions");
var FieldWrap_1 = require("../../../components/FieldWrap");
var SimpleButton_1 = require("../../../components/SimpleButton");
var Input_1 = require("../../../components/Input");
var AdaptableFormControlTextClear = /** @class */ (function (_super) {
    tslib_1.__extends(AdaptableFormControlTextClear, _super);
    function AdaptableFormControlTextClear() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AdaptableFormControlTextClear.prototype.render = function () {
        var _this = this;
        var closeButtonTooltip = this.props.value ? 'clear' : null;
        return (React.createElement(FieldWrap_1.default, { className: this.props.className, style: tslib_1.__assign({ background: 'var(--ab-color-defaultbackground)', overflow: 'visible', width: '100%' }, this.props.style) },
            React.createElement(Input_1.default, { autoFocus: this.props.autoFocus, style: this.props.inputStyle, type: "text", placeholder: this.props.placeholder, value: this.props.value, onChange: function (x) { return _this.props.OnTextChange(x.target.value); } }),
            React.createElement(SimpleButton_1.default, { variant: "text", icon: "clear", tone: "none", tooltip: closeButtonTooltip, px: 0, py: 0, marginRight: 1, onClick: function (event) {
                    _this.props.OnTextChange('');
                    var target = event.target;
                    var input = target.previousSibling;
                    requestAnimationFrame(function () {
                        if (input && input.focus) {
                            input.focus();
                        }
                    });
                }, disabled: StringExtensions_1.StringExtensions.IsNullOrEmpty(this.props.value.toString()) })));
    };
    return AdaptableFormControlTextClear;
}(React.Component));
exports.AdaptableFormControlTextClear = AdaptableFormControlTextClear;
