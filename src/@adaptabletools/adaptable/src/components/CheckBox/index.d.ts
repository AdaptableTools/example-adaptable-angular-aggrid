import { ReactNode, SyntheticEvent } from 'react';
import { BoxProps } from 'rebass';
declare type TypeProps = {
    checked?: boolean | null;
    disabled?: boolean;
    as?: any;
    name?: string;
    value?: any;
    variant?: 'default' | 'agGrid';
    onChange?: (checked: boolean, event: SyntheticEvent) => void;
    children?: ReactNode;
    gapDistance?: number | string;
    childrenPosition?: 'start' | 'end';
};
export interface CheckBoxProps extends TypeProps, Omit<BoxProps, keyof TypeProps> {
}
declare const CheckBox: ({ children, checked, onChange, value, name, disabled, variant, gapDistance, childrenPosition, as, ...props }: CheckBoxProps) => JSX.Element;
export default CheckBox;
