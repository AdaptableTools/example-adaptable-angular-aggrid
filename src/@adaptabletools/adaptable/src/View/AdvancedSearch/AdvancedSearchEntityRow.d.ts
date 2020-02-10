import * as React from 'react';
import { SharedEntityExpressionRowProps } from '../Components/SharedProps/ConfigEntityRowProps';
import { AdvancedSearch } from '../../PredefinedConfig/AdvancedSearchState';
export interface AdvancedSearchEntityRowProps<AdvancedSearchEntityRow> extends SharedEntityExpressionRowProps<AdvancedSearchEntityRow> {
    IsCurrentAdvancedSearch: boolean;
    onSelect: (advancedSearch: AdvancedSearch) => void;
}
export declare class AdvancedSearchEntityRow extends React.Component<AdvancedSearchEntityRowProps<AdvancedSearchEntityRow>, {}> {
    render(): any;
}
