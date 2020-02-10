import * as Redux from 'redux';
import { ChartState, ChartDefinition, ChartProperties } from '../../PredefinedConfig/ChartState';
export declare const CHART_DEFINITION_SELECT = "CHART_DEFINITION_SELECT";
export declare const CHART_DEFINITION_ADD = "CHART_DEFINITION_ADD";
export declare const CHART_DEFINITION_EDIT = "CHART_DEFINITION_EDIT";
export declare const CHART_DEFINITION_DELETE = "CHART_DEFINITION_DELETE";
export declare const CHART_PROPERTIES_UPDATE = "CHART_PROPERTIES_UPDATE";
export interface ChartDefinitionAction extends Redux.Action {
    chartDefinition: ChartDefinition;
}
export interface ChartDefinitionAddAction extends ChartDefinitionAction {
}
export interface ChartDefinitionEditAction extends ChartDefinitionAction {
}
export interface ChartDefinitionDeleteAction extends ChartDefinitionAction {
}
export interface ChartDefinitionSelectAction extends Redux.Action {
    chartName: string;
}
export interface ChartPropertiesUpdateAction extends Redux.Action {
    chartUuid: string;
    chartProperties: ChartProperties;
}
export declare const ChartDefinitionAdd: (chartDefinition: ChartDefinition) => ChartDefinitionAddAction;
export declare const ChartDefinitionEdit: (chartDefinition: ChartDefinition) => ChartDefinitionEditAction;
export declare const ChartDefinitionDelete: (chartDefinition: ChartDefinition) => ChartDefinitionDeleteAction;
export declare const ChartDefinitionSelect: (chartName: string) => ChartDefinitionSelectAction;
export declare const ChartPropertiesUpdate: (chartUuid: string, chartProperties: ChartProperties) => ChartPropertiesUpdateAction;
export declare const ChartReducer: Redux.Reducer<ChartState>;
