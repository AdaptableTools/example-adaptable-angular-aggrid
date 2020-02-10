import * as React from 'react';
import { BoxProps } from 'rebass';
import { ReactNode } from 'react';
import { ReactComponentLike } from 'prop-types';
declare type FormColumn = {
    name: string;
    component?: ReactComponentLike;
    size?: string | number;
    className?: string;
    style?: React.CSSProperties;
};
declare type TypeFormLayout = {
    childrenToColumns?: boolean;
    defaultComponent?: ReactComponentLike;
    columns?: (string | number | FormColumn)[];
    placeholder?: ReactNode;
    sizes?: (string | number)[];
    style?: React.CSSProperties;
    gridRowGap?: string | number;
    gridColumnGap?: string | number;
};
export declare type FormLayoutColumn = FormColumn;
interface FormLayoutProps extends Omit<BoxProps, keyof TypeFormLayout>, TypeFormLayout {
}
declare const FormLayout: (props: FormLayoutProps) => JSX.Element;
interface FormRowProps {
    [k: string]: React.ReactElement[] | React.ReactElement | ReactNode;
}
export declare const FormRow: (props: FormRowProps) => JSX.Element;
export default FormLayout;
