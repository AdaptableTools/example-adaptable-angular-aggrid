import * as React from 'react';
import * as SmartEditRedux from '../../Redux/ActionsReducers/SmartEditRedux';
import * as SystemRedux from '../../Redux/ActionsReducers/SystemRedux';
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux';
import { MathOperation } from '../../PredefinedConfig/Common/Enums';
import { IPreviewInfo } from '../../Utilities/Interface/IPreview';
import { IUIConfirmation } from '../../Utilities/Interface/IMessage';
import { ToolPanelStrategyViewPopupProps } from '../Components/SharedProps/ToolPanelStrategyViewPopupProps';
interface SmartEditToolPanelComponentProps extends ToolPanelStrategyViewPopupProps<SmartEditToolPanelComponent> {
    SmartEditValue: number | string;
    MathOperation: MathOperation;
    IsValidSelection: boolean;
    PreviewInfo: IPreviewInfo;
    onSmartEditValueChange: (value: number) => SmartEditRedux.SmartEditChangeValueAction;
    onSmartEditOperationChange: (MathOperation: MathOperation) => SmartEditRedux.SmartEditChangeOperationAction;
    onSmartEditCheckSelectedCells: () => SystemRedux.SmartEditCheckCellSelectionAction;
    onApplySmartEdit: () => SmartEditRedux.SmartEditApplyAction;
    onConfirmWarningCellValidation: (confirmation: IUIConfirmation) => PopupRedux.PopupShowConfirmationAction;
}
interface SmartEditToolPanelComponentState {
    SelectedColumnId: string;
    IsMinimised: boolean;
}
declare class SmartEditToolPanelComponent extends React.Component<SmartEditToolPanelComponentProps, SmartEditToolPanelComponentState> {
    constructor(props: SmartEditToolPanelComponentProps);
    componentDidMount(): void;
    render(): JSX.Element;
    private onSmartEditValueChange;
    private getStatusColour;
    private onApplyClick;
    private onConfirmWarningCellValidation;
    private onchangeMathOperation;
    onApplySmartEdit(): any;
}
export declare let SmartEditToolPanel: import("react-redux").ConnectedComponent<typeof SmartEditToolPanelComponent, any>;
export {};
