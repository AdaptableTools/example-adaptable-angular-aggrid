import * as React from 'react';
import * as DataSourceRedux from '../../Redux/ActionsReducers/DataSourceRedux';
import { ToolbarStrategyViewPopupProps } from '../Components/SharedProps/ToolbarStrategyViewPopupProps';
import { DataSource } from '../../PredefinedConfig/DataSourceState';
interface DataSourceToolbarControlComponentProps extends ToolbarStrategyViewPopupProps<DataSourceToolbarControlComponent> {
    CurrentDataSourceName: string;
    DataSources: DataSource[];
    onSelectDataSource: (DataSourceName: string) => DataSourceRedux.DataSourceSelectAction;
}
interface DataSourceToolbarControlComponentState {
    CurrentDataSource: DataSource;
}
declare class DataSourceToolbarControlComponent extends React.Component<DataSourceToolbarControlComponentProps, DataSourceToolbarControlComponentState> {
    constructor(props: DataSourceToolbarControlComponentProps);
    render(): JSX.Element;
    onSelectedDataSourceChanged(dataSourceName: string): void;
    private onApplyClick;
    private canApplyDataSource;
}
export declare let DataSourceToolbarControl: import("react-redux").ConnectedComponent<typeof DataSourceToolbarControlComponent, any>;
export {};
