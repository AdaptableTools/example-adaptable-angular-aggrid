"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var react_redux_1 = require("react-redux");
var PopupRedux = require("../../Redux/ActionsReducers/PopupRedux");
var ToolPanelRedux = require("../../Redux/ActionsReducers/ToolPanelRedux");
var ThemeRedux = require("../../Redux/ActionsReducers/ThemeRedux");
var StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
var ScreenPopups = require("../../Utilities/Constants/ScreenPopups");
var GeneralConstants = require("../../Utilities/Constants/GeneralConstants");
var Enums_1 = require("../../PredefinedConfig/Common/Enums");
var join_1 = require("../../components/utils/join");
var PanelToolPanel_1 = require("../Components/Panels/PanelToolPanel");
var Dropdown_1 = require("../../components/Dropdown");
var ThemeToolPanelComponent = /** @class */ (function (_super) {
    tslib_1.__extends(ThemeToolPanelComponent, _super);
    function ThemeToolPanelComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.state = { IsMinimised: true };
        return _this;
    }
    ThemeToolPanelComponent.prototype.render = function () {
        var _this = this;
        var allThemes = tslib_1.__spread(this.props.SystemThemes, this.props.UserThemes);
        var themes = allThemes.map(function (theme, index) {
            return {
                label: theme.Description,
                value: theme.Description,
            };
        });
        var currentTheme = allThemes.find(function (theme) { return theme.Name === _this.props.CurrentTheme; });
        return (React.createElement(PanelToolPanel_1.PanelToolPanel, { className: "ab-ToolPanel__Theme", headerText: StrategyConstants.ThemeStrategyFriendlyName, onConfigure: function () { return _this.props.onConfigure(); }, onMinimiseChanged: function () { return _this.setState({ IsMinimised: !_this.state.IsMinimised }); }, isMinimised: this.state.IsMinimised, onClose: function () { return _this.props.onClose('Theme'); } }, !this.state.IsMinimised && (React.createElement("div", { className: join_1.default(this.props.AccessLevel == Enums_1.AccessLevel.ReadOnly
                ? GeneralConstants.READ_ONLY_STYLE
                : '', 'ab-ToolPanel__Theme__wrap') },
            React.createElement(Dropdown_1.default, { style: { minWidth: 170 }, className: "ab-ToolPanel__Theme__select", placeholder: "Select Theme", showEmptyItem: false, value: currentTheme.Description, options: themes, showClearButton: false, onChange: function (themeDescription) { return _this.onSelectTheme(themeDescription); } })))));
    };
    ThemeToolPanelComponent.prototype.onSelectTheme = function (themeDescription) {
        var allThemes = tslib_1.__spread(this.props.SystemThemes, this.props.UserThemes);
        var selectedTheme = allThemes.find(function (theme) { return theme.Description === themeDescription; });
        if (selectedTheme) {
            this.props.onSelectTheme(selectedTheme.Name);
        }
    };
    return ThemeToolPanelComponent;
}(React.Component));
function mapStateToProps(state, ownProps) {
    return {
        SystemThemes: state.Theme.SystemThemes,
        CurrentTheme: state.Theme.CurrentTheme,
        UserThemes: state.Theme.UserThemes,
        Entitlements: state.Entitlements.FunctionEntitlements,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        onSelectTheme: function (theme) { return dispatch(ThemeRedux.ThemeSelect(theme)); },
        onClose: function (toolPanel) {
            return dispatch(ToolPanelRedux.ToolPanelHideToolPanel(toolPanel));
        },
        onConfigure: function () {
            return dispatch(PopupRedux.PopupShowScreen(StrategyConstants.ThemeStrategyId, ScreenPopups.ThemePopup));
        },
    };
}
exports.ThemeToolPanel = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(ThemeToolPanelComponent);
