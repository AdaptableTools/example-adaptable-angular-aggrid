import * as React from 'react';
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard';
import { AdvancedSearch } from '../../../PredefinedConfig/AdvancedSearchState';
import { UserFilter } from '../../../PredefinedConfig/UserFilterState';
export interface AdvancedSearchSummaryWizardProps extends AdaptableWizardStepProps<AdvancedSearch> {
    UserFilters: UserFilter[];
}
export declare class AdvancedSearchSummaryWizard extends React.Component<AdvancedSearchSummaryWizardProps, {}> implements AdaptableWizardStep {
    constructor(props: AdvancedSearchSummaryWizardProps);
    render(): any;
    canNext(): boolean;
    canBack(): boolean;
    Next(): void;
    Back(): void;
    GetIndexStepIncrement(): number;
    GetIndexStepDecrement(): number;
}
