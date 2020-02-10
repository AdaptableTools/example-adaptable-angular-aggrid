import * as React from 'react';
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps';
import { AdaptableColumn } from '../../PredefinedConfig/Common/AdaptableColumn';
import * as SystemRedux from '../../Redux/ActionsReducers/SystemRedux';
import { ColumnCategory } from '../../PredefinedConfig/ColumnCategoryState';
interface ColumnChooserPopupProps extends StrategyViewPopupProps<ColumnChooserPopupComponent> {
    onNewColumnListOrder: (VisibleColumnList: AdaptableColumn[]) => SystemRedux.SetNewColumnListOrderAction;
    ColumnCategories: Array<ColumnCategory>;
}
declare class ColumnChooserPopupComponent extends React.Component<ColumnChooserPopupProps, {}> {
    render(): JSX.Element;
    private ColumnListChange;
}
export declare let ColumnChooserPopup: import("react-redux").ConnectedComponent<typeof ColumnChooserPopupComponent, any>;
export {};
