import * as React from 'react';
import * as AdvancedSearchRedux from '../../Redux/ActionsReducers/AdvancedSearchRedux';
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux';
import { ToolPanelStrategyViewPopupProps } from '../Components/SharedProps/ToolPanelStrategyViewPopupProps';
import { AdvancedSearch } from '../../PredefinedConfig/AdvancedSearchState';
interface AdvancedSearchToolPanelComponentProps extends ToolPanelStrategyViewPopupProps<AdvancedSearchToolPanelComponent> {
    CurrentAdvancedSearchName: string;
    AdvancedSearches: AdvancedSearch[];
    onSelectAdvancedSearch: (advancedSearchName: string) => AdvancedSearchRedux.AdvancedSearchSelectAction;
    onNewAdvancedSearch: () => PopupRedux.PopupShowScreenAction;
    onEditAdvancedSearch: () => PopupRedux.PopupShowScreenAction;
}
interface AdvancedSearchToolPanelComponentState {
    IsMinimised: boolean;
}
declare class AdvancedSearchToolPanelComponent extends React.Component<AdvancedSearchToolPanelComponentProps, AdvancedSearchToolPanelComponentState> {
    constructor(props: AdvancedSearchToolPanelComponentProps);
    render(): JSX.Element;
    onSelectedSearchChanged(searchName: string): void;
}
export declare let AdvancedSearchToolPanel: import("react-redux").ConnectedComponent<typeof AdvancedSearchToolPanelComponent, any>;
export {};
