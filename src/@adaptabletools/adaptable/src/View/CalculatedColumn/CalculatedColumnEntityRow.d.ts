import * as React from 'react';
import { SharedEntityRowProps } from '../Components/SharedProps/ConfigEntityRowProps';
import { AdaptableColumn } from '../../PredefinedConfig/Common/AdaptableColumn';
import { ICalculatedColumnExpressionService } from '../../Utilities/Services/Interface/ICalculatedColumnExpressionService';
interface CalculatedColumnEntityRowProps<CalculatedColumnEntityRow> extends SharedEntityRowProps<CalculatedColumnEntityRow> {
    Columns: AdaptableColumn[];
    CalculatedColumnExpressionService: ICalculatedColumnExpressionService;
}
export declare class CalculatedColumnEntityRow extends React.Component<CalculatedColumnEntityRowProps<CalculatedColumnEntityRow>, {}> {
    render(): any;
}
export {};
