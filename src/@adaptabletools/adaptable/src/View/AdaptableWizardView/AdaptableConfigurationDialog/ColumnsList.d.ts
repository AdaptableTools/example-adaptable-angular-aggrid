import * as React from 'react';
interface Column {
    field: string;
    type: string;
    caption?: string;
}
declare const _default: React.MemoExoticComponent<({ columns: cols, handle, onValidityChange, }: {
    onValidityChange: (valid: boolean) => any;
    handle: React.MutableRefObject<any>;
    columns: Column[];
}) => JSX.Element>;
export default _default;
