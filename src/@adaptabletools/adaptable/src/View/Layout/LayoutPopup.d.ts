import * as React from 'react';
import * as LayoutRedux from '../../Redux/ActionsReducers/LayoutRedux';
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux';
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps';
import { EditableConfigEntityState } from '../Components/SharedProps/EditableConfigEntityState';
import { AdaptableObject } from '../../PredefinedConfig/Common/AdaptableObject';
import { Layout } from '../../PredefinedConfig/LayoutState';
interface LayoutPopupProps extends StrategyViewPopupProps<LayoutPopupComponent> {
    Layouts: Layout[];
    CurrentLayoutName: string;
    onSaveLayout: (layout: Layout) => LayoutRedux.LayoutSaveAction;
    onSelectLayout: (SelectedSearchName: string) => LayoutRedux.LayoutSelectAction;
    onShare: (entity: AdaptableObject) => TeamSharingRedux.TeamSharingShareAction;
}
declare class LayoutPopupComponent extends React.Component<LayoutPopupProps, EditableConfigEntityState> {
    constructor(props: LayoutPopupProps);
    shouldClosePopupOnFinishWizard: boolean;
    componentDidMount(): void;
    render(): JSX.Element;
    onNew(): void;
    onEdit(layout: Layout): void;
    onCloseWizard(): void;
    onFinishWizard(): void;
    canFinishWizard(): boolean;
}
export declare let LayoutPopup: import("react-redux").ConnectedComponent<typeof LayoutPopupComponent, any>;
export {};
