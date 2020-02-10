import * as React from 'react';
import { StrategySummaryProps } from '../Components/SharedProps/StrategySummaryProps';
import { EditableConfigEntityState } from '../Components/SharedProps/EditableConfigEntityState';
import * as PercentBarRedux from '../../Redux/ActionsReducers/PercentBarRedux';
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux';
import { AdaptableObject } from '../../PredefinedConfig/Common/AdaptableObject';
import { PercentBar } from '../../PredefinedConfig/PercentBarState';
export interface PercentBarSummaryProps extends StrategySummaryProps<PercentBarSummaryComponent> {
    PercentBars: PercentBar[];
    ColorPalette: string[];
    StyleClassNames: string[];
    onAddPercentBar: (percentBar: PercentBar) => PercentBarRedux.PercentBarAddAction;
    onEditPercentBar: (percentBar: PercentBar) => PercentBarRedux.PercentBarEditAction;
    onShare: (entity: AdaptableObject) => TeamSharingRedux.TeamSharingShareAction;
}
export declare class PercentBarSummaryComponent extends React.Component<PercentBarSummaryProps, EditableConfigEntityState> {
    constructor(props: PercentBarSummaryProps);
    render(): any;
    onNew(): void;
    onEdit(renderedColumn: PercentBar): void;
    onCloseWizard(): void;
    onFinishWizard(): void;
    canFinishWizard(): boolean;
}
export declare let PercentBarSummary: import("react-redux").ConnectedComponent<typeof PercentBarSummaryComponent, any>;
