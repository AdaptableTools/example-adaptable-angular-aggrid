import * as React from 'react';
import { AdaptableObjectExpressionAdaptableWizardProps } from '../../Wizard/Interface/IAdaptableWizard';
import { ColumnSort } from '../../../PredefinedConfig/Common/ColumnSort';
export interface LayoutWizardProps extends AdaptableObjectExpressionAdaptableWizardProps<LayoutWizard> {
    ColumnSorts: ColumnSort[];
}
export declare class LayoutWizard extends React.Component<LayoutWizardProps, {}> {
    render(): JSX.Element;
}
