import * as React from 'react';
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps';
import { AdaptableColumn } from '../../PredefinedConfig/Common/AdaptableColumn';
import { CalculatedColumn } from '../../PredefinedConfig/CalculatedColumnState';
import { ColumnCategory } from '../../PredefinedConfig/ColumnCategoryState';
import { Entitlement } from '../../PredefinedConfig/EntitlementState';
interface ColumnInfoPopupProps extends StrategyViewPopupProps<ColumnInfoPopupComponent> {
    CalculatedColumns: Array<CalculatedColumn>;
    FunctionEntitlements: Entitlement[];
    ColumnCategory: ColumnCategory[];
}
export interface ColumnInfoState {
    SelectedColumn: AdaptableColumn;
    ShowSelector: boolean;
}
declare class ColumnInfoPopupComponent extends React.Component<ColumnInfoPopupProps, ColumnInfoState> {
    constructor(props: ColumnInfoPopupProps);
    UNSAFE_componentWillMount(): void;
    render(): JSX.Element;
    private onColumnSelectedChanged;
    private isStrategyVisible;
    private isStrategyReadOnly;
    private getAccessLevel;
}
export declare let ColumnInfoPopup: import("react-redux").ConnectedComponent<typeof ColumnInfoPopupComponent, any>;
export {};
