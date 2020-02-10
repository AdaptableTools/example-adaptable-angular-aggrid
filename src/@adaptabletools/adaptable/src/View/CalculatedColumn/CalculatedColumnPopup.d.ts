import * as React from 'react';
import * as CalculatedColumnRedux from '../../Redux/ActionsReducers/CalculatedColumnRedux';
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux';
import * as SystemRedux from '../../Redux/ActionsReducers/SystemRedux';
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps';
import { EditableConfigEntityState } from '../Components/SharedProps/EditableConfigEntityState';
import { CalculatedColumn } from '../../PredefinedConfig/CalculatedColumnState';
import { AdaptableObject } from '../../PredefinedConfig/Common/AdaptableObject';
interface CalculatedColumnPopupProps extends StrategyViewPopupProps<CalculatedColumnPopupComponent> {
    onAddCalculatedColumn: (calculatedColumn: CalculatedColumn) => CalculatedColumnRedux.CalculatedColumnAddAction;
    onEditCalculatedColumn: (calculatedColumn: CalculatedColumn) => CalculatedColumnRedux.CalculatedColumnEditAction;
    CalculatedColumns: Array<CalculatedColumn>;
    CalculatedColumnErrorMessage: string;
    IsExpressionValid: (expression: string) => SystemRedux.CalculatedColumnIsExpressionValidAction;
    onShare: (entity: AdaptableObject) => TeamSharingRedux.TeamSharingShareAction;
}
declare class CalculatedColumnPopupComponent extends React.Component<CalculatedColumnPopupProps, EditableConfigEntityState> {
    constructor(props: CalculatedColumnPopupProps);
    componentDidMount(): void;
    render(): JSX.Element;
    onNew(): void;
    onEdit(calculatedColumn: CalculatedColumn): void;
    onCloseWizard(): void;
    onFinishWizard(): void;
    canFinishWizard(): boolean;
}
export declare let CalculatedColumnPopup: import("react-redux").ConnectedComponent<typeof CalculatedColumnPopupComponent, any>;
export {};
