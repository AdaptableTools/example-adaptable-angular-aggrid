import * as React from 'react';
import { AdaptableColumn } from '../../PredefinedConfig/Common/AdaptableColumn';
import { UserFilter } from '../../PredefinedConfig/UserFilterState';
import { IPreviewInfo } from '../../Utilities/Interface/IPreview';
import { IValidationService } from '../../Utilities/Services/Interface/IValidationService';
export interface PreviewResultsPanelProps extends React.ClassAttributes<PreviewResultsPanel> {
    PreviewInfo: IPreviewInfo;
    Columns: AdaptableColumn[];
    UserFilters: UserFilter[];
    SelectedColumn: AdaptableColumn;
    ShowPanel: boolean;
    style?: React.CSSProperties;
    ShowHeader: boolean;
    ValidationService: IValidationService;
}
export declare class PreviewResultsPanel extends React.Component<PreviewResultsPanelProps, {}> {
    render(): any;
    private getValidationErrorMessage;
}
