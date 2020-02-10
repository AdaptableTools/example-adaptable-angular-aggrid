import { HTMLProps } from 'react';
import { FlexProps } from 'rebass';
declare type EmptyContentProps = HTMLProps<HTMLElement> & FlexProps & {};
declare const EmptyContent: ({ children, className, style, ...flexProps }: EmptyContentProps) => JSX.Element;
export default EmptyContent;
