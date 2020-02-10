"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var rebass_1 = require("rebass");
var join_1 = require("../../../../components/utils/join");
var Enums_1 = require("../../../../PredefinedConfig/Common/Enums");
var Glyphicon = function (_a) {
    var glyph = _a.glyph, style = _a.style;
    return React.createElement("span", { style: style, className: "glyphicon glyphicon-" + glyph });
};
var baseClassName = 'ab-Button';
var ButtonBase = /** @class */ (function (_super) {
    tslib_1.__extends(ButtonBase, _super);
    function ButtonBase() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ButtonBase.prototype.render = function () {
        var isDisabled;
        isDisabled = this.props.AccessLevel == Enums_1.AccessLevel.Hidden;
        if (this.props.overrideDisableButton || this.props.disabled) {
            isDisabled = true;
        }
        var text = this.props.children || this.props.ToolTipAndText;
        if (this.props.overrideText) {
            text = this.props.overrideText;
        }
        var tooltip = this.props.ToolTipAndText;
        if (this.props.overrideTooltip) {
            tooltip = this.props.overrideTooltip;
        }
        var hideToolTip = this.props.hideToolTip ? this.props.hideToolTip : false;
        var content;
        if (this.props.DisplayMode == 'Glyph') {
            if (this.props.transformGlyph) {
                content = React.createElement(Glyphicon, { glyph: this.props.glyph, style: { transform: 'scale(-1, 1)' } });
            }
            else {
                content = React.createElement(Glyphicon, { glyph: this.props.glyph });
            }
        }
        else if (this.props.DisplayMode == 'Text') {
            content = React.createElement("span", null, text);
        }
        else if (this.props.DisplayMode == 'Glyph+Text') {
            content = (React.createElement("div", null,
                React.createElement(Glyphicon, { glyph: this.props.glyph }),
                " ",
                text));
        }
        else if (this.props.DisplayMode == 'Text+Glyph') {
            content = (React.createElement("div", null,
                text,
                " ",
                React.createElement(Glyphicon, { glyph: this.props.glyph })));
        }
        if (this.props.icon) {
            content = (React.createElement(React.Fragment, null,
                this.props.iconPosition === 'end' ? text : null,
                " ",
                React.createElement(Glyphicon, { glyph: this.props.icon }),
                ' ',
                this.props.iconPosition !== 'end' ? text : null));
        }
        var button = (React.createElement(rebass_1.Button, tslib_1.__assign({}, this.props, { style: tslib_1.__assign({ color: 'currentColor' }, this.props.style), className: join_1.default(baseClassName, baseClassName + "--size-" + 'normal', baseClassName + "--style-" + 'normal', isDisabled ? baseClassName + "--disabled" : baseClassName + "--enabled"), disabled: isDisabled, onClick: this.props.onClick, onMouseDown: this.props.onMouseDown || (function (e) { return e.preventDefault(); }) }), content));
        var buttonwithtooltip = React.createElement("div", null, button);
        return hideToolTip ? button : buttonwithtooltip;
    };
    ButtonBase.defaultProps = {
        overrideDisableButton: false,
        ToolTipAndText: '',
        glyph: '',
        DisplayMode: 'Glyph+Text',
        transformGlyph: false,
        AccessLevel: Enums_1.AccessLevel.Full,
        showDefaultStyle: false,
    };
    return ButtonBase;
}(React.Component));
exports.ButtonBase = ButtonBase;
