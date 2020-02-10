import * as React from 'react';
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps';
import * as ReminderRedux from '../../Redux/ActionsReducers/ReminderRedux';
import * as ExportRedux from '../../Redux/ActionsReducers/ExportRedux';
import * as IPushPullRedux from '../../Redux/ActionsReducers/IPushPullRedux';
import * as Glue42Redux from '../../Redux/ActionsReducers/Glue42Redux';
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux';
import { EditableConfigEntityState } from '../Components/SharedProps/EditableConfigEntityState';
import { AdaptableObject } from '../../PredefinedConfig/Common/AdaptableObject';
import { ScheduleType } from '../../PredefinedConfig/Common/Enums';
import { ReminderSchedule } from '../../PredefinedConfig/ReminderState';
import { ReportSchedule } from '../../PredefinedConfig/ExportState';
import { IPushPullSchedule } from '../../PredefinedConfig/IPushPullState';
import { BaseSchedule } from '../../PredefinedConfig/Common/Schedule';
import { Glue42Schedule } from '../../PredefinedConfig/Glue42State';
interface SchedulePopupProps extends StrategyViewPopupProps<SchedulePopupComponent> {
    Reminders: ReminderSchedule[];
    ReportSchedules: ReportSchedule[];
    IPushPullSchedules: IPushPullSchedule[];
    Glue42Schedules: Glue42Schedule[];
    onAddReminderSchedule: (reminderchedule: ReminderSchedule) => ReminderRedux.ReminderScheduleAddAction;
    onEditReminderSchedule: (reminderSchedule: ReminderSchedule) => ReminderRedux.ReminderScheduleEditAction;
    onAddReportSchedule: (reportSchedule: ReportSchedule) => ExportRedux.ReportScheduleAddAction;
    onEditReportSchedule: (reportSchedule: ReportSchedule) => ExportRedux.ReportScheduleEditAction;
    onAddIPushPullSchedule: (iPushPullSchedule: IPushPullSchedule) => IPushPullRedux.IPushPullScheduleAddAction;
    onEditIPushPullSchedule: (iPushPullSchedule: IPushPullSchedule) => IPushPullRedux.IPushPullScheduleEditAction;
    onAddGlue42Schedule: (glue42Schedule: Glue42Schedule) => Glue42Redux.Glue42ScheduleAddAction;
    onEditGlue42Schedule: (glue42Schedule: Glue42Schedule) => Glue42Redux.Glue42ScheduleEditAction;
    onShare: (entity: AdaptableObject) => TeamSharingRedux.TeamSharingShareAction;
}
declare class SchedulePopupComponent extends React.Component<SchedulePopupProps, EditableConfigEntityState> {
    constructor(props: SchedulePopupProps);
    shouldClosePopupOnFinishWizard: boolean;
    componentDidMount(): void;
    render(): JSX.Element;
    onCreateSchedule(scheduleType: ScheduleType): void;
    onNew(baseSchedule: BaseSchedule): void;
    onEdit(baseSchedule: BaseSchedule): void;
    onCloseWizard(): void;
    onFinishWizard(): void;
    canFinishWizard(): boolean;
}
export declare let SchedulePopup: import("react-redux").ConnectedComponent<typeof SchedulePopupComponent, Pick<SchedulePopupProps, "key" | "ref" | "AccessLevel" | "Columns" | "UserFilters" | "SystemFilters" | "NamedFilters" | "ColumnCategories" | "Adaptable" | "ColumnSorts" | "ColorPalette" | "ColumnFilters" | "PopupParams" | "TeamSharingActivated" | "ModalContainer" | "onClearPopupParams" | "onClosePopup">>;
export {};
