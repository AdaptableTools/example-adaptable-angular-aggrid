import { IAdaptable } from '../../../AdaptableInterfaces/IAdaptable';
import * as React from 'react';
import * as PopupRedux from '../../../Redux/ActionsReducers/PopupRedux';
import { StrategyParams } from '../SharedProps/StrategyViewPopupProps';
import { AdaptableFunctionName } from '../../../PredefinedConfig/Common/Types';
/**
 * This is the main popup that we use - so all function popups will appear here.
 */
export interface AdaptablePopupProps extends React.ClassAttributes<AdaptablePopup> {
    showModal: boolean;
    ComponentName?: string;
    ComponentStrategy: AdaptableFunctionName;
    onHide?: () => void;
    Adaptable: IAdaptable;
    PopupParams: StrategyParams;
    PopupProps?: {
        [key: string]: any;
    };
    onClearPopupParams?: () => PopupRedux.PopupClearParamAction;
}
export declare class AdaptablePopup extends React.Component<AdaptablePopupProps, {}> {
    render(): JSX.Element;
}
