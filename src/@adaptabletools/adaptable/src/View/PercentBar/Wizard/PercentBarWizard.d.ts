import * as React from 'react';
import { AdaptableObjectExpressionAdaptableWizardProps } from '../../Wizard/Interface/IAdaptableWizard';
export interface PercentBarWizardProps extends AdaptableObjectExpressionAdaptableWizardProps<PercentBarWizard> {
    ColorPalette: Array<string>;
}
export declare class PercentBarWizard extends React.Component<PercentBarWizardProps, {}> {
    render(): JSX.Element;
}
