import * as React from 'react';
import { AdaptableObjectExpressionAdaptableWizardProps } from '../../Wizard/Interface/IAdaptableWizard';
import { ColumnCategory } from '../../../PredefinedConfig/ColumnCategoryState';
export interface ConditionalStyleWizardProps extends AdaptableObjectExpressionAdaptableWizardProps<ConditionalStyleWizard> {
    ColorPalette: string[];
    StyleClassNames: string[];
    ColumnCategories: ColumnCategory[];
}
export declare class ConditionalStyleWizard extends React.Component<ConditionalStyleWizardProps, {}> {
    render(): JSX.Element;
}
