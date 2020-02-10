import * as React from 'react';
import { StrategySummaryProps } from '../Components/SharedProps/StrategySummaryProps';
import { EditableConfigEntityState } from '../Components/SharedProps/EditableConfigEntityState';
import * as FormatColumnRedux from '../../Redux/ActionsReducers/FormatColumnRedux';
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux';
import { AdaptableObject } from '../../PredefinedConfig/Common/AdaptableObject';
import { FormatColumn } from '../../PredefinedConfig/FormatColumnState';
export interface FormatColumnSummaryProps extends StrategySummaryProps<FormatColumnSummaryComponent> {
    FormatColumns: FormatColumn[];
    ColorPalette: string[];
    StyleClassNames: string[];
    onAddFormatColumn: (FormatColumn: FormatColumn) => FormatColumnRedux.FormatColumnAddAction;
    onEditFormatColumn: (FormatColumn: FormatColumn) => FormatColumnRedux.FormatColumnEditAction;
    onShare: (entity: AdaptableObject) => TeamSharingRedux.TeamSharingShareAction;
}
export declare class FormatColumnSummaryComponent extends React.Component<FormatColumnSummaryProps, EditableConfigEntityState> {
    constructor(props: FormatColumnSummaryProps);
    render(): any;
    onNew(): void;
    onEdit(formatColumn: FormatColumn): void;
    onCloseWizard(): void;
    onFinishWizard(): void;
    canFinishWizard(): boolean;
}
export declare let FormatColumnSummary: import("react-redux").ConnectedComponent<typeof FormatColumnSummaryComponent, any>;
