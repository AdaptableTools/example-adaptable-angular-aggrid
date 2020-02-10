import * as React from 'react';
import { CellSummmary } from '../../PredefinedConfig/Selection/CellSummmary';
export interface CellSummaryPopoverProps extends React.ClassAttributes<CellSummaryPopover> {
    CellSummary: CellSummmary;
}
export declare class CellSummaryPopover extends React.Component<CellSummaryPopoverProps, {}> {
    render(): any;
}
