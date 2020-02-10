import * as React from 'react';
import { AdaptableStyle } from '../../PredefinedConfig/Common/AdaptableStyle';
export interface StyleVisualItemProps extends React.ClassAttributes<StyleVisualItem> {
    Style: AdaptableStyle;
}
export declare class StyleVisualItem extends React.Component<StyleVisualItemProps, {}> {
    render(): any;
}
