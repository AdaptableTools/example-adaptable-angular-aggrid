import * as React from 'react';
import { AdaptableObjectExpressionAdaptableWizardProps } from '../../Wizard/Interface/IAdaptableWizard';
export interface GradientColumnWizardProps extends AdaptableObjectExpressionAdaptableWizardProps<GradientColumnWizard> {
    ColorPalette: Array<string>;
}
export declare class GradientColumnWizard extends React.Component<GradientColumnWizardProps, {}> {
    render(): JSX.Element;
}
