import { AdaptableWizardStep, ExpressionWizardProps } from '../../Wizard/Interface/IAdaptableWizard';
import { ExpressionBuilderPage } from '../../ExpressionBuilder/ExpressionBuilderPage';
import { PlusMinusRule } from '../../../PredefinedConfig/PlusMinusState';
export declare class PlusMinusExpressionWizard extends ExpressionBuilderPage implements AdaptableWizardStep {
    private props2;
    constructor(props2: ExpressionWizardProps<PlusMinusRule>);
    Data: any;
    Next(): void;
    Back(): void;
}
