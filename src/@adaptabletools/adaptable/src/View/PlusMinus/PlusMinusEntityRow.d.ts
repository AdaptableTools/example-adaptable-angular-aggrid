import * as React from 'react';
import { AdaptableColumn } from '../../PredefinedConfig/Common/AdaptableColumn';
import { SharedEntityExpressionRowProps } from '../Components/SharedProps/ConfigEntityRowProps';
import { PlusMinusRule } from '../../PredefinedConfig/PlusMinusState';
export interface PlusMinusEntityRowProps extends SharedEntityExpressionRowProps<PlusMinusEntityRow> {
    Column: AdaptableColumn;
    onColumnDefaultNudgeValueChange: (plusMinusRule: PlusMinusRule, event: React.FormEvent<any>) => void;
}
export declare class PlusMinusEntityRow extends React.Component<PlusMinusEntityRowProps, {}> {
    render(): any;
    private wrapExpressionDescription;
}
