import * as React from 'react';
import { SharedEntityRowProps } from '@adaptabletools/adaptable/src/View/Components/SharedProps/ConfigEntityRowProps';
import { AccessLevel } from '@adaptabletools/adaptable/src/PredefinedConfig/Common/Enums';
export interface ChartEntityRowProps extends SharedEntityRowProps<ChartEntityRow> {
    onShowChart: (chart: string) => void;
    AccessLevel: AccessLevel;
}
export declare class ChartEntityRow extends React.Component<ChartEntityRowProps, {}> {
    render(): any;
    private getChartType;
}
