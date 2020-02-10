"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var react_redux_1 = require("react-redux");
var DashboardRedux = require("../../Redux/ActionsReducers/DashboardRedux");
var StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
var DualListBoxEditor_1 = require("../Components/ListBox/DualListBoxEditor");
var PanelWithButton_1 = require("../Components/Panels/PanelWithButton");
var CheckBox_1 = require("../../components/CheckBox");
var Radio_1 = require("../../components/Radio");
var rebass_1 = require("rebass");
var HelpBlock_1 = require("../../components/HelpBlock");
var DashboardConfigView;
(function (DashboardConfigView) {
    DashboardConfigView["General"] = "General";
    DashboardConfigView["Buttons"] = "Buttons";
    DashboardConfigView["Toolbars"] = "Toolbars";
})(DashboardConfigView = exports.DashboardConfigView || (exports.DashboardConfigView = {}));
var DashboardPopupComponent = /** @class */ (function (_super) {
    tslib_1.__extends(DashboardPopupComponent, _super);
    function DashboardPopupComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            DashboardConfigView: DashboardConfigView.General,
        };
        return _this;
    }
    DashboardPopupComponent.prototype.render = function () {
        var _this = this;
        var selectedValues = [];
        this.props.DashboardState.VisibleButtons.forEach(function (x) {
            var menuItem = _this.props.GridState.MainMenuItems.find(function (m) { return m.FunctionName == x; });
            if (menuItem != null && menuItem.IsVisible) {
                selectedValues.push(StrategyConstants.getFriendlyNameForStrategyId(x));
            }
        });
        var availableToolbarNames = this.props.DashboardState.AvailableToolbars.filter(function (at) {
            return _this.isVisibleStrategy(at);
        }).map(function (at) {
            return StrategyConstants.getFriendlyNameForStrategyId(at);
        });
        var customToolbarNames = this.props.DashboardState.CustomToolbars.map(function (ct) {
            return ct.Name;
        });
        availableToolbarNames.push.apply(availableToolbarNames, tslib_1.__spread(customToolbarNames));
        var visibleToolbarNames = this.props.DashboardState.VisibleToolbars.filter(function (at) { return at; }).map(function (vt) {
            var customToolbar = _this.props.DashboardState.CustomToolbars.find(function (ct) { return ct.Name == vt; });
            if (customToolbar) {
                return vt;
            }
            else {
                var vtFunctionName = vt;
                if (_this.isVisibleStrategy(vtFunctionName)) {
                    return StrategyConstants.getFriendlyNameForStrategyId(vtFunctionName);
                }
            }
        });
        var availableValues = this.props.GridState.MainMenuItems.filter(function (x) { return x.IsVisible && selectedValues.indexOf(x.Label) == -1; }).map(function (x) { return x.Label; });
        var individualHomeToolbarOptions = (React.createElement(rebass_1.Flex, { margin: 2, flexDirection: "column" },
            React.createElement(HelpBlock_1.default, null, 'Select which items should be visible in the Home Toolbar.'),
            React.createElement(CheckBox_1.default, { onChange: function (checked) { return _this.onShowFunctionsDropdownChanged(checked); }, checked: this.props.DashboardState.ShowFunctionsDropdown }, "Functions Dropdown"),
            React.createElement(CheckBox_1.default, { onChange: function (checked) { return _this.onShowColumnsDropdownChanged(checked); }, checked: this.props.DashboardState.ShowColumnsDropdown }, "Columns Dropdown"),
            React.createElement(CheckBox_1.default, { onChange: function (checked) { return _this.onShowToolbarsDropdownChanged(checked); }, checked: this.props.DashboardState.ShowToolbarsDropdown }, "Toolbars Dropdown"),
            React.createElement(CheckBox_1.default, { onChange: function (checked) { return _this.onShowSystemStatusButtonChanged(checked); }, checked: this.props.DashboardState.ShowSystemStatusButton }, "System Status Button"),
            React.createElement(CheckBox_1.default, { onChange: function (checked) { return _this.onShowGridInfoButtonChanged(checked); }, checked: this.props.DashboardState.ShowGridInfoButton }, "About (Grid) Button")));
        return (React.createElement(PanelWithButton_1.PanelWithButton, { headerText: "Dashboard Configuration", bodyProps: { padding: 0, style: { display: 'flex', flexDirection: 'column' } }, glyphicon: StrategyConstants.DashboardGlyph },
            React.createElement(rebass_1.Flex, { flexDirection: "row", padding: 2, style: { borderBottom: '1px solid var(--ab-color-primary)' } },
                React.createElement(Radio_1.default, { value: DashboardConfigView.General, checked: this.state.DashboardConfigView == DashboardConfigView.General, onChange: function (_, e) { return _this.onShowGridPropertiesChanged(e); } }, "General Options"),
                React.createElement(Radio_1.default, { marginLeft: 3, value: DashboardConfigView.Buttons, checked: this.state.DashboardConfigView == DashboardConfigView.Buttons, onChange: function (_, e) { return _this.onShowGridPropertiesChanged(e); } }, "Function Buttons"),
                React.createElement(Radio_1.default, { marginLeft: 3, value: DashboardConfigView.Toolbars, checked: this.state.DashboardConfigView == DashboardConfigView.Toolbars, onChange: function (_, e) { return _this.onShowGridPropertiesChanged(e); } }, "Function Toolbars")),
            React.createElement(rebass_1.Box, { style: { overflow: 'auto', flex: 1, display: 'flex' }, padding: 2 },
                this.state.DashboardConfigView == DashboardConfigView.General &&
                    individualHomeToolbarOptions,
                this.state.DashboardConfigView == DashboardConfigView.Buttons && (React.createElement(DualListBoxEditor_1.DualListBoxEditor, { AvailableValues: availableValues, SelectedValues: selectedValues, HeaderAvailable: "Hidden Function Buttons", HeaderSelected: "Visible Function Buttons", onChange: function (SelectedValues) { return _this.onDashboardButtonsChanged(SelectedValues); }, DisplaySize: DualListBoxEditor_1.DisplaySize.Large })),
                this.state.DashboardConfigView == DashboardConfigView.Toolbars && (React.createElement(DualListBoxEditor_1.DualListBoxEditor, { AvailableValues: availableToolbarNames, SelectedValues: visibleToolbarNames, HeaderAvailable: "Available Toolbars", HeaderSelected: "Visible Toolbars", onChange: function (SelectedValues) { return _this.onDashboardToolbarsChanged(SelectedValues); }, DisplaySize: DualListBoxEditor_1.DisplaySize.Small })))));
    };
    DashboardPopupComponent.prototype.onShowGridPropertiesChanged = function (event) {
        var e = event.target;
        var dashboardConfigView = e.value;
        this.setState({ DashboardConfigView: dashboardConfigView });
    };
    DashboardPopupComponent.prototype.onShowFunctionsDropdownChanged = function (checked) {
        if (checked) {
            this.props.onDashboardShowFunctionsDropdown();
        }
        else {
            this.props.onDashboardHideFunctionsDropdown();
        }
    };
    DashboardPopupComponent.prototype.onShowColumnsDropdownChanged = function (checked) {
        if (checked) {
            this.props.onDashboardShowColumnsDropdown();
        }
        else {
            this.props.onDashboardHideColumnsDropdown();
        }
    };
    DashboardPopupComponent.prototype.onShowToolbarsDropdownChanged = function (checked) {
        if (checked) {
            this.props.onDashboardShowToolbarsDropdown();
        }
        else {
            this.props.onDashboardHideToolbarsDropdown();
        }
    };
    DashboardPopupComponent.prototype.onShowSystemStatusButtonChanged = function (checked) {
        if (checked) {
            this.props.onDashboardShowSystemStatusButton();
        }
        else {
            this.props.onDashboardHideSystemStatusButton();
        }
    };
    DashboardPopupComponent.prototype.onShowGridInfoButtonChanged = function (checked) {
        if (checked) {
            this.props.onDashboardShowGridInfoButton();
        }
        else {
            this.props.onDashboardHideGridInfoButton();
        }
    };
    DashboardPopupComponent.prototype.onDashboardButtonsChanged = function (selectedValues) {
        var selectedFunctions = selectedValues.map(function (sv) {
            return StrategyConstants.getIdForStrategyFriendlyName(sv);
        });
        this.props.onDashboardSetFunctionButtons(selectedFunctions);
    };
    DashboardPopupComponent.prototype.onDashboardToolbarsChanged = function (selectedValues) {
        var _this = this;
        var selectedToolbars = selectedValues.map(function (sv) {
            var customToolbar = _this.props.DashboardState.CustomToolbars.find(function (ct) { return ct.Name == sv; });
            return customToolbar ? sv : StrategyConstants.getIdForStrategyFriendlyName(sv);
        });
        this.props.onDashboardSetToolbars(selectedToolbars);
    };
    DashboardPopupComponent.prototype.isVisibleStrategy = function (functionName) {
        var entitlement = this.props.Entitlements.find(function (x) { return x.FunctionName == functionName; });
        if (entitlement) {
            return entitlement.AccessLevel != 'Hidden';
        }
        return true;
    };
    return DashboardPopupComponent;
}(React.Component));
function mapStateToProps(state, ownProps) {
    return {
        DashboardState: state.Dashboard,
        GridState: state.Grid,
        Entitlements: state.Entitlements.FunctionEntitlements,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        onDashboardSetFunctionButtons: function (functionButtons) {
            return dispatch(DashboardRedux.DashboardSetFunctionButtons(functionButtons));
        },
        onDashboardShowFunctionsDropdown: function () {
            return dispatch(DashboardRedux.DashboardShowFunctionsDropdown());
        },
        onDashboardHideFunctionsDropdown: function () {
            return dispatch(DashboardRedux.DashboardHideFunctionsDropdown());
        },
        onDashboardShowColumnsDropdown: function () { return dispatch(DashboardRedux.DashboardShowColumnsDropdown()); },
        onDashboardHideColumnsDropdown: function () { return dispatch(DashboardRedux.DashboardHideColumnsDropdown()); },
        onDashboardShowToolbarsDropdown: function () { return dispatch(DashboardRedux.DashboardShowToolbarsDropdown()); },
        onDashboardHideToolbarsDropdown: function () { return dispatch(DashboardRedux.DashboardHideToolbarsDropdown()); },
        onDashboardShowSystemStatusButton: function () {
            return dispatch(DashboardRedux.DashboardShowSystemStatusButton());
        },
        onDashboardHideSystemStatusButton: function () {
            return dispatch(DashboardRedux.DashboardHideSystemStatusButton());
        },
        onDashboardShowGridInfoButton: function () { return dispatch(DashboardRedux.DashboardShowGridInfoButton()); },
        onDashboardHideGridInfoButton: function () { return dispatch(DashboardRedux.DashboardHideGridInfoButton()); },
        onDashboardSetToolbars: function (toolbars) {
            return dispatch(DashboardRedux.DashboardSetToolbars(toolbars));
        },
    };
}
exports.DashboardPopup = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(DashboardPopupComponent);
