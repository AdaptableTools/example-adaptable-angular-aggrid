import * as React from 'react';
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps';
import * as PercentBarRedux from '../../Redux/ActionsReducers/PercentBarRedux';
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux';
import { EditableConfigEntityState } from '../Components/SharedProps/EditableConfigEntityState';
import { AdaptableObject } from '../../PredefinedConfig/Common/AdaptableObject';
import { PercentBar } from '../../PredefinedConfig/PercentBarState';
interface PercentBarPopupProps extends StrategyViewPopupProps<PercentBarPopupComponent> {
    PercentBars: PercentBar[];
    onAddPercentBar: (percentBar: PercentBar) => PercentBarRedux.PercentBarAddAction;
    onEditPercentBar: (percentBar: PercentBar) => PercentBarRedux.PercentBarEditAction;
    onShare: (entity: AdaptableObject) => TeamSharingRedux.TeamSharingShareAction;
}
declare class PercentBarPopupComponent extends React.Component<PercentBarPopupProps, EditableConfigEntityState> {
    constructor(props: PercentBarPopupProps);
    shouldClosePopupOnFinishWizard: boolean;
    componentDidMount(): void;
    render(): JSX.Element;
    onMinimumValueChanged(percentBar: PercentBar, minimumValue: number): void;
    onMaximumValueChanged(percentBar: PercentBar, maximumValue: number): void;
    onPositiveColorChanged(percentBar: PercentBar, positiveColor: string): void;
    onNegativeColorChanged(percentBar: PercentBar, negativeColor: string): void;
    onNewFromColumn(percentBar: PercentBar): void;
    onNew(): void;
    onEdit(percentBar: PercentBar): void;
    onCloseWizard(): void;
    onFinishWizard(): void;
    canFinishWizard(): boolean;
}
export declare let PercentBarPopup: import("react-redux").ConnectedComponent<typeof PercentBarPopupComponent, any>;
export {};
