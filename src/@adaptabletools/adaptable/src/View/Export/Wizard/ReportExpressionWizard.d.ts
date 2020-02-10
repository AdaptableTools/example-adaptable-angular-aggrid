import { AdaptableWizardStep, ExpressionWizardProps } from '../../Wizard/Interface/IAdaptableWizard';
import { ExpressionBuilderPage } from '../../ExpressionBuilder/ExpressionBuilderPage';
import { Report } from '../../../PredefinedConfig/ExportState';
export declare class ReportExpressionWizard extends ExpressionBuilderPage implements AdaptableWizardStep {
    private props2;
    constructor(props2: ExpressionWizardProps<Report>);
    Data: any;
    Next(): void;
    Back(): void;
    GetIndexStepDecrement(): number;
}
