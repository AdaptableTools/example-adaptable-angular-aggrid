"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var TOOLPANEL_SET_AVAILABLE_TOOLPANELS = 'TOOLPANEL_SET_AVAILABLE_TOOLPANELS';
exports.TOOLPANEL_SET_TOOLPANELS = 'TOOLPANEL_SET_TOOLPANELS';
var TOOLPANEL_SHOW_TOOLPANEL = 'TOOLPANEL_SHOW_TOOLPANEL';
var TOOLPANEL_HIDE_TOOLPANEL = 'TOOLPANEL_HIDE_TOOLPANEL';
var TOOLPANEL_SET_FUNCTION_BUTTONS = 'TOOLPANEL_SET_FUNCTION_BUTTONS';
var TOOLPANEL_MOVE_ITEM = 'TOOLPANEL_MOVE_ITEM';
var TOOLPANEL_SHOW_GRID_INFO_BUTTON = 'TOOLPANEL_SHOW_GRID_INFO_BUTTON';
var TOOLPANEL_HIDE_GRID_INFO_BUTTON = 'TOOLPANEL_HIDE_GRID_INFO_BUTTON';
var TOOLPANEL_SHOW_FUNCTIONS_DROPDOWN = 'TOOLPANEL_SHOW_FUNCTIONS_DROPDOWN';
var TOOLPANEL_HIDE_FUNCTIONS_DROPDOWN = 'TOOLPANEL_HIDE_FUNCTIONS_DROPDOWN';
var TOOLPANEL_SHOW_COLUMNS_DROPDOWN = 'TOOLPANEL_SHOW_COLUMNS_DROPDOWN';
var TOOLPANEL_HIDE_COLUMNS_DROPDOWN = 'TOOLPANEL_HIDE_COLUMNS_DROPDOWN';
var TOOLPANEL_SHOW_TOOLPANELS_DROPDOWN = 'TOOLPANEL_SHOW_TOOLPANELS_DROPDOWN';
var TOOLPANEL_HIDE_TOOLPANELS_DROPDOWN = 'TOOLPANEL_HIDE_TOOLPANELS_DROPDOWN';
var TOOLPANEL_SET_TOOLPANEL_TITLE = 'TOOLPANEL_SET_TOOLPANEL_TITLE';
exports.ToolPanelSetAvailableToolPanels = function (toolPanels) { return ({
    type: TOOLPANEL_SET_AVAILABLE_TOOLPANELS,
    toolPanels: toolPanels,
}); };
exports.ToolPanelSetToolPanels = function (toolPanels) { return ({
    type: exports.TOOLPANEL_SET_TOOLPANELS,
    toolPanels: toolPanels,
}); };
exports.ToolPanelShowToolPanel = function (toolPanel) { return ({
    type: TOOLPANEL_SHOW_TOOLPANEL,
    toolPanel: toolPanel,
}); };
exports.ToolPanelHideToolPanel = function (toolPanel) { return ({
    type: TOOLPANEL_HIDE_TOOLPANEL,
    toolPanel: toolPanel,
}); };
exports.ToolPanelSetFunctionButtons = function (functionButtons) { return ({
    type: TOOLPANEL_SET_FUNCTION_BUTTONS,
    functionButtons: functionButtons,
}); };
exports.ToolPanelMoveItem = function (toolPanel, NewIndex) { return ({
    type: TOOLPANEL_MOVE_ITEM,
    toolPanel: toolPanel,
    NewIndex: NewIndex,
}); };
exports.ToolPanelShowGridInfoButton = function () { return ({
    type: TOOLPANEL_SHOW_GRID_INFO_BUTTON,
}); };
exports.ToolPanelHideGridInfoButton = function () { return ({
    type: TOOLPANEL_HIDE_GRID_INFO_BUTTON,
}); };
exports.ToolPanelShowFunctionsDropdown = function () { return ({
    type: TOOLPANEL_SHOW_FUNCTIONS_DROPDOWN,
}); };
exports.ToolPanelHideFunctionsDropdown = function () { return ({
    type: TOOLPANEL_HIDE_FUNCTIONS_DROPDOWN,
}); };
exports.ToolPanelShowColumnsDropdown = function () { return ({
    type: TOOLPANEL_SHOW_COLUMNS_DROPDOWN,
}); };
exports.ToolPanelHideColumnsDropdown = function () { return ({
    type: TOOLPANEL_HIDE_COLUMNS_DROPDOWN,
}); };
exports.ToolPanelShowToolPanelsDropdown = function () { return ({
    type: TOOLPANEL_SHOW_TOOLPANELS_DROPDOWN,
}); };
exports.ToolPanelHideToolPanelsDropdown = function () { return ({
    type: TOOLPANEL_HIDE_TOOLPANELS_DROPDOWN,
}); };
exports.ToolPanelSetToolPanelTitle = function (Title) { return ({
    type: TOOLPANEL_SET_TOOLPANEL_TITLE,
    Title: Title,
}); };
var initialToolPanelState = {
    AvailableToolPanels: [
        'AdvancedSearch',
        'Alert',
        'BulkUpdate',
        'CellSummary',
        'Chart',
        'ColumnFilter',
        'Dashboard',
        'Export',
        'Layout',
        'QuickSearch',
        'SmartEdit',
        'SystemStatus',
        'Theme',
    ],
    VisibleToolPanels: [
        'AdvancedSearch',
        'Alert',
        'BulkUpdate',
        'CellSummary',
        'ColumnFilter',
        'Dashboard',
        'Export',
        'Layout',
        'QuickSearch',
        'SmartEdit',
        'SystemStatus',
        'Theme',
    ],
    VisibleButtons: [],
    ShowGridInfoButton: true,
    ShowFunctionsDropdown: true,
    ShowColumnsDropdown: true,
    ShowToolPanelsDropdown: true,
};
exports.ToolPanelReducer = function (state, action) {
    if (state === void 0) { state = initialToolPanelState; }
    var setToolPanels = function (state, toolPanels) {
        return tslib_1.__assign(tslib_1.__assign({}, state), { VisibleToolPanels: toolPanels });
    };
    switch (action.type) {
        case TOOLPANEL_SET_AVAILABLE_TOOLPANELS:
            return Object.assign({}, state, {
                AvailableToolPanels: action.toolPanels,
            });
        case exports.TOOLPANEL_SET_TOOLPANELS: {
            var actionTyped = action;
            var toolPanels = actionTyped.toolPanels;
            return setToolPanels(state, toolPanels);
        }
        case TOOLPANEL_SHOW_TOOLPANEL: {
            var actionTyped = action;
            var toolPanels = tslib_1.__spread(state.VisibleToolPanels);
            toolPanels.push(actionTyped.toolPanel);
            return setToolPanels(state, toolPanels);
        }
        case TOOLPANEL_HIDE_TOOLPANEL: {
            var actionTyped_1 = action;
            var toolPanels = (state.VisibleToolPanels || []).filter(function (a) { return a !== actionTyped_1.toolPanel; });
            return setToolPanels(state, toolPanels);
        }
        case TOOLPANEL_SET_FUNCTION_BUTTONS: {
            var actionTyped = action;
            var TOOLPANELFunctionButtons = actionTyped.functionButtons;
            return Object.assign({}, state, { VisibleButtons: TOOLPANELFunctionButtons });
        }
        case TOOLPANEL_SHOW_GRID_INFO_BUTTON: {
            return Object.assign({}, state, { ShowGridInfoButton: true });
        }
        case TOOLPANEL_HIDE_GRID_INFO_BUTTON: {
            return Object.assign({}, state, { ShowGridInfoButton: false });
        }
        case TOOLPANEL_SHOW_FUNCTIONS_DROPDOWN: {
            return Object.assign({}, state, { ShowFunctionsDropdown: true });
        }
        case TOOLPANEL_HIDE_FUNCTIONS_DROPDOWN: {
            return Object.assign({}, state, { ShowFunctionsDropdown: false });
        }
        case TOOLPANEL_SHOW_COLUMNS_DROPDOWN: {
            return Object.assign({}, state, { ShowColumnsDropdown: true });
        }
        case TOOLPANEL_HIDE_COLUMNS_DROPDOWN: {
            return Object.assign({}, state, { ShowColumnsDropdown: false });
        }
        case TOOLPANEL_SHOW_TOOLPANELS_DROPDOWN: {
            return Object.assign({}, state, { ShowToolPanelsDropdown: true });
        }
        case TOOLPANEL_HIDE_TOOLPANELS_DROPDOWN: {
            return Object.assign({}, state, { ShowToolPanelsDropdown: false });
        }
        //  case TOOLPANEL_SET_TOOLPANEL_TITLE: {
        //    const actionTyped = action as ToolPanelSetToolPanelTitleAction;
        //    return Object.assign({}, state, { ToolPanelTitle: actionTyped.Title });
        //  }
        default:
            return state;
    }
};
