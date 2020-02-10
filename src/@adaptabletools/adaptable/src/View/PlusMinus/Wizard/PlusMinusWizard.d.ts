import * as React from 'react';
import { AdaptableObjectExpressionAdaptableWizardProps } from '../../Wizard/Interface/IAdaptableWizard';
export interface PlusMinusWizardProps extends AdaptableObjectExpressionAdaptableWizardProps<PlusMinusWizard> {
    SelectedColumnId: string;
}
export declare class PlusMinusWizard extends React.Component<PlusMinusWizardProps, {}> {
    render(): JSX.Element;
}
