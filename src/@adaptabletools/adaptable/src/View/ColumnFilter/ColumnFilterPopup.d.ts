import * as React from 'react';
import * as ColumnFilterRedux from '../../Redux/ActionsReducers/ColumnFilterRedux';
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux';
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux';
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps';
import { AdaptableObject } from '../../PredefinedConfig/Common/AdaptableObject';
import { ColumnFilter } from '../../PredefinedConfig/ColumnFilterState';
import { IUIPrompt } from '../../Utilities/Interface/IMessage';
interface ColumnFilterPopupProps extends StrategyViewPopupProps<ColumnFilterPopupComponent> {
    ColumnFilters: ColumnFilter[];
    onClearColumnFilter: (columnFilter: ColumnFilter) => ColumnFilterRedux.ColumnFilterClearAction;
    onShowPrompt: (prompt: IUIPrompt) => PopupRedux.PopupShowPromptAction;
    onShare: (entity: AdaptableObject) => TeamSharingRedux.TeamSharingShareAction;
}
declare class ColumnFilterPopupComponent extends React.Component<ColumnFilterPopupProps, {}> {
    constructor(props: ColumnFilterPopupProps);
    render(): JSX.Element;
    private onClearColumnFilter;
    private onSaveColumnFilterasUserFilter;
}
export declare let ColumnFilterPopup: import("react-redux").ConnectedComponent<typeof ColumnFilterPopupComponent, any>;
export {};
