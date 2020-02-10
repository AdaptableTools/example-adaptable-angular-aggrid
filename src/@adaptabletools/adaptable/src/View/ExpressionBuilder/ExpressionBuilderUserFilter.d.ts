import * as React from 'react';
export interface ExpressionBuilderUserFilterProps extends React.ClassAttributes<ExpressionBuilderUserFilter> {
    AvailableSystemFilterNames: Array<string>;
    AvailableUserFilterNames: Array<string>;
    AvailableNamedFilterNames: Array<string>;
    SelectedFilterNames: Array<string>;
    onFilterNameChange: (selectedFilterNames: Array<string>) => void;
}
export declare class ExpressionBuilderUserFilter extends React.Component<ExpressionBuilderUserFilterProps, {}> {
    render(): any;
    onClickColum(filterName: string): void;
}
