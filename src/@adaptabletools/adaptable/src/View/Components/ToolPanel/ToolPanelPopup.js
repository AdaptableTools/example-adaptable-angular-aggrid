"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var react_redux_1 = require("react-redux");
var ToolPanelRedux = require("../../../Redux/ActionsReducers/ToolPanelRedux");
var StrategyConstants = require("../../../Utilities/Constants/StrategyConstants");
var DualListBoxEditor_1 = require("../../Components/ListBox/DualListBoxEditor");
var PanelWithButton_1 = require("../../Components/Panels/PanelWithButton");
var CheckBox_1 = require("../../../components/CheckBox");
var Radio_1 = require("../../../components/Radio");
var rebass_1 = require("rebass");
var HelpBlock_1 = require("../../../components/HelpBlock");
var ArrayExtensions_1 = require("../../../Utilities/Extensions/ArrayExtensions");
var ToolPanelConfigView;
(function (ToolPanelConfigView) {
    ToolPanelConfigView["General"] = "General";
    ToolPanelConfigView["Buttons"] = "Buttons";
    ToolPanelConfigView["ToolPanels"] = "ToolPanels";
})(ToolPanelConfigView = exports.ToolPanelConfigView || (exports.ToolPanelConfigView = {}));
var ToolPanelPopupComponent = /** @class */ (function (_super) {
    tslib_1.__extends(ToolPanelPopupComponent, _super);
    function ToolPanelPopupComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            ToolPanelConfigView: ToolPanelConfigView.General,
        };
        return _this;
    }
    ToolPanelPopupComponent.prototype.render = function () {
        var _this = this;
        var visibleButtons = [];
        if (ArrayExtensions_1.default.IsNotNullOrEmpty(this.props.ToolPanelState.VisibleButtons)) {
            this.props.ToolPanelState.VisibleButtons.forEach(function (x) {
                var menuItem = _this.props.GridState.MainMenuItems.find(function (m) { return m.FunctionName == x; });
                if (menuItem != null && menuItem.IsVisible) {
                    visibleButtons.push(StrategyConstants.getFriendlyNameForStrategyId(x));
                }
            });
        }
        var availableButtons = this.props.GridState.MainMenuItems.filter(function (x) { return x.IsVisible && visibleButtons.indexOf(x.Label) == -1; }).map(function (x) { return x.Label; });
        var availableToolPanelNames = this.props.ToolPanelState.AvailableToolPanels.filter(function (at) { return _this.isVisibleStrategy(at); }).map(function (at) {
            return StrategyConstants.getFriendlyNameForStrategyId(at);
        });
        var visibleToolPanels = this.props.ToolPanelState.VisibleToolPanels.filter(function (at) {
            return _this.isVisibleStrategy(at);
        }).map(function (at) {
            return StrategyConstants.getFriendlyNameForStrategyId(at);
        });
        var individualHomeToolbarOptions = (React.createElement(rebass_1.Flex, { margin: 2, flexDirection: "column" },
            React.createElement(HelpBlock_1.default, null, 'Select which items are visible in the Tool Panel Header.'),
            React.createElement(CheckBox_1.default, { onChange: function (checked) { return _this.onShowFunctionsDropdownChanged(checked); }, checked: this.props.ToolPanelState.ShowFunctionsDropdown }, "Functions Dropdown"),
            React.createElement(CheckBox_1.default, { onChange: function (checked) { return _this.onShowToolPanelsDropdownChanged(checked); }, checked: this.props.ToolPanelState.ShowToolPanelsDropdown }, "ToolPanels Dropdown"),
            React.createElement(CheckBox_1.default, { onChange: function (checked) { return _this.onShowColumnsDropdownChanged(checked); }, checked: this.props.ToolPanelState.ShowColumnsDropdown }, "Columns Dropdown"),
            React.createElement(CheckBox_1.default, { onChange: function (checked) { return _this.onShowGridInfoButtonChanged(checked); }, checked: this.props.ToolPanelState.ShowGridInfoButton }, "About (Grid) Button")));
        return (React.createElement(PanelWithButton_1.PanelWithButton, { headerText: "ToolPanel Configuration", bodyProps: { padding: 0, style: { display: 'flex', flexDirection: 'column' } }, glyphicon: StrategyConstants.ToolPanelStrategyId },
            React.createElement(rebass_1.Flex, { flexDirection: "row", padding: 2, style: { borderBottom: '1px solid var(--ab-color-primary)' } },
                React.createElement(Radio_1.default, { value: ToolPanelConfigView.General, checked: this.state.ToolPanelConfigView == ToolPanelConfigView.General, onChange: function (_, e) { return _this.onShowGridPropertiesChanged(e); } }, "General Options"),
                React.createElement(Radio_1.default, { marginLeft: 3, value: ToolPanelConfigView.Buttons, checked: this.state.ToolPanelConfigView == ToolPanelConfigView.Buttons, onChange: function (_, e) { return _this.onShowGridPropertiesChanged(e); } }, "Function Buttons"),
                React.createElement(Radio_1.default, { marginLeft: 3, value: ToolPanelConfigView.ToolPanels, checked: this.state.ToolPanelConfigView == ToolPanelConfigView.ToolPanels, onChange: function (_, e) { return _this.onShowGridPropertiesChanged(e); } }, "Tool Panels")),
            React.createElement(rebass_1.Box, { style: { overflow: 'auto', flex: 1, display: 'flex' }, padding: 2 },
                this.state.ToolPanelConfigView == ToolPanelConfigView.General &&
                    individualHomeToolbarOptions,
                this.state.ToolPanelConfigView == ToolPanelConfigView.Buttons && (React.createElement(DualListBoxEditor_1.DualListBoxEditor, { AvailableValues: availableButtons, SelectedValues: visibleButtons, HeaderAvailable: "Hidden Function Buttons", HeaderSelected: "Visible Function Buttons", onChange: function (SelectedValues) { return _this.onToolPanelButtonsChanged(SelectedValues); }, DisplaySize: DualListBoxEditor_1.DisplaySize.Large })),
                this.state.ToolPanelConfigView == ToolPanelConfigView.ToolPanels && (React.createElement(DualListBoxEditor_1.DualListBoxEditor, { AvailableValues: availableToolPanelNames, SelectedValues: visibleToolPanels, HeaderAvailable: "Available ToolPanels", HeaderSelected: "Visible ToolPanels", onChange: function (SelectedValues) { return _this.onToolPanelToolPanelsChanged(SelectedValues); }, DisplaySize: DualListBoxEditor_1.DisplaySize.Small })))));
    };
    ToolPanelPopupComponent.prototype.onShowGridPropertiesChanged = function (event) {
        var e = event.target;
        var ToolPanelConfigView = e.value;
        this.setState({ ToolPanelConfigView: ToolPanelConfigView });
    };
    ToolPanelPopupComponent.prototype.onShowFunctionsDropdownChanged = function (checked) {
        if (checked) {
            this.props.onToolPanelShowFunctionsDropdown();
        }
        else {
            this.props.onToolPanelHideFunctionsDropdown();
        }
    };
    ToolPanelPopupComponent.prototype.onShowColumnsDropdownChanged = function (checked) {
        if (checked) {
            this.props.onToolPanelShowColumnsDropdown();
        }
        else {
            this.props.onToolPanelHideColumnsDropdown();
        }
    };
    ToolPanelPopupComponent.prototype.onShowToolPanelsDropdownChanged = function (checked) {
        if (checked) {
            this.props.onToolPanelShowToolPanelsDropdown();
        }
        else {
            this.props.onToolPanelHideToolPanelsDropdown();
        }
    };
    ToolPanelPopupComponent.prototype.onShowGridInfoButtonChanged = function (checked) {
        if (checked) {
            this.props.onToolPanelShowGridInfoButton();
        }
        else {
            this.props.onToolPanelHideGridInfoButton();
        }
    };
    ToolPanelPopupComponent.prototype.onToolPanelButtonsChanged = function (selectedValues) {
        var selectedFunctions = selectedValues.map(function (sv) { return StrategyConstants.getIdForStrategyFriendlyName(sv); });
        this.props.onToolPanelSetFunctionButtons(selectedFunctions);
    };
    ToolPanelPopupComponent.prototype.onToolPanelToolPanelsChanged = function (selectedValues) {
        var selectedToolPanels = selectedValues.map(function (sv) {
            return StrategyConstants.getIdForStrategyFriendlyName(sv);
        });
        this.props.onToolPanelSetToolPanels(selectedToolPanels);
    };
    ToolPanelPopupComponent.prototype.isVisibleStrategy = function (functionName) {
        var entitlement = this.props.Entitlements.find(function (x) { return x.FunctionName == functionName; });
        if (entitlement) {
            return entitlement.AccessLevel != 'Hidden';
        }
        return true;
    };
    return ToolPanelPopupComponent;
}(React.Component));
function mapStateToProps(state, ownProps) {
    return {
        ToolPanelState: state.ToolPanel,
        GridState: state.Grid,
        Entitlements: state.Entitlements.FunctionEntitlements,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        onToolPanelSetFunctionButtons: function (functionButtons) {
            return dispatch(ToolPanelRedux.ToolPanelSetFunctionButtons(functionButtons));
        },
        onToolPanelShowFunctionsDropdown: function () {
            return dispatch(ToolPanelRedux.ToolPanelShowFunctionsDropdown());
        },
        onToolPanelHideFunctionsDropdown: function () {
            return dispatch(ToolPanelRedux.ToolPanelHideFunctionsDropdown());
        },
        onToolPanelShowColumnsDropdown: function () { return dispatch(ToolPanelRedux.ToolPanelShowColumnsDropdown()); },
        onToolPanelHideColumnsDropdown: function () { return dispatch(ToolPanelRedux.ToolPanelHideColumnsDropdown()); },
        onToolPanelShowToolPanelsDropdown: function () {
            return dispatch(ToolPanelRedux.ToolPanelShowToolPanelsDropdown());
        },
        onToolPanelHideToolPanelsDropdown: function () {
            return dispatch(ToolPanelRedux.ToolPanelHideToolPanelsDropdown());
        },
        onToolPanelShowGridInfoButton: function () { return dispatch(ToolPanelRedux.ToolPanelShowGridInfoButton()); },
        onToolPanelHideGridInfoButton: function () { return dispatch(ToolPanelRedux.ToolPanelHideGridInfoButton()); },
        onToolPanelSetToolPanels: function (toolPanels) {
            return dispatch(ToolPanelRedux.ToolPanelSetToolPanels(toolPanels));
        },
    };
}
exports.ToolPanelPopup = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(ToolPanelPopupComponent);
