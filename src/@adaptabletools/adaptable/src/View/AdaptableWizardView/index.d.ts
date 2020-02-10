import { ReactNode } from 'react';
import { AdaptableOptions } from '../../AdaptableOptions/AdaptableOptions';
interface AdaptableWizardViewProps {
    adaptableOptions: AdaptableOptions;
    onInit: (adaptableOptions: AdaptableOptions) => any;
    fileContentsToJSON?: (str: string) => Promise<any> | any;
    readFile?: (file: File) => Promise<any>;
    fileAccept?: string;
    loadingMessage?: ReactNode;
    defaultActionMessage?: ReactNode;
    dragOverActionMessage?: ReactNode;
    fetchData?: () => Promise<any>;
    prepareData?: (data: any, file?: File) => {
        columns: string[];
        data: any[];
        primaryKey?: string;
    };
}
declare const AdaptableWizardView: (props: AdaptableWizardViewProps) => JSX.Element;
export default AdaptableWizardView;
