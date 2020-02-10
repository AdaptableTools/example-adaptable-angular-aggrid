import * as React from 'react';
import * as ReminderRedux from '../../Redux/ActionsReducers/ReminderRedux';
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps';
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux';
import { EditableConfigEntityState } from '../Components/SharedProps/EditableConfigEntityState';
import { AdaptableObject } from '../../PredefinedConfig/Common/AdaptableObject';
import { ReminderSchedule } from '../../PredefinedConfig/ReminderState';
interface ReminderPopupProps extends StrategyViewPopupProps<ReminderPopupComponent> {
    Reminders: ReminderSchedule[];
    onAddReminder: (reminder: ReminderSchedule) => ReminderRedux.ReminderScheduleAddAction;
    onEditReminder: (reminder: ReminderSchedule) => ReminderRedux.ReminderScheduleEditAction;
    onShare: (entity: AdaptableObject) => TeamSharingRedux.TeamSharingShareAction;
}
declare class ReminderPopupComponent extends React.Component<ReminderPopupProps, EditableConfigEntityState> {
    constructor(props: ReminderPopupProps);
    render(): JSX.Element;
    onNew(): void;
    onEdit(reminder: ReminderSchedule): void;
    onCloseWizard(): void;
    onFinishWizard(): void;
    canFinishWizard(): boolean;
}
export declare let ReminderPopup: import("react-redux").ConnectedComponent<typeof ReminderPopupComponent, Pick<ReminderPopupProps, "key" | "ref" | "AccessLevel" | "Columns" | "UserFilters" | "SystemFilters" | "NamedFilters" | "ColumnCategories" | "Adaptable" | "ColumnSorts" | "ColorPalette" | "ColumnFilters" | "PopupParams" | "TeamSharingActivated" | "ModalContainer" | "onClearPopupParams" | "onClosePopup">>;
export {};
