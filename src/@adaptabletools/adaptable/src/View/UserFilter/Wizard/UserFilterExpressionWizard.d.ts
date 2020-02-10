import { AdaptableWizardStep, ExpressionWizardProps } from '../../Wizard/Interface/IAdaptableWizard';
import { ExpressionBuilderPage } from '../../ExpressionBuilder/ExpressionBuilderPage';
import { UserFilter } from '../../../PredefinedConfig/UserFilterState';
export declare class UserFilterExpressionWizard extends ExpressionBuilderPage implements AdaptableWizardStep {
    private props2;
    constructor(props2: ExpressionWizardProps<UserFilter>);
    Data: any;
    Next(): void;
}
