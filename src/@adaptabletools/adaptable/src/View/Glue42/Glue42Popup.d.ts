import * as React from 'react';
import * as Glue42Redux from '../../Redux/ActionsReducers/Glue42Redux';
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps';
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux';
import { EditableConfigEntityState } from '../Components/SharedProps/EditableConfigEntityState';
import { AdaptableObject } from '../../PredefinedConfig/Common/AdaptableObject';
import { Glue42Report } from '../../PredefinedConfig/Glue42State';
interface Glue42PopupProps extends StrategyViewPopupProps<Glue42PopupComponent> {
    onGlue42SendSnapshot: (Glue42eport: Glue42Report) => Glue42Redux.Glue42SendSnapshotAction;
    onShare: (entity: AdaptableObject) => TeamSharingRedux.TeamSharingShareAction;
}
declare class Glue42PopupComponent extends React.Component<Glue42PopupProps, EditableConfigEntityState> {
    constructor(props: Glue42PopupProps);
    shouldClosePopupOnFinishWizard: boolean;
    componentDidMount(): void;
    render(): JSX.Element;
    onApplyExport(Glue42Report: Glue42Report): void;
}
export declare let Glue42Popup: import("react-redux").ConnectedComponent<typeof Glue42PopupComponent, Pick<Glue42PopupProps, "key" | "ref" | "AccessLevel" | "Columns" | "UserFilters" | "SystemFilters" | "NamedFilters" | "ColumnCategories" | "Adaptable" | "ColumnSorts" | "ColorPalette" | "ColumnFilters" | "PopupParams" | "TeamSharingActivated" | "ModalContainer" | "onClearPopupParams" | "onClosePopup">>;
export {};
