import * as React from 'react';
import { AdaptableObjectExpressionAdaptableWizardProps } from '@adaptabletools/adaptable/src/View/Wizard/Interface/IAdaptableWizard';
export interface SparklineColumnWizardProps extends AdaptableObjectExpressionAdaptableWizardProps<SparklineColumnWizard> {
    ColorPalette: Array<string>;
}
export declare class SparklineColumnWizard extends React.Component<SparklineColumnWizardProps, {}> {
    render(): JSX.Element;
}
