import * as React from 'react';
import * as AdvancedSearchRedux from '../../Redux/ActionsReducers/AdvancedSearchRedux';
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux';
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps';
import { EditableConfigEntityState } from '../Components/SharedProps/EditableConfigEntityState';
import { AdvancedSearch } from '../../PredefinedConfig/AdvancedSearchState';
import { AdaptableObject } from '../../PredefinedConfig/Common/AdaptableObject';
interface AdvancedSearchPopupProps extends StrategyViewPopupProps<AdvancedSearchPopupComponent> {
    AdvancedSearches: AdvancedSearch[];
    CurrentAdvancedSearchName: string;
    onAddAdvancedSearch: (advancedSearch: AdvancedSearch) => AdvancedSearchRedux.AdvancedSearchAddAction;
    onEditAdvancedSearch: (advancedSearch: AdvancedSearch) => AdvancedSearchRedux.AdvancedSearchEditAction;
    onSelectAdvancedSearch: (SelectedSearchName: string) => AdvancedSearchRedux.AdvancedSearchSelectAction;
    onShare: (entity: AdaptableObject) => TeamSharingRedux.TeamSharingShareAction;
}
declare class AdvancedSearchPopupComponent extends React.Component<AdvancedSearchPopupProps, EditableConfigEntityState> {
    constructor(props: AdvancedSearchPopupProps);
    shouldClosePopupOnFinishWizard: boolean;
    componentDidMount(): void;
    render(): JSX.Element;
    onNew(): void;
    onEdit(advancedSearch: AdvancedSearch): void;
    onCloseWizard(): void;
    onFinishWizard(): void;
    canFinishWizard(): boolean;
}
export declare let AdvancedSearchPopup: import("react-redux").ConnectedComponent<typeof AdvancedSearchPopupComponent, any>;
export {};
