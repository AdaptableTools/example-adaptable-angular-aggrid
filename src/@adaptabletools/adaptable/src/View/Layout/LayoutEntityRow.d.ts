import * as React from 'react';
import { SharedEntityExpressionRowProps } from '../Components/SharedProps/ConfigEntityRowProps';
import { Layout } from '../../PredefinedConfig/LayoutState';
import { ILayoutService } from '../../Utilities/Services/Interface/ILayoutService';
export interface LayoutEntityRowProps<LayoutEntityRow> extends SharedEntityExpressionRowProps<LayoutEntityRow> {
    IsCurrentLayout: boolean;
    onSelect: (Layout: Layout) => void;
    LayoutService: ILayoutService;
}
export declare class LayoutEntityRow extends React.Component<LayoutEntityRowProps<LayoutEntityRow>, {}> {
    render(): any;
}
