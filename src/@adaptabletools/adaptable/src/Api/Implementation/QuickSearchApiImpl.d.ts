import { AdaptableStyle } from '../../PredefinedConfig/Common/AdaptableStyle';
import { ApiBase } from './ApiBase';
import { QuickSearchApi } from '../QuickSearchApi';
import { QuickSearchState } from '../../PredefinedConfig/QuickSearchState';
export declare class QuickSearchApiImpl extends ApiBase implements QuickSearchApi {
    getQuickSearchState(): QuickSearchState;
    setQuickSearchState(quickSearchState: QuickSearchState): void;
    applyQuickSearch(quickSearchText: string): void;
    clearQuickSearch(): void;
    getQuickSearchValue(): string;
    getQuickSearchStyle(): AdaptableStyle;
    getQuickSearchDisplayAction(): 'HighlightCell' | 'ShowRow' | 'ShowRowAndHighlightCell';
    setQuickSearchDisplayAction(displayAction: 'HighlightCell' | 'ShowRow' | 'ShowRowAndHighlightCell'): void;
    setQuickSearchStyle(style: AdaptableStyle): void;
    showQuickSearchPopup(): void;
}
