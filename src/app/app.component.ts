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
  ActionColumnClickedEventArgs,
  ActionColumnClickedInfo,
  ActionColumnRenderParams,
  AdaptableApi,
  AdaptableOptions,
  AdaptableToolPanelAgGridComponent,
  MenuInfo,
  PredicateDefHandlerParams,
  ToolbarButtonClickedEventArgs,
} from '@adaptabletools/adaptable-angular-aggrid';
import charts from '@adaptabletools/adaptable-plugin-charts';
import finance from '@adaptabletools/adaptable-plugin-finance';
import { DummyTradeBuilder, ITrade } from 'src/Itrade';

var dummyTradeBuilder: DummyTradeBuilder = new DummyTradeBuilder();
var adapTableApi: AdaptableApi;
var tradeCount = 1000;
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
    adaptableId: 'angular demo' + Date.now(),
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
    userFunctions: [
      {
        type: 'ActionColumnRenderFunction',
        name: 'renderStatusFunction',
        handler(params: ActionColumnRenderParams) {
          return params.rowData.status == 'Pending'
            ? '<button >Reject</button>'
            : '<button style="font-style:italic">Cancel</button>';
        },
      },
      {
        type: 'ActionColumnShouldRenderPredicate',
        name: 'renderStatusPredicate',
        handler(params) {
          return params.rowData.status != 'Completed';
        },
      },
      {
        type: 'UserMenuItemClickedFunction',
        name: 'rejectTrade',
        handler(menuInfo: MenuInfo) {
          adapTableApi.gridApi.setCellValue(
            'status',
            'Rejected',
            menuInfo.PrimaryKeyValue,
            true
          );
        },
      },
      {
        type: 'UserMenuItemShowPredicate',
        name: 'isTradePending',
        handler(menuInfo) {
          if (!menuInfo.RowNode || !menuInfo.RowNode.data) {
            return false;
          }
          return menuInfo.RowNode.data.status == 'Pending';
        },
      },
    ],
    auditOptions: {
      auditUserStateChanges: {
        auditToConsole: true,
      },
      auditCellEdits: {
        auditToConsole: true,
      },
      auditFunctionsApplied: {
        auditToConsole: true,
      },
    },
    predefinedConfig: {
      Dashboard: {
        VisibleButtons: ['Layout', 'CalculatedColumn', 'GridInfo'],
        Tabs: [
          {
            Name: 'Grid',
            Toolbars: [
              'Layout',
              'Alert',
              'CellSummary',
              'Export',
              'Trades',
              'Theme',
            ],
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
        ],
      },
      Layout: {
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
              'size',
              'status',
              'statusActionColumn',
              'country',
              'price',
              'isLive',
              'rating',
              'tradeDate',
              'settlementDate',
              'diffDays',
              'comments',
            ],
            ColumnSorts: [
              {
                ColumnId: 'tradeId',
                SortOrder: 'Desc',
              },
            ],
            ColumnWidthMap: {
              diffDays: 100,
            },
          },
          {
            Name: 'Sorted',
            Columns: [
              'tradeId',
              'currency',
              'changeOnYear',
              'counterparty',
              'history',
              'settlementDate',
            ],
            ColumnSorts: [
              {
                ColumnId: 'currency',
                SortOrder: 'Asc',
              },
              {
                ColumnId: 'counterparty',
                SortOrder: 'Desc',
              },
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
            Columns: [],
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
      ConditionalStyle: {
        ConditionalStyles: [
          {
            Scope: {
              All: true,
            },
            Style: {
              BackColor: 'lightGray ',
              ForeColor: 'brown',
            },
            Expression: '[status]!="Pending"',
            ExcludeGroupedRows: true,
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
          {
            Scope: {
              ColumnIds: ['country'],
            },
            Style: {
              FontWeight: 'Bold',
              FontStyle: 'Italic',
            },
            Predicate: {
              PredicateId: 'Is',
              Inputs: ['United States'],
            },
          },
        ],
      },
      FormatColumn: {
        FormatColumns: [
          {
            Scope: {
              DataTypes: ['Date'],
            },
            DisplayFormat: {
              Formatter: 'DateFormatter',
              Options: {
                Pattern: 'dd/MM/yyyy',
              },
            },
          },
          {
            Scope: {
              DataTypes: ['Number'],
            },
            CellAlignment: 'Right',
          },
          {
            Scope: {
              ColumnIds: ['ask', 'bid', 'price', 'bestAsk'],
            },
            CellAlignment: 'Right',
            DisplayFormat: {
              Formatter: 'NumberFormatter',
              Options: {
                FractionDigits: 3,
              },
            },
          },
        ],
      },
      FreeTextColumn: {
        FreeTextColumns: [
          {
            ColumnId: 'comments',
            FreeTextStoredValues: [
              {
                PrimaryKey: 996,
                FreeText: 'Need to check',
              },
              {
                PrimaryKey: 983,
                FreeText: 'Make sure notional is correct',
              },
            ],
            FriendlyName: 'Comments',
          },
        ],
      },
      Query: {
        CurrentQuery: '',
        SharedQueries: [
          {
            Uuid: 'pending_dollar_trades',
            Name: 'Pending Dollar Trades',
            Expression:
              "[status] = 'Pending' AND [tradeDate] > NOW() AND [currency] IN ('EUR', 'USD')",
          },
        ],
      },
      Export: {
        Reports: [
          {
            Name: 'Trades Due This Week',
            ReportColumnScope: 'ScopeColumns',
            ReportRowScope: 'ExpressionRows',
            Scope: {
              ColumnIds: [
                'tradeId',
                'notional',
                'counterparty',
                'changeOnYear',
                'tradeDate',
                'bidOfferSpread',
                'country',
                'currency',
                'price',
                'rating',
                'settlementDate',
                'status',
              ],
            },
            Expression:
              "[status] = 'Pending' AND  [tradeDate] > NOW() AND DIFF_DAYS([tradeDate], NOW()) <7",
          },
        ],
      },
      Theme: {
        CurrentTheme: 'dark',
      },
      ActionColumn: {
        ActionColumns: [
          {
            ColumnId: 'statusActionColumn',
            FriendlyName: 'Action',
            ButtonText: 'Reject',
            ShouldRenderPredicate: 'renderStatusPredicate',
            RenderFunction: 'renderStatusFunction',
          },
        ],
      },
      FlashingCell: {
        FlashingCells: [
          {
            ColumnId: 'bid',
            DownColor: '#FF6666',
            FlashingCellDuration: 500,
            IsLive: true,
            UpColor: '#90ee90',
          },
          {
            ColumnId: 'ask',
            DownColor: '#FF6666',
            FlashingCellDuration: 500,
            IsLive: true,
            UpColor: '#90ee90',
          },
          {
            ColumnId: 'price',
            DownColor: '#FF6666',
            FlashingCellDuration: 500,
            IsLive: true,
            UpColor: '#90ee90',
          },
        ],
      },
      PercentBar: {
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
            PositiveColor: 'purple',
            BaseValue: 0,
          },
        ],
      },
      SparklineColumn: {
        SparklineColumns: [
          {
            ColumnId: 'history',
            SparklineType: 'Line',
          },
        ],
      },
      CustomSort: {
        CustomSorts: [
          {
            ColumnId: 'currency',
            SortedValues: ['USD', 'GBP', 'EUR'],
          },
        ],
      },
      CalculatedColumn: {
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
          {
            CalculatedColumnSettings: {
              Pivotable: true,
              DataType: 'String',
              Filterable: true,
            },
            ColumnExpression:
              "[notional] < 3000000? 'Low' : [notional] < 6000000 ? 'Medium' : 'High' ",
            ColumnId: 'size',
            FriendlyName: 'Size',
          },
        ],
      },
      UserInterface: {
        EditLookUpItems: [
          {
            Scope: {
              ColumnIds: ['status'],
            },
            LookUpValues: ['Pending', 'Completed', 'Rejected'],
          },
        ],
        ContextMenuItems: [
          {
            Label: 'Reject Trade',
            UserMenuItemClickedFunction: 'rejectTrade',
            UserMenuItemShowPredicate: 'isTradePending',
          },
        ],
      },
      Shortcut: {
        Shortcuts: [
          {
            ColumnType: 'Number',
            ShortcutKey: 'M',
            ShortcutResult: 1000000,
            ShortcutOperation: 'Multiply',
          },
        ],
      },
      CellValidation: {
        CellValidations: [
          {
            Scope: {
              ColumnIds: ['notional', 'bidOfferSpread'],
            },
            Predicate: {
              PredicateId: 'Negative',
            },
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
        type: 'abColDefNumberArray',
        resizable: true,
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
    adapTableApi = adaptableApi;

    adaptableApi.eventApi.on('AdaptableReady', () => {
      dummyTradeBuilder.startTickingDataagGridTrade(
        adaptableApi,
        vendorGrid,
        50,
        tradeCount
      );
    });

    adapTableApi.eventApi.on(
      'ToolbarButtonClicked',
      (toolbarButtonClickedEventArgs: ToolbarButtonClickedEventArgs) => {
        let trade: ITrade = dummyTradeBuilder.createTrade(
          this.gridApi.getDisplayedRowCount() + 1
        );
        adaptableApi.gridApi.addGridData([trade]);
      }
    );

    adapTableApi.eventApi.on(
      'ActionColumnClicked',
      (actionColumnEventArgs: ActionColumnClickedEventArgs) => {
        let actionColumnClickedInfo: ActionColumnClickedInfo =
          actionColumnEventArgs.data[0].id;
        let rowData: any = actionColumnClickedInfo.rowData;
        const column = actionColumnEventArgs.data[0].id.actionColumn;
        let newStatus: string =
          rowData.status == 'Rejected' ? 'Pending' : 'Rejected';
        adaptableApi.gridApi.setCellValue(
          'status',
          newStatus,
          actionColumnClickedInfo.primaryKeyValue,
          true
        );
      }
    );
  };

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    setTimeout(() => {
      let trades: ITrade[] = [];
      for (let i = 1; i <= tradeCount; i++) {
        trades.push(dummyTradeBuilder.createTrade(i));
      }
      this.gridApi.setRowData(trades);
      this.gridColumnApi.autoSizeAllColumns();
    }, 500);
  };
}
