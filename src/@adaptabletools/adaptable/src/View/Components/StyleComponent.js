"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var Enums_1 = require("../../PredefinedConfig/Common/Enums");
var EnumExtensions_1 = require("../../Utilities/Extensions/EnumExtensions");
var ColorPicker_1 = require("../ColorPicker");
var AdaptablePopover_1 = require("../AdaptablePopover");
var rebass_1 = require("rebass");
var StringExtensions_1 = require("../../Utilities/Extensions/StringExtensions");
var CheckBox_1 = require("../../components/CheckBox");
var Panel_1 = require("../../components/Panel");
var HelpBlock_1 = require("../../components/HelpBlock");
var Dropdown_1 = require("../../components/Dropdown");
var StyleComponent = /** @class */ (function (_super) {
    tslib_1.__extends(StyleComponent, _super);
    function StyleComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            myStyle: _this.props.Style,
            ShowClassName: StringExtensions_1.StringExtensions.IsNotNullOrEmpty(_this.props.Style.ClassName),
        };
        return _this;
    }
    StyleComponent.prototype.render = function () {
        var _this = this;
        var optionFontSizes = EnumExtensions_1.EnumExtensions.getNames(Enums_1.FontSize).map(function (enumName) {
            return {
                value: enumName,
                label: enumName,
            };
        });
        var optionClassNames = this.props.StyleClassNames.map(function (scn) {
            return {
                value: scn,
                label: scn,
            };
        });
        return (React.createElement(Panel_1.default, { header: "Style", margin: 2 },
            this.props.CanUseClassName && this.props.StyleClassNames.length > 0 && (React.createElement(CheckBox_1.default, { margin: 2, onChange: function (checked) { return _this.onShowClassNameChanged(checked); }, checked: this.state.ShowClassName }, "Use Style Class Name")),
            this.state.ShowClassName ? (React.createElement("div", null,
                React.createElement(HelpBlock_1.default, null, 'Choose a style name from the dropdown.'),
                React.createElement(rebass_1.Text, { color: 'var(--ab-color-warn)', style: { flex: 2 }, margin: 2 }, 'Note: You need to ensure that the styles listed are in the current stylesheet.'),
                React.createElement(Dropdown_1.default, { placeholder: "select", showEmptyItem: false, showClearButton: false, value: this.state.myStyle.ClassName, onChange: function (value) { return _this.onStyleClassNameChanged(value); }, options: tslib_1.__spread([
                        {
                            value: 'select',
                            label: 'Select Style Class Name',
                        }
                    ], optionClassNames) }))) : (React.createElement(rebass_1.Flex, { flexDirection: "column" },
                React.createElement(rebass_1.Flex, { flex: 1 },
                    React.createElement("div", null,
                        React.createElement(HelpBlock_1.default, { marginTop: 2 }, "Set colours by ticking a checkbox and selecting from the dropdown; leave unchecked to use cell's existing colours."),
                        React.createElement(rebass_1.Flex, { flexDirection: "column", margin: 1 },
                            React.createElement(rebass_1.Flex, { flexDirection: "row", alignItems: "center" },
                                React.createElement(CheckBox_1.default, { value: "existing", marginLeft: 1, marginRight: 3, checked: this.state.myStyle.BackColor ? true : false, onChange: function (checked) { return _this.onUseBackColorCheckChange(checked); } }, "Set Back Colour"),
                                this.state.myStyle.BackColor != null && (React.createElement(ColorPicker_1.ColorPicker, { ColorPalette: this.props.ColorPalette, value: this.state.myStyle.BackColor, onChange: function (x) { return _this.onBackColorSelectChange(x); } }))),
                            React.createElement(rebass_1.Flex, { flexDirection: "row", alignItems: "center" },
                                React.createElement(CheckBox_1.default, { marginLeft: 1, marginRight: 3, value: "existing", checked: this.state.myStyle.ForeColor ? true : false, onChange: function (checked) { return _this.onUseForeColorCheckChange(checked); } }, "Set Fore Colour"),
                                this.state.myStyle.ForeColor != null && (React.createElement(ColorPicker_1.ColorPicker, { ColorPalette: this.props.ColorPalette, value: this.state.myStyle.ForeColor, onChange: function (x) { return _this.onForeColorSelectChange(x); } })))),
                        React.createElement(HelpBlock_1.default, { marginTop: 2 }, "Set the font properties of the Style."),
                        React.createElement(rebass_1.Flex, { flexDirection: "column" },
                            React.createElement(CheckBox_1.default, { marginLeft: 1, value: Enums_1.FontWeight.Normal.toString(), checked: this.state.myStyle.FontWeight == Enums_1.FontWeight.Bold, onChange: function (checked) { return _this.onFontWeightChange(checked); } }, "Bold"),
                            React.createElement(CheckBox_1.default, { marginLeft: 1, value: Enums_1.FontStyle.Normal.toString(), checked: this.state.myStyle.FontStyle == Enums_1.FontStyle.Italic, onChange: function (checked) { return _this.onFontStyleChange(checked); } }, "Italic"),
                            React.createElement(rebass_1.Box, null,
                                React.createElement(CheckBox_1.default, { marginLeft: 1, checked: this.state.myStyle.FontSize ? true : false, onChange: function (checked) { return _this.onUseFontSizeCheckChange(checked); } }, "Set Font Size")),
                            React.createElement(rebass_1.Box, null, this.state.myStyle.FontSize != null && (React.createElement(rebass_1.Flex, { flexDirection: "row", alignItems: "center" },
                                React.createElement(Dropdown_1.default, { placeholder: "select", marginRight: 2, value: this.state.myStyle.FontSize.toString(), onChange: function (value) { return _this.onFontSizeChange(value); }, options: optionFontSizes }),
                                ' ',
                                React.createElement(AdaptablePopover_1.AdaptablePopover, { headerText: 'Conditional Style: Font Size', bodyText: [
                                        "Select the size of the font for the Conditional Style.  The default is 'Medium'.",
                                    ] })))))))))));
    };
    StyleComponent.prototype.onShowClassNameChanged = function (checked) {
        // clear everything
        this.state.myStyle.BackColor = null;
        this.state.myStyle.ForeColor = null;
        this.state.myStyle.FontSize = null;
        this.state.myStyle.FontStyle = null;
        this.state.myStyle.FontWeight = null;
        this.state.myStyle.ClassName = '';
        this.setState({ ShowClassName: checked });
    };
    StyleComponent.prototype.onStyleClassNameChanged = function (value) {
        this.state.myStyle.ClassName = value == 'select' ? '' : value;
        this.props.UpdateStyle(this.state.myStyle);
    };
    StyleComponent.prototype.onUseBackColorCheckChange = function (checked) {
        this.state.myStyle.BackColor = checked ? '#ffffff' : null;
        this.props.UpdateStyle(this.state.myStyle);
    };
    StyleComponent.prototype.onUseForeColorCheckChange = function (checked) {
        this.state.myStyle.ForeColor = checked ? '#000000' : null;
        this.props.UpdateStyle(this.state.myStyle);
    };
    StyleComponent.prototype.onUseFontSizeCheckChange = function (checked) {
        this.state.myStyle.FontSize = checked ? Enums_1.FontSize.Medium : null;
        this.props.UpdateStyle(this.state.myStyle);
    };
    StyleComponent.prototype.onBackColorSelectChange = function (event) {
        var e = event.target;
        this.state.myStyle.BackColor = e.value;
        this.props.UpdateStyle(this.state.myStyle);
    };
    StyleComponent.prototype.onForeColorSelectChange = function (event) {
        var e = event.target;
        this.state.myStyle.ForeColor = e.value;
        this.props.UpdateStyle(this.state.myStyle);
    };
    StyleComponent.prototype.onFontWeightChange = function (checked) {
        var fontWeight = checked ? Enums_1.FontWeight.Bold : Enums_1.FontWeight.Normal;
        this.state.myStyle.FontWeight = fontWeight;
        this.props.UpdateStyle(this.state.myStyle);
    };
    StyleComponent.prototype.onFontStyleChange = function (checked) {
        var fontStyle = checked ? Enums_1.FontStyle.Italic : Enums_1.FontStyle.Normal;
        this.state.myStyle.FontStyle = fontStyle;
        this.props.UpdateStyle(this.state.myStyle);
    };
    StyleComponent.prototype.onFontSizeChange = function (value) {
        this.state.myStyle.FontSize = value;
        this.props.UpdateStyle(this.state.myStyle);
    };
    return StyleComponent;
}(React.Component));
exports.StyleComponent = StyleComponent;
