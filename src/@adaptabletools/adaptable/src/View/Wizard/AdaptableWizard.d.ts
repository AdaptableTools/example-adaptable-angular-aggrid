import * as React from 'react';
import { IAdaptable } from '../../AdaptableInterfaces/IAdaptable';
import { AdaptableColumn } from '../../PredefinedConfig/Common/AdaptableColumn';
export interface IWizardStepInfo {
    StepName: string;
    Element: JSX.Element;
    Index: number;
}
export interface AdaptableWizardProps extends React.ClassAttributes<AdaptableWizard> {
    Steps: IWizardStepInfo[];
    Data: any;
    onHide: Function;
    onFinish?: Function;
    StepStartIndex?: number;
    FriendlyName?: string;
    ModalContainer: HTMLElement;
    canFinishWizard: Function;
    Adaptable: IAdaptable;
    Columns: Array<AdaptableColumn>;
}
export interface AdaptableWizardState extends React.ClassAttributes<AdaptableWizard> {
    ActiveState: any;
    IndexState: number;
}
export declare class AdaptableWizard extends React.Component<AdaptableWizardProps, AdaptableWizardState> {
    private ActiveStep;
    private stepName;
    constructor(props: AdaptableWizardProps);
    render(): JSX.Element;
    private onStepButtonClicked;
    ForceUpdateGoBackState(): void;
    isLastStep(): boolean;
    isFirstStep(): boolean;
    canFinishWizard(): boolean;
    handleClickBack(): void;
    handleClickNext(): void;
    handleClickFinish(): void;
    private cloneWizardStep;
}
