import * as React from 'react';
import * as BulkUpdateRedux from '../../Redux/ActionsReducers/BulkUpdateRedux';
import * as SystemRedux from '../../Redux/ActionsReducers/SystemRedux';
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux';
import { ToolPanelStrategyViewPopupProps } from '../Components/SharedProps/ToolPanelStrategyViewPopupProps';
import { IPreviewInfo } from '../../Utilities/Interface/IPreview';
import { IUIConfirmation } from '../../Utilities/Interface/IMessage';
import { BulkUpdateValidationResult } from '../../Strategy/Interface/IBulkUpdateStrategy';
interface BulkUpdateToolPanelControlComponentProps extends ToolPanelStrategyViewPopupProps<BulkUpdateToolPanelControlComponent> {
    BulkUpdateValue: string;
    BulkUpdateValidationResult: BulkUpdateValidationResult;
    PreviewInfo: IPreviewInfo;
    onBulkUpdateValueChange: (value: string) => BulkUpdateRedux.BulkUpdateChangeValueAction;
    onBulkUpdateCheckSelectedCells: () => SystemRedux.BulkUpdateCheckCellSelectionAction;
    onApplyBulkUpdate: () => BulkUpdateRedux.BulkUpdateApplyAction;
    onConfirmWarningCellValidation: (confirmation: IUIConfirmation) => PopupRedux.PopupShowConfirmationAction;
}
interface BulkUpdateToolPanelComponentState {
    Disabled: boolean;
    IsMinimised: boolean;
}
declare class BulkUpdateToolPanelControlComponent extends React.Component<BulkUpdateToolPanelControlComponentProps, BulkUpdateToolPanelComponentState> {
    constructor(props: BulkUpdateToolPanelControlComponentProps);
    componentDidMount(): void;
    render(): JSX.Element;
    private onColumnValueSelectedChanged;
    private checkSelectedCells;
    private getStatusColour;
    private onApplyClick;
    private onConfirmWarningCellValidation;
    onApplyBulkUpdate(): any;
}
export declare let BulkUpdateToolPanel: import("react-redux").ConnectedComponent<typeof BulkUpdateToolPanelControlComponent, any>;
export {};
