/// <reference types="react" />
import { AdaptableOptions } from '../../../types';
interface ConfigurationFormOptions {
    adaptableOptions: AdaptableOptions;
    onChangeadaptableOptions: (adaptableOptions: AdaptableOptions) => void;
}
declare const ConfigurationForm: (props: ConfigurationFormOptions) => JSX.Element;
export default ConfigurationForm;
