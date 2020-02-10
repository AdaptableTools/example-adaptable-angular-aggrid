import { AdaptableStyle } from './Common/AdaptableStyle';
import { RunTimeState } from './RunTimeState';
export interface QuickSearchState extends RunTimeState {
    QuickSearchText?: string;
    DisplayAction?: 'HighlightCell' | 'ShowRow' | 'ShowRowAndHighlightCell';
    Style?: AdaptableStyle;
}
