"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var GeneralConstants_1 = require("../../Utilities/Constants/GeneralConstants");
var Uuid_1 = require("../../PredefinedConfig/Uuid");
exports.DATA_SOURCE_SELECT = 'DATA_SOURCE_SELECT';
exports.DATA_SOURCE_ADD = 'DATA_SOURCE_ADD';
exports.DATA_SOURCE_EDIT = 'DATA_SOURCE_EDIT';
exports.DATA_SOURCE_DELETE = 'DATA_SOURCE_DELETE';
exports.DataSourceSelect = function (SelectedDataSource) { return ({
    type: exports.DATA_SOURCE_SELECT,
    SelectedDataSource: SelectedDataSource,
}); };
exports.DataSourceAdd = function (dataSource) { return ({
    type: exports.DATA_SOURCE_ADD,
    dataSource: dataSource,
}); };
exports.DataSourceEdit = function (dataSource) { return ({
    type: exports.DATA_SOURCE_EDIT,
    dataSource: dataSource,
}); };
exports.DataSourceDelete = function (dataSource) { return ({
    type: exports.DATA_SOURCE_DELETE,
    dataSource: dataSource,
}); };
var initialDataSourceState = {
    DataSources: GeneralConstants_1.EMPTY_ARRAY,
    CurrentDataSource: GeneralConstants_1.EMPTY_STRING,
};
exports.DataSourceReducer = function (state, action) {
    if (state === void 0) { state = initialDataSourceState; }
    var dataSources;
    switch (action.type) {
        case exports.DATA_SOURCE_SELECT:
            return Object.assign({}, state, {
                CurrentDataSource: action.SelectedDataSource,
            });
        case exports.DATA_SOURCE_ADD: {
            var actionDataSource = action.dataSource;
            if (!actionDataSource.Uuid) {
                actionDataSource.Uuid = Uuid_1.createUuid();
            }
            dataSources = [].concat(state.DataSources);
            dataSources.push(actionDataSource);
            return tslib_1.__assign(tslib_1.__assign({}, state), { DataSources: dataSources });
        }
        case exports.DATA_SOURCE_EDIT: {
            var actionDataSource_1 = action.dataSource;
            return tslib_1.__assign(tslib_1.__assign({}, state), { DataSources: state.DataSources.map(function (abObject) {
                    return abObject.Uuid === actionDataSource_1.Uuid ? actionDataSource_1 : abObject;
                }) });
        }
        case exports.DATA_SOURCE_DELETE: {
            var actionDataSource_2 = action.dataSource;
            return tslib_1.__assign(tslib_1.__assign({}, state), { DataSources: state.DataSources.filter(function (abObject) { return abObject.Uuid !== actionDataSource_2.Uuid; }) });
        }
        default:
            return state;
    }
};
