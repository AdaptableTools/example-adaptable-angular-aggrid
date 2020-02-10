import * as React from 'react';
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps';
import * as UpdatedRowRedux from '../../Redux/ActionsReducers/UpdatedRowRedux';
import { UpdatedRowState } from '../../PredefinedConfig/UpdatedRowState';
interface UpdatedRowPopupProps extends StrategyViewPopupProps<UpdatedRowPopupComponent> {
    UpdatedRowState: UpdatedRowState;
    onEnableDisableUpdatedRow: (shouldEnable: boolean) => UpdatedRowRedux.UpdatedRowEnableDisableAction;
    onEnableDisableJumpToRow: (shouldEnable: boolean) => UpdatedRowRedux.JumpToRowEnableDisableAction;
    onSetUpColor: (upColor: string) => UpdatedRowRedux.UpColorSetAction;
    onSetDownColor: (downColor: string) => UpdatedRowRedux.DownColorSetAction;
    onSetNeutralColor: (neutralColor: string) => UpdatedRowRedux.NeutralColorSetAction;
    onSetMaxItems: (maxItems: number) => UpdatedRowRedux.MaxItemsSetAction;
}
interface UpdatedRowPopupState {
    EnableUpdatedRow: boolean | undefined;
    JumpToRow: boolean | undefined;
    UpColor: string;
    DownColor: string;
    NeutralColor: string;
    MaxItems: number;
}
declare class UpdatedRowPopupComponent extends React.Component<UpdatedRowPopupProps, UpdatedRowPopupState> {
    constructor(props: UpdatedRowPopupProps);
    render(): JSX.Element;
    private onenableUpdatedRowChanged;
    private onEnableJumpToRowChanged;
    private onUpColorSelectChange;
    private onDownColorSelectChange;
    private onNeutralColorSelectChange;
    private onMaxItemsChanged;
}
export declare let UpdatedRowPopup: import("react-redux").ConnectedComponent<typeof UpdatedRowPopupComponent, Pick<UpdatedRowPopupProps, "key" | "ref" | "AccessLevel" | "Columns" | "UserFilters" | "SystemFilters" | "NamedFilters" | "ColumnCategories" | "Adaptable" | "ColumnSorts" | "ColorPalette" | "ColumnFilters" | "PopupParams" | "TeamSharingActivated" | "ModalContainer" | "onClearPopupParams" | "onClosePopup">>;
export {};
