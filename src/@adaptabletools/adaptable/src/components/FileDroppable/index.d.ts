import * as React from 'react';
import { FlexProps } from 'rebass';
interface FileDroppableProps extends FlexProps {
    buttonText?: React.ReactNode;
    fileAccept?: string;
    icon?: React.ReactNode;
    helpText?: React.ReactNode;
    defaultText?: React.ReactNode;
    dragOverText?: React.ReactNode;
    message?: React.ReactNode;
    toJSON?: (str: string) => Promise<any> | any;
    readFile?: (file: File, toJSON?: (str: string) => Promise<any> | any) => Promise<any>;
    onDropSuccess?: (json: any, file: File) => void;
}
declare const FileDroppable: {
    (props: FileDroppableProps): JSX.Element;
    defaultProps: {};
};
export default FileDroppable;
