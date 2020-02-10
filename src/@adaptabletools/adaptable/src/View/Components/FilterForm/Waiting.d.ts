import * as React from 'react';
import { FlexProps } from 'rebass';
export declare type WaitingProps = React.ClassAttributes<Waiting> & {
    WaitingMessage: string;
} & FlexProps;
export declare class Waiting extends React.Component<WaitingProps, {}> {
    render(): any;
}
