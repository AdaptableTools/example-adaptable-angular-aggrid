import * as React from 'react';
import * as _ from 'lodash';
import * as QuickSearchRedux from '../../Redux/ActionsReducers/QuickSearchRedux';
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps';
import { DisplayAction } from '../../PredefinedConfig/Common/Enums';
import { AdaptableStyle } from '../../PredefinedConfig/Common/AdaptableStyle';
interface QuickSearchPopupProps extends StrategyViewPopupProps<QuickSearchPopupComponent> {
    QuickSearchText: string;
    DisplayAction: DisplayAction;
    QuickSearchStyle: AdaptableStyle;
    onRunQuickSearch: (quickSearchText: string) => QuickSearchRedux.QuickSearchApplyAction;
    onSetSearchDisplayType: (DisplayAction: DisplayAction) => QuickSearchRedux.QuickSearchSetDisplayAction;
    onSetStyle: (style: AdaptableStyle) => QuickSearchRedux.QuickSearchSetStyleAction;
}
interface QuickSearchPopupState {
    EditedQuickSearchText: string;
    EditedStyle: AdaptableStyle;
}
declare class QuickSearchPopupComponent extends React.Component<QuickSearchPopupProps, QuickSearchPopupState> {
    constructor(props: QuickSearchPopupProps);
    debouncedRunQuickSearch: (() => QuickSearchRedux.QuickSearchApplyAction) & _.Cancelable;
    componentDidMount(): void;
    handleQuickSearchTextChange(text: string): void;
    onDisplayTypeChange(value: any): void;
    private onUseBackColorCheckChange;
    private onUseForeColorCheckChange;
    private onBackColorSelectChange;
    private onForeColorSelectChange;
    render(): JSX.Element;
    private getTextForDisplayAction;
}
export declare let QuickSearchPopup: import("react-redux").ConnectedComponent<typeof QuickSearchPopupComponent, any>;
export {};
