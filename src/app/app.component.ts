import { Component } from '@angular/core';
import { ColDef, GridOptions, Module } from '@ag-grid-community/all-modules';
import { AllEnterpriseModules } from '@ag-grid-enterprise/all-modules';
import {
  AdaptableApi,
  AdaptableButton,
  AdaptableOptions,
  AdaptableToolPanelAgGridComponent,
  CustomToolbarButtonContext,
  CustomToolPanelButtonContext,
  ToolPanelButtonContext,
} from '@adaptabletools/adaptable-angular-aggrid';
import finance from '@adaptabletools/adaptable-plugin-finance';
import { ButtonToggleComponent } from './custom-components/button-toggle.component';
import { SlideToggleComponent } from './custom-components/slide-toggle.component';
import { MaterialMenuComponent } from './custom-components/material-menu.component';
import { rowData } from './rowData';
import { ThemeSettingsPanelComponent } from './custom-components/theme-settings-panel.component';

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
  public agGridModules: Module[] = AllEnterpriseModules;
  public columnDefs;
  public adaptableApi: AdaptableApi;
  public gridOptions: GridOptions;
  public adaptableApi: AdaptableApi;

  private isLayoutShortcutMenuDisabled = true;

  public adaptableOptions: AdaptableOptions = {
    primaryKey: 'tradeId',
    userName: 'demo user',
    // licenseKey: <add_provided_license_key>,
    adaptableId: 'AdapTable Angular Demo',
    plugins: [finance()],
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
      customToolbars: [
        {
          name: 'GithubRepo',
          title: 'Github Repo',
          showConfigureButton: false,
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
          showConfigureButton: false,
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
                context.adaptableApi.settingsPanelApi.showCustomSettingsPanel(
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
            Columns: [
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
      CustomSort: {
        CustomSorts: [
          {
            ColumnId: 'currency',
            SortedValues: ['USD', 'GBP', 'EUR'],
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
      defaultColDef: {
        enablePivot: true,
        enableRowGroup: true,
        enableValue: true,
      },
      columnDefs: this.columnDefs,
      rowData,
    };
  }

  adaptableReady = ({ adaptableApi, gridOptions }) => {
    this.adaptableApi = adaptableApi;
    // use AdaptableApi for runtime access to Adaptable
  };
}
