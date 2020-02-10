"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var lodash_1 = require("lodash");
var ToolPanelRedux = require("../../../Redux/ActionsReducers/ToolPanelRedux");
var SystemRedux = require("../../../Redux/ActionsReducers/SystemRedux");
var PopupRedux = require("../../../Redux/ActionsReducers/PopupRedux");
var react_redux_1 = require("react-redux");
var react_dom_1 = require("react-dom");
var StrategyConstants = require("../../../Utilities/Constants/StrategyConstants");
var Enums_1 = require("../../../PredefinedConfig/Common/Enums");
var rebass_1 = require("rebass");
var ArrayExtensions_1 = require("../../../Utilities/Extensions/ArrayExtensions");
var AdaptableHelper_1 = require("../../../Utilities/Helpers/AdaptableHelper");
var AdaptableViewFactory_1 = require("../../AdaptableViewFactory");
var LoggingHelper_1 = require("../../../Utilities/Helpers/LoggingHelper");
var icons_1 = require("../../../components/icons");
var CheckBox_1 = require("../../../components/CheckBox");
var styled_components_1 = require("styled-components");
var theme_1 = require("../../../theme");
var DropdownButton_1 = require("../../../components/DropdownButton");
var SimpleButton_1 = require("../../../components/SimpleButton");
var ButtonConfigure_1 = require("../Buttons/ButtonConfigure");
var ColumnHelper_1 = require("../../../Utilities/Helpers/ColumnHelper");
var preventDefault = function (e) { return e.preventDefault(); };
var AdaptableToolPanelComponent = /** @class */ (function (_super) {
    tslib_1.__extends(AdaptableToolPanelComponent, _super);
    function AdaptableToolPanelComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {};
        return _this;
    }
    AdaptableToolPanelComponent.prototype.render = function () {
        var _a;
        var _this = this;
        var functionsGlyph = React.createElement(icons_1.Icon, { name: 'home' });
        var colsGlyph = React.createElement(icons_1.Icon, { name: 'list' });
        var toolPanelsGlyph = React.createElement(icons_1.Icon, { name: 'align-justify' });
        // shortcuts
        var shortcutsArray = this.props.VisibleButtons;
        var shortcuts = shortcutsArray
            ? shortcutsArray.map(function (x) {
                var menuItem = _this.props.MainMenuItems.find(function (y) { return y.IsVisible && y.FunctionName == x; });
                if (menuItem) {
                    return (React.createElement(SimpleButton_1.default, { key: menuItem.Label, icon: menuItem.Icon, variant: "text", className: "ab-ToolPanel__Home__" + lodash_1.kebabCase(menuItem.Label), tooltip: menuItem.Label, 
                        //  disabled={this.props.AccessLevel == AccessLevel.ReadOnly}
                        onClick: function () { return _this.props.onClick(menuItem.ReduxAction); }, AccessLevel: Enums_1.AccessLevel.Full }));
                }
            })
            : null;
        var clonedShortcuts = Object.assign([], shortcuts);
        var grouped_shortcuts = clonedShortcuts
            .map(function () { return clonedShortcuts.splice(0, 7); })
            .filter(function (a) { return a; });
        var grouped_shortcut_rows = grouped_shortcuts.map(function (gs) {
            return (React.createElement(rebass_1.Flex, { flexDirection: "row", justifyContent: "left", padding: 1, style: { width: '100%' } }, gs));
        });
        // Build the Tool Panels
        var hiddenEntitlements = this.props.FunctionEntitlements.filter(function (e) { return e.AccessLevel == 'Hidden'; });
        var visibleToolPanels = this.props.VisibleToolsPanels.filter(function (vt) {
            return ArrayExtensions_1.default.NotContainsItem(hiddenEntitlements, vt);
        });
        var visibleToolPanelControls = visibleToolPanels.map(function (control, idx) {
            var accessLevel = AdaptableHelper_1.default.getEntitlementAccessLevelForStrategy(_this.props.FunctionEntitlements, control);
            if (accessLevel != Enums_1.AccessLevel.Hidden) {
                var toolPanel = AdaptableViewFactory_1.AdaptableToolPanelFactory.get(control);
                if (toolPanel) {
                    var toolPanelElememt = React.createElement(toolPanel, {
                        AccessLevel: accessLevel,
                        AdaptableApi: _this.props.Adaptable.api,
                        Adaptable: _this.props.Adaptable,
                        Columns: _this.props.Adaptable.api.gridApi.getColumns(),
                    });
                    return (React.createElement(rebass_1.Box, { key: control, marginTop: 1, marginRight: 1, className: "ab-ToolPanel__container ab-ToolPanel__container--" + control }, toolPanelElememt));
                }
                else {
                    LoggingHelper_1.default.LogAdaptableError('Cannot find ToolPanel Control for ' + control);
                }
            }
        });
        var strategyKeys = tslib_1.__spread(this.props.Adaptable.strategies.keys());
        var allowedMenuItems = this.props.MainMenuItems.filter(function (x) { return x.IsVisible && ArrayExtensions_1.default.NotContainsItem(strategyKeys, x); });
        // function menu items
        var menuItems = allowedMenuItems.map(function (menuItem) {
            return {
                //  disabled: this.props.AccessLevel == AccessLevel.ReadOnly,
                onClick: function () { return _this.props.onClick(menuItem.ReduxAction); },
                icon: React.createElement(icons_1.Icon, { name: menuItem.Icon }),
                label: menuItem.Label,
            };
        });
        // gridInfo button
        var gridInfoButton = (React.createElement(SimpleButton_1.default, { tooltip: "Grid Info", icon: 'info', variant: "text", className: "ab-ToolPanel__info", onClick: function () { return _this.onClickGridInfo(); }, AccessLevel: Enums_1.AccessLevel.Full }));
        var functionsDropdown = (React.createElement(DropdownButton_1.default, { variant: "text", items: menuItems, tooltip: "Adaptable Functions", className: "ab-ToolPanel__functions", key: 'dropdown-functions', id: 'dropdown-functions' }, functionsGlyph));
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
        // toolpanel items
        var toolpanelItems = [];
        var allowedMenuNames = allowedMenuItems.map(function (vm) {
            return vm.FunctionName;
        });
        toolpanelItems.push({
            clickable: false,
            label: (React.createElement("div", { key: "toolPanelTitle" },
                ' ',
                "\u00A0\u00A0",
                React.createElement("b", null, 'Tool Panels'))),
        });
        this.props.AvailableToolPanels.forEach(function (toolPanel, index) {
            if (ArrayExtensions_1.default.ContainsItem(allowedMenuNames, toolPanel)) {
                var isVisible_1 = ArrayExtensions_1.default.ContainsItem(_this.props.VisibleToolsPanels, toolPanel);
                var functionName = StrategyConstants.getFriendlyNameForStrategyId(toolPanel);
                toolpanelItems.push({
                    id: toolPanel,
                    onClick: function (e) {
                        _this.onSetToolPanelVisibility(toolPanel, !isVisible_1);
                    },
                    label: (React.createElement(CheckBox_1.default, { className: "ab-dd-checkbox", my: 0, as: "div", value: toolPanel, key: toolPanel, checked: isVisible_1, onMouseDown: preventDefault }, functionName)),
                });
            }
        });
        // columns dropdown
        var columnsDropDown = (React.createElement(DropdownButton_1.default, { listMinWidth: 150, variant: "text", collapseOnItemClick: false, items: colItems, columns: ['label'], className: "ab-Toolpanel__columns", key: 'dropdown-cols', id: 'dropdown-cols', tooltip: "Select Columns" }, colsGlyph));
        var toolPanelsDropDown = (React.createElement(DropdownButton_1.default, { variant: "text", collapseOnItemClick: false, key: 'dropdown-toolpanels', id: 'dropdown-toolpanels', className: "ab-ToolPanel__toolbars", columns: ['label'], items: toolpanelItems, tooltip: "Manage Tool Panels" }, toolPanelsGlyph));
        var configureButton = (React.createElement(ButtonConfigure_1.ButtonConfigure, { iconSize: 16, marginLeft: 2, className: "ab-ToolPanel__configure-button", tooltip: 'Configure ToolPanels', onClick: function () {
                _this.props.Adaptable.api.toolPanelApi.showToolPanelPopup();
            } }));
        return (React.createElement(rebass_1.Flex, { flexDirection: "column", justifyContent: "center", padding: 2, style: (_a = {
                    width: '100%'
                },
                _a['--ab-cmp-ToolPanelpanel_body__background'] = 'var(--ab-color-primary)',
                _a) },
            React.createElement(rebass_1.Flex, { flexDirection: "row", justifyContent: "left", padding: 1, style: { width: '100%' } },
                this.props.ShowFunctionsDropdown && functionsDropdown,
                this.props.ShowToolPanelsDropdown && toolPanelsDropDown,
                this.props.ShowColumnsDropdown && columnsDropDown,
                this.props.ShowGridInfoButton && gridInfoButton,
                configureButton),
            ArrayExtensions_1.default.IsNotNullOrEmpty(shortcuts) ? React.createElement("div", null, grouped_shortcut_rows) : null,
            visibleToolPanelControls));
    };
    AdaptableToolPanelComponent.prototype.onClickGridInfo = function () {
        this.props.onShowGridInfo();
    };
    AdaptableToolPanelComponent.prototype.onSetColumnVisibility = function (name) {
        var changedColumn = ColumnHelper_1.default.getColumnFromId(name, this.props.Columns);
        var columns = [].concat(this.props.Columns);
        changedColumn = Object.assign({}, changedColumn, {
            Visible: !changedColumn.Visible,
        });
        var index = columns.findIndex(function (x) { return x.ColumnId == name; });
        columns[index] = changedColumn;
        this.props.onNewColumnListOrder(columns.filter(function (c) { return c.Visible; }));
    };
    AdaptableToolPanelComponent.prototype.onSetToolPanelVisibility = function (name, checked) {
        var strategy = this.props.AvailableToolPanels.find(function (at) { return at == name; });
        var visibleToolPanels = [].concat(this.props.VisibleToolsPanels);
        if (checked) {
            visibleToolPanels.push(strategy);
        }
        else {
            var index = visibleToolPanels.findIndex(function (vt) { return vt == strategy; });
            visibleToolPanels.splice(index, 1);
        }
        this.props.onSetToolPanelVisibility(visibleToolPanels);
    };
    return AdaptableToolPanelComponent;
}(React.Component));
function mapStateToProps(state) {
    return {
        VisibleToolsPanels: state.ToolPanel.VisibleToolPanels,
        AvailableToolPanels: state.ToolPanel.AvailableToolPanels,
        VisibleButtons: state.ToolPanel.VisibleButtons,
        ShowFunctionsDropdown: state.ToolPanel.ShowFunctionsDropdown,
        ShowColumnsDropdown: state.ToolPanel.ShowColumnsDropdown,
        ShowToolPanelsDropdown: state.ToolPanel.ShowToolPanelsDropdown,
        ShowGridInfoButton: state.ToolPanel.ShowGridInfoButton,
        FunctionEntitlements: state.Entitlements.FunctionEntitlements,
        MainMenuItems: state.Grid.MainMenuItems,
        Columns: state.Grid.Columns,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        onClick: function (action) { return dispatch(action); },
        onNewColumnListOrder: function (VisibleColumnList) {
            return dispatch(SystemRedux.SetNewColumnListOrder(VisibleColumnList));
        },
        onSetToolPanelVisibility: function (toolPanels) {
            return dispatch(ToolPanelRedux.ToolPanelSetToolPanels(toolPanels));
        },
        onShowGridInfo: function () { return dispatch(PopupRedux.PopupShowGridInfo()); },
    };
}
exports.ConnectedAdaptableToolPanel = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(AdaptableToolPanelComponent);
exports.AdaptableToolPanelBuilder = function (ctx) {
    return /** @class */ (function () {
        function AdaptableToolPanel() {
            this.ctx = ctx;
        }
        AdaptableToolPanel.prototype.init = function (params) {
            this.gui = document.createElement('div');
            this.gui.id = 'adaptable-tool-panel_' + this.ctx.Adaptable.adaptableOptions.adaptableId;
            react_dom_1.render(React.createElement(react_redux_1.Provider, { store: this.ctx.Adaptable.AdaptableStore.TheStore },
                React.createElement(styled_components_1.ThemeProvider, { theme: theme_1.default },
                    React.createElement(exports.ConnectedAdaptableToolPanel, { Adaptable: this.ctx.Adaptable, TeamSharingActivated: false }))), this.gui);
        };
        AdaptableToolPanel.prototype.getGui = function () {
            if (!this.gui) {
                this.init();
            }
            return this.gui;
        };
        AdaptableToolPanel.prototype.refresh = function () {
            // no refresh logic needed
        };
        return AdaptableToolPanel;
    }());
};
