import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ColDef, GridOptions, Module } from 'ag-grid-enterprise';
import {
  AdaptableApi,
  AdaptableButton,
  AdaptableOptions,
  AdaptableReadyInfo,
  AdaptableStateFunctionConfig,
  CustomToolbarButtonContext,
  CustomToolPanelButtonContext,
  ToolPanelButtonContext,
} from '@adaptabletools/adaptable-angular-aggrid';
import { ITrade, rowData } from './rowData';
import { RECOMMENDED_MODULES } from '../agGridModules';
import { ThemeSettingsPanelComponent } from './custom-components/theme-settings-panel.component';
import { ButtonToggleComponent } from './custom-components/button-toggle.component';
import { SlideToggleComponent } from './custom-components/slide-toggle.component';
import { MaterialMenuComponent } from './custom-components/material-menu.component';

@Component({
  selector: 'app-adaptable-root',
  template: `
    <adaptable-provider
      [adaptableOptions]="adaptableOptions"
      [gridOptions]="gridOptions"
      [modules]="agGridModules"
      (adaptableReady)="adaptableReady($event)"
      style="height: 100vh; width: 100vw;"
    >
      <adaptable-ui style="flex: none"></adaptable-ui>
      <ag-grid-angular
        *adaptable="let adaptable"
        [gridOptions]="adaptable.gridOptions"
        [modules]="adaptable.modules"
        [rowData]="rowData"
        style="flex: 1"
        class="ag-theme-quartz"
      >
      </ag-grid-angular>
    </adaptable-provider>
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  public agGridModules: Module[] = RECOMMENDED_MODULES;
  public columnDefs: ColDef<ITrade>[];
  public adaptableApi: AdaptableApi;
  public gridOptions: GridOptions<ITrade>;

  private isLayoutShortcutMenuDisabled = true;

  rowData = rowData;

  public adaptableOptions: AdaptableOptions<ITrade> = {
    primaryKey: 'tradeId',
    settingsPanelOptions: {
      customSettingsPanels: [
        {
          name: 'Custom Theme Settings Panel',
          frameworkComponent: {
            // The custom component wraps the same reusable Angular toggle component which is used in the Toolbar and ToolPanel components
            type: ThemeSettingsPanelComponent,
          },
        },
      ],
    },
    dashboardOptions: {
      buttonsLocation: 'left',
      customToolbars: [
        {
          name: 'GithubRepo',
          title: 'Github Repo',
          toolbarActions: ['close'],
          toolbarButtons: [
            {
              label: 'See Source Code',
              buttonStyle: {
                variant: 'raised',
                tone: 'info',
              },
              icon: {
                src:
                  'https://www.pngkey.com/png/full/178-1787243_github-icon-png-github-icon-white-png.png',
                style: {
                  width: 24,
                  height: 24,
                },
              },
              onClick: () => {
                (window as any)
                  ?.open(
                    'https://github.com/AdaptableTools/example-adaptable-angular-aggrid',
                    '_blank'
                  )
                  .focus();
              },
            },
          ],
        },
        // Show a Title and Configure Button
        {
          name: 'CustomThemeToolbar',
          title: 'Custom Theme Toolbar',
          toolbarActions: ['close'],
          toolbarButtons: [
            {
              label: 'Open Theme Settings',
              buttonStyle: {
                variant: 'raised',
                tone: 'accent',
              },
              onClick: (
                button: AdaptableButton<CustomToolbarButtonContext>,
                context: CustomToolbarButtonContext
              ) => {
                context.adaptableApi.settingsPanelApi.openCustomSettingsPanel(
                  'Custom Theme Settings Panel'
                );
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
                  .getLayouts()
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
                  .getLayouts()
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
          buttons: [
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
      customButtons: [
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
            context.adaptableApi.namedQueryApi.openNamedQuerySettingsPanel();
          },
        },
      ],
    },
    // Typically you will store State remotely; here we simply leverage local storage for convenience
    stateOptions: {
      persistState: (state, adaptableStateFunctionConfig) => {
        localStorage.setItem(
          adaptableStateFunctionConfig.adaptableStateKey,
          JSON.stringify(state)
        );
        return Promise.resolve(true);
      },
      loadState: (config: AdaptableStateFunctionConfig) => {
        return new Promise(resolve => {
          let state = {};
          try {
            state =
              JSON.parse(localStorage.getItem(config.adaptableStateKey)) || {};
          } catch (err) {
            console.log('Error loading state', err);
          }
          resolve(state);
        });
      },
    },
    initialState: {
      Dashboard: {
        Revision: Date.now(),
        ModuleButtons: ['SettingsPanel'],
        Tabs: [
          {
            Name: 'Custom',
            Toolbars: [
              'GithubRepo',
              'CustomThemeToolbar',
              'LayoutToggle',
              'SlideToggle',
              'LayoutMenu',
            ],
          },
          {
            Name: 'Search',
            Toolbars: ['Query'],
          },
        ],
      },
      Layout: {
        CurrentLayout: 'Basic',
        Layouts: [
          {
            Name: 'Basic',
            TableColumns: [
              'tradeId',
              'currency',
              'history',
              'changeOnYear',
              'counterparty',
              'bid',
              'bidOfferSpread',
              'ask',
              'notional',
              'status',
              'statusActionColumn',
              'country',
              'price',
              'isLive',
              'rating',
              'tradeDate',
              'settlementDate',
            ],
          },
          {
            Name: 'Sorted',
            TableColumns: [
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
            TableColumns: [
              'tradeId',
              'changeOnYear',
              'counterparty',
              'bid',
              'bidOfferSpread',
              'ask',
              'notional',
              'status',
            ],
            RowGroupedColumns: ['country', 'currency'],
          },
          {
            Name: 'Pivot',
            PivotColumns: ['status'],
            PivotGroupedColumns: ['counterparty'],
            PivotAggregationColumns: [
              {
                ColumnId: 'bid',
                AggFunc: 'avg',
              },
              {
                ColumnId: 'ask',
                AggFunc: 'sum',
              },
              {
                ColumnId: 'price',
                AggFunc: true,
              },
            ],
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
      FreeTextColumn: {
        FreeTextColumns: [
          {
            ColumnId: 'comments',
            FriendlyName: 'Comments',
            FreeTextStoredValues: [
              { PrimaryKey: 24195339, FreeText: 'Used by US team' },
              { PrimaryKey: 224663696, FreeText: 'My favourite' },
              { PrimaryKey: 82095231, FreeText: 'Required by Support' },
            ],
            FreeTextColumnSettings: {
              Resizable: true,
              DataType: 'text',
            },
          },
          {
            ColumnId: 'orderCode',
            FriendlyName: 'Order Code',
            DefaultValue: 123,
            FreeTextColumnSettings: {
              DataType: 'number',
              Sortable: false,
              SuppressMenu: true,
            },
          },
          {
            ColumnId: 'isUsed',
            FriendlyName: 'Is Used',
            DefaultValue: false,
            FreeTextStoredValues: [
              { PrimaryKey: 10270250, FreeText: true },
              { PrimaryKey: 24195339, FreeText: true },
              { PrimaryKey: 224663696, FreeText: true },
              { PrimaryKey: 82095231, FreeText: true },
            ],
            FreeTextColumnSettings: {
              DataType: 'boolean',
              Filterable: true,
              Groupable: true,
            },
          },
        ],
      },
      StyledColumn: {
        StyledColumns: [
          {
            ColumnId: 'history',
            SparklineStyle: {
              options: {
                type: 'line',
                stroke: 'rgb(124, 255, 178)',
                strokeWidth: 2,
                padding: {
                  top: 5,
                  bottom: 5,
                },
                marker: {
                  size: 3,
                  shape: 'diamond',
                },
                highlightStyle: {
                  item: {
                    strokeWidth: 10,
                  },
                },
              },
            },
          },
        ],
      },
    },
  };

  constructor() {
    this.columnDefs = [
      {
        headerName: 'Trade Id',
        field: 'tradeId',
        editable: true,
        cellDataType: 'number',
      },
      {
        headerName: 'Notional',
        field: 'notional',
        enableValue: true,
        editable: true,
        cellClass: 'number-cell',
        cellDataType: 'number',
        aggFunc: 'sum',
      },
      {
        headerName: 'Counterparty',
        field: 'counterparty',
        editable: true,
        enableRowGroup: true,
        cellDataType: 'text',
      },
      {
        headerName: 'Change',
        field: 'changeOnYear',
        cellDataType: 'number',
      },
      {
        headerName: 'Currency',
        field: 'currency',
        editable: true,
        enableRowGroup: true,
        cellDataType: 'text',
      },
      {
        headerName: 'B/O Spread',
        field: 'bidOfferSpread',
        enableValue: true,
        editable: true,
        cellDataType: 'number',
      },
      {
        headerName: 'Price',
        field: 'price',
        enableValue: true,
        enableRowGroup: true,
        cellDataType: 'number',
      },
      {
        headerName: 'Country',
        field: 'country',
        editable: true,
        enableRowGroup: true,
        cellDataType: 'text',
      },
      {
        headerName: 'Status',
        field: 'status',
        editable: true,
        pivot: true,
        enableRowGroup: true,
        enablePivot: true,
        aggFunc: 'sum',
        cellDataType: 'text',
        resizable: true,
      },
      {
        headerName: 'Trade Date',
        field: 'tradeDate',
        cellDataType: 'date',
      },
      {
        headerName: 'Settlement Date',
        field: 'settlementDate',
        cellDataType: 'date',
      },
      {
        headerName: 'Ask',
        field: 'ask',
        cellDataType: 'number',
      },
      {
        headerName: 'Bid',
        field: 'bid',
        cellDataType: 'number',
      },
      {
        headerName: 'Ind Ask',
        field: 'indicativeAsk',
        cellDataType: 'number',
      },
      {
        headerName: 'Ind Bid',
        field: 'indicativeBid',
        cellDataType: 'number',
      },
      {
        headerName: 'Markit Ask',
        field: 'markitAsk',
        cellDataType: 'number',
      },
      {
        headerName: 'Markit Bid',
        field: 'markitBid',
        cellDataType: 'number',
      },
      {
        headerName: 'Bbg Ask',
        field: 'bloombergAsk',
        cellDataType: 'number',
      },
      {
        headerName: 'Bbg Bid',
        field: 'bloombergBid',
        cellDataType: 'number',
      },
      {
        headerName: 'Rating',
        field: 'rating',
        editable: true,
        cellDataType: 'text',
      },
      {
        headerName: 'History',
        field: 'history',
        cellDataType: 'numberArray',
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
      theme: 'legacy',
      enableCharts: true,
      cellSelection: true,
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
    };
  }

  adaptableReady = ({ adaptableApi }: AdaptableReadyInfo) => {
    this.adaptableApi = adaptableApi;
    // use AdaptableApi for runtime access to Adaptable
  };
}
