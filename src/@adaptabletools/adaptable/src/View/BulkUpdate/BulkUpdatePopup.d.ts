import * as React from 'react';
import * as BulkUpdateRedux from '../../Redux/ActionsReducers/BulkUpdateRedux';
import * as SystemRedux from '../../Redux/ActionsReducers/SystemRedux';
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux';
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps';
import { IPreviewInfo } from '../../Utilities/Interface/IPreview';
import { IUIConfirmation } from '../../Utilities/Interface/IMessage';
import { BulkUpdateValidationResult } from '../../Strategy/Interface/IBulkUpdateStrategy';
interface BulkUpdatePopupProps extends StrategyViewPopupProps<BulkUpdatePopupComponent> {
    BulkUpdateValue: string;
    BulkUpdateValidationResult: BulkUpdateValidationResult;
    PreviewInfo: IPreviewInfo;
    onBulkUpdateValueChange: (value: string) => BulkUpdateRedux.BulkUpdateChangeValueAction;
    onBulkUpdateCheckSelectedCells: () => SystemRedux.BulkUpdateCheckCellSelectionAction;
    onApplyBulkUpdate: () => BulkUpdateRedux.BulkUpdateApplyAction;
    onConfirmWarningCellValidation: (confirmation: IUIConfirmation) => PopupRedux.PopupShowConfirmationAction;
}
export interface BulkUpdatePopupState {
    isShowingError: boolean;
    errorText: string;
    useSelector: boolean;
}
declare class BulkUpdatePopupComponent extends React.Component<BulkUpdatePopupProps, BulkUpdatePopupState> {
    constructor(props: BulkUpdatePopupProps);
    componentDidMount(): void;
    render(): JSX.Element;
    private onColumnValueSelectedChanged;
    private onUseColumnValuesSelectorChanged;
    private onBulkUpdateValueChange;
    private onApplyClick;
    private onApplyBulkUpdate;
    private onConfirmWarningCellValidation;
}
export declare let BulkUpdatePopup: import("react-redux").ConnectedComponent<typeof BulkUpdatePopupComponent, any>;
export {};
