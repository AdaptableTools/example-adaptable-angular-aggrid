import * as React from 'react';
import { SharedEntityExpressionRowProps } from '../Components/SharedProps/ConfigEntityRowProps';
import { FlashingCell } from '../../PredefinedConfig/FlashingCellState';
export interface FlashingCellEntityRowProps extends SharedEntityExpressionRowProps<FlashingCellEntityRow> {
    FlashingCellDurations: any[];
    ColorPalette: string[];
    onSelect: (flashingCell: FlashingCell) => void;
    onChangeFlashingDuration: (flashingCell: FlashingCell, NewFlashDuration: number) => void;
    onChangeDownColorFlashingCell: (flashingCell: FlashingCell, DownColor: string) => void;
    onChangeUpColorFlashingCell: (flashingCell: FlashingCell, UpColor: string) => void;
}
export declare class FlashingCellEntityRow extends React.Component<FlashingCellEntityRowProps, {}> {
    render(): any;
    onActionChange(value: any): void;
    onDownColorChange(event: React.FormEvent<any>): void;
    onUpColorChange(event: React.FormEvent<any>): void;
    getFriendlyFlashingDuration(duration: number): string;
}
