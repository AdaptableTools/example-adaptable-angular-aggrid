import * as React from 'react';
import * as CustomSortRedux from '../../Redux/ActionsReducers/CustomSortRedux';
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux';
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps';
import { EditableConfigEntityState } from '../Components/SharedProps/EditableConfigEntityState';
import { AdaptableObject } from '../../PredefinedConfig/Common/AdaptableObject';
import { CustomSort } from '../../PredefinedConfig/CustomSortState';
interface CustomSortPopupProps extends StrategyViewPopupProps<CustomSortPopupComponent> {
    onAddCustomSort: (customSort: CustomSort) => CustomSortRedux.CustomSortAddAction;
    onEditCustomSort: (customSort: CustomSort) => CustomSortRedux.CustomSortEditAction;
    CustomSorts: Array<CustomSort>;
    onShare: (entity: AdaptableObject) => TeamSharingRedux.TeamSharingShareAction;
}
declare class CustomSortPopupComponent extends React.Component<CustomSortPopupProps, EditableConfigEntityState> {
    constructor(props: CustomSortPopupProps);
    shouldClosePopupOnFinishWizard: boolean;
    componentDidMount(): void;
    render(): JSX.Element;
    onEdit(customSort: CustomSort): void;
    onNew(): void;
    onNewFromColumn(customsort: CustomSort): void;
    onCloseWizard(): void;
    onFinishWizard(): void;
    canFinishWizard(): boolean;
}
export declare let CustomSortPopup: import("react-redux").ConnectedComponent<typeof CustomSortPopupComponent, any>;
export {};
