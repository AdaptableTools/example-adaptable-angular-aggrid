import * as React from 'react';
import * as BulkUpdateRedux from '../../Redux/ActionsReducers/BulkUpdateRedux';
import * as SystemRedux from '../../Redux/ActionsReducers/SystemRedux';
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux';
import { ToolbarStrategyViewPopupProps } from '../Components/SharedProps/ToolbarStrategyViewPopupProps';
import { IPreviewInfo } from '../../Utilities/Interface/IPreview';
import { IUIConfirmation } from '../../Utilities/Interface/IMessage';
import { BulkUpdateValidationResult } from '../../Strategy/Interface/IBulkUpdateStrategy';
interface BulkUpdateToolbarControlComponentProps extends ToolbarStrategyViewPopupProps<BulkUpdateToolbarControlComponent> {
    BulkUpdateValue: string;
    BulkUpdateValidationResult: BulkUpdateValidationResult;
    PreviewInfo: IPreviewInfo;
    onBulkUpdateValueChange: (value: string) => BulkUpdateRedux.BulkUpdateChangeValueAction;
    onBulkUpdateCheckSelectedCells: () => SystemRedux.BulkUpdateCheckCellSelectionAction;
    onApplyBulkUpdate: () => BulkUpdateRedux.BulkUpdateApplyAction;
    onConfirmWarningCellValidation: (confirmation: IUIConfirmation) => PopupRedux.PopupShowConfirmationAction;
}
declare class BulkUpdateToolbarControlComponent extends React.Component<BulkUpdateToolbarControlComponentProps, {}> {
    constructor(props: BulkUpdateToolbarControlComponentProps);
    componentDidMount(): void;
    render(): JSX.Element;
    private onColumnValueSelectedChanged;
    private checkSelectedCells;
    private getStatusColour;
    private onApplyClick;
    private onConfirmWarningCellValidation;
    onApplyBulkUpdate(): any;
}
export declare let BulkUpdateToolbarControl: import("react-redux").ConnectedComponent<typeof BulkUpdateToolbarControlComponent, any>;
export {};
