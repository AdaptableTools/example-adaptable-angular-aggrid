"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ArrayExtensions_1 = require("../../Utilities/Extensions/ArrayExtensions");
var Enums_1 = require("../../PredefinedConfig/Common/Enums");
var GeneralConstants_1 = require("../../Utilities/Constants/GeneralConstants");
var DASHBOARD_SET_AVAILABLE_TOOLBARS = 'DASHBOARD_SET_AVAILABLE_TOOLBARS';
exports.DASHBOARD_SET_TOOLBARS = 'DASHBOARD_SET_TOOLBARS';
var DASHBOARD_SHOW_TOOLBAR = 'DASHBOARD_SHOW_TOOLBAR';
var DASHBOARD_HIDE_TOOLBAR = 'DASHBOARD_HIDE_TOOLBAR';
var DASHBOARD_MOVE_ITEM = 'DASHBOARD_MOVE_ITEM';
var DASHBOARD_SET_FUNCTION_BUTTONS = 'DASHBOARD_SET_FUNCTION_BUTTONS';
var DASHBOARD_SET_VISIBILITY = 'DASHBOARD_SET_VISIBILITY';
var DASHBOARD_SHOW_SYSTEM_STATUS_BUTTON = 'DASHBOARD_SHOW_SYSTEM_STATUS_BUTTON';
var DASHBOARD_HIDE_SYSTEM_STATUS_BUTTON = 'DASHBOARD_HIDE_SYSTEM_STATUS_BUTTON';
var DASHBOARD_SHOW_GRID_INFO_BUTTON = 'DASHBOARD_SHOW_GRID_INFO_BUTTON';
var DASHBOARD_HIDE_GRID_INFO_BUTTON = 'DASHBOARD_HIDE_GRID_INFO_BUTTON';
var DASHBOARD_SHOW_FUNCTIONS_DROPDOWN = 'DASHBOARD_SHOW_FUNCTIONS_DROPDOWN';
var DASHBOARD_HIDE_FUNCTIONS_DROPDOWN = 'DASHBOARD_HIDE_FUNCTIONS_DROPDOWN';
var DASHBOARD_SHOW_COLUMNS_DROPDOWN = 'DASHBOARD_SHOW_COLUMNS_DROPDOWN';
var DASHBOARD_HIDE_COLUMNS_DROPDOWN = 'DASHBOARD_HIDE_COLUMNS_DROPDOWN';
var DASHBOARD_SHOW_TOOLBARS_DROPDOWN = 'DASHBOARD_SHOW_TOOLBARS_DROPDOWN';
var DASHBOARD_HIDE_TOOLBARS_DROPDOWN = 'DASHBOARD_HIDE_TOOLBARS_DROPDOWN';
var DASHBOARD_SET_HOME_TOOLBAR_TITLE = 'DASHBOARD_SET_HOME_TOOLBAR_TITLE';
var DASHBOARD_SET_MINIMISED_HOME_TOOLBAR_BUTTON_STYLE = 'DASHBOARD_SET_MINIMISED_HOME_TOOLBAR_BUTTON_STYLE';
var DASHBOARD_CUSTOM_TOOLBAR_EDIT = 'DASHBOARD_CUSTOM_TOOLBAR_EDIT';
exports.DashboardSetAvailableToolbars = function (toolbars) { return ({
    type: DASHBOARD_SET_AVAILABLE_TOOLBARS,
    toolbars: toolbars,
}); };
exports.DashboardSetToolbars = function (toolbars) { return ({
    type: exports.DASHBOARD_SET_TOOLBARS,
    toolbars: toolbars,
}); };
exports.DashboardShowToolbar = function (toolbar) { return ({
    type: DASHBOARD_SHOW_TOOLBAR,
    toolbar: toolbar,
}); };
exports.DashboardHideToolbar = function (toolbar) { return ({
    type: DASHBOARD_HIDE_TOOLBAR,
    toolbar: toolbar,
}); };
exports.DashboardMoveItem = function (toolbar, NewIndex) { return ({
    type: DASHBOARD_MOVE_ITEM,
    toolbar: toolbar,
    NewIndex: NewIndex,
}); };
exports.DashboardSetFunctionButtons = function (functionButtons) { return ({
    type: DASHBOARD_SET_FUNCTION_BUTTONS,
    functionButtons: functionButtons,
}); };
exports.DashboardSetVisibility = function (Visibility) { return ({
    type: DASHBOARD_SET_VISIBILITY,
    Visibility: Visibility,
}); };
exports.DashboardShowSystemStatusButton = function () { return ({
    type: DASHBOARD_SHOW_SYSTEM_STATUS_BUTTON,
}); };
exports.DashboardHideSystemStatusButton = function () { return ({
    type: DASHBOARD_HIDE_SYSTEM_STATUS_BUTTON,
}); };
exports.DashboardShowGridInfoButton = function () { return ({
    type: DASHBOARD_SHOW_GRID_INFO_BUTTON,
}); };
exports.DashboardHideGridInfoButton = function () { return ({
    type: DASHBOARD_HIDE_GRID_INFO_BUTTON,
}); };
exports.DashboardShowFunctionsDropdown = function () { return ({
    type: DASHBOARD_SHOW_FUNCTIONS_DROPDOWN,
}); };
exports.DashboardHideFunctionsDropdown = function () { return ({
    type: DASHBOARD_HIDE_FUNCTIONS_DROPDOWN,
}); };
exports.DashboardShowColumnsDropdown = function () { return ({
    type: DASHBOARD_SHOW_COLUMNS_DROPDOWN,
}); };
exports.DashboardHideColumnsDropdown = function () { return ({
    type: DASHBOARD_HIDE_COLUMNS_DROPDOWN,
}); };
exports.DashboardShowToolbarsDropdown = function () { return ({
    type: DASHBOARD_SHOW_TOOLBARS_DROPDOWN,
}); };
exports.DashboardHideToolbarsDropdown = function () { return ({
    type: DASHBOARD_HIDE_TOOLBARS_DROPDOWN,
}); };
exports.DashboardSetHomeToolbarTitle = function (Title) { return ({
    type: DASHBOARD_SET_HOME_TOOLBAR_TITLE,
    Title: Title,
}); };
exports.DashboardSetMinimisedHomeToolbarButtonStyle = function (ButtonStyle) { return ({
    type: DASHBOARD_SET_MINIMISED_HOME_TOOLBAR_BUTTON_STYLE,
    ButtonStyle: ButtonStyle,
}); };
exports.DashboardCustomToolbarEdit = function (customToolbar) { return ({
    type: DASHBOARD_CUSTOM_TOOLBAR_EDIT,
    customToolbar: customToolbar,
}); };
var initialDashboardState = {
    AvailableToolbars: [
        'AdvancedSearch',
        'Alert',
        'BulkUpdate',
        'CellSummary',
        'Chart',
        'ColumnFilter',
        'Export',
        'Glue42',
        'IPushPull',
        'Layout',
        'SmartEdit',
        'QuickSearch',
        'SystemStatus',
        'Theme',
    ],
    VisibleToolbars: ['QuickSearch', 'Layout', 'Export', 'ColumnFilter'],
    VisibleButtons: ['Dashboard', 'SmartEdit', 'ColumnChooser', 'ConditionalStyle'],
    CustomToolbars: GeneralConstants_1.EMPTY_ARRAY,
    DashboardVisibility: Enums_1.Visibility.Visible,
    ShowSystemStatusButton: true,
    ShowGridInfoButton: true,
    ShowFunctionsDropdown: true,
    ShowColumnsDropdown: true,
    ShowToolbarsDropdown: true,
    HomeToolbarTitle: '',
    MinimisedHomeToolbarButtonStyle: {
        Variant: 'outlined',
        Tone: 'neutral',
    },
};
exports.DashboardReducer = function (state, action) {
    if (state === void 0) { state = initialDashboardState; }
    var index;
    var dashboardControls;
    var setToolbars = function (state, toolbars) {
        return tslib_1.__assign(tslib_1.__assign({}, state), { VisibleToolbars: toolbars });
    };
    switch (action.type) {
        case DASHBOARD_SET_AVAILABLE_TOOLBARS:
            return Object.assign({}, state, {
                AvailableToolbars: action.toolbars,
            });
        case exports.DASHBOARD_SET_TOOLBARS: {
            var actionTyped = action;
            var dashboardToolbars = actionTyped.toolbars;
            return setToolbars(state, dashboardToolbars);
        }
        case DASHBOARD_MOVE_ITEM: {
            var actionTyped_1 = action;
            dashboardControls = tslib_1.__spread(state.VisibleToolbars);
            index = dashboardControls.findIndex(function (a) { return a == actionTyped_1.toolbar; });
            ArrayExtensions_1.ArrayExtensions.moveArray(dashboardControls, index, actionTyped_1.NewIndex);
            return setToolbars(state, dashboardControls);
        }
        case DASHBOARD_SHOW_TOOLBAR: {
            var actionTyped = action;
            var dashboardToolbars = tslib_1.__spread(state.VisibleToolbars);
            dashboardToolbars.push(actionTyped.toolbar);
            return setToolbars(state, dashboardToolbars);
        }
        case DASHBOARD_HIDE_TOOLBAR: {
            var actionTyped_2 = action;
            var dashboardToolbars = (state.VisibleToolbars || []).filter(function (a) { return a !== actionTyped_2.toolbar; });
            return setToolbars(state, dashboardToolbars);
        }
        case DASHBOARD_SET_FUNCTION_BUTTONS: {
            var actionTyped = action;
            var dashboardFunctionButtons = actionTyped.functionButtons;
            return Object.assign({}, state, { VisibleButtons: dashboardFunctionButtons });
        }
        case DASHBOARD_SET_VISIBILITY: {
            var actionTyped = action;
            return Object.assign({}, state, { DashboardVisibility: actionTyped.Visibility });
        }
        case DASHBOARD_SHOW_SYSTEM_STATUS_BUTTON: {
            return Object.assign({}, state, { ShowSystemStatusButton: true });
        }
        case DASHBOARD_HIDE_SYSTEM_STATUS_BUTTON: {
            return Object.assign({}, state, { ShowSystemStatusButton: false });
        }
        case DASHBOARD_SHOW_GRID_INFO_BUTTON: {
            return Object.assign({}, state, { ShowGridInfoButton: true });
        }
        case DASHBOARD_HIDE_GRID_INFO_BUTTON: {
            return Object.assign({}, state, { ShowGridInfoButton: false });
        }
        case DASHBOARD_SHOW_FUNCTIONS_DROPDOWN: {
            return Object.assign({}, state, { ShowFunctionsDropdown: true });
        }
        case DASHBOARD_HIDE_FUNCTIONS_DROPDOWN: {
            return Object.assign({}, state, { ShowFunctionsDropdown: false });
        }
        case DASHBOARD_SHOW_COLUMNS_DROPDOWN: {
            return Object.assign({}, state, { ShowColumnsDropdown: true });
        }
        case DASHBOARD_HIDE_COLUMNS_DROPDOWN: {
            return Object.assign({}, state, { ShowColumnsDropdown: false });
        }
        case DASHBOARD_SHOW_TOOLBARS_DROPDOWN: {
            return Object.assign({}, state, { ShowToolbarsDropdown: true });
        }
        case DASHBOARD_HIDE_TOOLBARS_DROPDOWN: {
            return Object.assign({}, state, { ShowToolbarsDropdown: false });
        }
        case DASHBOARD_SET_HOME_TOOLBAR_TITLE: {
            var actionTyped = action;
            return Object.assign({}, state, { HomeToolbarTitle: actionTyped.Title });
        }
        case DASHBOARD_SET_MINIMISED_HOME_TOOLBAR_BUTTON_STYLE: {
            var actionTyped = action;
            return Object.assign({}, state, {
                MinimisedHomeToolbarButtonStyle: actionTyped.ButtonStyle,
            });
        }
        case DASHBOARD_CUSTOM_TOOLBAR_EDIT: {
            var actionTyped = action;
            var actionCustomSort_1 = actionTyped.customToolbar;
            var customToolbars = state.CustomToolbars.map(function (abObject) {
                return abObject.Uuid === actionCustomSort_1.Uuid ? actionCustomSort_1 : abObject;
            });
            return Object.assign({}, state, {
                CustomToolbars: customToolbars,
            });
        }
        default:
            return state;
    }
};
