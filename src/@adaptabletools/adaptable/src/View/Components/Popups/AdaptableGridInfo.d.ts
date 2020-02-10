import * as React from 'react';
import { IColItem } from '../../UIInterfaces';
import { IAdaptable } from '../../../AdaptableInterfaces/IAdaptable';
interface AdaptableGridInfoProps extends React.ClassAttributes<AdaptableGridInfo> {
    Adaptable: IAdaptable;
    onClose?: () => void;
    showAbout: boolean;
}
export interface AdaptableGridInfoState {
    ShowGridProperties: boolean;
    IsBaseOptionsMinimised: boolean;
    IsContainerOptionsMinimised: boolean;
    IsAuditOptionsMinimised: boolean;
    IsConfigServerOptionsMinimised: boolean;
    IsQueryOptionsMinimised: boolean;
    IsLayoutOptionsMinimised: boolean;
    IsFilterOptionsMinimised: boolean;
    IsGeneralOptionsMinimised: boolean;
}
export declare class AdaptableGridInfo extends React.Component<AdaptableGridInfoProps, AdaptableGridInfoState> {
    constructor(props: AdaptableGridInfoProps);
    render(): JSX.Element;
    private CreateGridInfo;
    private CreateBaseOptionsInfo;
    private CreateContainerOptionsInfo;
    private CreateAuditOptionsInfo;
    private CreateConfigServerOptionsInfo;
    private CreateQueryOptionsInfo;
    private CreateLayoutOptionsInfo;
    private CreateFilterOptionsInfo;
    private CreateGeneralOptionsInfo;
    createMaximiseButton(optionType: string, onClickFunction: any): any;
    createMinimiseButton(optionType: string, onClickFunction: any): any;
    createColItem(colItems: IColItem[], item1: any, item2: any, item3?: any): IColItem[];
    onShowGridPropertiesChanged(event: React.FormEvent<any>): void;
}
export {};
