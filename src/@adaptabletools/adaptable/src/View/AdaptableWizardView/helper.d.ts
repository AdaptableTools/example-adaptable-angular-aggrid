import { GridOptions } from '@ag-grid-community/all-modules';
export interface WizardDataSourceInfo {
    columns: string[];
    data: any[];
    primaryKey?: string;
}
/**
 * There are two ways in which the datasource can be dropped in the wizard:
 *
 * 1. array of objects - eg: [{"lastName":"John","firstName":"Bobson"},{"lastName":"Mike","firstName":"Richardson"},...]
 * 2. array of arrays - eg: [["lastName","firstName"],["John","Bobson"],["Mike","Richardson"],...]
 *
 * Although the second one is more compact, the first one is what we need for the datasource of the grid,
 * so if we receive v2, we transform it to 1
 * @param json
 */
export declare const prepareDataSource: (json: any, _file?: File) => WizardDataSourceInfo;
export declare const getColTypeFromValue: (value: any) => string;
export declare const prepareGridOptions: (dataSourceInfo: WizardDataSourceInfo) => GridOptions;
