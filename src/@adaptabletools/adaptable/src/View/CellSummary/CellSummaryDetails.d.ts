import * as React from 'react';
import { CellSummmary } from '../../PredefinedConfig/Selection/CellSummmary';
interface CellSummaryDetailsProps extends React.ClassAttributes<CellSummaryDetails> {
    CellSummary: CellSummmary;
}
export declare class CellSummaryDetails extends React.Component<CellSummaryDetailsProps, {}> {
    render(): JSX.Element;
    private createRow;
}
export {};
