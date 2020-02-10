import * as React from 'react';
import { StrategySummaryProps } from '../Components/SharedProps/StrategySummaryProps';
import { EditableConfigEntityState } from '../Components/SharedProps/EditableConfigEntityState';
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux';
import * as ColumnFilterRedux from '../../Redux/ActionsReducers/ColumnFilterRedux';
import { AdaptableObject } from '../../PredefinedConfig/Common/AdaptableObject';
import { ColumnFilter } from '../../PredefinedConfig/ColumnFilterState';
import { Entitlement } from '../../PredefinedConfig/EntitlementState';
export interface ColumnFilterSummaryProps extends StrategySummaryProps<ColumnFilterSummaryComponent> {
    ColumnFilters: ColumnFilter[];
    onClearFilter: (columnfilter: ColumnFilter) => ColumnFilterRedux.ColumnFilterClearAction;
    onShare: (entity: AdaptableObject) => TeamSharingRedux.TeamSharingShareAction;
    Entitlements: Entitlement[];
}
export declare class ColumnFilterSummaryComponent extends React.Component<ColumnFilterSummaryProps, EditableConfigEntityState> {
    constructor(props: ColumnFilterSummaryProps);
    render(): any;
    getDescription(columnFilter: ColumnFilter): string;
}
export declare let ColumnFilterSummary: import("react-redux").ConnectedComponent<typeof ColumnFilterSummaryComponent, any>;
