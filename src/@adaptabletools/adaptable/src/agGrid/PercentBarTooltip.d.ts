import { ITooltipComp, ITooltipParams } from '@ag-grid-community/all-modules';
export declare class PercentBarTooltip implements ITooltipComp {
    private eGui;
    init(params: ITooltipParams): void;
    getGui(): HTMLElement;
}
