import { AdaptableBlotterOptions } from '@adaptabletools/adaptableblotter-angular-aggrid/adaptableblotter/types';

import AdaptableBlotter from '@adaptabletools/adaptableblotter-angular-aggrid/adaptableblotter/agGrid';
import { Grid, GridOptions } from 'ag-grid-community';

export const createBlotter = ({
  blotterOptions,

  blotterContainerId,
  gridContainerId
}: {
  blotterOptions: AdaptableBlotterOptions;

  blotterContainerId: string;
  gridContainerId: string;
}) => {
  return (gridOptions: GridOptions, gridParams: any) => {
    return new AdaptableBlotter(
      {
        ...blotterOptions,
        containerOptions: {
          ...blotterOptions.containerOptions,
          adaptableBlotterContainer: blotterContainerId,
          vendorContainer: gridContainerId
        },
        vendorGrid: gridOptions
      },
      true,
      {
        instantiateGrid: (vendorContainer: HTMLElement, gridOptions) => {
          return new Grid(vendorContainer, gridOptions, gridParams);
        }
      }
    );
  };
};
