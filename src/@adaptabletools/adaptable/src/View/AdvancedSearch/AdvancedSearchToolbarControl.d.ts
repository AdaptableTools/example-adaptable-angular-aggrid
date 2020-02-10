import * as React from 'react';
import * as AdvancedSearchRedux from '../../Redux/ActionsReducers/AdvancedSearchRedux';
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux';
import { ToolbarStrategyViewPopupProps } from '../Components/SharedProps/ToolbarStrategyViewPopupProps';
import { AdvancedSearch } from '../../PredefinedConfig/AdvancedSearchState';
interface AdvancedSearchToolbarControlComponentProps extends ToolbarStrategyViewPopupProps<AdvancedSearchToolbarControlComponent> {
    CurrentAdvancedSearchName: string;
    AdvancedSearches: AdvancedSearch[];
    onSelectAdvancedSearch: (advancedSearchName: string) => AdvancedSearchRedux.AdvancedSearchSelectAction;
    onNewAdvancedSearch: () => PopupRedux.PopupShowScreenAction;
    onEditAdvancedSearch: () => PopupRedux.PopupShowScreenAction;
}
declare class AdvancedSearchToolbarControlComponent extends React.Component<AdvancedSearchToolbarControlComponentProps, {}> {
    render(): JSX.Element;
    onSelectedSearchChanged(searchName: string): void;
}
export declare let AdvancedSearchToolbarControl: import("react-redux").ConnectedComponent<typeof AdvancedSearchToolbarControlComponent, any>;
export {};
