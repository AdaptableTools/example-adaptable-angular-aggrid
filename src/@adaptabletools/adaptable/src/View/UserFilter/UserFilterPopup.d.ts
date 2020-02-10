import * as React from 'react';
import * as UserFilterRedux from '../../Redux/ActionsReducers/UserFilterRedux';
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux';
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps';
import { EditableConfigEntityState } from '../Components/SharedProps/EditableConfigEntityState';
import { UserFilter } from '../../PredefinedConfig/UserFilterState';
import { AdaptableObject } from '../../PredefinedConfig/Common/AdaptableObject';
interface UserFilterPopupProps extends StrategyViewPopupProps<UserFilterPopupComponent> {
    onAddUserFilter: (userFilter: UserFilter) => UserFilterRedux.UserFilterAddAction;
    onEditUserFilter: (userFilter: UserFilter) => UserFilterRedux.UserFilterEditAction;
    onShare: (entity: AdaptableObject) => TeamSharingRedux.TeamSharingShareAction;
}
declare class UserFilterPopupComponent extends React.Component<UserFilterPopupProps, EditableConfigEntityState> {
    constructor(props: UserFilterPopupProps);
    shouldClosePopupOnFinishWizard: boolean;
    componentDidMount(): void;
    render(): JSX.Element;
    onNew(): void;
    onEdit(userFilter: UserFilter): void;
    onCloseWizard(): void;
    onFinishWizard(): void;
    canFinishWizard(): boolean;
}
export declare let UserFilterPopup: import("react-redux").ConnectedComponent<typeof UserFilterPopupComponent, any>;
export {};
