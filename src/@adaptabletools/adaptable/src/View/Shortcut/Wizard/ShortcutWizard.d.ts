import * as React from 'react';
import { AdaptableObjectExpressionAdaptableWizardProps } from '../../Wizard/Interface/IAdaptableWizard';
export interface ShortcutWizardProps extends AdaptableObjectExpressionAdaptableWizardProps<ShortcutWizard> {
    NumericKeysAvailable: Array<string>;
    DateKeysAvailable: Array<string>;
}
export declare class ShortcutWizard extends React.Component<ShortcutWizardProps, {}> {
    render(): JSX.Element;
}
