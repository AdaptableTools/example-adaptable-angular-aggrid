import * as React from 'react';
import { StrategyViewPopupProps } from '@adaptabletools/adaptable/src/View/Components/SharedProps/StrategyViewPopupProps';
import * as SparklineColumnRedux from '@adaptabletools/adaptable/src/Redux/ActionsReducers/SparklineColumnRedux';
import * as TeamSharingRedux from '@adaptabletools/adaptable/src/Redux/ActionsReducers/TeamSharingRedux';
import { EditableConfigEntityState } from '@adaptabletools/adaptable/src/View/Components/SharedProps/EditableConfigEntityState';
import { AdaptableObject } from '@adaptabletools/adaptable/src/PredefinedConfig/Common/AdaptableObject';
import { SparklineColumn } from '@adaptabletools/adaptable/src/PredefinedConfig/SparklineColumnState';
import { SparklineTypeEnum } from '@adaptabletools/adaptable/src/PredefinedConfig/Common/ChartEnums';
interface SparklineColumnPopupProps extends StrategyViewPopupProps<SparklineColumnPopupComponent> {
    SparklineColumns: SparklineColumn[];
    onAddSparklineColumn: (sparklineColumn: SparklineColumn) => SparklineColumnRedux.SparklineColumnAddAction;
    onEditSparklineColumn: (sparklineColumn: SparklineColumn) => SparklineColumnRedux.SparklineColumnEditAction;
    onShare: (entity: AdaptableObject) => TeamSharingRedux.TeamSharingShareAction;
}
declare class SparklineColumnPopupComponent extends React.Component<SparklineColumnPopupProps, EditableConfigEntityState> {
    constructor(props: SparklineColumnPopupProps);
    componentDidMount(): void;
    render(): JSX.Element;
    onMinimumValueChanged(sparklineColumn: SparklineColumn, minimumValue: number): void;
    onSparklineTypeChange: (sparklineColumn: SparklineColumn, sparklineType: SparklineTypeEnum) => void;
    onMaximumValueChanged(sparklineColumn: SparklineColumn, maximumValue: number): void;
    onLineColorChanged(sparklineColumn: SparklineColumn, color: string): void;
    onNewFromColumn(sparklineColumn: SparklineColumn): void;
    onNew(): void;
    onEdit(sparklineColumn: SparklineColumn): void;
    onCloseWizard(): void;
    onFinishWizard(): void;
    canFinishWizard(): boolean;
}
export declare let SparklineColumnPopup: import("react-redux").ConnectedComponentClass<typeof SparklineColumnPopupComponent, Pick<SparklineColumnPopupProps, "key" | "ref" | "AccessLevel" | "Columns" | "UserFilters" | "SystemFilters" | "NamedFilters" | "ColumnCategories" | "Adaptable" | "PopupParams" | "TeamSharingActivated" | "ModalContainer" | "onClearPopupParams" | "ColumnSorts" | "onClosePopup" | "ColumnFilters" | "ColorPalette">>;
export {};
