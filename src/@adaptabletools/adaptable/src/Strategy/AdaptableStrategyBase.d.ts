import { IStrategy } from './Interface/IStrategy';
import { Action } from 'redux';
import { AdaptableColumn } from '../PredefinedConfig/Common/AdaptableColumn';
import { StrategyParams } from '../View/Components/SharedProps/StrategyViewPopupProps';
import { MenuItemShowPopup, MenuItemDoReduxAction, MenuItemDoClickFunction } from '../Utilities/MenuItem';
import { AdaptableMenuItem, MenuInfo } from '../PredefinedConfig/Common/Menu';
import { IAdaptable } from '../AdaptableInterfaces/IAdaptable';
import { AdaptableFunctionName } from '../PredefinedConfig/Common/Types';
/**
 * Base class for all strategies and does most of the work of creating menus
 * Each strategy is reponsible for managing state (through InitState())
 */
export declare abstract class AdaptableStrategyBase implements IStrategy {
    Id: AdaptableFunctionName;
    protected adaptable: IAdaptable;
    constructor(Id: AdaptableFunctionName, adaptable: IAdaptable);
    private isVisible;
    private isReadOnly;
    initializeWithRedux(): void;
    setStrategyEntitlement(): void;
    protected InitState(): void;
    addFunctionMenuItem(): AdaptableMenuItem | undefined;
    addColumnMenuItem(column: AdaptableColumn): AdaptableMenuItem | undefined;
    addContextMenuItem(menuInfo: MenuInfo): AdaptableMenuItem | undefined;
    private getStrategyEntitlement;
    private isVisibleStrategy;
    private isReadOnlyStrategy;
    createMainMenuItemShowPopup({ Label, ComponentName, Icon, PopupParams, }: {
        Label: string;
        ComponentName: string;
        Icon: string;
        PopupParams?: StrategyParams;
    }): MenuItemShowPopup;
    createColumnMenuItemClickFunction(Label: string, Icon: string, ClickFunction: () => void): MenuItemDoClickFunction;
    createColumnMenuItemReduxAction(Label: string, Icon: string, Action: Action): MenuItemDoReduxAction;
    createColumnMenuItemShowPopup(Label: string, ComponentName: string, Icon: string, PopupParams?: StrategyParams): MenuItemShowPopup;
    canCreateColumnMenuItem(column: AdaptableColumn, adaptable: IAdaptable, functionType?: 'sort' | 'editable' | 'style' | 'sparkline' | 'columnfilter' | 'quickfilter' | 'numeric'): boolean;
}
