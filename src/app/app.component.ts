import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GridApi, GridOptions } from 'ag-grid-community';

import { AdaptableBlotterOptions } from '@adaptabletools/adaptableblotter-angular-aggrid';

@Component({
  selector: 'adaptableblotter-root',
  template: `
    <adaptableblotter-angular-aggrid
      style="width: 100vw; height: 100vh;"
      [blotterOptions]="blotterOptions"
      [gridOptions]="gridOptions"
    >
    </adaptableblotter-angular-aggrid>
  `
})
export class AppComponent {
  private gridApi: GridApi;
  private gridColumnApi;

  private columnDefs;

  private rowData: any[];
  private gridOptions: GridOptions;

  private blotterOptions: AdaptableBlotterOptions = {
    primaryKey: 'account',
    userName: 'demo user',
    blotterId: 'angular wrapper'
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
        type: 'abColDefNumber',
        valueFormatter: "x.toLocaleString() + 'm'"
      }
    ];

    this.gridOptions = {
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
