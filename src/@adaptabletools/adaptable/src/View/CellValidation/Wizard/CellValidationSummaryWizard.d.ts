import * as React from 'react';
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard';
import { CellValidationRule } from '../../../PredefinedConfig/CellValidationState';
import { UserFilter } from '../../../PredefinedConfig/UserFilterState';
export interface CellValidationSummaryWizardProps extends AdaptableWizardStepProps<CellValidationRule> {
    UserFilters: UserFilter[];
}
export declare class CellValidationSummaryWizard extends React.Component<CellValidationSummaryWizardProps, {}> implements AdaptableWizardStep {
    constructor(props: CellValidationSummaryWizardProps);
    render(): any;
    canNext(): boolean;
    canBack(): boolean;
    Next(): void;
    Back(): void;
    GetIndexStepIncrement(): number;
    GetIndexStepDecrement(): 1 | 2;
}
