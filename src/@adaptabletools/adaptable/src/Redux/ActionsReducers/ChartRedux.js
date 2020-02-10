"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var GeneralConstants_1 = require("../../Utilities/Constants/GeneralConstants");
var Uuid_1 = require("../../PredefinedConfig/Uuid");
exports.CHART_DEFINITION_SELECT = 'CHART_DEFINITION_SELECT';
exports.CHART_DEFINITION_ADD = 'CHART_DEFINITION_ADD';
exports.CHART_DEFINITION_EDIT = 'CHART_DEFINITION_EDIT';
exports.CHART_DEFINITION_DELETE = 'CHART_DEFINITION_DELETE';
exports.CHART_PROPERTIES_UPDATE = 'CHART_PROPERTIES_UPDATE';
exports.ChartDefinitionAdd = function (chartDefinition) { return ({
    type: exports.CHART_DEFINITION_ADD,
    chartDefinition: chartDefinition,
}); };
exports.ChartDefinitionEdit = function (chartDefinition) { return ({
    type: exports.CHART_DEFINITION_EDIT,
    chartDefinition: chartDefinition,
}); };
exports.ChartDefinitionDelete = function (chartDefinition) { return ({
    type: exports.CHART_DEFINITION_DELETE,
    chartDefinition: chartDefinition,
}); };
exports.ChartDefinitionSelect = function (chartName) { return ({
    type: exports.CHART_DEFINITION_SELECT,
    chartName: chartName,
}); };
exports.ChartPropertiesUpdate = function (chartUuid, chartProperties) { return ({
    type: exports.CHART_PROPERTIES_UPDATE,
    chartUuid: chartUuid,
    chartProperties: chartProperties,
}); };
var initialChartState = {
    ChartDefinitions: [],
    CurrentChartName: GeneralConstants_1.EMPTY_STRING,
    RefreshRate: GeneralConstants_1.CHART_DEFAULT_REFRESH_RATE,
};
exports.ChartReducer = function (state, action) {
    if (state === void 0) { state = initialChartState; }
    var chartDefinitions;
    switch (action.type) {
        case exports.CHART_DEFINITION_ADD: {
            var actionChartDefinition = action
                .chartDefinition;
            if (!actionChartDefinition.Uuid) {
                actionChartDefinition.Uuid = Uuid_1.createUuid();
            }
            chartDefinitions = [].concat(state.ChartDefinitions);
            chartDefinitions.push(actionChartDefinition);
            return tslib_1.__assign(tslib_1.__assign({}, state), { ChartDefinitions: chartDefinitions });
        }
        case exports.CHART_DEFINITION_EDIT: {
            var actionChartDefinition_1 = action
                .chartDefinition;
            return tslib_1.__assign(tslib_1.__assign({}, state), { ChartDefinitions: state.ChartDefinitions.map(function (abObject) {
                    return abObject.Uuid === actionChartDefinition_1.Uuid ? actionChartDefinition_1 : abObject;
                }) });
        }
        case exports.CHART_DEFINITION_DELETE: {
            var actionChartDefinition_2 = action
                .chartDefinition;
            return tslib_1.__assign(tslib_1.__assign({}, state), { ChartDefinitions: state.ChartDefinitions.filter(function (abObject) { return abObject.Uuid !== actionChartDefinition_2.Uuid; }) });
        }
        case exports.CHART_PROPERTIES_UPDATE: {
            var actionTypedPropertiesUpdate_1 = action;
            chartDefinitions = [].concat(state.ChartDefinitions);
            var chartDefinition = chartDefinitions.find(function (c) { return c.Uuid == actionTypedPropertiesUpdate_1.chartUuid; });
            chartDefinition.ChartProperties = actionTypedPropertiesUpdate_1.chartProperties;
            return Object.assign({}, state, { ChartDefinitions: chartDefinitions });
        }
        case exports.CHART_DEFINITION_SELECT: {
            return Object.assign({}, state, {
                CurrentChartName: action.chartName,
            });
        }
        default:
            return state;
    }
};
