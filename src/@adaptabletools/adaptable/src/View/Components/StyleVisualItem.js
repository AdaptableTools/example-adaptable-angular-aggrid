"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
/// <reference path="../../typings/.d.ts" />
var EnumExtensions_1 = require("../../Utilities/Extensions/EnumExtensions");
var Enums_1 = require("../../PredefinedConfig/Common/Enums");
var StyleVisualItem = /** @class */ (function (_super) {
    tslib_1.__extends(StyleVisualItem, _super);
    function StyleVisualItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StyleVisualItem.prototype.render = function () {
        var styleVisualisation;
        if (this.props.Style.ClassName) {
            styleVisualisation = React.createElement("div", null, 'CSS Class: ' + this.props.Style.ClassName);
        }
        else {
            var backColorForStyle = this.props.Style.BackColor != undefined ? this.props.Style.BackColor : null;
            var foreColorForStyle = this.props.Style.ForeColor != undefined ? this.props.Style.ForeColor : 'black';
            var fontWeightForStyle = this.props.Style.FontWeight == Enums_1.FontWeight.Bold ? 'bold' : 'normal';
            var fontStyleForStyle = this.props.Style.FontStyle == Enums_1.FontStyle.Italic ? 'italic' : 'normal';
            var fontSizeForStyle = EnumExtensions_1.EnumExtensions.getCssFontSizeFromFontSizeEnum(this.props.Style.FontSize);
            styleVisualisation = (React.createElement("div", { className: this.props.Style.BackColor != undefined ? '' : 'ab_white_grey_stripes', style: {
                    textAlign: 'center',
                    margin: '2px',
                    padding: '3px',
                    background: backColorForStyle,
                    color: foreColorForStyle,
                    fontWeight: fontWeightForStyle,
                    fontStyle: fontStyleForStyle,
                    fontSize: fontSizeForStyle,
                } }, "Style"));
        }
        return styleVisualisation;
    };
    return StyleVisualItem;
}(React.Component));
exports.StyleVisualItem = StyleVisualItem;
