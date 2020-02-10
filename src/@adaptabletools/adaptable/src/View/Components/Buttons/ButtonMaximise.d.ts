import * as React from 'react';
import { SimpleButtonProps } from '../../../components/SimpleButton';
export interface MaximiseButtonProps extends SimpleButtonProps {
    useHoirzontalChevron?: boolean;
}
export declare class ButtonMaximise extends React.Component<MaximiseButtonProps, {}> {
    render(): JSX.Element;
}
