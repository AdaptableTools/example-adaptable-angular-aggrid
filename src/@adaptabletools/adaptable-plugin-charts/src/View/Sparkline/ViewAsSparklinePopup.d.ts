import * as React from 'react';
import { StrategyViewPopupProps } from '@adaptabletools/adaptable/src/View/Components/SharedProps/StrategyViewPopupProps';
import { SparklinesChartDefinition } from '@adaptabletools/adaptable/src/PredefinedConfig/ChartState';
import { SparklineTypeEnum } from '@adaptabletools/adaptable/src/PredefinedConfig/Common/ChartEnums';
interface ViewAsSparklinesPopupProps extends StrategyViewPopupProps<ViewAsSparklinesPopupComponent> {
}
interface ViewAsSparklinesPopupState {
    SparklinesChartDefinition: SparklinesChartDefinition;
    UseMaxStaticValue: boolean;
    UseMinStaticValue: boolean;
    MaxStaticValue?: number;
    MinStaticValue?: number;
    DisplayType: SparklineTypeEnum;
    ErrorMessage: string;
    DataSource: number[];
    Brush: string;
    NegativeBrush: string;
}
declare class ViewAsSparklinesPopupComponent extends React.Component<ViewAsSparklinesPopupProps, ViewAsSparklinesPopupState> {
    constructor(props: ViewAsSparklinesPopupProps);
    hasValidDataSelection(): boolean;
    render(): JSX.Element;
    componentDidMount(): void;
    private onDataColumnChanged;
    private updateDataSource;
    private onBrushColorChange;
    private onNegativeBrushColorChange;
}
export declare let ViewAsSparklinesPopup: import("react-redux").ConnectedComponentClass<typeof ViewAsSparklinesPopupComponent, any>;
export {};
