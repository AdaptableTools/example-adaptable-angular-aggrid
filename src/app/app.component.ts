import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  GridApi,
  GridOptions,
  Module,
  ColDef,
} from '@ag-grid-community/all-modules';
import { AllEnterpriseModules } from '@ag-grid-enterprise/all-modules';
import {
  AdaptableOptions,
  AdaptableToolPanelAgGridComponent,
  PredicateDefHandlerParams,
  ToolbarButtonClickedEventArgs,
} from '@adaptabletools/adaptable-angular-aggrid';
import charts from '@adaptabletools/adaptable-plugin-charts';
import finance from '@adaptabletools/adaptable-plugin-finance';
import { DummyTradeBuilder, ITrade } from 'src/Itrade';

var dummyTradeBuilder: DummyTradeBuilder = new DummyTradeBuilder();
@Component({
  selector: 'adaptable-root',
  template: `
    <adaptable-angular-aggrid
      [adaptableOptions]="adaptableOptions"
      (adaptableReady)="adaptableReady($event)"
      [gridOptions]="gridOptions"
      [modules]="agGridModules"
    >
    </adaptable-angular-aggrid>
    <ag-grid-angular
      [gridOptions]="gridOptions"
      [modules]="agGridModules"
      style="flex: 1"
      [rowData]="rowData"
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
      }
    `,
  ],
})
export class AppComponent {
  public gridApi: GridApi;
  public agGridModules: Module[] = AllEnterpriseModules;
  public gridColumnApi;
  public columnDefs;
  public rowData: any[] = null;
  public gridOptions: GridOptions;

  public adaptableOptions: AdaptableOptions = {
    primaryKey: 'tradeId',
    userName: 'demo user',
    adaptableId: 'angular demo',
    plugins: [charts(), finance()],
    userInterfaceOptions: {
      showAdaptableToolPanel: true,
    },
    customPredicateDefs: [
      {
        id: 'high',
        label: 'High',
        columnScope: {
          ColumnIds: ['tradeId'],
        },
        functionScope: ['filter', 'alert', 'validation', 'conditionalstyle'],
        handler(params: PredicateDefHandlerParams) {
          let notional: number = params.node.data.notional;
          return notional > 8000000 ? true : false;
        },
      },
      {
        id: 'benelux',
        label: 'Benelux',
        columnScope: {
          ColumnIds: ['Country'],
        },
        functionScope: ['filter'],
        handler(params: PredicateDefHandlerParams) {
          return (
            params.value == 'Luxembourg' ||
            params.value == 'Belgium' ||
            params.value == 'Holland'
          );
        },
      },
      {
        id: 'post_takeover',
        label: 'Post Takeover',
        columnScope: {
          DataTypes: ['Date'],
        },
        functionScope: ['filter'],
        handler(params: PredicateDefHandlerParams) {
          let takeOverDate = new Date('2020-09-21');
          return (params.value as Date) > takeOverDate;
        },
      },
    ],
    predefinedConfig: {
      Dashboard: {
        Revision: Date.now(),
        VisibleButtons: ['Layout', 'CalculatedColumn', 'GridInfo'],
        Tabs: [
          {
            Name: 'Grid',
            Toolbars: ['Layout', 'Alert', 'CellSummary', 'Export', 'Trades'],
          },
          {
            Name: 'Search',
            Toolbars: ['Query'],
          },
          {
            Name: 'Edit',
            Toolbars: ['SmartEdit', 'BulkUpdate'],
          },
        ],
        CustomToolbars: [
          // Show a Title and Configure Button
          {
            Name: 'Trades',
            Title: 'Trades',
            ShowConfigureButton: true,
            ToolbarButtons: [
              {
                Name: 'addTradeButton',
                Caption: 'Add Trade',
                ButtonStyle: {
                  Variant: 'raised',
                  Tone: 'accent',
                },
              },
            ],
          },
          // Show no Title and no Configure Button
          {
            Name: 'Deals',
            ToolbarButtons: [
              {
                Name: 'dealsButton1',
                Caption: 'New Deal',
                ButtonStyle: {
                  Variant: 'text',
                  Tone: 'success',
                },
              },
            ],
          },
          // Show Configure Button but no Title
          // Note that we have also added an Icon to the button
          {
            Name: 'Orders',
            Title: 'Orders',
            ShowConfigureButton: true,
            ToolbarButtons: [
              {
                Name: 'ordersButton1',
                Caption: 'Create Order',
                ButtonStyle: {
                  Variant: 'outlined',
                  Tone: 'info',
                },
                Icon: {
                  height: 20,
                  width: 25,
                  src:
                    'https://www.pngfind.com/pngs/m/278-2781613_blue-plus-icon-add-new-button-png-transparent.png',
                },
              },
            ],
          },
        ],
      },
      Theme: {
        Revision: Date.now(),
        CurrentTheme: 'dark',
      },
      Layout: {
        Revision: Date.now(),
        CurrentLayout: 'Basic',
        Layouts: [
          {
            Name: 'Basic',
            Columns: [
              'tradeId',
              'currency',
              'changeOnYear',
              'counterparty',
              'bid',
              'bidOfferSpread',
              'ask',
              'bestAsk',
              'notional',
              'status',
              'country',
              'price',
              'isLive',
              'rating',
              'tradeDate',
              'settlementDate',
              'diffDays',
            ],
          },
          {
            Name: 'Row Grouped',
            Columns: [
              'tradeId',
              'changeOnYear',
              'counterparty',
              'bid',
              'bidOfferSpread',
              'ask',
              'bestAsk',
              'notional',
              'status',
            ],
            RowGroupedColumns: ['country', 'currency'],
          },
          {
            Name: 'Pivot',
            Columns: ['tradeId', 'currency'],
            PivotColumns: ['status'],
            RowGroupedColumns: ['counterparty'],
            EnablePivot: true,
            AggregationColumns: {
              bid: 'avg',
              ask: 'sum',
              price: true,
            },
          },
        ],
      },
      FlashingCell: {
        FlashingCells: [
          {
            ColumnId: 'bid',
            DownColor: '#FF0000',
            FlashingCellDuration: 500,
            IsLive: true,
            UpColor: '#008000',
          },
          {
            ColumnId: 'ask',
            DownColor: '#FF0000',
            FlashingCellDuration: 500,
            IsLive: true,
            UpColor: '#008000',
          },
          {
            ColumnId: 'price',
            DownColor: '#FF0000',
            FlashingCellDuration: 500,
            IsLive: true,
            UpColor: '#008000',
          },
        ],
      },
      PercentBar: {
        Revision: Date.now(),
        PercentBars: [
          {
            ColumnId: 'notional',
            Ranges: [
              { Min: 1, Max: 2500000, Color: '#a52a2a' },
              { Min: 2500001, Max: 6000000, Color: '#ffa500' },
              { Min: 6000001, Max: 11000000, Color: '#006400' },
            ],
          },
        ],
      },

      GradientColumn: {
        GradientColumns: [
          {
            ColumnId: 'bidOfferSpread',
            PositiveValue: 0.5,
            PositiveColor: '#006400',
            BaseValue: 0,
          },
        ],
      },
      FormatColumn: {
        Revision: Date.now(),
        FormatColumns: [
          {
            Scope: {
              DataTypes: ['Date'],
            },
            DisplayFormat: {
              Formatter: 'DateFormatter',
              Options: {
                Pattern: 'MM/dd/yyyy',
              },
            },
          },
          {
            Scope: {
              DataTypes: ['Number'],
            },
            CellAlignment: 'Right',
          },
        ],
      },

      ConditionalStyle: {
        Revision: Date.now(),
        ConditionalStyles: [
          {
            Scope: {
              All: true,
            },
            Style: {
              BackColor: 'lightYellow',
              ForeColor: 'brown',
            },
            Expression: '[status]="Pending"',
          },
          {
            Scope: {
              DataTypes: ['Number'],
            },
            Style: {
              ForeColor: 'Green',
            },
            Predicate: {
              PredicateId: 'Positive',
            },
          },
          {
            Scope: {
              DataTypes: ['Number'],
            },
            Style: {
              ForeColor: 'Red',
            },
            Predicate: {
              PredicateId: 'Negative',
            },
          },
        ],
      },
      CalculatedColumn: {
        Revision: Date.now(),
        CalculatedColumns: [
          {
            CalculatedColumnSettings: {
              Aggregatable: true,
              DataType: 'Number',
              Pivotable: true,
              Filterable: true,
            },
            ColumnExpression:
              'MIN([ask] ,[markitAsk], [bloombergAsk],[indicativeAsk]) ',
            ColumnId: 'bestAsk',
            FriendlyName: 'Best Ask',
          },
          {
            CalculatedColumnSettings: {
              Aggregatable: true,
              DataType: 'Number',
              Filterable: true,
            },
            ColumnExpression: 'DIFF_DAYS([settlementDate],[tradeDate]) ',
            ColumnId: 'diffDays',
            FriendlyName: 'Diff Days',
          },
        ],
      },
      UserInterface: {
        Revision: Date.now(),
        EditLookUpItems: [
          {
            Scope: {
              ColumnIds: ['status'],
            },
            LookUpValues: ['Pending', 'Completed', 'Rejected'],
          },
        ],
      },
    },
  };

  constructor(private http: HttpClient) {
    this.http = http;

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
        editable: true,
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
        editable: true,
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
      ,
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
        editable: true,
        type: 'abColDefDate',
      },
      {
        headerName: 'Settlement Date',
        field: 'settlementDate',
        editable: true,
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
    ].map((c: ColDef) => {
      c.filter = true;
      c.floatingFilter = true;
      c.sortable = true;
      c.resizable = true;
      return c;
    });

    this.gridOptions = {
      enableRangeSelection: true,
      sideBar: true,
      suppressMenuHide: true,
      singleClickEdit: true,
      statusBar: {
        statusPanels: [
          { statusPanel: 'agTotalRowCountComponent', align: 'left' },
          { statusPanel: 'agFilteredRowCountComponent' },
        ],
      },
      components: {
        AdaptableToolPanel: AdaptableToolPanelAgGridComponent,
      },
      columnDefs: this.columnDefs,
      rowData: [],
      onGridReady: this.onGridReady,
    };
  }

  adaptableReady = ({ adaptableApi, vendorGrid }) => {
    console.log({ adaptableApi, vendorGrid });

    adaptableApi.eventApi.on(
      'ToolbarButtonClicked',
      (toolbarButtonClickedEventArgs: ToolbarButtonClickedEventArgs) => {
        let trade: ITrade = dummyTradeBuilder.createTrade(
          this.gridApi.getDisplayedRowCount() + 1
        );
        adaptableApi.gridApi.addGridData([trade]);
      }
    );
  };

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    setTimeout(() => {
      let trades: ITrade[] = [];
      for (let i = 1; i <= 10000; i++) {
        trades.push(dummyTradeBuilder.createTrade(i));
      }
      this.gridApi.setRowData(trades);
      this.gridColumnApi.autoSizeAllColumns();
    }, 500);
  };
}
