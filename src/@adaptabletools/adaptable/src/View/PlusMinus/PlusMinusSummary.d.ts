import * as React from 'react';
import { StrategySummaryProps } from '../Components/SharedProps/StrategySummaryProps';
import { EditableConfigEntityState } from '../Components/SharedProps/EditableConfigEntityState';
import * as PlusMinusRedux from '../../Redux/ActionsReducers/PlusMinusRedux';
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux';
import { AdaptableObject } from '../../PredefinedConfig/Common/AdaptableObject';
import { PlusMinusRule } from '../../PredefinedConfig/PlusMinusState';
export interface PlusMinusSummaryProps extends StrategySummaryProps<PlusMinusSummaryComponent> {
    PlusMinusRules: PlusMinusRule[];
    onAddPlusMinusRule: (PlusMinus: PlusMinusRule) => PlusMinusRedux.PlusMinusRuleAddAction;
    onEditPlusMinusRule: (PlusMinus: PlusMinusRule) => PlusMinusRedux.PlusMinusRuleEditAction;
    onShare: (entity: AdaptableObject) => TeamSharingRedux.TeamSharingShareAction;
}
export declare class PlusMinusSummaryComponent extends React.Component<PlusMinusSummaryProps, EditableConfigEntityState> {
    constructor(props: PlusMinusSummaryProps);
    render(): any;
    onNew(): void;
    onEdit(PlusMinus: PlusMinusRule): void;
    onCloseWizard(): void;
    onFinishWizard(): void;
    canFinishWizard(): boolean;
    wrapExpressionDescription(expressionDescription: string): string;
}
export declare let PlusMinusSummary: import("react-redux").ConnectedComponent<typeof PlusMinusSummaryComponent, any>;
