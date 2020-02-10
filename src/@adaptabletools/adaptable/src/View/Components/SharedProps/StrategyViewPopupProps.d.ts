import * as PopupRedux from '../../../Redux/ActionsReducers/PopupRedux';
import { BaseProps } from './BaseProps';
import { ColumnSort } from '../../../PredefinedConfig/Common/ColumnSort';
export interface StrategyViewPopupProps<View> extends BaseProps<View> {
    PopupParams: StrategyParams;
    onClearPopupParams: () => PopupRedux.PopupClearParamAction;
    TeamSharingActivated: boolean;
    ColumnSorts: ColumnSort[];
    onClosePopup: () => void;
}
export interface StrategyParams {
    columnId?: string;
    action?: 'New' | 'Edit';
    value?: any;
    primaryKeyValues?: any[];
    source: 'Toolbar' | 'FunctionMenu' | 'ColumnMenu' | 'ContextMenu' | 'Other';
}
