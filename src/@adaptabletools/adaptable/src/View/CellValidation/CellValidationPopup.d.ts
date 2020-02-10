import * as React from 'react';
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps';
import * as CellValidationRedux from '../../Redux/ActionsReducers/CellValidationRedux';
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux';
import { EditableConfigEntityState } from '../Components/SharedProps/EditableConfigEntityState';
import { AdaptableObject } from '../../PredefinedConfig/Common/AdaptableObject';
import { CellValidationRule } from '../../PredefinedConfig/CellValidationState';
interface CellValidationPopupProps extends StrategyViewPopupProps<CellValidationPopupComponent> {
    CellValidations: CellValidationRule[];
    onAddCellValidation: (cellValidationRule: CellValidationRule) => CellValidationRedux.CellValidationAddAction;
    onEditCellValidation: (cellValidationRule: CellValidationRule) => CellValidationRedux.CellValidationEditAction;
    onShare: (entity: AdaptableObject) => TeamSharingRedux.TeamSharingShareAction;
}
declare class CellValidationPopupComponent extends React.Component<CellValidationPopupProps, EditableConfigEntityState> {
    constructor(props: CellValidationPopupProps);
    shouldClosePopupOnFinishWizard: boolean;
    componentDidMount(): void;
    render(): JSX.Element;
    onNew(): void;
    onEdit(CellValidation: CellValidationRule): void;
    onActionModeChanged(cellValidationRule: CellValidationRule, actionMode: any): void;
    onCloseWizard(): void;
    onFinishWizard(): void;
    canFinishWizard(): boolean;
}
export declare let CellValidationPopup: import("react-redux").ConnectedComponent<typeof CellValidationPopupComponent, any>;
export {};
