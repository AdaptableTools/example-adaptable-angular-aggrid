import { OnInit } from '@angular/core';
import { AdaptableOptions, AdaptableApi } from '@adaptabletools/adaptable/types';
import { GridOptions, Module } from '@ag-grid-community/all-modules';
export declare class AdaptableAngularAgGridComponent implements OnInit {
    adaptableOptions: AdaptableOptions;
    gridOptions: GridOptions;
    modules?: Module[];
    agGridContainerClassName: string;
    onAdaptableReady?: (adaptableReadyInfo: {
        adaptableApi: AdaptableApi;
        vendorGrid: GridOptions;
    }) => void;
    adaptableContainerId: string;
    gridContainerId: string;
    wrapperClassName: string;
    adaptableFactory: any;
    constructor();
    ngOnInit(): void;
}
