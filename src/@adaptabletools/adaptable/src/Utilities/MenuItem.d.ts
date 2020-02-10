import * as Redux from 'redux';
import { StrategyParams } from '../View/Components/SharedProps/StrategyViewPopupProps';
import { AdaptableMenuItem } from '../PredefinedConfig/Common/Menu';
import { AdaptableFunctionName } from '../PredefinedConfig/Common/Types';
export declare class MenuItemDoReduxAction implements AdaptableMenuItem {
    constructor(label: string, functionName: AdaptableFunctionName, reduxAaction: Redux.Action, icon: string, isVisible: boolean);
    ReduxAction: Redux.Action;
    Label: string;
    FunctionName: AdaptableFunctionName;
    IsVisible: boolean;
    Icon: string;
}
export declare class MenuItemDoClickFunction implements AdaptableMenuItem {
    constructor(label: string, functionName: AdaptableFunctionName, clickFunction: () => void, icon: string, isVisible: boolean);
    ClickFunction: () => void;
    Label: string;
    FunctionName: AdaptableFunctionName;
    IsVisible: boolean;
    Icon: string;
}
export declare class MenuItemShowPopup implements AdaptableMenuItem {
    constructor(label: string, functionName: AdaptableFunctionName, componentName: string, icon: string, isVisible: boolean, popupParams?: StrategyParams);
    ReduxAction: Redux.Action;
    Label: string;
    FunctionName: AdaptableFunctionName;
    IsVisible: boolean;
    Icon: string;
}
