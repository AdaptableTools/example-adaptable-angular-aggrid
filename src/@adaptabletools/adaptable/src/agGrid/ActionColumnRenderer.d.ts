import { ICellRendererComp, ICellRendererParams } from '@ag-grid-community/all-modules';
export declare class ActionColumnRenderer implements ICellRendererComp {
    private eGui;
    private eventListener;
    init(params: ICellRendererParams): void;
    getGui(): HTMLElement;
    refresh(params: any): boolean;
    destroy(): void;
}
