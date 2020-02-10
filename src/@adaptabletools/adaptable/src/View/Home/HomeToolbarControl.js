"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var react_redux_1 = require("react-redux");
var lodash_1 = require("lodash");
var PopupRedux = require("../../Redux/ActionsReducers/PopupRedux");
var DashboardRedux = require("../../Redux/ActionsReducers/DashboardRedux");
var SystemRedux = require("../../Redux/ActionsReducers/SystemRedux");
var PanelDashboard_1 = require("../Components/Panels/PanelDashboard");
var StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
var ScreenPopups = require("../../Utilities/Constants/ScreenPopups");
var GeneralConstants = require("../../Utilities/Constants/GeneralConstants");
var Enums_1 = require("../../PredefinedConfig/Common/Enums");
var StringExtensions_1 = require("../../Utilities/Extensions/StringExtensions");
var ArrayExtensions_1 = require("../../Utilities/Extensions/ArrayExtensions");
var ColumnHelper_1 = require("../../Utilities/Helpers/ColumnHelper");
var UIHelper_1 = require("../UIHelper");
var CheckBox_1 = require("../../components/CheckBox");
var SimpleButton_1 = require("../../components/SimpleButton");
var DropdownButton_1 = require("../../components/DropdownButton");
var rebass_1 = require("rebass");
var icons_1 = require("../../components/icons");
var preventDefault = function (e) { return e.preventDefault(); };
var HomeToolbarControlComponent = /** @class */ (function (_super) {
    tslib_1.__extends(HomeToolbarControlComponent, _super);
    function HomeToolbarControlComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.state = { configMenuItems: [] };
        return _this;
    }
    HomeToolbarControlComponent.prototype.render = function () {
        var _this = this;
        var functionsGlyph = React.createElement(icons_1.Icon, { name: 'home' });
        var colsGlyph = React.createElement(icons_1.Icon, { name: 'list' });
        var toolbarsGlyph = React.createElement(icons_1.Icon, { name: 'align-justify' });
        // List strategies that are allowed - i.e. are offered by Adaptable instance and are not Hidden Entitlement
        var strategyKeys = tslib_1.__spread(this.props.Adaptable.strategies.keys());
        var allowedMenuItems = this.props.GridState.MainMenuItems.filter(function (x) { return x.IsVisible && ArrayExtensions_1.ArrayExtensions.NotContainsItem(strategyKeys, x); });
        // function menu items
        var menuItems = allowedMenuItems.map(function (menuItem) {
            return {
                disabled: _this.props.AccessLevel == Enums_1.AccessLevel.ReadOnly,
                onClick: function () { return _this.onClick(menuItem); },
                icon: React.createElement(icons_1.Icon, { name: menuItem.Icon }),
                label: menuItem.Label,
            };
        });
        // column items
        var colItems = [
            {
                clickable: false,
                label: (React.createElement("div", { key: "colTitle" },
                    ' ',
                    "\u00A0\u00A0",
                    React.createElement("b", null, 'Columns'))),
            },
        ];
        this.props.Columns.forEach(function (col, index) {
            colItems.push({
                id: col.ColumnId,
                onClick: function (e) {
                    _this.onSetColumnVisibility(col.ColumnId);
                },
                label: (React.createElement(CheckBox_1.default, { as: "div", className: "ab-dd-checkbox", my: 0, value: col.ColumnId, key: col.ColumnId, checked: col.Visible, onMouseDown: preventDefault }, col.FriendlyName)),
            });
        });
        // toolbar items
        var toolbarItems = [];
        var allowedMenuNames = allowedMenuItems.map(function (vm) {
            return vm.FunctionName;
        });
        toolbarItems.push({
            clickable: false,
            label: (React.createElement("div", { key: "toolbarTitle" },
                ' ',
                "\u00A0\u00A0",
                React.createElement("b", null, 'Toolbars'))),
        });
        this.props.DashboardState.AvailableToolbars.forEach(function (toolbar, index) {
            // let myToolbar: string = toolbar as string;
            if (ArrayExtensions_1.ArrayExtensions.ContainsItem(allowedMenuNames, toolbar)) {
                var isVisible = ArrayExtensions_1.ArrayExtensions.ContainsItem(_this.props.DashboardState.VisibleToolbars, toolbar);
                var functionName = StrategyConstants.getFriendlyNameForStrategyId(toolbar);
                var toolbarItem = _this.createToolbar(toolbar, functionName, isVisible);
                toolbarItems.push(toolbarItem);
            }
        });
        this.props.DashboardState.CustomToolbars.forEach(function (toolbar, index) {
            var isVisible = ArrayExtensions_1.ArrayExtensions.ContainsItem(_this.props.DashboardState.VisibleToolbars, toolbar.Name);
            var toolbarItem = _this.createToolbar(toolbar.Name, toolbar.Title, isVisible);
            toolbarItems.push(toolbarItem);
        });
        // status button
        var statusButton = (React.createElement(SimpleButton_1.default, { variant: "text", className: "ab-DashboardToolbar__Home__status", key: 'systemstatus', icon: UIHelper_1.UIHelper.getGlyphForMessageType(this.props.StatusType), style: UIHelper_1.UIHelper.getStyleForMessageType(this.props.StatusType), tooltip: 'Status: ' + this.props.StatusMessage, disabled: false, onClick: function () { return _this.onShowSystemStatus(); }, AccessLevel: Enums_1.AccessLevel.Full }));
        // gridInfo button
        var gridInfoButton = (React.createElement(SimpleButton_1.default, { tooltip: "Grid Info", icon: 'info', variant: "text", className: "ab-DashboardToolbar__Home__info", onClick: function () { return _this.onClickGridInfo(); }, AccessLevel: Enums_1.AccessLevel.Full }));
        // functions dropdown
        var functionsDropdown = (React.createElement(DropdownButton_1.default, { variant: "text", items: menuItems, tooltip: "Adaptable Functions", className: "ab-DashboardToolbar__Home__functions", key: 'dropdown-functions', id: 'dropdown-functions' }, functionsGlyph));
        // columns dropdown
        var columnsDropDown = (React.createElement(DropdownButton_1.default, { variant: "text", collapseOnItemClick: false, items: colItems, columns: ['label'], className: "ab-DashboardToolbar__Home__columns", key: 'dropdown-cols', id: 'dropdown-cols', tooltip: "Select Columns" }, colsGlyph));
        // toolbars dropdown
        var toolbarsDropDown = (React.createElement(DropdownButton_1.default, { variant: "text", collapseOnItemClick: false, key: 'dropdown-toolbars', id: 'dropdown-toolbars', className: "ab-DashboardToolbar__Home__toolbars", columns: ['label'], items: toolbarItems, tooltip: "Manage Toolbars" }, toolbarsGlyph));
        // shortcuts
        var shortcutsArray = this.props.DashboardState.VisibleButtons;
        var shortcuts;
        if (shortcutsArray) {
            shortcuts = shortcutsArray.map(function (x) {
                var menuItem = _this.props.GridState.MainMenuItems.find(function (y) { return y.IsVisible && y.FunctionName == x; });
                if (menuItem) {
                    return (React.createElement(SimpleButton_1.default, { key: menuItem.Label, icon: menuItem.Icon, variant: "text", className: "ab-DashboardToolbar__Home__" + lodash_1.kebabCase(menuItem.Label), tooltip: menuItem.Label, disabled: _this.props.AccessLevel == Enums_1.AccessLevel.ReadOnly, onClick: function () { return _this.onClick(menuItem); }, AccessLevel: Enums_1.AccessLevel.Full }));
                }
            });
        }
        var toolbarTitle = this.props.DashboardState.HomeToolbarTitle;
        if (StringExtensions_1.StringExtensions.IsNullOrEmpty(toolbarTitle)) {
            toolbarTitle = this.props.Adaptable.adaptableOptions.adaptableId;
            if (toolbarTitle == GeneralConstants.USER_NAME) {
                toolbarTitle = 'Adaptable ';
            }
        }
        return (React.createElement(PanelDashboard_1.PanelDashboard, { className: "ab-DashboardToolbar__Home", showCloseButton: false, showMinimiseButton: true, onMinimise: function () { return _this.props.onSetDashboardVisibility(Enums_1.Visibility.Minimised); }, headerText: toolbarTitle, glyphicon: 'home', showGlyphIcon: false, onClose: function () { return _this.props.onClose(StrategyConstants.HomeStrategyId); }, onConfigure: function () { return _this.props.onConfigure(); } },
            React.createElement(rebass_1.Flex, { flexDirection: "row" },
                this.props.DashboardState.ShowFunctionsDropdown && functionsDropdown,
                this.props.DashboardState.ShowSystemStatusButton && statusButton,
                this.props.DashboardState.ShowGridInfoButton && gridInfoButton,
                shortcuts,
                this.props.DashboardState.ShowColumnsDropdown && columnsDropDown,
                this.props.DashboardState.ShowToolbarsDropdown && toolbarsDropDown)));
    };
    HomeToolbarControlComponent.prototype.createToolbar = function (toolbar, title, isVisible) {
        var _this = this;
        var test = {
            id: toolbar,
            onClick: function (e) {
                _this.onSetToolbarVisibility(toolbar, !isVisible);
            },
            label: (React.createElement(CheckBox_1.default, { className: "ab-dd-checkbox", my: 0, as: "div", value: toolbar, key: toolbar, checked: isVisible, onMouseDown: preventDefault }, title)),
        };
        return test;
    };
    HomeToolbarControlComponent.prototype.onClick = function (menuItem) {
        this.props.onClick(menuItem.ReduxAction);
    };
    HomeToolbarControlComponent.prototype.onShowSystemStatus = function () {
        this.props.Adaptable.api.systemStatusApi.showSystemStatusPopup();
    };
    HomeToolbarControlComponent.prototype.onClickGridInfo = function () {
        this.props.onShowGridInfo();
    };
    HomeToolbarControlComponent.prototype.onSetColumnVisibility = function (name) {
        var changedColumn = ColumnHelper_1.ColumnHelper.getColumnFromId(name, this.props.Columns);
        var columns = [].concat(this.props.Columns);
        changedColumn = Object.assign({}, changedColumn, {
            Visible: !changedColumn.Visible,
        });
        var index = columns.findIndex(function (x) { return x.ColumnId == name; });
        columns[index] = changedColumn;
        this.props.onNewColumnListOrder(columns.filter(function (c) { return c.Visible; }));
    };
    HomeToolbarControlComponent.prototype.onSetToolbarVisibility = function (name, checked) {
        //const strategy: string = this.props.DashboardState.AvailableToolbars.find(at => at == name);
        var visibleToolbars = [].concat(this.props.DashboardState.VisibleToolbars);
        if (checked) {
            visibleToolbars.push(name);
        }
        else {
            var index = visibleToolbars.findIndex(function (vt) { return vt == name; });
            visibleToolbars.splice(index, 1);
        }
        this.props.onSetToolbarVisibility(visibleToolbars);
    };
    return HomeToolbarControlComponent;
}(React.Component));
function mapStateToProps(state, ownProps) {
    return {
        GridState: state.Grid,
        DashboardState: state.Dashboard,
        Columns: state.Grid.Columns,
        StatusMessage: state.SystemStatus.StatusMessage,
        StatusType: state.SystemStatus.StatusType,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        onClick: function (action) { return dispatch(action); },
        onClose: function (toolbar) {
            return dispatch(DashboardRedux.DashboardHideToolbar(toolbar));
        },
        onConfigure: function () {
            return dispatch(PopupRedux.PopupShowScreen(StrategyConstants.HomeStrategyId, ScreenPopups.DashboardPopup));
        },
        onNewColumnListOrder: function (VisibleColumnList) {
            return dispatch(SystemRedux.SetNewColumnListOrder(VisibleColumnList));
        },
        onSetDashboardVisibility: function (visibility) {
            return dispatch(DashboardRedux.DashboardSetVisibility(visibility));
        },
        onSetToolbarVisibility: function (toolbars) {
            return dispatch(DashboardRedux.DashboardSetToolbars(toolbars));
        },
        onShowGridInfo: function () { return dispatch(PopupRedux.PopupShowGridInfo()); },
    };
}
exports.HomeToolbarControl = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(HomeToolbarControlComponent);
