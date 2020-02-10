import * as React from 'react';
import { StrategySummaryProps } from '../Components/SharedProps/StrategySummaryProps';
import { EditableConfigEntityState } from '../Components/SharedProps/EditableConfigEntityState';
import * as GradientColumnRedux from '../../Redux/ActionsReducers/GradientColumnRedux';
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux';
import { AdaptableObject } from '../../PredefinedConfig/Common/AdaptableObject';
import { GradientColumn } from '../../PredefinedConfig/GradientColumnState';
export interface GradientColumnSummaryProps extends StrategySummaryProps<GradientColumnSummaryComponent> {
    GradientColumns: GradientColumn[];
    ColorPalette: string[];
    StyleClassNames: string[];
    onAddGradientColumn: (GradientColumn: GradientColumn) => GradientColumnRedux.GradientColumnAddAction;
    onEditGradientColumn: (GradientColumn: GradientColumn) => GradientColumnRedux.GradientColumnEditAction;
    onShare: (entity: AdaptableObject) => TeamSharingRedux.TeamSharingShareAction;
}
export declare class GradientColumnSummaryComponent extends React.Component<GradientColumnSummaryProps, EditableConfigEntityState> {
    constructor(props: GradientColumnSummaryProps);
    render(): any;
    onNew(): void;
    onEdit(renderedColumn: GradientColumn): void;
    onCloseWizard(): void;
    onFinishWizard(): void;
    canFinishWizard(): boolean;
}
export declare let GradientColumnSummary: import("react-redux").ConnectedComponent<typeof GradientColumnSummaryComponent, any>;
