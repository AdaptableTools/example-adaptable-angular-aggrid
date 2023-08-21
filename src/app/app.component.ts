import {Component} from '@angular/core';
import {ColDef, GridOptions, Module} from '@ag-grid-community/core';
import {AdaptableApi, AdaptableOptions, AdaptableReadyInfo,} from '@adaptabletools/adaptable-angular-aggrid';
import {ITrade, rowData} from './rowData';
import {RECOMMENDED_MODULES} from '../agGridModules';

@Component({
  selector: 'app-adaptable-root',
  template: `
    <ag-grid-angular
      [adaptableOptions]="adaptableOptions"
      [gridOptions]="gridOptions"
      [modules]="agGridModules"
      (adaptableReady)="adaptableReady($event)"
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
      body {
        font-family: 'Lato', BlinkMacSystemFont, -apple-system, 'Segoe UI',
          'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
          'Helvetica Neue', 'Helvetica', 'Arial', sans-serif !important;

        font-size: 16px;

        -webkit-font-smoothing: antialiased;
        color: #333;
        font-weight: 400;
        line-height: 1.5;
      }
    `,
  ],
})
export class AppComponent {
  public agGridModules: Module[] = RECOMMENDED_MODULES;
  public columnDefs:ColDef<ITrade>[];
  public adaptableApi: AdaptableApi;
  public gridOptions: GridOptions<ITrade>;

  private isLayoutShortcutMenuDisabled = true;

  public adaptableOptions: AdaptableOptions<ITrade> =  {
  // @ts-ignore
    primaryKey: '',
    autogeneratePrimaryKey: true,
    layoutOptions: {
      autoSaveLayouts: false
    },
    userInterfaceOptions: {
      showDocumentationLinks: false
    },
    predefinedConfig:{
      FreeTextColumn: {
        FreeTextColumns: [
          {
            ColumnId: 'comments',
            FriendlyName: 'Comments',
            FreeTextStoredValues: [
              {PrimaryKey: 24195339, FreeText: 'Used by US team'},
              {PrimaryKey: 224663696, FreeText: 'My favourite'},
              {PrimaryKey: 82095231, FreeText: 'Required by Support'},
            ],
            FreeTextColumnSettings: {
              Resizable: true,
              DataType: 'String',
            },
          },
          {
            ColumnId: 'orderCode',
            FriendlyName: 'Order Code',
            DefaultValue: 123,
            FreeTextColumnSettings: {
              DataType: 'Number',
              Sortable: false,
              SuppressMenu: true,
            },
          },
          {
            ColumnId: 'isUsed',
            FriendlyName: 'Is Used',
            DefaultValue: false,
            FreeTextStoredValues: [
              {PrimaryKey: 10270250, FreeText: true},
              {PrimaryKey: 24195339, FreeText: true},
              {PrimaryKey: 224663696, FreeText: true},
              {PrimaryKey: 82095231, FreeText: true},
            ],
            FreeTextColumnSettings: {
              DataType: 'Boolean',
              Filterable: true,
              Groupable: true,
            },
          },
        ],
      },
    }
  }

  constructor() {
    this.columnDefs = [
      {
        headerName: 'Trade Id',
        field: 'tradeId',
        editable: true,
        type: 'abColDefNumber',
      },
      {
        headerName: 'Notional',
        field: 'notional',
        enableValue: true,
        editable: true,
        cellClass: 'number-cell',
        type: 'abColDefNumber',
        aggFunc: 'sum',
      },
      {
        headerName: 'Counterparty',
        field: 'counterparty',
        editable: true,
        enableRowGroup: true,
        type: 'abColDefString',
      },
      {
        headerName: 'Change',
        field: 'changeOnYear',
        type: 'abColDefNumber',
      },
      {
        headerName: 'Currency',
        field: 'currency',
        editable: true,
        enableRowGroup: true,
        type: 'abColDefString',
      },
      {
        headerName: 'B/O Spread',
        field: 'bidOfferSpread',
        enableValue: true,
        editable: true,
        type: 'abColDefNumber',
      },
      {
        headerName: 'Price',
        field: 'price',
        enableValue: true,
        enableRowGroup: true,
        type: 'abColDefNumber',
      },
      {
        headerName: 'Country',
        field: 'country',
        editable: true,
        enableRowGroup: true,
        type: 'abColDefString',
      },
      {
        headerName: 'Status',
        field: 'status',
        editable: true,
        pivot: true,
        enableRowGroup: true,
        enablePivot: true,
        aggFunc: 'sum',
        type: 'abColDefString',
        resizable: true,
      },
      {
        headerName: 'Trade Date',
        field: 'tradeDate',
        type: 'abColDefDate',
      },
      {
        headerName: 'Settlement Date',
        field: 'settlementDate',
        type: 'abColDefDate',
      },
      {
        headerName: 'Ask',
        field: 'ask',
        type: 'abColDefNumber',
      },
      {
        headerName: 'Bid',
        field: 'bid',
        type: 'abColDefNumber',
      },
      {
        headerName: 'Ind Ask',
        field: 'indicativeAsk',
        type: 'abColDefNumber',
      },
      {
        headerName: 'Ind Bid',
        field: 'indicativeBid',
        type: 'abColDefNumber',
      },
      {
        headerName: 'Markit Ask',
        field: 'markitAsk',
        type: 'abColDefNumber',
      },
      {
        headerName: 'Markit Bid',
        field: 'markitBid',
        type: 'abColDefNumber',
      },
      {
        headerName: 'Bbg Ask',
        field: 'bloombergAsk',
        type: 'abColDefNumber',
      },
      {
        headerName: 'Bbg Bid',
        field: 'bloombergBid',
        type: 'abColDefNumber',
      },
      {
        headerName: 'Rating',
        field: 'rating',
        editable: true,
        type: 'abColDefString',
      },
      {
        headerName: 'History',
        field: 'history',
        type: 'abColDefObject',
        resizable: true,
        cellRenderer: 'agSparklineCellRenderer',
        cellRendererParams: {
          sparklineOptions: {
            type: 'line',
            line: {
              stroke: 'rgb(124, 255, 178)',
              strokeWidth: 2,
            },
            padding: {
              top: 5,
              bottom: 5,
            },
            marker: {
              size: 3,
              shape: 'diamond',
            },
            highlightStyle: {
              size: 10,
            },
          },
        },
      },
    ].map((c: ColDef) => {
      c.filter = true;
      c.floatingFilter = true;
      c.sortable = true;
      c.resizable = true;
      return c;
    });

    this.gridOptions = {
      enableCharts: true,
      enableRangeSelection: true,
      sideBar: ['adaptable', 'columns', 'filters'],
      suppressMenuHide: true,
      singleClickEdit: true,
      statusBar: {
        statusPanels: [
          { statusPanel: 'agTotalRowCountComponent', align: 'left' },
          { statusPanel: 'agFilteredRowCountComponent' },
        ],
      },
      defaultColDef: {
        enablePivot: true,
        enableRowGroup: true,
        enableValue: true,
      },
      columnDefs: this.columnDefs,
      rowData,
    };
  }

  adaptableReady = ({ adaptableApi, gridOptions }:AdaptableReadyInfo) => {
    this.adaptableApi = adaptableApi;
    // use AdaptableApi for runtime access to Adaptable
  };
}
