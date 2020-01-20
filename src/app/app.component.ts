import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GridApi, GridOptions, Module } from '@ag-grid-community/all-modules';
import { AllEnterpriseModules } from '@ag-grid-enterprise/all-modules';

import { AdaptableOptions } from '@adaptabletools/adaptable-angular-aggrid';
import charts from '@adaptabletools/adaptable-plugin-charts';
import finance from '@adaptabletools/adaptable-plugin-finance';

@Component({
  selector: 'adaptable-root',
  template: `
    <adaptable-angular-aggrid
      style="width: 100vw; height: 100vh;"
      [adaptableOptions]="adaptableOptions"
      [gridOptions]="gridOptions"
      [modules]="agGridModules"
    >
    </adaptable-angular-aggrid>
  `
})
export class AppComponent {
  public gridApi: GridApi;
  public agGridModules: Module[] = AllEnterpriseModules;
  public gridColumnApi;

  public columnDefs;

  public rowData: any[];
  public gridOptions: GridOptions;

  public adaptableOptions: AdaptableOptions = {
    primaryKey: 'account',
    userName: 'demo user',
    adaptableId: 'angular wrapper theming demo',
    plugins: [charts(), finance()],
    predefinedConfig: {
      Theme: {
        CurrentTheme: 'Dark-Blue',
        SystemThemes: [
          {
            Name: 'Wimbledon',
            Description: 'The Wimbledon theme',
            VendorGridClassName: 'ag-theme-balham'
          },
          {
            Name: 'Dark-Blue',
            Description: 'Dark Blue Theme',
            VendorGridClassName: 'ag-theme-balham-dark'
          }
        ]
      }
    }
  };

  constructor(private http: HttpClient) {
    this.http = http;

    this.columnDefs = [
      {
        field: 'name',
        type: 'abColDefString'
      },
      { field: 'account', type: 'abColDefString' },
      { field: 'calls', type: 'abColDefNumber' },
      {
        field: 'minutes',
        type: 'abColDefNumber'
      }
    ];

    this.gridOptions = {
      enableRangeSelection: true,
      columnDefs: this.columnDefs,
      columnTypes: {
        abColDefNumber: {},
        abColDefString: {},
        abColDefBoolean: {},
        abColDefDate: {},
        abColDefNumberArray: {},
        abColDefObject: {}
      },
      rowData: this.rowData,
      onGridReady: this.onGridReady
    };
  }

  onGridReady = params => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    this.http
      .get(
        'https://raw.githubusercontent.com/ag-grid/ag-grid-docs/latest/src/javascript-grid-master-detail/custom-detail-with-form/data/data.json'
      )
      .subscribe((data: any[]) => {
        this.gridApi.setRowData(data);
      });

    params.api.forEachNode(function(node) {
      node.setExpanded(node.id === '1');
    });
  };
}
