import * as React from 'react';
import * as _ from 'lodash';
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux';
import { ToolbarStrategyViewPopupProps } from '../Components/SharedProps/ToolbarStrategyViewPopupProps';
import * as QuickSearchRedux from '../../Redux/ActionsReducers/QuickSearchRedux';
interface QuickSearchToolbarControlComponentProps extends ToolbarStrategyViewPopupProps<QuickSearchToolbarControlComponent> {
    onRunQuickSearch: (quickSearchText: string) => QuickSearchRedux.QuickSearchApplyAction;
    onShowQuickSearchPopup: () => PopupRedux.PopupShowScreenAction;
    QuickSearchText: string;
}
interface QuickSearchToolbarControlComponentState {
    EditedQuickSearchText: string;
}
declare class QuickSearchToolbarControlComponent extends React.Component<QuickSearchToolbarControlComponentProps, QuickSearchToolbarControlComponentState> {
    constructor(props: QuickSearchToolbarControlComponentProps);
    UNSAFE_componentWillReceiveProps(nextProps: QuickSearchToolbarControlComponentProps, nextContext: any): void;
    debouncedRunQuickSearch: (() => QuickSearchRedux.QuickSearchApplyAction) & _.Cancelable;
    render(): JSX.Element;
    onUpdateQuickSearchText(searchText: string): void;
}
export declare let QuickSearchToolbarControl: import("react-redux").ConnectedComponent<typeof QuickSearchToolbarControlComponent, any>;
export {};
