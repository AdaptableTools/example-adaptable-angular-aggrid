import { AdaptableOptions } from '@adaptabletools/adaptable/types';
import Adaptable from '@adaptabletools/adaptable/src/agGrid';
import { GridOptions, Module } from '@ag-grid-community/all-modules';
export declare function createAdaptable({ adaptableOptions, adaptableContainerId, gridContainerId, modules, }: {
    adaptableOptions: AdaptableOptions;
    adaptableContainerId: string;
    gridContainerId: string;
    modules?: Module[];
}): (gridOptions: GridOptions, gridParams: any) => Adaptable;
