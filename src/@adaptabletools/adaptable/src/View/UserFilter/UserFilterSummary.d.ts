import * as React from 'react';
import { StrategySummaryProps } from '../Components/SharedProps/StrategySummaryProps';
import { EditableConfigEntityState } from '../Components/SharedProps/EditableConfigEntityState';
import * as UserFilterRedux from '../../Redux/ActionsReducers/UserFilterRedux';
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux';
import { UserFilter } from '../../PredefinedConfig/UserFilterState';
import { AdaptableObject } from '../../PredefinedConfig/Common/AdaptableObject';
export interface UserFilterSummaryProps extends StrategySummaryProps<UserFilterSummaryComponent> {
    onAddUserFilter: (UserFilter: UserFilter) => UserFilterRedux.UserFilterAddAction;
    onEditUserFilter: (UserFilter: UserFilter) => UserFilterRedux.UserFilterEditAction;
    onShare: (entity: AdaptableObject) => TeamSharingRedux.TeamSharingShareAction;
}
export declare class UserFilterSummaryComponent extends React.Component<UserFilterSummaryProps, EditableConfigEntityState> {
    constructor(props: UserFilterSummaryProps);
    render(): any;
    getSummary(): string;
    getDescription(userFilter: UserFilter): string;
    isFilterable(): boolean;
    isColumnFilterable(): boolean;
    onNew(): void;
    onEdit(UserFilter: UserFilter): void;
    onCloseWizard(): void;
    onFinishWizard(): void;
    canFinishWizard(): boolean;
}
export declare let UserFilterSummary: import("react-redux").ConnectedComponent<typeof UserFilterSummaryComponent, any>;
