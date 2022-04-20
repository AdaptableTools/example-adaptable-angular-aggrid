# AdapTable Angular Example App

This example app shows a demo instance of [AdapTable Angular](https://docs.adaptabletools.com/guide/angular-overview).

## Versions and Dependencies

The demo is built using these key packages:

- [Angular](https://github.com/angular/angular) version 10
- [Adaptable](https://docs.adaptabletools.com/) version 11
- [AG Grid](https://www.ag-grid.com) version 27.0.0

> 10 is the minimium Angular version required for using Adaptable.

## AdapTable Angular  Custom Components

The main benefit of using AdapTable Angular is that it allows you to supply custom components in AdapTable in a Angular-friendly way.

> For full information on how to install and use AdapTable Angular see the [AdapTable Documentation](https://docs.adaptabletools.com/guide/angular-overview).
This demo showcases 3 Angular-specific features of AdapTable:

### Settings Panel

The demo illustrates how to pass custom Angular components to the [Settings Panel](https://docs.adaptabletools.com/guide/ui-settings-panel):

```ts
const adaptableOptions: AdaptableOptions = {
    // ...
    settingsPanelOptions: {
      customSettingsPanels: [
        {
          name: 'Custom Theme Settings Panel',
          frameworkComponent: {
            // The custom component wraps the same reusable Angular SlideToggle component which is used in the Toolbar and ToolPanel components
            type: ThemeSettingsPanelComponent,
          },
        },
      ],
    },
    // ...
}
```

### Tool Panel

The demo illustrates how to pass custom Angular components to the [Tool Panel](https://docs.adaptabletools.com/guide/ui-tool-panel):

```tsx
const adaptableOptions: AdaptableOptions = {
    // ...
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
        }
      // ...
      ]
  }
  // ...
}
```

### Custom Toolbar
The demo illustrates how to pass custom Angular components to the [Dashboard Toolbar](https://docs.adaptabletools.com/guide/ui-dashboard#tabs-and-toolbars):

```tsx
const adaptableOptions: AdaptableOptions = {
    // ...
    dashboardOptions: {
        customToolbars: [
          {
            name: 'LayoutToggle',
            title: 'Layout toggle',
            frameworkComponent: {
              // simple wrapper around Angular Material ButtonToggle component
              // the implementation (and interaction with the AdaptableApi) is encapsulated in the component
              type: ButtonToggleComponent,
            },
          },
        ],
    }
    // ...
}
```

> For more information on how to use Angular Components in AdapTable see the [AdapTable Documentation](https://docs.adaptabletools.com/guide/angular-custom-components).


## Installation

NOTE: In order to be able to run `npm install`, you need to be logged into our private NPM registry - follow the instructions in the [Adaptable Angular Documentation](https://docs.adaptabletools.com/guide/angular-installation)

> If you do not have an Adpatable Login please contact support@adaptabletools.com

Run `npm install` (or `yarn`), depending on what tool you're using.

## Development Server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code Scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running Tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).


## Licences

A licence for AdapTable provides access to all product features as well as quarterly updates and enhancements through the lifetime of the licence, comprehensive support, and access to all 3rd party libraries.

We can make a trial licence available for a short period of time to allow you to try out AdapTable for yourself.

Please contact [`sales@adaptabletools.com`](mailto:sales@adaptabletools.com) or read the [Licence Documentation](https://docs.adaptabletools.com/guide/licensing) for more information.

## Demo

To see AdapTable Angular in action visit [Adaptable Documentation](https://docs.adaptabletools.com/) which contains a large number of small demos each showing a different feature, function or option in AdapTable Angular (using dummy data sets).

Additionally, there is a page with larger 'recipe-type' Demos at the [Adaptable Tools website](https://www.adaptabletools.com/demos).

## Help

Developers can learn how to access AdapTable Angular programmatically at [AdapTable Documentation](https://docs.adaptabletools.com).

General information about Adaptable Tools is available at our [Website](http://www.adaptabletools.com)

## Support

For all support enquiries please email [`support@adaptabletools.com`](mailto:support@adaptabletools.com) or [raise a Support Ticket](https://adaptabletools.zendesk.com/hc/en-us/requests/new).
