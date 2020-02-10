import { RunTimeState } from './RunTimeState';
import { AdaptableObject } from './Common/AdaptableObject';
export interface FreeTextColumnState extends RunTimeState {
    FreeTextColumns?: FreeTextColumn[];
}
export interface FreeTextColumn extends AdaptableObject {
    ColumnId: string;
    DefaultValue: any;
    FreeTextStoredValues: FreeTextStoredValue[];
}
export interface FreeTextStoredValue {
    PrimaryKey: any;
    FreeText: any;
}
