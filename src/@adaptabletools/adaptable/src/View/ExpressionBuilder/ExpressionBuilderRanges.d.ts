import * as React from 'react';
import { AdaptableColumn } from '../../PredefinedConfig/Common/AdaptableColumn';
import { QueryRange } from '../../PredefinedConfig/Common/Expression';
export interface ExpressionBuilderRangesPropsExpressionBuilderRanges extends React.ClassAttributes<ExpressionBuilderRanges> {
    SelectedColumn: AdaptableColumn;
    Ranges: Array<QueryRange>;
    Columns: Array<AdaptableColumn>;
    onRangesChange: (Ranges: Array<QueryRange>) => void;
}
export declare class ExpressionBuilderRanges extends React.Component<ExpressionBuilderRangesPropsExpressionBuilderRanges, {}> {
    render(): JSX.Element;
    getOperand1FormControl(index: number, range: QueryRange): any;
    getOperand2FormControl(index: number, range: QueryRange): any;
    onRangeDelete(index: number): void;
    private addRange;
    private onLeafExpressionOperatorChanged;
    private onRangeTypeChangedOperand1;
    private onRangeTypeChangedOperand2;
    private onOperand1Edit;
    private onOperand2Edit;
    private onColumnOperand1SelectedChanged;
    private onColumnOperand2SelectedChanged;
}
