import * as React from 'react';
import * as ShortcutRedux from '../../Redux/ActionsReducers/ShortcutRedux';
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux';
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps';
import { MathOperation } from '../../PredefinedConfig/Common/Enums';
import { EditableConfigEntityState } from '../Components/SharedProps/EditableConfigEntityState';
import { Shortcut } from '../../PredefinedConfig/ShortcutState';
import { AdaptableObject } from '../../PredefinedConfig/Common/AdaptableObject';
interface ShortcutPopupProps extends StrategyViewPopupProps<ShortcutPopupComponent> {
    onAddShortcut: (shortcut: Shortcut) => ShortcutRedux.ShortcutAddAction;
    onEditShortcut: (shortcut: Shortcut) => ShortcutRedux.ShortcutEditAction;
    Shortcuts: Array<Shortcut>;
    onShare: (entity: AdaptableObject) => TeamSharingRedux.TeamSharingShareAction;
}
declare class ShortcutPopupComponent extends React.Component<ShortcutPopupProps, EditableConfigEntityState> {
    constructor(props: ShortcutPopupProps);
    render(): JSX.Element;
    onChangeKeyShortcut(shortcut: Shortcut, newKey: string): void;
    onChangeOperationShortcut(shortcut: Shortcut, newMathOperation: MathOperation): void;
    onChangeResultShortcut(shortcut: Shortcut, newResult: any): void;
    onCloseWizard(): void;
    onFinishWizard(): void;
    canFinishWizard(): boolean;
    onNew(): void;
    getAvailableKeys(shortcut: Shortcut): string[];
}
export declare let ShortcutPopup: import("react-redux").ConnectedComponent<typeof ShortcutPopupComponent, any>;
export {};
