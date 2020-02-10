import { ButtonProps } from 'rebass';
import { ReactNode } from 'react';
import { AccessLevel } from '../../PredefinedConfig/Common/Enums';
export declare const baseClassName = "ab-SimpleButton";
export interface SimpleButtonProps extends ButtonProps {
    tooltip?: string;
    variant?: 'text' | 'outlined' | 'raised' | 'unelevated';
    tone?: 'success' | 'error' | 'neutral' | 'none' | 'warning' | 'info' | 'accent';
    icon?: ReactNode;
    iconSize?: number;
    iconPosition?: 'start' | 'end';
    disabled?: boolean;
    AccessLevel?: AccessLevel;
    children?: ReactNode | ReactNode[];
}
declare const SimpleButton: {
    (props: SimpleButtonProps): JSX.Element;
    defaultProps: {
        px: any;
        py: any;
        fontWeight: string;
        m: any;
        borderRadius: any;
    };
};
export default SimpleButton;
