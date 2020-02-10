import * as React from 'react';
import { AdaptableObjectExpressionAdaptableWizardProps } from '../../Wizard/Interface/IAdaptableWizard';
import { ColumnCategory } from '../../../PredefinedConfig/ColumnCategoryState';
export interface ColumnCategoryWizardProps extends AdaptableObjectExpressionAdaptableWizardProps<ColumnCategoryWizard> {
    ColumnCategorys: ColumnCategory[];
}
export declare class ColumnCategoryWizard extends React.Component<ColumnCategoryWizardProps, {}> {
    render(): JSX.Element;
}
