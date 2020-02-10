import * as React from 'react';
import { StrategySummaryProps } from '../Components/SharedProps/StrategySummaryProps';
import { EditableConfigEntityState } from '../Components/SharedProps/EditableConfigEntityState';
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux';
import { AdaptableObject } from '../../PredefinedConfig/Common/AdaptableObject';
import { ColumnCategory } from '../../PredefinedConfig/ColumnCategoryState';
export interface ColumnCategorySummaryProps extends StrategySummaryProps<ColumnCategorySummaryComponent> {
    ColumnCategorys: ColumnCategory[];
    onShare: (entity: AdaptableObject) => TeamSharingRedux.TeamSharingShareAction;
}
export declare class ColumnCategorySummaryComponent extends React.Component<ColumnCategorySummaryProps, EditableConfigEntityState> {
    constructor(props: ColumnCategorySummaryProps);
    render(): any;
    onNew(): void;
    onEdit(ColumnCategory: ColumnCategory): void;
    onCloseWizard(): void;
    onFinishWizard(): void;
    canFinishWizard(): void;
}
export declare let ColumnCategorySummary: import("react-redux").ConnectedComponent<typeof ColumnCategorySummaryComponent, any>;
