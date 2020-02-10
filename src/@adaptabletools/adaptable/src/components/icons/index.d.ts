import * as React from 'react';
declare const allIcons: {
    [key: string]: React.ReactNode;
};
export declare const Icon: ({ name, style, className, ...props }: {
    style?: React.CSSProperties;
    name: string;
    size?: number;
    className?: string;
    props?: React.SVGProps<SVGElement>;
}) => JSX.Element;
export declare const iconToString: (name: string, props?: any) => string;
export default allIcons;
