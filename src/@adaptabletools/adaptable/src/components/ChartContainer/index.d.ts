import * as React from 'react';
import { ReactNode } from 'react';
export interface ChartContainerProps {
    chart: React.ReactElement;
    style?: React.CSSProperties;
    title?: ReactNode;
    button?: ReactNode;
    flexDirection?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
    sizeAsString?: boolean;
    settingsPanel?: ReactNode;
    minHeight?: string | number;
}
declare const ChartContainer: (props: ChartContainerProps) => JSX.Element;
export default ChartContainer;
export { ChartContainer };
