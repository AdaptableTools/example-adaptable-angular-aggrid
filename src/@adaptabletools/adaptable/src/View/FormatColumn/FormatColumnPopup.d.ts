import * as React from 'react';
import * as FormatColumnRedux from '../../Redux/ActionsReducers/FormatColumnRedux';
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps';
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux';
import { EditableConfigEntityState } from '../Components/SharedProps/EditableConfigEntityState';
import { AdaptableObject } from '../../PredefinedConfig/Common/AdaptableObject';
import { FormatColumn } from '../../PredefinedConfig/FormatColumnState';
interface FormatColumnPopupProps extends StrategyViewPopupProps<FormatColumnPopupComponent> {
    FormatColumns: Array<FormatColumn>;
    StyleClassNames: string[];
    onAddFormatColumn: (formatColumn: FormatColumn) => FormatColumnRedux.FormatColumnAddAction;
    onEditFormatColumn: (formatColumn: FormatColumn) => FormatColumnRedux.FormatColumnEditAction;
    onShare: (entity: AdaptableObject) => TeamSharingRedux.TeamSharingShareAction;
}
declare class FormatColumnPopupComponent extends React.Component<FormatColumnPopupProps, EditableConfigEntityState> {
    constructor(props: FormatColumnPopupProps);
    shouldClosePopupOnFinishWizard: boolean;
    componentDidMount(): void;
    render(): JSX.Element;
    onNew(): void;
    onNewFromColumn(formatColumn: FormatColumn): void;
    onEdit(formatColumn: FormatColumn): void;
    onCloseWizard(): void;
    onFinishWizard(): void;
    canFinishWizard(): boolean;
}
export declare let FormatColumnPopup: import("react-redux").ConnectedComponent<typeof FormatColumnPopupComponent, any>;
export {};
