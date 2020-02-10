import * as React from 'react';
import { AdaptableObjectExpressionAdaptableWizardProps } from '../../Wizard/Interface/IAdaptableWizard';
export interface UserFilterWizardProps extends AdaptableObjectExpressionAdaptableWizardProps<UserFilterWizard> {
    SelectedColumnId: string;
}
export declare class UserFilterWizard extends React.Component<UserFilterWizardProps, {}> {
    render(): JSX.Element;
}
