import { BoxProps } from 'rebass';
import { ReactNode } from 'react';
interface SizedContainerProps extends Omit<BoxProps, 'children'> {
    children: (size: {
        width: number;
        height: number;
    }) => ReactNode;
}
declare const SizedContainer: (props: SizedContainerProps) => JSX.Element;
export default SizedContainer;
