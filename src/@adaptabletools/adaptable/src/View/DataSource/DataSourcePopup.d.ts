import * as React from 'react';
import * as DataSourceRedux from '../../Redux/ActionsReducers/DataSourceRedux';
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux';
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps';
import { EditableConfigEntityState } from '../Components/SharedProps/EditableConfigEntityState';
import { AdaptableObject } from '../../PredefinedConfig/Common/AdaptableObject';
import { DataSource } from '../../PredefinedConfig/DataSourceState';
interface DataSourcePopupProps extends StrategyViewPopupProps<DataSourcePopupComponent> {
    onAddDataSource: (DataSource: DataSource) => DataSourceRedux.DataSourceAddAction;
    onEditDataSource: (DataSource: DataSource) => DataSourceRedux.DataSourceEditAction;
    onSelectDataSource: (SelectedDataSource: string) => DataSourceRedux.DataSourceSelectAction;
    DataSources: Array<DataSource>;
    CurrentDataSource: string;
    onShare: (entity: AdaptableObject) => TeamSharingRedux.TeamSharingShareAction;
}
declare class DataSourcePopupComponent extends React.Component<DataSourcePopupProps, EditableConfigEntityState> {
    constructor(props: DataSourcePopupProps);
    render(): JSX.Element;
    onChangeName(dataSource: DataSource, name: string): void;
    onChangeDescription(dataSource: DataSource, description: string): void;
    onEdit(dataSource: DataSource): void;
    onCloseWizard(): void;
    onFinishWizard(): void;
    canFinishWizard(): boolean;
    CreateDataSource(): void;
}
export declare let DataSourcePopup: import("react-redux").ConnectedComponent<typeof DataSourcePopupComponent, Pick<DataSourcePopupProps, "key" | "ref" | "AccessLevel" | "Columns" | "UserFilters" | "SystemFilters" | "NamedFilters" | "ColumnCategories" | "Adaptable" | "ColumnSorts" | "ColorPalette" | "ColumnFilters" | "PopupParams" | "TeamSharingActivated" | "ModalContainer" | "onClearPopupParams" | "onClosePopup">>;
export {};
