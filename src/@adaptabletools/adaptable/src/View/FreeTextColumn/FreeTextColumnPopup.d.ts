import * as React from 'react';
import * as FreeTextColumnRedux from '../../Redux/ActionsReducers/FreeTextColumnRedux';
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps';
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux';
import { EditableConfigEntityState } from '../Components/SharedProps/EditableConfigEntityState';
import { AdaptableObject } from '../../PredefinedConfig/Common/AdaptableObject';
import { FreeTextColumn } from '../../PredefinedConfig/FreeTextColumnState';
interface FreeTextColumnPopupProps extends StrategyViewPopupProps<FreeTextColumnPopupComponent> {
    FreeTextColumns: Array<FreeTextColumn>;
    onAddFreeTextColumn: (FreeTextColumn: FreeTextColumn) => FreeTextColumnRedux.FreeTextColumnAddAction;
    onEditFreeTextColumn: (FreeTextColumn: FreeTextColumn) => FreeTextColumnRedux.FreeTextColumnEditAction;
    onShare: (entity: AdaptableObject) => TeamSharingRedux.TeamSharingShareAction;
}
declare class FreeTextColumnPopupComponent extends React.Component<FreeTextColumnPopupProps, EditableConfigEntityState> {
    constructor(props: FreeTextColumnPopupProps);
    componentDidMount(): void;
    render(): JSX.Element;
    onNew(): void;
    onEdit(FreeTextColumn: FreeTextColumn): void;
    onCloseWizard(): void;
    onFinishWizard(): void;
    canFinishWizard(): boolean;
}
export declare let FreeTextColumnPopup: import("react-redux").ConnectedComponent<typeof FreeTextColumnPopupComponent, any>;
export {};
