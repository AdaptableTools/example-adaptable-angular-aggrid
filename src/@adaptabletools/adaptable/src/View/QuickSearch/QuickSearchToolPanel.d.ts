import * as React from 'react';
import * as _ from 'lodash';
import { ToolPanelStrategyViewPopupProps } from '../Components/SharedProps/ToolPanelStrategyViewPopupProps';
import * as QuickSearchRedux from '../../Redux/ActionsReducers/QuickSearchRedux';
interface QuickSearchToolPanelComponentProps extends ToolPanelStrategyViewPopupProps<QuickSearchToolPanelComponentProps> {
    onRunQuickSearch: (quickSearchText: string) => QuickSearchRedux.QuickSearchApplyAction;
    QuickSearchText: string;
}
interface QuickSearchToolPanelComponentState {
    EditedQuickSearchText: string;
    IsMinimised: boolean;
}
declare class QuickSearchToolPanelComponent extends React.Component<QuickSearchToolPanelComponentProps, QuickSearchToolPanelComponentState> {
    constructor(props: QuickSearchToolPanelComponentProps);
    UNSAFE_componentWillReceiveProps(nextProps: QuickSearchToolPanelComponentProps, nextContext: any): void;
    debouncedRunQuickSearch: (() => QuickSearchRedux.QuickSearchApplyAction) & _.Cancelable;
    render(): JSX.Element;
    onUpdateQuickSearchText(searchText: string): void;
}
export declare let QuickSearchToolPanel: import("react-redux").ConnectedComponent<typeof QuickSearchToolPanelComponent, any>;
export {};
