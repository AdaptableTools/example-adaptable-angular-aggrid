import * as React from 'react';
import { LeafExpressionOperator, DistinctCriteriaPairValue } from '../../../PredefinedConfig/Common/Enums';
import { IRawValueDisplayValuePair } from '../../UIInterfaces';
import { AdaptableColumn } from '../../../PredefinedConfig/Common/AdaptableColumn';
import { ListGroupProps } from '../../../components/List/ListGroup';
import { QueryRange } from '../../../PredefinedConfig/Common/Expression';
export interface ListBoxFilterFormProps extends ListGroupProps {
    CurrentColumn: AdaptableColumn;
    Columns: AdaptableColumn[];
    useVendorStyle?: boolean;
    ColumnValuePairs: Array<IRawValueDisplayValuePair>;
    UserFilters: Array<IRawValueDisplayValuePair>;
    UiSelectedColumnValues: Array<string>;
    UiSelectedUserFilters: Array<string>;
    UiSelectedRange: QueryRange;
    onColumnValueSelectedChange: (SelectedValues: Array<any>) => void;
    onUserFilterSelectedChange: (SelectedValues: Array<any>) => void;
    onCustomRangeExpressionChange: (rangeExpression: QueryRange) => void;
    Operators: Array<LeafExpressionOperator>;
    DataType: 'String' | 'Number' | 'NumberArray' | 'Boolean' | 'Date' | 'Object' | 'Unknown';
    DistinctCriteriaPairValue: DistinctCriteriaPairValue;
}
export interface ListBoxFilterFormState extends React.ClassAttributes<ListBoxFilterForm> {
    UiSelectedColumnValues: Array<string>;
    UiSelectedUserFilters: Array<string>;
    UiSelectedRange: QueryRange;
    FilterValue: string;
    DistinctCriteriaPairValue: DistinctCriteriaPairValue;
}
export declare class ListBoxFilterForm extends React.Component<ListBoxFilterFormProps, ListBoxFilterFormState> {
    constructor(props: ListBoxFilterFormProps);
    UNSAFE_componentWillReceiveProps(nextProps: ListBoxFilterFormProps, nextContext: any): void;
    render(): JSX.Element;
    private renderItemForVendorStyle;
    private onLeafExpressionOperatorChange;
    private onRangeTypeChangedOperand1;
    private onRangeTypeChangedOperand2;
    private getOperand1FormControl;
    private getOperand2FormControl;
    private onOperand1Edit;
    private onOperand2Edit;
    private onColumnOperand1SelectedChanged;
    private onColumnOperand2SelectedChanged;
    onUpdateFilterSearch(filterSearch: string): void;
    raiseOnChangeColumnValues(): void;
    raiseOnChangeUserFilter(): void;
    raiseOnChangeCustomExpression(): void;
    onClickItemColumnValue(item: IRawValueDisplayValuePair): void;
    onClickItemUserFilter(item: IRawValueDisplayValuePair): void;
}
