import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GridApi, GridOptions, Module } from '@ag-grid-community/all-modules';
import { AllEnterpriseModules } from '@ag-grid-enterprise/all-modules';

import {
  AdaptableOptions,
  AdaptableToolPanelAgGridComponent
} from '@adaptabletools/adaptable-angular-aggrid';

import charts from '@adaptabletools/adaptable-plugin-charts';
import finance from '@adaptabletools/adaptable-plugin-finance';

import orders from '../orders.json';

const MAX_DATA_COUNT = 100;
orders.length = Math.min(MAX_DATA_COUNT, orders.length);

@Component({
  selector: 'adaptable-root',
  template: `
    <adaptable-angular-aggrid
      [adaptableOptions]="adaptableOptions"
      (adaptableReady)="adaptableReady($event)"
      [gridOptions]="gridOptions"
    >
    </adaptable-angular-aggrid>
    <ag-grid-angular
      [gridOptions]="gridOptions"
      [rowData]="rowData"
      [modules]="agGridModules"
      style="flex: 1"
      class="ag-theme-balham"
    >
    </ag-grid-angular>
  `,
  styles: [
    `
      :host {
        height: 100vh;
        display: flex;
        flex-flow: column;
      }
    `
  ]
})
export class AppComponent {
  public gridApi: GridApi;
  public agGridModules: Module[] = AllEnterpriseModules;
  public gridColumnApi;

  public columnDefs;

  public rowData: any[];
  public gridOptions: GridOptions;

  public adaptableOptions: AdaptableOptions = {
    primaryKey: 'OrderId',
    userName: 'demo user',
    adaptableId: 'angular1 wrapper theming demo',
    plugins: [charts(), finance()],
    userInterfaceOptions: {
      showAdaptableToolPanel: true
    }
  };

  constructor(private http: HttpClient) {
    this.http = http;

    this.columnDefs = [
      {
        field: 'OrderId',
        type: 'abColDefNumber',
        resizable: true
      },
      { field: 'CompanyName', type: 'abColDefString' },
      { field: 'ContactName', type: 'abColDefString' },
      { field: 'Employee', type: 'abColDefString' },
      { field: 'OrderCost', type: 'abColDefNumber' },
      { field: 'ItemCost', type: 'abColDefNumber' },
      {
        field: 'PackageCost',
        type: 'abColDefNumber'
      }
    ];

    this.gridOptions = {
      enableRangeSelection: true,
      sideBar: true,
      components: {
        AdaptableToolPanel: AdaptableToolPanelAgGridComponent
      },
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

  adaptableReady = ({ adaptableApi, vendorGrid }) => {
    console.log({ adaptableApi, vendorGrid });
  };

  onGridReady = params => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    // this.http
    //   .get(
    //     'https://raw.githubusercontent.com/ag-grid/ag-grid-docs/latest/src/javascript-grid-master-detail/custom-detail-with-form/data/data.json'
    //   )
    //   .subscribe((data: any[]) => {
    //     this.gridApi.setRowData(data);
    //   });

    setTimeout(() => {
      this.gridApi.setRowData(orders);

      setInterval(() => {
        const index = Math.round(Math.random() * orders.length);
        let data = orders[index];
        if (data) {
          data = { ...data };
          data.OrderCost = Math.round(Math.random() * 100);
          data.ItemCost = Math.round(Math.random() * 100);
          data.PackageCost = Math.round(Math.random() * 100);

          this.gridApi.applyTransactionAsync({ update: [data] });
        }
      }, 500);
    }, 500);

    params.api.forEachNode(function(node) {
      node.setExpanded(node.id === '1');
    });
  };
}
