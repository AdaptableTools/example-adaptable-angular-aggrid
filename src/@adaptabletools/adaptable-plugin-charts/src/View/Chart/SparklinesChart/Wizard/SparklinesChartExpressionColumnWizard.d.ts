import { ExpressionBuilderPage } from '@adaptabletools/adaptable/src/View/ExpressionBuilder/ExpressionBuilderPage';
import { AdaptableWizardStep, ExpressionWizardProps } from '@adaptabletools/adaptable/src/View/Wizard/Interface/IAdaptableWizard';
import { SparklinesChartDefinition } from '@adaptabletools/adaptable/src/PredefinedConfig/ChartState';
export declare class SparklinesChartExpressionColumnWizard extends ExpressionBuilderPage implements AdaptableWizardStep {
    private props2;
    constructor(props2: ExpressionWizardProps<SparklinesChartDefinition>);
    Data: any;
    Next(): void;
    canBack(): boolean;
}
