import { AdaptableWizardStep, ExpressionWizardProps } from '../../Wizard/Interface/IAdaptableWizard';
import { ExpressionBuilderPage } from '../../ExpressionBuilder/ExpressionBuilderPage';
import { ConditionalStyle } from '../../../PredefinedConfig/ConditionalStyleState';
export declare class ConditionalStyleExpressionWizard extends ExpressionBuilderPage implements AdaptableWizardStep {
    private props2;
    constructor(props2: ExpressionWizardProps<ConditionalStyle>);
    Data: any;
    Next(): void;
    Back(): void;
}
