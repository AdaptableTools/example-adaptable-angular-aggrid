import * as React from 'react';
import { InputProps } from '../../../components/Input';
import { CSSProperties } from 'react';
export declare type AdaptableFormControlTextClearProps = {
    OnTextChange: (textValue: string) => void;
    autoFocus?: boolean;
    inputStyle?: CSSProperties;
} & InputProps;
export declare class AdaptableFormControlTextClear extends React.Component<AdaptableFormControlTextClearProps, {}> {
    render(): JSX.Element;
}
