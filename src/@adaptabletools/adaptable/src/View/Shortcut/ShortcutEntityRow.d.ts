import * as React from 'react';
import { MathOperation } from '../../PredefinedConfig/Common/Enums';
import { SharedEntityRowProps } from '../Components/SharedProps/ConfigEntityRowProps';
import { Shortcut } from '../../PredefinedConfig/ShortcutState';
export interface ShortcutEntityRowProps extends SharedEntityRowProps<ShortcutEntityRow> {
    onChangeKey: (shortcut: Shortcut, NewShortcutKey: string) => void;
    onChangeResult: (shortcut: Shortcut, NewShortcutResult: any) => void;
    onChangeOperation: (shortcut: Shortcut, NewShortcutOperation: MathOperation) => void;
    AvailableKeys: Array<string>;
    AvailableActions: Array<MathOperation>;
}
export declare class ShortcutEntityRow extends React.Component<ShortcutEntityRowProps, {}> {
    render(): any;
    onResultChange(event: React.FormEvent<any>): void;
    onKeySelectChange(value: any): void;
    onActionChange(value: MathOperation): void;
}
