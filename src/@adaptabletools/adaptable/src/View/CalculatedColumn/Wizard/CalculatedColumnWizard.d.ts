import * as React from 'react';
import { AdaptableObjectExpressionAdaptableWizardProps } from '../../Wizard/Interface/IAdaptableWizard';
export interface CalculatedColumnWizardProps extends AdaptableObjectExpressionAdaptableWizardProps<CalculatedColumnWizard> {
    IsExpressionValid: (expression: string) => void;
    GetErrorMessage: () => string;
}
export declare class CalculatedColumnWizard extends React.Component<CalculatedColumnWizardProps, {}> {
    render(): JSX.Element;
}
