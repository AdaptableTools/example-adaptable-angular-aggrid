import * as React from 'react';
import { AdaptableStyle } from '../../PredefinedConfig/Common/AdaptableStyle';
import { CSSProperties } from 'react';
export interface StyleComponentProps extends React.ClassAttributes<StyleComponent> {
    className?: string;
    style?: CSSProperties;
    ColorPalette: string[];
    StyleClassNames: string[];
    Style: AdaptableStyle;
    UpdateStyle: (style: AdaptableStyle) => void;
    CanUseClassName: boolean;
}
export interface StyleComponentState {
    myStyle: AdaptableStyle;
    ShowClassName: boolean;
}
export declare class StyleComponent extends React.Component<StyleComponentProps, StyleComponentState> {
    constructor(props: StyleComponentProps);
    render(): JSX.Element;
    private onShowClassNameChanged;
    private onStyleClassNameChanged;
    private onUseBackColorCheckChange;
    private onUseForeColorCheckChange;
    private onUseFontSizeCheckChange;
    private onBackColorSelectChange;
    private onForeColorSelectChange;
    private onFontWeightChange;
    private onFontStyleChange;
    private onFontSizeChange;
}
