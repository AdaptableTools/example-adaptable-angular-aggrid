import * as React from 'react';
import { StrategySummaryProps } from '../Components/SharedProps/StrategySummaryProps';
import { EditableConfigEntityState } from '../Components/SharedProps/EditableConfigEntityState';
import * as CustomSortRedux from '../../Redux/ActionsReducers/CustomSortRedux';
import { CustomSort } from '../../PredefinedConfig/CustomSortState';
export interface CustomSortSummaryProps extends StrategySummaryProps<CustomSortSummaryComponent> {
    CustomSorts: CustomSort[];
    onAddCustomSort: (customSort: CustomSort) => CustomSortRedux.CustomSortAddAction;
    onEditCustomSort: (customSort: CustomSort) => CustomSortRedux.CustomSortEditAction;
}
export declare class CustomSortSummaryComponent extends React.Component<CustomSortSummaryProps, EditableConfigEntityState> {
    constructor(props: CustomSortSummaryProps);
    render(): any;
    onNew(): void;
    onEdit(customSort: CustomSort): void;
    onCloseWizard(): void;
    onFinishWizard(): void;
    canFinishWizard(): boolean;
}
export declare let CustomSortSummary: import("react-redux").ConnectedComponent<typeof CustomSortSummaryComponent, any>;
