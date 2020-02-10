import { ExpressionBuilderPage } from '@adaptabletools/adaptable/src/View/ExpressionBuilder/ExpressionBuilderPage';
import { AdaptableWizardStep, ExpressionWizardProps } from '@adaptabletools/adaptable/src/View/Wizard/Interface/IAdaptableWizard';
import { CategoryChartDefinition } from '@adaptabletools/adaptable/src/PredefinedConfig/ChartState';
export declare class CategoryChartXAxisExpressionWizard extends ExpressionBuilderPage implements AdaptableWizardStep {
    private props2;
    constructor(props2: ExpressionWizardProps<CategoryChartDefinition>);
    Data: any;
    Next(): void;
    canBack(): boolean;
}
