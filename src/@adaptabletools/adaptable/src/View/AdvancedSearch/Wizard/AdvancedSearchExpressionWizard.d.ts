import { AdaptableWizardStep, ExpressionWizardProps } from '../../Wizard/Interface/IAdaptableWizard';
import { ExpressionBuilderPage } from '../../ExpressionBuilder/ExpressionBuilderPage';
import { AdvancedSearch } from '../../../PredefinedConfig/AdvancedSearchState';
export declare class AdvancedSearchExpressionWizard extends ExpressionBuilderPage implements AdaptableWizardStep {
    props2: ExpressionWizardProps<AdvancedSearch>;
    constructor(props2: ExpressionWizardProps<AdvancedSearch>);
    Data: any;
    Next(): void;
    Back(): void;
}
