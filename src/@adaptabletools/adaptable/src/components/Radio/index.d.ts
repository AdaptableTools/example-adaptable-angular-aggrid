import { ReactNode, SyntheticEvent } from 'react';
import { BoxProps } from 'rebass';
declare type TypeProps = {
    checked?: boolean;
    as?: any;
    name?: string;
    value?: any;
    onChange?: (checked: boolean, event?: SyntheticEvent | any) => void;
    children?: ReactNode | JSX.Element;
    gapDistance?: number;
    childrenPosition?: 'start' | 'end';
};
export interface RadioProps extends TypeProps, Omit<BoxProps, keyof TypeProps> {
}
declare const Radio: ({ children, checked, onChange, value, name, gapDistance, childrenPosition, as, id, ...props }: RadioProps) => JSX.Element;
export default Radio;
