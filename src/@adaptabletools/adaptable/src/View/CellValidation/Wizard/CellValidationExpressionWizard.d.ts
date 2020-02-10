import { AdaptableWizardStep, ExpressionWizardProps } from '../../Wizard/Interface/IAdaptableWizard';
import { ExpressionBuilderPage } from '../../ExpressionBuilder/ExpressionBuilderPage';
import { CellValidationRule } from '../../../PredefinedConfig/CellValidationState';
export declare class CellValidationExpressionWizard extends ExpressionBuilderPage implements AdaptableWizardStep {
    private props2;
    constructor(props2: ExpressionWizardProps<CellValidationRule>);
    Data: any;
    Next(): void;
}
