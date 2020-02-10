import { RunTimeState } from './RunTimeState';
import { AdaptableObject } from './Common/AdaptableObject';
export interface ColumnCategoryState extends RunTimeState {
    ColumnCategories?: ColumnCategory[];
}
export interface ColumnCategory extends AdaptableObject {
    ColumnCategoryId: string;
    ColumnIds: string[];
}
