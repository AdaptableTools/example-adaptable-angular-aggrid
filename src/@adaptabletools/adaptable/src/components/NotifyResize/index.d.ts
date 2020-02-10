/// <reference types="react" />
export interface NotifyResizeProps {
    onResize: (size: {
        width: number;
        height: number;
    }) => void;
}
declare const NotifyResize: (props: NotifyResizeProps) => JSX.Element;
export default NotifyResize;
