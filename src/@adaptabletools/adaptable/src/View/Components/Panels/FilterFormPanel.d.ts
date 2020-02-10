import * as React from 'react';
import { ColumnMenuTab } from '../../../PredefinedConfig/Common/Enums';
import { PanelProps } from '../../../components/Panel';
export interface FilterFormPanelProps extends PanelProps {
    clearFilterButton?: React.ReactElement<any>;
    saveButton?: React.ReactElement<any>;
    closeButton?: React.ReactElement<any>;
    ColumnMenuTab: ColumnMenuTab;
    ColumnMenuTabChanged: (e: any) => void;
    onFilterApplied: () => void;
    IsAlwaysFilter: boolean;
    showCloseButton: boolean;
    useVendorStyle: boolean;
    applyFilterButtonDisabled: boolean;
    autoApplyFilter: boolean;
}
export declare class FilterFormPanel extends React.Component<FilterFormPanelProps, {}> {
    render(): JSX.Element;
    onApplyFilterClicked(): void;
    onSelectMenu(): any;
    onSelectFilter(): any;
}
