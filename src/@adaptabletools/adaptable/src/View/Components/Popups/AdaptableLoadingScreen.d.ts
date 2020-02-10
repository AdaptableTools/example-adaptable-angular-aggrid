import { IAdaptable } from '../../../AdaptableInterfaces/IAdaptable';
import * as React from 'react';
export interface IAdaptableLoadingScreenProps extends React.ClassAttributes<AdaptableLoadingScreen> {
    showLoadingScreen: boolean;
    onClose?: () => {};
    Adaptable: IAdaptable;
}
export declare class AdaptableLoadingScreen extends React.Component<IAdaptableLoadingScreenProps, {}> {
    render(): JSX.Element;
}
