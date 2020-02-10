"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var styled_components_1 = require("styled-components");
var react_1 = require("react");
var theme_1 = require("../../theme");
var FileDroppable_1 = require("../../components/FileDroppable");
var helper_1 = require("./helper");
var rebass_1 = require("rebass");
var AdaptableConfigurationDialog_1 = require("./AdaptableConfigurationDialog");
var AdaptableWizardView = function (props) { return (React.createElement(styled_components_1.ThemeProvider, { theme: theme_1.default },
    React.createElement(Wizard, tslib_1.__assign({}, props)))); };
var initialState = {
    dropped: false,
};
var reducer = function (state, action) {
    if (action.type === 'DROPPED') {
        return tslib_1.__assign(tslib_1.__assign({}, state), { adaptableOptions: action.payload, dropped: true, error: null });
    }
    if (action.type === 'ERROR') {
        return tslib_1.__assign(tslib_1.__assign({}, state), { dropped: false, error: action.payload });
    }
    if (action.type === 'CANCEL') {
        return tslib_1.__assign(tslib_1.__assign({}, state), { error: null, dropped: false });
    }
    return state;
};
var validDataSource = function (dataSourceInfo) {
    if (!dataSourceInfo || !Array.isArray(dataSourceInfo.columns)) {
        throw "We can't find any columns in your configuration";
    }
    if (!dataSourceInfo.columns.length) {
        throw 'You should have at least one column';
    }
    var allStringColumns = dataSourceInfo.columns.reduce(function (acc, col) {
        if (!col || typeof col !== 'string') {
            return false;
        }
        return acc;
    }, true);
    if (!allStringColumns) {
        throw "Some of your columns are not strings";
    }
    if (!Array.isArray(dataSourceInfo.data)) {
        throw "We can't find the data array in your configuration";
    }
    return true;
};
var Wizard = function (props) {
    var _a = tslib_1.__read(react_1.useReducer(reducer, tslib_1.__assign(tslib_1.__assign({}, initialState), { adaptableOptions: props.adaptableOptions })), 2), state = _a[0], dispatch = _a[1];
    var _b = tslib_1.__read(react_1.useState(Date.now()), 2), droppableKey = _b[0], setDroppableKey = _b[1];
    var onDropSuccess = function (array, file) {
        var dataSourceInfo = (props.prepareData || helper_1.prepareDataSource)(array, file);
        try {
            validDataSource(dataSourceInfo);
        }
        catch (err) {
            return dispatch({
                type: 'ERROR',
                payload: "Invalid adaptable configuration - " + err,
            });
        }
        var gridOptions = helper_1.prepareGridOptions(dataSourceInfo);
        var adaptableOptions = tslib_1.__assign({}, props.adaptableOptions);
        adaptableOptions.adaptableId = adaptableOptions.adaptableId || (file ? file.name : '');
        adaptableOptions.vendorGrid = gridOptions;
        if (dataSourceInfo.primaryKey) {
            adaptableOptions.primaryKey = dataSourceInfo.primaryKey;
        }
        if (props.fetchData) {
            props.onInit(adaptableOptions);
        }
        else {
            dispatch({
                type: 'DROPPED',
                payload: adaptableOptions,
            });
        }
    };
    var wizard;
    if (state.dropped) {
        wizard = (React.createElement(AdaptableConfigurationDialog_1.default, { adaptableOptions: state.adaptableOptions, onCancel: function () {
                // change the file droppable component key
                // so it's remounted and it's in the initial state
                setDroppableKey(Date.now());
                dispatch({
                    type: 'CANCEL',
                });
            }, onFinish: function (adaptableOptions) {
                props.onInit(adaptableOptions);
            } }));
    }
    var ddEnabled = !props.fetchData;
    react_1.useEffect(function () {
        if (props.fetchData) {
            props.fetchData().then(function (data) {
                onDropSuccess(data);
            });
        }
    }, []);
    return (React.createElement(React.Fragment, null,
        ddEnabled ? (React.createElement(FileDroppable_1.default, { key: droppableKey, className: 'ab-nocode-wizard', toJSON: props.fileContentsToJSON, readFile: props.readFile, fileAccept: props.fileAccept, message: state.error, defaultText: props.defaultActionMessage, dragOverText: props.dragOverActionMessage, onDropSuccess: onDropSuccess })) : (React.createElement(rebass_1.Flex, { className: 'ab-nocode-wizard', alignItems: "center", justifyContent: "center", flexDirection: "column" }, props.loadingMessage || 'Loading ...')),
        wizard));
};
exports.default = AdaptableWizardView;
