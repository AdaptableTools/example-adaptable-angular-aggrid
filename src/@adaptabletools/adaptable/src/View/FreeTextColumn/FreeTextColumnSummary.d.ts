import * as React from 'react';
import { StrategySummaryProps } from '../Components/SharedProps/StrategySummaryProps';
import { EditableConfigEntityState } from '../Components/SharedProps/EditableConfigEntityState';
import * as FreeTextColumnRedux from '../../Redux/ActionsReducers/FreeTextColumnRedux';
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux';
import { AdaptableObject } from '../../PredefinedConfig/Common/AdaptableObject';
import { FreeTextColumn } from '../../PredefinedConfig/FreeTextColumnState';
export interface FreeTextColumnSummaryProps extends StrategySummaryProps<FreeTextColumnSummaryComponent> {
    FreeTextColumns: FreeTextColumn[];
    onAddFreeTextColumn: (FreeTextColumn: FreeTextColumn) => FreeTextColumnRedux.FreeTextColumnAddAction;
    onEditFreeTextColumn: (FreeTextColumn: FreeTextColumn) => FreeTextColumnRedux.FreeTextColumnEditAction;
    onShare: (entity: AdaptableObject) => TeamSharingRedux.TeamSharingShareAction;
}
export declare class FreeTextColumnSummaryComponent extends React.Component<FreeTextColumnSummaryProps, EditableConfigEntityState> {
    constructor(props: FreeTextColumnSummaryProps);
    render(): any;
    onNew(): void;
    onEdit(FreeTextColumn: FreeTextColumn): void;
    onCloseWizard(): void;
    onFinishWizard(): void;
    canFinishWizard(): boolean;
}
export declare let FreeTextColumnSummary: import("react-redux").ConnectedComponent<typeof FreeTextColumnSummaryComponent, any>;
