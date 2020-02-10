import * as React from 'react';
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps';
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux';
import * as GradientColumnRedux from '../../Redux/ActionsReducers/GradientColumnRedux';
import { EditableConfigEntityState } from '../Components/SharedProps/EditableConfigEntityState';
import { AdaptableObject } from '../../PredefinedConfig/Common/AdaptableObject';
import { GradientColumn } from '../../PredefinedConfig/GradientColumnState';
interface GradientColumnPopupProps extends StrategyViewPopupProps<GradientColumnPopupComponent> {
    GradientColumns: GradientColumn[];
    onAddGradientColumn: (GradientColumn: GradientColumn) => GradientColumnRedux.GradientColumnAddAction;
    onEditGradientColumn: (GradientColumn: GradientColumn) => GradientColumnRedux.GradientColumnEditAction;
    onShare: (entity: AdaptableObject) => TeamSharingRedux.TeamSharingShareAction;
}
declare class GradientColumnPopupComponent extends React.Component<GradientColumnPopupProps, EditableConfigEntityState> {
    constructor(props: GradientColumnPopupProps);
    shouldClosePopupOnFinishWizard: boolean;
    componentDidMount(): void;
    render(): JSX.Element;
    onNegativeValueChanged(gradientColumn: GradientColumn, negativeValue: number): void;
    onPositiveValueChanged(gradientColumn: GradientColumn, positiveValue: number): void;
    onBaseValueChanged(gradientColumn: GradientColumn, baseValue: number): void;
    onPositiveColorChanged(gradientColumn: GradientColumn, positiveColor: string): void;
    onNegativeColorChanged(gradientColumn: GradientColumn, negativeColor: string): void;
    onNewFromColumn(GradientColumn: GradientColumn): void;
    onNew(): void;
    onEdit(GradientColumn: GradientColumn): void;
    onCloseWizard(): void;
    onFinishWizard(): void;
    canFinishWizard(): boolean;
}
export declare let GradientColumnPopup: import("react-redux").ConnectedComponent<typeof GradientColumnPopupComponent, any>;
export {};
