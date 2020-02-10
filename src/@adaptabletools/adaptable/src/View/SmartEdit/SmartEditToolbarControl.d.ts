import * as React from 'react';
import * as SmartEditRedux from '../../Redux/ActionsReducers/SmartEditRedux';
import * as SystemRedux from '../../Redux/ActionsReducers/SystemRedux';
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux';
import { ToolbarStrategyViewPopupProps } from '../Components/SharedProps/ToolbarStrategyViewPopupProps';
import { MathOperation } from '../../PredefinedConfig/Common/Enums';
import { IPreviewInfo } from '../../Utilities/Interface/IPreview';
import { IUIConfirmation } from '../../Utilities/Interface/IMessage';
interface SmartEditToolbarControlComponentProps extends ToolbarStrategyViewPopupProps<SmartEditToolbarControlComponent> {
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
interface SmartEditToolbarControlComponentState {
    SelectedColumnId: string;
}
declare class SmartEditToolbarControlComponent extends React.Component<SmartEditToolbarControlComponentProps, SmartEditToolbarControlComponentState> {
    constructor(props: SmartEditToolbarControlComponentProps);
    componentDidMount(): void;
    render(): JSX.Element;
    private onSmartEditValueChange;
    private getStatusColour;
    private onApplyClick;
    private onConfirmWarningCellValidation;
    onApplySmartEdit(): any;
}
export declare let SmartEditToolbarControl: import("react-redux").ConnectedComponent<typeof SmartEditToolbarControlComponent, any>;
export {};
