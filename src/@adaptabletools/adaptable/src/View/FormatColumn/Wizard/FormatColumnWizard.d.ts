import * as React from 'react';
import { AdaptableObjectExpressionAdaptableWizardProps } from '../../Wizard/Interface/IAdaptableWizard';
export interface FormatColumnWizardProps extends AdaptableObjectExpressionAdaptableWizardProps<FormatColumnWizard> {
    ColorPalette: string[];
    StyleClassNames: string[];
}
export declare class FormatColumnWizard extends React.Component<FormatColumnWizardProps, {}> {
    render(): JSX.Element;
}
