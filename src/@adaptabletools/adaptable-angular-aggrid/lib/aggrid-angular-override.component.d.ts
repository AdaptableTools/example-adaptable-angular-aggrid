import { AgGridAngular } from '@ag-grid-community/angular';
import { GridOptions } from '@ag-grid-community/all-modules';
import Adaptable from '@adaptabletools/adaptable/src/agGrid';
import { AdaptableApi } from '@adaptabletools/adaptable/types';
export declare class AgGridOverrideComponent extends AgGridAngular {
    adaptableFactory: (...args: any) => Adaptable;
    gridContainerId: string;
    onAdaptableReady?: (adaptableReadyInfo: {
        adaptableApi: AdaptableApi;
        vendorGrid: GridOptions;
    }) => void;
    ngAfterViewInit(): void;
}
