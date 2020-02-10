import * as React from 'react';
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps';
interface StateManagementPopupProps extends StrategyViewPopupProps<StateManagementPopupComponent> {
}
declare class StateManagementPopupComponent extends React.Component<StateManagementPopupProps, {}> {
    constructor(props: StateManagementPopupProps);
    render(): JSX.Element;
    onClearLocalStorage(): void;
    onCopyAllStateToClipboard(): void;
    onCopyUserStateToClipboard(): void;
}
export declare let StateManagementPopup: import("react-redux").ConnectedComponent<typeof StateManagementPopupComponent, any>;
export {};
