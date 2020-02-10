"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var react_redux_1 = require("react-redux");
var ThemeRedux = require("../../Redux/ActionsReducers/ThemeRedux");
var PanelWithButton_1 = require("../Components/Panels/PanelWithButton");
var StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
var rebass_1 = require("rebass");
var Dropdown_1 = require("../../components/Dropdown");
var ThemePopupComponent = /** @class */ (function (_super) {
    tslib_1.__extends(ThemePopupComponent, _super);
    function ThemePopupComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ThemePopupComponent.prototype.render = function () {
        var _this = this;
        var infoBody = [
            'Choose a theme to change the look & feel of Adaptable screens.',
            React.createElement("br", null),
            React.createElement("br", null),
            'Select ',
            React.createElement("i", null, "None"),
            ' if you prefer to upload your own custom theme or ',
            React.createElement("i", null, "Default"),
            ' to use the standard theme.',
        ];
        var availableThemes = [];
        this.props.SystemThemes.forEach(function (st) {
            availableThemes.push(st);
        });
        this.props.UserThemes.forEach(function (ut) {
            availableThemes.push(ut);
        });
        var optionThemes = availableThemes.map(function (theme) {
            if (typeof theme === 'string') {
                // protection against old state, which could be string
                theme = {
                    Name: theme,
                    Description: theme,
                };
            }
            return {
                value: theme.Name,
                label: theme.Description,
            };
        });
        return (React.createElement(rebass_1.Flex, { flex: 1, flexDirection: "column" },
            React.createElement(PanelWithButton_1.PanelWithButton, { headerText: StrategyConstants.ThemeStrategyFriendlyName, glyphicon: StrategyConstants.ThemeGlyph, infoBody: infoBody },
                React.createElement(React.Fragment, null,
                    React.createElement(rebass_1.Flex, { flexDirection: "row", alignItems: "center", marginTop: 3 },
                        React.createElement(rebass_1.Text, { style: { flex: 2 }, textAlign: "end", marginRight: 2 }, "Current Theme:"),
                        React.createElement(rebass_1.Flex, { flex: 7, flexDirection: "row", alignItems: "center" },
                            React.createElement(Dropdown_1.default, { style: { width: '50%', minWidth: 200 }, placeholder: "Select theme", showEmptyItem: false, showClearButton: false, value: this.props.CurrentTheme, onChange: function (value) { return _this.onChangeTheme(value); }, options: optionThemes })))))));
    };
    ThemePopupComponent.prototype.onChangeTheme = function (value) {
        this.props.SelectTheme(value);
    };
    return ThemePopupComponent;
}(React.Component));
function mapStateToProps(state, ownProps) {
    return {
        SystemThemes: state.Theme.SystemThemes,
        UserThemes: state.Theme.UserThemes,
        CurrentTheme: state.Theme.CurrentTheme,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        SelectTheme: function (newTheme) { return dispatch(ThemeRedux.ThemeSelect(newTheme)); },
    };
}
exports.ThemePopup = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(ThemePopupComponent);
