import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  ColDef,
  GridApi,
  GridOptions,
  Module,
} from '@ag-grid-community/all-modules';
import { AllEnterpriseModules } from '@ag-grid-enterprise/all-modules';
import {
  ActionColumnButtonContext,
  AdaptableApi,
  AdaptableButton,
  AdaptableOptions,
  AdaptableToolPanelAgGridComponent,
  MenuContext,
  PredicateDefHandlerParams,
} from '@adaptabletools/adaptable-angular-aggrid';
import charts from '@adaptabletools/adaptable-plugin-charts';
import finance from '@adaptabletools/adaptable-plugin-finance';
import { DummyTradeBuilder, ITrade } from 'src/Itrade';
import { ButtonToggleComponent } from './custom-toolbars/button-toggle.component';
import { SlideToggleComponent } from './custom-toolbars/slide-toggle.component';
import { MaterialMenuComponent } from './custom-toolbars/material-menu.component';

const dummyTradeBuilder: DummyTradeBuilder = new DummyTradeBuilder();
let adapTableApi: AdaptableApi;
const tradeCount = 1000;

@Component({
  selector: 'app-adaptable-root',
  template: `
    <adaptable-angular-aggrid
      [adaptableOptions]="adaptableOptions"
      [modules]="agGridModules"
      [gridOptions]="gridOptions"
      (adaptableReady)="adaptableReady($event)"
    >
    </adaptable-angular-aggrid>
    <ag-grid-angular
      [gridOptions]="gridOptions"
      [modules]="agGridModules"
      [rowData]="rowData"
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
  public gridApi: GridApi;
  public agGridModules: Module[] = AllEnterpriseModules;
  public gridColumnApi;
  public columnDefs;
  public rowData: any[] = null;
  public gridOptions: GridOptions;


  public adaptableOptions: AdaptableOptions = {
    primaryKey: 'tradeId',
    userName: 'demo user',
    adaptableId: 'AdapTable Angular Demo',
    adaptableStateKey: `${Date.now()}`,
    plugins: [charts(), finance()],
    userInterfaceOptions: {
      showAdaptableToolPanel: true,
      editLookUpItems: [
        {
          scope: {
            ColumnIds: ['status'],
          },
          values: ['Pending', 'Completed', 'Rejected'],
        },
      ],
    },
    menuOptions: {
      contextMenuItems: [
        {
          label: 'Reject Trade',
          onClick: (menuContext: MenuContext) => {
            adapTableApi.gridApi.setCellValue(
              'status',
              'Rejected',
              menuContext.primaryKeyValue,
              true
            );
          },
          shouldRender: (menuContext: MenuContext) => {
            if (!menuContext?.rowNode?.data?.status) {
              return false;
            }
            return menuContext.rowNode.data.status == 'Pending';
          },
        },
      ],
    },
    customPredicateDefs: [
      {
        id: 'high',
        label: 'High',
        columnScope: {
          ColumnIds: ['tradeId'],
        },
        functionScope: ['filter', 'alert', 'conditionalstyle'],
        handler(params: PredicateDefHandlerParams) {
          const notional: number = params.node.data.notional;
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
            params.value === 'Luxembourg' ||
            params.value === 'Belgium' ||
            params.value === 'Holland'
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
          const takeOverDate = new Date('2020-09-21');
          return (params.value as Date) > takeOverDate;
        },
      },
    ],
    userFunctions: [
      {
        type: 'ButtonRenderPredicate',
        name: 'renderStatusPredicate',
        handler: (
          button: AdaptableButton,
          context: ActionColumnButtonContext
        ) => {
          if (!context?.rowNode?.data?.status) {
            return false;
          }
          return context.rowNode.data.status != 'Completed';
        },
      },
      {
        type: 'ButtonClickedFunction',
        name: 'statusActionButtonClicked',
        handler: (
          button: AdaptableButton,
          context: ActionColumnButtonContext
        ) => {
          let rowData: any = context.rowNode.data;
          let newStatus: string =
            rowData.status == 'Rejected' ? 'Pending' : 'Rejected';
          adapTableApi.gridApi.setCellValue(
            'status',
            newStatus,
            context.primaryKeyValue,
            true
          );
        },
      },
      {
        type: 'ButtonClickedFunction',
        name: 'addTradeButtonClicked',
        handler: (
          button: AdaptableButton,
          context: ActionColumnButtonContext
        ) => {
          let trade: ITrade = dummyTradeBuilder.createTrade(
            this.gridApi.getDisplayedRowCount() + 1
          );
          adapTableApi.gridApi.addGridData([trade]);
        },
      },
    ],
    alertOptions: {
      maxAlertsInStore: 50,
    },

    predefinedConfig: {
      Dashboard: {
        VisibleButtons: ['Layout', 'CalculatedColumn', 'GridInfo'],
        Tabs: [
          {
            Name: 'Grid',
            Toolbars: ['Layout', 'Alert', 'CellSummary', 'Export', 'Theme'],
          },
          {
            Name: 'Search',
            Toolbars: ['Query'],
          },
          {
            Name: 'Edit',
            Toolbars: ['SmartEdit', 'BulkUpdate'],
          },
          {
            Name: 'Custom',
            Toolbars: ['Trades', 'LayoutToggle', 'SlideToggle', 'LayoutMenu'],
          },
        ],
        CustomToolbars: [
          // Show a Title and Configure Button
          {
            Name: 'Trades',
            Title: 'Trades',
            ShowConfigureButton: false,
            CustomToolbarButtons: [
              {
                Label: 'Add Trade',
                ButtonStyle: {
                  Variant: 'raised',
                  Tone: 'accent',
                },
                ButtonClickedFunction: 'addTradeButtonClicked',
              },
            ],
          },
          // for implementation details, see the 'frameworkCompontents' option below
          {
            Name: 'LayoutToggle',
            Title: 'Layout toggle',
            FrameworkComponent: 'layoutButtonToggle',
          },
          {
            Name: 'SlideToggle',
            Title: 'Slide toggle',
            FrameworkComponent: 'slideToggle',
          },
          {
            Name: 'LayoutMenu',
            Title: ' Layout menu',
            FrameworkComponent: 'layoutMenu',
          },
        ],
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
            Rule: {
              BooleanExpression: '[status]!="Pending"',
            },
            ExcludeGroupedRows: true,
          },
          {
            Scope: {
              DataTypes: ['Number'],
            },
            Style: {
              ForeColor: 'Green',
            },
            Rule: {
              Predicate: {
                PredicateId: 'Positive',
              },
            },
          },
          {
            Scope: {
              DataTypes: ['Number'],
            },
            Style: {
              ForeColor: 'Red',
            },
            Rule: {
              Predicate: {
                PredicateId: 'Negative',
              },
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
            Rule: {
              Predicate: {
                PredicateId: 'Is',
                Inputs: ['United States'],
              },
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
          {
            Scope: {
              ColumnIds: ['notional'],
            },
            NumericColumnStyle: {
              PercentBarStyle: {
                CellRanges: [
                  { Min: 1, Max: 2500000, Color: '#a52a2a' },
                  { Min: 2500001, Max: 6000000, Color: '#ffa500' },
                  { Min: 6000001, Max: 11000000, Color: '#006400' },
                ],
              },
            },
          },
          {
            Scope: {
              ColumnIds: ['bidOfferSpread'],
            },
            NumericColumnStyle: {
              GradientStyle: {
                CellRanges: [{ Min: 0, Max: 0.5, Color: 'purple' }],
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
            Name: 'Pending Dollar Trades',
            BooleanExpression:
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
            Query: {
              BooleanExpression:
                "[status] = 'Pending' AND  [tradeDate] > NOW() AND DIFF_DAYS([tradeDate], NOW()) <7",
            },
          },
        ],
      },
      Schedule: {
        ReportSchedules: [
          {
            ExportDestination: 'CSV',
            ReportName: 'Trades Due This Week',
            Schedule: {
              Hour: 12,
              Minute: 23,
              OneOffDate: null,
              DaysOfWeek: [5],
            },
            ScheduleType: 'Report',
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
            ActionColumnButton: {
              Label: 'Reject',
              ButtonClickedFunction: 'statusActionButtonClicked',
              ButtonRenderPredicate: 'renderStatusPredicate',
            },
          },

          /*
            We used to have this user function too but have no lost it i.e. a way to render different action buttons differently.  not sure if we need to bring back?
             type: 'ActionColumnRenderFunction',
        name: 'renderStatusFunction',
        handler(params: ActionColumnRenderParams) {
          if (params && params.rowData && params.rowData.status) {
            return params.rowData.status == 'Pending'
              ? '<button >Reject</button>'
              : '<button style="font-style:italic">Cancel</button>';
          }
        },
           
          //  RenderFunction: 'renderStatusFunction',
          },
          */
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
      QuickSearch: {
        QuickSearchText: 'Gold',
        Style: {
          BackColor: '#ffff00',
          ForeColor: '#808080',
        },
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
            Query: {
              ScalarExpression:
                'MIN([ask] ,[markitAsk], [bloombergAsk],[indicativeAsk]) ',
            },
            ColumnId: 'bestAsk',
            FriendlyName: 'Best Ask',
          },
          {
            CalculatedColumnSettings: {
              Aggregatable: true,
              DataType: 'Number',
              Filterable: true,
            },
            Query: {
              ScalarExpression: 'DIFF_DAYS([settlementDate],[tradeDate]) ',
            },

            ColumnId: 'diffDays',
            FriendlyName: 'Diff Days',
          },
          {
            CalculatedColumnSettings: {
              Pivotable: true,
              DataType: 'String',
              Filterable: true,
            },
            Query: {
              ScalarExpression:
                "[notional] < 300000? 'Low' : [notional] < 600000 ? 'Medium' : 'High' ",
            },
            ColumnId: 'size',
            FriendlyName: 'Size',
          },
        ],
      },
      Alert: {
        FlashingAlertDefinitions: [
          {
            Scope: {
              ColumnIds: ['bid', 'ask', 'price'],
            },
            Rule: {
              Predicate: {
                PredicateId: 'Any',
              },
            },
            FlashDuration: 250,
            UpChangeStyle: {
              BackColor: '#90ee90',
            },
            DownChangeStyle: {
              BackColor: '#FF6666',
            },
          },
        ],

        AlertDefinitions: [
          {
            AlertProperties: {
              LogToConsole: false,
            },
            MessageType: 'Warning',
            Rule: {
              Predicate: { PredicateId: 'Equals', Inputs: ['10000000'] },
            },
            Scope: { ColumnIds: ['notional'] },
          },
          {
            Scope: {
              ColumnIds: ['notional', 'bidOfferSpread'],
            },
            AlertProperties: {
              PreventEdit: true,
            },
            MessageType: 'Error',
            Rule: {
              Predicate: {
                PredicateId: 'Negative',
              },
            },
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
    },
    frameworkComponents: [
      {
        name: 'layoutButtonToggle',
        // simple wrapper around Angular Material ButtonToggle component
        // the implementation (and interaction with the AdaptableApi) is encapsulated in the component
        type: ButtonToggleComponent,
      },
      {
        name: 'slideToggle',
        // custom Angular component for a slide component
        // additional configuration is passed through the onSetup() function
        type: SlideToggleComponent,
        onSetup: (): Partial<SlideToggleComponent> => {
          return {
            // basically this toolbar interacts with another custom toolbar(layoutMenu), activating/deactivating it
            onChange: toggleValue => {
              this.isLayoutShortcutMenuDisabled = !toggleValue;
            },
          };
        },
      },
      {
        name: 'layoutMenu',
        // custom component providing an Angular Material menu in a custom toolbar menu :)
        // the implementation is generic, the I/O params are set through the onSetup() function
        type: MaterialMenuComponent,
        onSetup: (params): Partial<MaterialMenuComponent> => {
          return {
            // the component interacts with the adaptableApi provided in the framework component params
            menuItems: params.api.layoutApi
              .getAllLayout()
              .map(layout => layout.Name),
            onItemClick: layoutName => {
              params.api.layoutApi.setLayout(layoutName);
            },
            // the disabled state is updated by another custom toolbar (slideToggle)
            isDisabled: () => {
              return this.isLayoutShortcutMenuDisabled;
            },
          };
        },
      },
    ],
  };

  isLayoutShortcutMenuDisabled = true;

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

  adaptableReady = ({
    adaptableApi,
    vendorGrid,
  }: {
    adaptableApi: AdaptableApi;
    vendorGrid: GridOptions;
  }) => {
    adapTableApi = adaptableApi;
    const gridOptions = vendorGrid;

    adaptableApi.eventApi.on('AdaptableReady', () => {
      dummyTradeBuilder.startTickingDataagGridTrade(
        adaptableApi,
        vendorGrid,
        50,
        tradeCount
      );
    });

   
  };

  onGridReady = params => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    setTimeout(() => {
      const trades: ITrade[] = [];
      for (let i = 1; i <= tradeCount; i++) {
        trades.push(dummyTradeBuilder.createTrade(i));
      }
      this.gridApi.setRowData(trades);
      this.gridColumnApi.autoSizeAllColumns();
    }, 500);
  };
}
