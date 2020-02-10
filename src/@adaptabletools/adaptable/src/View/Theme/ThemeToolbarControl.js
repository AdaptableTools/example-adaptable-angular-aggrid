"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var react_redux_1 = require("react-redux");
var PopupRedux = require("../../Redux/ActionsReducers/PopupRedux");
var DashboardRedux = require("../../Redux/ActionsReducers/DashboardRedux");
var ThemeRedux = require("../../Redux/ActionsReducers/ThemeRedux");
var PanelDashboard_1 = require("../Components/Panels/PanelDashboard");
var StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
var ScreenPopups = require("../../Utilities/Constants/ScreenPopups");
var GeneralConstants = require("../../Utilities/Constants/GeneralConstants");
var Enums_1 = require("../../PredefinedConfig/Common/Enums");
var DropdownButton_1 = require("../../components/DropdownButton");
var join_1 = require("../../components/utils/join");
var ThemeToolbarControlComponent = /** @class */ (function (_super) {
    tslib_1.__extends(ThemeToolbarControlComponent, _super);
    function ThemeToolbarControlComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ThemeToolbarControlComponent.prototype.render = function () {
        var _this = this;
        var allThemes = tslib_1.__spread(this.props.SystemThemes, this.props.UserThemes);
        var themes = allThemes.map(function (theme, index) {
            if (typeof theme === 'string') {
                // protection against old state, which could be string
                theme = {
                    Name: theme,
                    Description: theme,
                };
            }
            return {
                label: theme.Description,
                onClick: function () { return _this.onSelectTheme(theme); },
            };
        });
        var currentTheme = allThemes.filter(function (theme) { return theme.Name === _this.props.CurrentTheme; })[0];
        var currentThemeDescription = currentTheme ? currentTheme.Description : this.props.CurrentTheme;
        var content = (React.createElement("div", { className: join_1.default(this.props.AccessLevel == Enums_1.AccessLevel.ReadOnly ? GeneralConstants.READ_ONLY_STYLE : '', 'ab-DashboardToolbar__Theme__wrap') },
            React.createElement(DropdownButton_1.default, { className: "ab-DashboardToolbar__Theme__select", style: {
                    maxWidth: '25rem',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                }, items: themes, columns: ['label'] }, currentThemeDescription)));
        return (React.createElement(PanelDashboard_1.PanelDashboard, { className: "ab-DashboardToolbar__Theme", headerText: StrategyConstants.ThemeStrategyFriendlyName, glyphicon: StrategyConstants.ThemeGlyph, onClose: function () { return _this.props.onClose(StrategyConstants.ThemeStrategyId); }, onConfigure: function () { return _this.props.onConfigure(); } }, content));
    };
    ThemeToolbarControlComponent.prototype.onSelectTheme = function (theme) {
        this.props.onSelectTheme(theme.Name);
    };
    return ThemeToolbarControlComponent;
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
        onClose: function (toolbar) {
            return dispatch(DashboardRedux.DashboardHideToolbar(toolbar));
        },
        onConfigure: function () {
            return dispatch(PopupRedux.PopupShowScreen(StrategyConstants.ThemeStrategyId, ScreenPopups.ThemePopup));
        },
    };
}
exports.ThemeToolbarControl = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(ThemeToolbarControlComponent);
