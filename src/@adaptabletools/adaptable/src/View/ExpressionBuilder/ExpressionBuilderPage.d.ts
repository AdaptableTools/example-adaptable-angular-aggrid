import * as React from 'react';
import { AdaptableColumn } from '../../PredefinedConfig/Common/AdaptableColumn';
import { AdaptableWizardStep } from '../Wizard/Interface/IAdaptableWizard';
import { ExpressionMode, QueryBuildStatus, QueryTab } from '../../PredefinedConfig/Common/Enums';
import { UserFilter } from '../../PredefinedConfig/UserFilterState';
import { Expression } from '../../PredefinedConfig/Common/Expression';
import { IAdaptable } from '../../AdaptableInterfaces/IAdaptable';
import { NamedFilter } from '../../PredefinedConfig/NamedFilterState';
import { ColumnCategory } from '../../PredefinedConfig/ColumnCategoryState';
export interface ExpressionBuilderPageProps extends React.ClassAttributes<ExpressionBuilderPage> {
    UserFilters: Array<UserFilter>;
    SystemFilters: Array<string>;
    NamedFilters: Array<NamedFilter>;
    ColumnCategories: Array<ColumnCategory>;
    ExpressionMode?: ExpressionMode;
    UpdateGoBackState?(finish?: boolean): void;
    StepName?: string;
    Columns?: Array<AdaptableColumn>;
    Adaptable?: IAdaptable;
}
export interface ExpressionBuilderPageState {
    Expression: Expression;
    SelectedColumnId: string;
    SelectedTab: QueryTab;
}
export declare class ExpressionBuilderPage extends React.Component<ExpressionBuilderPageProps, ExpressionBuilderPageState> implements AdaptableWizardStep {
    render(): JSX.Element;
    getQueryBuildStatus(): QueryBuildStatus;
    onSelectedColumnChanged(): void;
    DeleteColumnValue(columnId: string, value: any): void;
    DeleteUserFilterExpression(columnId: string, index: number): void;
    DeleteRange(columnId: string, index: number): void;
    DeleteAllColumnExpression(columnId: string): void;
    onChangeExpression(newExpression: Expression): void;
    onSelectedColumnChange(columnId: string, tab: QueryTab): void;
    canNext(): boolean;
    canBack(): boolean;
    Next(): void;
    Back(): void;
    GetIndexStepIncrement(): number;
    GetIndexStepDecrement(): number;
    StepName: string;
}
