import { IAdaptable } from '../../../AdaptableInterfaces/IAdaptable';
import * as React from 'react';
import { AccessLevel } from '../../../PredefinedConfig/Common/Enums';
export interface IAdaptableChartProps extends React.ClassAttributes<AdaptableChart> {
    showChart: boolean;
    onClose?: () => void;
    Adaptable: IAdaptable;
    showModal: boolean;
}
export interface AdaptableChartState {
    chartContainer: HTMLElement;
    accessLevel: AccessLevel;
    isValidUserChartContainer: boolean;
}
export declare class AdaptableChart extends React.Component<IAdaptableChartProps, AdaptableChartState> {
    constructor(props: IAdaptableChartProps);
    render(): JSX.Element;
}
