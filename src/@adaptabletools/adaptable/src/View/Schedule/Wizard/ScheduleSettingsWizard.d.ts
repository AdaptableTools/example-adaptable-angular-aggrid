import * as React from 'react';
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard';
import { MessageType } from '../../../PredefinedConfig/Common/Enums';
import { BaseSchedule } from '../../../PredefinedConfig/Common/Schedule';
/**
 * The setttings page for the Base Schedule  - will vary based on what type of schedule it is  - but should only be 1 page to keep it simple
 */
export interface ScheduleSettingsWizardProps extends AdaptableWizardStepProps<BaseSchedule> {
}
export interface ScheduleSettingsWizardState {
    Header: string;
    Msg: string;
    MessageType: MessageType;
    ShowPopup: boolean;
    ReportName: string;
    ExportDestination: 'CSV' | 'Clipboard' | 'JSON';
    IPushPullReportName: string;
    Page: string;
    Folder: string;
    AvailablePages: string[];
    IPushPullTransmission?: 'Snapshot' | 'Live Data';
    Glue42ReportName: string;
    Glue42Transmission?: 'Snapshot' | 'Live Data';
}
export declare class ScheduleSettingsWizard extends React.Component<ScheduleSettingsWizardProps, ScheduleSettingsWizardState> implements AdaptableWizardStep {
    constructor(props: ScheduleSettingsWizardProps);
    render(): any;
    private onHeaderChanged;
    private onMessageChanged;
    private onMessageTypeChanged;
    private onShowAsPopupChanged;
    private onSelectedReportChanged;
    private onExportDestinationChanged;
    private onIPushPullSelectedReportChanged;
    private onFolderChanged;
    private onPageChanged;
    private onIPushPullTransmissionChanged;
    private onGlue42SelectedReportChanged;
    private onGlue42TransmissionChanged;
    canNext(): boolean;
    canBack(): boolean;
    Next(): void;
    Back(): void;
    GetIndexStepIncrement(): number;
    GetIndexStepDecrement(): number;
}
