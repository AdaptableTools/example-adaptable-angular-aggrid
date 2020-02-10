import * as React from 'react';
import { SortOrder } from '../../../PredefinedConfig/Common/Enums';
import { IMasterChildren } from '../../../Utilities/Interface/IMasterChildren';
export declare enum DisplaySize {
    Large = 0,
    Small = 1,
    XSmall = 2
}
export interface IMasterValue {
    value: string;
    isOpen: boolean;
    isAvailable: boolean;
}
export interface DualListBoxEditorProps extends React.ClassAttributes<DualListBoxEditor> {
    SelectedValues: Array<any>;
    AvailableValues: Array<any>;
    onChange: (SelectedValues: Array<any>) => void;
    HeaderAvailable: string;
    HeaderSelected: string;
    DisplayMember?: string;
    style?: React.CSSProperties;
    ValueMember?: string;
    SortMember?: string;
    DisplaySize?: DisplaySize;
    MasterChildren?: IMasterChildren[];
}
export interface DualListBoxEditorState extends React.ClassAttributes<DualListBoxEditor> {
    SelectedValues: Array<any>;
    AvailableValues: Array<any>;
    UiSelectedAvailableValues: Array<any>;
    UiSelectedSelectedValues: Array<any>;
    FilterValue: string;
    SelectedValuesFilterValue: string;
    SortOrder: SortOrder;
    SelectedValuesSortOrder: SortOrder;
    AllValues: Array<any>;
    MasterValues: Array<IMasterValue>;
}
export declare class DualListBoxEditor extends React.Component<DualListBoxEditorProps, DualListBoxEditorState> {
    private placeholder;
    private firstSelected;
    private refFirstSelectedSelected;
    constructor(props: DualListBoxEditorProps);
    UNSAFE_componentWillReceiveProps(nextProps: DualListBoxEditorProps, nextContext: any): void;
    render(): JSX.Element;
    buildMasterValues(masterChildren: IMasterChildren[]): IMasterValue[];
    onMasterValueCheckChanged(checked: boolean, item: any): void;
    createAvailableValuesList(availableValues: any[], sortOrder: SortOrder, sortMember: string): any[];
    isValueFilteredOut: (item: string, FilterValue?: string, Values?: any[]) => boolean;
    canGoTopOrUp(): boolean;
    canGoDownOrBottom(): boolean;
    ensureFirstSelectedItemVisible(top: boolean): void;
    Top(): void;
    Up(): void;
    Bottom(): void;
    Down(): void;
    Add(): void;
    AddAll(): void;
    getValuesToAdd(addedValues: any[]): any[];
    RemoveAll(): void;
    Remove(): void;
    private draggedHTMLElement;
    private draggedElement;
    private overHTMLElement;
    DragSelectedStart(e: React.DragEvent<any>, listElement: any): void;
    DragSelectedEnd(): void;
    DragAvailableStart(e: React.DragEvent<any>, listElement: any): void;
    DragAvailableEnd(): void;
    DragEnterAvailable(e: React.DragEvent<any>): void;
    DragOverAvailable(e: React.DragEvent<any>): void;
    DragLeaveAvailable(e: React.DragEvent<any>): void;
    DragEnterSelected(e: React.DragEvent<any>): void;
    DragOverSelected(e: React.DragEvent<any>): void;
    DragLeaveSelected(e: React.DragEvent<any>): void;
    handleChangeFilterValue(x: string): void;
    handleChangeSelectedValuesFilterValue(x: string): void;
    sortColumnValues(): void;
    sortSelectedColumnValues(): void;
    raiseOnChange(): void;
    private getSelectedItemId;
    private onSelectedListSelectionChange;
    private getAvailableItemId;
    /**
     * @param selection - is a map, values being item keys (their textual representation), while values being true
     */
    private onAvailableListSelectionChange;
}
