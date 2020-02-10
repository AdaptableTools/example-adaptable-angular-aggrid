import * as React from 'react';
import { StrategySummaryProps } from '../Components/SharedProps/StrategySummaryProps';
import { EditableConfigEntityState } from '../Components/SharedProps/EditableConfigEntityState';
import * as CellValidationRedux from '../../Redux/ActionsReducers/CellValidationRedux';
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux';
import { AdaptableObject } from '../../PredefinedConfig/Common/AdaptableObject';
import { CellValidationRule } from '../../PredefinedConfig/CellValidationState';
export interface CellValidationSummaryProps extends StrategySummaryProps<CellValidationSummaryComponent> {
    CellValidations: CellValidationRule[];
    onAddCellValidation: (cellValidationRule: CellValidationRule) => CellValidationRedux.CellValidationAddAction;
    onEditCellValidation: (cellValidationRule: CellValidationRule) => CellValidationRedux.CellValidationEditAction;
    onShare: (entity: AdaptableObject) => TeamSharingRedux.TeamSharingShareAction;
}
export declare class CellValidationSummaryComponent extends React.Component<CellValidationSummaryProps, EditableConfigEntityState> {
    constructor(props: CellValidationSummaryProps);
    render(): any;
    onNew(): void;
    onEdit(CellValidation: CellValidationRule): void;
    onCloseWizard(): void;
    onFinishWizard(): void;
    canFinishWizard(): boolean;
}
export declare let CellValidationSummary: import("react-redux").ConnectedComponent<typeof CellValidationSummaryComponent, any>;
