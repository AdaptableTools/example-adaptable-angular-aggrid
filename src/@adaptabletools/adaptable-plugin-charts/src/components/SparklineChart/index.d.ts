import { SparklineTypeEnum } from '@adaptabletools/adaptable/src/PredefinedConfig/Common/ChartEnums';
interface SparklineChartProps {
    values: number[];
    width?: number;
    height?: number;
    type?: SparklineTypeEnum;
    min?: number;
    max?: number;
    brush?: string;
    negativeBrush?: string;
    firstMarkerBrush?: string;
    lastMarkerBrush?: string;
    highMarkerBrush?: string;
    lowMarkerBrush?: string;
    negativeMarkerBrush?: string;
}
declare const SparklineChart: (props: SparklineChartProps) => JSX.Element;
export default SparklineChart;
