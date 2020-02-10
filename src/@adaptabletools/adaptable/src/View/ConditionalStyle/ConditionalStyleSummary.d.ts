import * as React from 'react';
import { StrategySummaryProps } from '../Components/SharedProps/StrategySummaryProps';
import { EditableConfigEntityState } from '../Components/SharedProps/EditableConfigEntityState';
import * as ConditionalStyleRedux from '../../Redux/ActionsReducers/ConditionalStyleRedux';
import { ColumnCategory } from '../../PredefinedConfig/ColumnCategoryState';
import { ConditionalStyle } from '../../PredefinedConfig/ConditionalStyleState';
export interface ConditionalStyleSummaryProps extends StrategySummaryProps<ConditionalStyleSummaryComponent> {
    ConditionalStyles: ConditionalStyle[];
    ColorPalette: string[];
    ColumnCategories: ColumnCategory[];
    StyleClassNames: string[];
    onAddConditionalStyle: (conditionalStyle: ConditionalStyle) => ConditionalStyleRedux.ConditionalStyleAddAction;
    onEditConditionalStyle: (conditionalStyle: ConditionalStyle) => ConditionalStyleRedux.ConditionalStyleEditAction;
}
export declare class ConditionalStyleSummaryComponent extends React.Component<ConditionalStyleSummaryProps, EditableConfigEntityState> {
    constructor(props: ConditionalStyleSummaryProps);
    render(): any;
    onNew(): void;
    onEdit(ConditionalStyle: ConditionalStyle): void;
    onCloseWizard(): void;
    onFinishWizard(): void;
    canFinishWizard(): boolean;
}
export declare let ConditionalStyleSummary: import("react-redux").ConnectedComponent<typeof ConditionalStyleSummaryComponent, any>;
