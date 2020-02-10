import * as React from 'react';
import * as IPushPullRedux from '../../Redux/ActionsReducers/IPushPullRedux';
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps';
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux';
import { EditableConfigEntityState } from '../Components/SharedProps/EditableConfigEntityState';
import { AdaptableObject } from '../../PredefinedConfig/Common/AdaptableObject';
import { IPushPullReport } from '../../PredefinedConfig/IPushPullState';
interface IPushPullPopupProps extends StrategyViewPopupProps<IPushPullPopupComponent> {
    onIPushPullSendSnapshot: (iPushPulleport: IPushPullReport) => IPushPullRedux.IPushPullSendSnapshotAction;
    onIPushPullStopLiveData: () => IPushPullRedux.IPushPullStopLiveDataAction;
    onShare: (entity: AdaptableObject) => TeamSharingRedux.TeamSharingShareAction;
}
declare class IPushPullPopupComponent extends React.Component<IPushPullPopupProps, EditableConfigEntityState> {
    constructor(props: IPushPullPopupProps);
    shouldClosePopupOnFinishWizard: boolean;
    componentDidMount(): void;
    render(): JSX.Element;
    onApplyExport(iPushPullReport: IPushPullReport): void;
}
export declare let IPushPullPopup: import("react-redux").ConnectedComponent<typeof IPushPullPopupComponent, Pick<IPushPullPopupProps, "key" | "ref" | "AccessLevel" | "Columns" | "UserFilters" | "SystemFilters" | "NamedFilters" | "ColumnCategories" | "Adaptable" | "ColumnSorts" | "ColorPalette" | "ColumnFilters" | "PopupParams" | "TeamSharingActivated" | "ModalContainer" | "onClearPopupParams" | "onClosePopup">>;
export {};
