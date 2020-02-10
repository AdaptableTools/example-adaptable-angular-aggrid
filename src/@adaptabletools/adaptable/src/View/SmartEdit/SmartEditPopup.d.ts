import * as React from 'react';
import * as SmartEditRedux from '../../Redux/ActionsReducers/SmartEditRedux';
import * as SystemRedux from '../../Redux/ActionsReducers/SystemRedux';
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux';
import { MathOperation } from '../../PredefinedConfig/Common/Enums';
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps';
import { IPreviewInfo } from '../../Utilities/Interface/IPreview';
import { IUIConfirmation } from '../../Utilities/Interface/IMessage';
interface SmartEditPopupProps extends StrategyViewPopupProps<SmartEditPopupComponent> {
    SmartEditValue: number;
    MathOperation: MathOperation;
    PreviewInfo: IPreviewInfo;
    onSmartEditValueChange: (value: number) => SmartEditRedux.SmartEditChangeValueAction;
    onSmartEditOperationChange: (MathOperation: MathOperation) => SmartEditRedux.SmartEditChangeOperationAction;
    onSmartEditCheckSelectedCells: () => SystemRedux.SmartEditCheckCellSelectionAction;
    onApplySmartEdit: () => SmartEditRedux.SmartEditApplyAction;
    onConfirmWarningCellValidation: (confirmation: IUIConfirmation) => PopupRedux.PopupShowConfirmationAction;
}
declare class SmartEditPopupComponent extends React.Component<SmartEditPopupProps, {}> {
    constructor(props: SmartEditPopupProps);
    componentDidMount(): void;
    render(): JSX.Element;
    private submit;
    private onSmartEditValueChange;
    private onApplySmartEdit;
    private onConfirmWarningCellValidation;
    private getButtonStyle;
}
export declare let SmartEditPopup: import("react-redux").ConnectedComponent<typeof SmartEditPopupComponent, any>;
export {};
