import * as React from 'react';
import * as PlusMinusRedux from '../../Redux/ActionsReducers/PlusMinusRedux';
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux';
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux';
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps';
import { EditableConfigEntityState } from '../Components/SharedProps/EditableConfigEntityState';
import { AdaptableObject } from '../../PredefinedConfig/Common/AdaptableObject';
import { PlusMinusRule } from '../../PredefinedConfig/PlusMinusState';
import { IUIConfirmation } from '../../Utilities/Interface/IMessage';
interface PlusMinusPopupProps extends StrategyViewPopupProps<PlusMinusPopupComponent> {
    DefaultNudgeValue: number;
    PlusMinusRules: PlusMinusRule[];
    onAddPlusMinusRule: (plusMinusRule: PlusMinusRule) => PlusMinusRedux.PlusMinusRuleAddAction;
    onEditPlusMinusRule: (plusMinusRule: PlusMinusRule) => PlusMinusRedux.PlusMinusRuleEditAction;
    onConfirmWarningCellValidation: (confirmation: IUIConfirmation) => PopupRedux.PopupShowConfirmationAction;
    onShare: (entity: AdaptableObject) => TeamSharingRedux.TeamSharingShareAction;
}
declare class PlusMinusPopupComponent extends React.Component<PlusMinusPopupProps, EditableConfigEntityState> {
    constructor(props: PlusMinusPopupProps);
    shouldClosePopupOnFinishWizard: boolean;
    componentDidMount(): void;
    render(): JSX.Element;
    onNew(): void;
    onEdit(plusMinusRule: PlusMinusRule): void;
    onCloseWizard(): void;
    onFinishWizard(): void;
    canFinishWizard(): boolean;
    onColumnDefaultNudgeValueChange(plusMinusRule: PlusMinusRule, event: React.FormEvent<any>): void;
    onAddPlusMinusRule(index: number, plusMinusRule: PlusMinusRule): void;
    private onConfirmWarningCellValidation;
}
export declare let PlusMinusPopup: import("react-redux").ConnectedComponent<typeof PlusMinusPopupComponent, any>;
export {};
