import * as React from 'react';
import { SimpleButtonProps } from '../../../components/SimpleButton';
export interface InfoButtonProps extends SimpleButtonProps {
    glyph?: string;
    tooltip?: string;
}
export declare class ButtonInfo extends React.Component<InfoButtonProps, {}> {
    render(): JSX.Element;
}
