import * as React from 'react';
import { AdaptableOptions } from '../../../types';
interface ConfigurationDialogProps extends React.HTMLProps<HTMLElement> {
    adaptableOptions: AdaptableOptions;
    onFinish: (adaptableOptions: AdaptableOptions) => void;
    onCancel: () => void;
}
declare const ConfigurationDialog: (props: ConfigurationDialogProps) => JSX.Element;
export default ConfigurationDialog;
