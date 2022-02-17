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
  AdaptableReadyInfo,
  AdaptableToolPanelAgGridComponent,
  ContextMenuContext,
  CustomToolPanelButtonContext,
  PredicateDefHandlerParams,
  ToolPanelButtonContext,
} from '@adaptabletools/adaptable-angular-aggrid';
import finance from '@adaptabletools/adaptable-plugin-finance';
import { DummyTradeBuilder, ITrade } from 'src/Itrade';
import { ButtonToggleComponent } from './custom-toolbars/button-toggle.component';
import { SlideToggleComponent } from './custom-toolbars/slide-toggle.component';
import { MaterialMenuComponent } from './custom-toolbars/material-menu.component';
import { CustomToolbarButtonContext } from '@adaptabletools/adaptable/src/AdaptableOptions/DashboardOptions';

const dummyTradeBuilder: DummyTradeBuilder = new DummyTradeBuilder();
let adapTableApi: AdaptableApi;
const tradeCount = 1000;

@Component({
  selector: 'app-adaptable-root',
  template: `
    <ag-grid-angular
      [adaptableOptions]="adaptableOptions"
      [gridOptions]="gridOptions"
      [modules]="agGridModules"
      [rowData]="rowData"
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
  public gridApi: GridApi;
  public agGridModules: Module[] = AllEnterpriseModules;
  public gridColumnApi;
  public columnDefs;
  public rowData: any[] = null;
  public gridOptions: GridOptions;

  isLayoutShortcutMenuDisabled = true;

  public adaptableOptions: AdaptableOptions = {
    primaryKey: 'tradeId',
    userName: 'demo user',
    // licenseKey: <add_provided_license_key>,
    adaptableId: 'AdapTable Angular Demo',
    plugins: [finance()],
    alertOptions: {
      maxAlertsInStore: 50,
    },
    userInterfaceOptions: {
      editLookUpItems: [
        {
          scope: {
            ColumnIds: ['status'],
          },
          values: ['Pending', 'Completed', 'Rejected'],
        },
      ],
      actionColumns: [
        {
          columnId: 'statusActionColumn',
          friendlyName: 'Action',
          actionColumnButton: {
            label: 'Reject',
            hidden: (
              button: AdaptableButton<ActionColumnButtonContext>,
              context: ActionColumnButtonContext
            ) => {
              return context?.rowNode?.data?.status === 'Completed';
            },
            onClick: (
              button: AdaptableButton<ActionColumnButtonContext>,
              context: ActionColumnButtonContext
            ) => {
              const rowData: any = context.rowNode.data;
              const newStatus: string =
                rowData.status === 'Rejected' ? 'Pending' : 'Rejected';
              adapTableApi.gridApi.setCellValue(
                'status',
                newStatus,
                context.primaryKeyValue,
                true
              );
            },
          },
        },
      ],
    },
    menuOptions: {
      contextMenuItems: [
        {
          label: 'Reject Trade',
          onClick: (menuContext: ContextMenuContext) => {
            adapTableApi.gridApi.setCellValue(
              'status',
              'Rejected',
              menuContext.primaryKeyValue,
              true
            );
          },
          hidden: (menuContext: ContextMenuContext) => {
            return menuContext?.rowNode?.data?.status !== 'Pending';
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
        moduleScope: ['filter', 'alert', 'conditionalstyle'],
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
        moduleScope: ['filter'],
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
        moduleScope: ['filter'],
        handler(params: PredicateDefHandlerParams) {
          const takeOverDate = new Date('2020-09-21');
          return (params.value as Date) > takeOverDate;
        },
      },
    ],
    dashboardOptions: {
      customToolbars: [
        // Show a Title and Configure Button
        {
          name: 'Trades',
          title: 'Trades',
          showConfigureButton: false,
          toolbarButtons: [
            {
              label: 'Add Trade',
              buttonStyle: {
                variant: 'raised',
                tone: 'accent',
              },
              onClick: (
                button: AdaptableButton<CustomToolbarButtonContext>,
                context: CustomToolbarButtonContext
              ) => {
                const trade: ITrade = dummyTradeBuilder.createTrade(
                  this.gridApi.getDisplayedRowCount() + 1
                );
                adapTableApi.gridApi.addGridData([trade]);
              },
            },
          ],
        },
        {
          name: 'LayoutToggle',
          title: 'Layout toggle',
          frameworkComponent: {
            // simple wrapper around Angular Material ButtonToggle component
            // the implementation (and interaction with the AdaptableApi) is encapsulated in the component
            type: ButtonToggleComponent,
          },
        },
        {
          name: 'SlideToggle',
          title: 'Slide toggle',
          frameworkComponent: {
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
        },
        {
          name: 'LayoutMenu',
          title: 'Layout menu',
          frameworkComponent: {
            // custom component providing an Angular Material menu in a custom toolbar menu :)
            // the implementation is generic, the I/O params are set through the onSetup() function
            type: MaterialMenuComponent,
            onSetup: ({ adaptableApi }): Partial<MaterialMenuComponent> => {
              return {
                // the component interacts with the adaptableApi provided in the framework component params
                menuItems: adaptableApi.layoutApi
                  .getAllLayout()
                  .map(layout => layout.Name),
                onItemClick: layoutName => {
                  adaptableApi.layoutApi.setLayout(layoutName);
                },
                // the disabled state is updated by another custom toolbar (slideToggle)
                isDisabled: () => {
                  return this.isLayoutShortcutMenuDisabled;
                },
              };
            },
          },
        },
      ],
    },
    toolPanelOptions: {
      toolPanelOrder: ['adaptable', 'columns', 'filters'],
      customToolPanels: [
        {
          name: 'SlideToggle',
          title: 'Slide toggle',
          frameworkComponent: {
            // custom Angular component for a slide component
            // additional configuration is passed through the onSetup() function
            type: SlideToggleComponent,
            onSetup: (): Partial<SlideToggleComponent> => {
              return {
                // basically this ToolPanel interacts with another custom ToolPanel(layoutMenu), activating/deactivating it
                onChange: toggleValue => {
                  this.isLayoutShortcutMenuDisabled = !toggleValue;
                },
              };
            },
          },
        },
        {
          name: 'LayoutMenu',
          title: 'Layout menu',
          frameworkComponent: {
            // custom component providing an Angular Material menu in a custom ToolPanel menu
            // the implementation is generic, the I/O params are set through the onSetup() function
            type: MaterialMenuComponent,
            onSetup: ({ adaptableApi }): Partial<MaterialMenuComponent> => {
              return {
                // the component interacts with the adaptableApi provided in the framework component params
                menuItems: adaptableApi.layoutApi
                  .getAllLayout()
                  .map(layout => layout.Name),
                onItemClick: layoutName => {
                  adaptableApi.layoutApi.setLayout(layoutName);
                },
                // the disabled state is updated by another custom ToolPanel (slideToggle)
                isDisabled: () => {
                  return this.isLayoutShortcutMenuDisabled;
                },
              };
            },
          },
        },
        {
          name: 'CustomToolPanelButton',
          toolPanelButtons: [
            {
              label: 'AlertButton',
              buttonStyle: {
                variant: 'raised',
                tone: 'accent',
              },
              onClick: (
                button: AdaptableButton<CustomToolPanelButtonContext>,
                context: CustomToolPanelButtonContext
              ) => {
                context.adaptableApi.alertApi.showAlertInfo(
                  'CustomToolPanelButton',
                  'Styled button & icon'
                );
              },
            },
          ],
        },
      ],
      customToolPanelButtons: [
        {
          label: 'Query Popup',
          icon: {
            src: 'https://img.icons8.com/glyph-neue/64/000000/zoom-in.png',
          },
          buttonStyle: {
            variant: 'outlined',
            // tone: 'accent',
          },
          onClick: (
            button: AdaptableButton<ToolPanelButtonContext>,
            context: ToolPanelButtonContext
          ) => {
            context.adaptableApi.queryApi.showQueryPopup();
          },
        },
      ],
    },

    predefinedConfig: {
      Dashboard: {
        Revision: Date.now(),
        ModuleButtons: ['SettingsPanel'],
        Tabs: [
          {
            Name: 'Custom',
            Toolbars: ['Trades', 'LayoutToggle', 'SlideToggle', 'LayoutMenu'],
          },
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
              'history',
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
            ColumnStyle: {
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
            ColumnStyle: {
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
            DataType: 'String',
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
        NamedQueries: [
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
              DaysOfWeek: ['Monday'],
            },
            ScheduleType: 'Report',
          },
        ],
      },
      Theme: {
        CurrentTheme: 'dark',
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
      FlashingCell: {
        FlashingCellDefinitions: [
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
      },

      Alert: {
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
            Scope: { All: true },
            ShortcutKey: 'M',
            ShortcutValue: 1000000,
            ShortcutOperation: 'Multiply',
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

  adaptableReady = ({ adaptableApi, gridOptions }: AdaptableReadyInfo) => {
    adapTableApi = adaptableApi;

    adaptableApi.eventApi.on('AdaptableReady', () => {
      dummyTradeBuilder.startTickingDataagGridTrade(
        adaptableApi,
        gridOptions,
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
