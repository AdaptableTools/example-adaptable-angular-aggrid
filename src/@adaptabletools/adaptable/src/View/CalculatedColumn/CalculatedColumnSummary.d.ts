import * as React from 'react';
import * as Redux from 'redux';
import { StrategySummaryProps } from '../Components/SharedProps/StrategySummaryProps';
import * as SystemRedux from '../../Redux/ActionsReducers/SystemRedux';
import { EditableConfigEntityState } from '../Components/SharedProps/EditableConfigEntityState';
import { CalculatedColumn } from '../../PredefinedConfig/CalculatedColumnState';
export interface CalculatedColumnSummaryProps extends StrategySummaryProps<CalculatedColumnSummaryComponent> {
    CalculatedColumns: CalculatedColumn[];
    onEdit: (calculatedColumn: CalculatedColumn) => void;
    onDeleteConfirm: Redux.Action;
    CalculatedColumnErrorMessage: string;
    IsExpressionValid: (expression: string) => SystemRedux.CalculatedColumnIsExpressionValidAction;
}
export declare class CalculatedColumnSummaryComponent extends React.Component<CalculatedColumnSummaryProps, EditableConfigEntityState> {
    constructor(props: CalculatedColumnSummaryProps);
    render(): any;
    onEdit(calculatedColumn: CalculatedColumn): void;
    onCloseWizard(): void;
    onFinishWizard(): void;
    canFinishWizard(): boolean;
}
export declare let CalculatedColumnSummary: import("react-redux").ConnectedComponent<typeof CalculatedColumnSummaryComponent, any>;
