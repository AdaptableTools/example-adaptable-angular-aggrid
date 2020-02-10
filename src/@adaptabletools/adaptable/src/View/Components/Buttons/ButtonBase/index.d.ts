import * as React from 'react';
import { ButtonProps as BtnProps } from 'rebass';
import { AccessLevel } from '../../../../PredefinedConfig/Common/Enums';
export interface ButtonBaseProps extends BtnProps {
    overrideDisableButton?: boolean;
    transformGlyph?: boolean;
    className?: string;
    AccessLevel?: AccessLevel;
    showDefaultStyle?: boolean;
    DisplayMode?: string;
    icon?: string;
    ToolTipAndText?: string;
    glyph?: string;
    overrideText?: string;
    overrideTooltip?: string;
    iconPosition?: string;
    hideToolTip?: boolean;
}
export declare type ButtonProps = ButtonBaseProps;
export declare class ButtonBase extends React.Component<ButtonBaseProps, {}> {
    static defaultProps: ButtonBaseProps;
    render(): JSX.Element;
}
