import { ApiBase } from './ApiBase';
import { LayoutApi } from '../LayoutApi';
import { LayoutState, Layout } from '../../PredefinedConfig/LayoutState';
export declare class LayoutApiImpl extends ApiBase implements LayoutApi {
    getLayoutState(): LayoutState;
    setLayout(layoutName: string): void;
    clearLayout(): void;
    getCurrentLayout(): Layout;
    getCurrentLayoutName(): string;
    isDefaultLayout(): boolean;
    getLayoutByName(layoutName: string): Layout;
    getAllLayout(): Layout[];
    saveCurrentLayout(): void;
    saveLayout(layoutToSave: Layout): void;
    restorelayout(layoutToSave: Layout): void;
    showLayoutPopup(): void;
}
