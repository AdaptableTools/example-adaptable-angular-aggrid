import * as React from 'react';
import { FlexProps } from 'rebass';
interface TypeProps extends FlexProps {
    footer: React.ReactNode;
    footerProps?: FlexProps;
}
declare const FlexWithFooter: (props: TypeProps & React.HTMLProps<HTMLDivElement>) => JSX.Element;
export default FlexWithFooter;
