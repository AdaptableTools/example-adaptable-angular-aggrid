# AdapTable Angular 10 Example App

This example app shows a demo instance of AdapTable using the [Angular Wrapper](https://docs.adaptabletools.com/docs/angular-wrapper/angular-wrapper-overview).

### Versions and Dependencies
The demo is built using these key packages:

- [Angular CLI](https://github.com/angular/angular-cli) version 10
- [Adaptable](https://docs.adaptabletools.com/) version 8
- [ag-Grid](https://www.ag-grid.com/ag-grid-changelog/?fixVersion=25.0.0) version 25

> 9 is the minimium Angular version required for using Adaptable 7.0 and higher.

### Dummy Ticking Data
The data displayed in the demo is dummy, meaningless data.  

The demo is designed to display the features available in AdapTable rather than be a live system.
It displays 1000 fictitious 'Trades' that contain a combination of string, numeric, date and boolean columns.

Each 'Trade' has a Status ('Pending', 'Completed' or 'Rejected') allowing us to demo the editing and conditional styling capabilities of AdapTable.

Every 20 miliseconds one of these Trades will randomly 'tick' - whereby 6 columns in the row will change values.


### Predefined Config
AdapTable allows developers to provide [Predefined Config](https://docs.adaptabletools.com/docs/predefined-config/predefined-config-overview) in their application.  

These are the objects (e.g. Searches, Layouts, Reports, Conditional Styles) that end-users will be able to access from Day 1 (and depending on their [Entitlements](https://docs.adaptabletools.com/docs/key-topics/entitlements), they can add, edit or delete them).

This demo contains a huge amount of Predefiend Config to illustrate many of the features availabe in AdapTable.  It includes:

#### Layout
In this demo we have created 4 [Layouts](https://docs.adaptabletools.com/docs/adaptable-functions/layout-function)
- Basic - shows column visibility and order including Calculated Columns and Action Columns (see below)
- Sorted - shows column sorts including Custom Sorts (see below)
- Row Grouped - shows a layout with 2 Grouped Row Columns
- Pivot - shows a Layout in pivot view with aggregations and pivoted columns

Conditional Style - created 3
Row Style - where Status is pending (gray)
Number Columns - where positive (Green)
Number Columns - where negative (Red)
Format Columns - 3 set
Date Columns - will use Format: ‘dd/MM/yyyy’
Number Columns - will align to right
Ask, Bid, Price, BestAsk Columns - will have 3 decimal places
Custom Filter Predicates
Created 3 of these which will appear in the relevant Column Filters:
High - appears in TradeId and filters where Notional > 8000000
Benelux - appears in Country column and filters where value is Holland, Belgium or Luxembourg
Post Takeover - appears in any Date Column and filters where value is after a fictitious takeover date of 21/09/2021
 
Query
One shared Query which shows Pending Dollar Trades - if you load it up you can see its content
 
Export
One report - Trades Due this Week - which has bespoke column list and uses a Query to get the Data
We can optionally also schedule this report to run on Friday - give me a time!
Custom Sort
One created on Currency Column - USD, GBP, EUR, then alphabetically
 
Theme
Using the dark theme - but you can switch to light easily
 
Percent Bar 
One created on Notional Column - has 3 Ranges
< 25M - Red
25-50M - Orange
>50M - Green
Calculated Column - 3 created
‘Best Ask’ - gets the min of 4 ask columns - ask, BloombergAsk, MarkitAsk and IndicativeAsk
‘Diff Days’ - shows the diff in days between Trade Date and Settlement Date
’Size’ - returns a string based on the size of the Notional Column (note that as data ticks the notional percent bar updates and so does this calculated column)
 
Gradient Column
One created on Bid Offer Spread Column
 
Sparkline Column
One created in History column - see the Sorted Layout
 
Action Column - called ‘Action’
Uses function not to render if Status is Completed
Renders differently based on whether Status is Pending or Rejected
When clicked wil change the status of the Trade (based on current Status)
Flashing Cell - 3 set (all bespoke colours)
Bid 
Ask
Price
Shortcut
One created on Numeric columns where typing M will multiply by 1M (try in Notional)
 
Cell Validation
One created in Bid Offer Spread and Notional columns - must be positive 
Note: in OpenFin this will work also when exporting to Excel and editing there
EditLookUpItem
One created on Status column to make it easy to change
 


### User Interface

To do - add ToolPanel, Menus
#### Dashboard
The [Dashboard]()
Visible Buttons - Calculated Columns, Layout and Grid Info
3 Tabs each with different Toolbars: Grid, Search, Edit
1 Custom Toolbar - Trades - in the Grid tab.
This Custom Toolbar has a single button called ‘Add Trade’ which when clicked will add a trade to the dataset (all done through AdapTable api).

Context Menu
One context menu item created called ‘Reject Trade’
Uses predicate to decide if visible - only if Status is Pending
Function will change the Status to Rejected 
### Custom Predicates
In addition to the many [Predicates](https://docs.adaptabletools.com/docs/common-objects/common-objects-predicate) that AdapTable ships, developers are able to provide their own [Custom Predicates](https://docs.adaptabletools.com/docs/adaptable-options/custom-predicate-defs-options).

This demo contains 3:

- **High** - appears in TradeId column and filters where Notional > 8000000
- **Benelux** - appears in Country column and filters where value is Holland, Belgium or Luxembourg
- **Post Takeover** - appears in any Date Column and filters where value is after a fictitious takeover date of 21/09/2021

### Audit
AdapTable has a very powerful [Audit Log](https://docs.adaptabletools.com/docs/key-topics/audit-log).  Developers can configure what in AdapTable will be audited where it will be streamed (there are a number of different available estinations).

For ease of convenience, this demo Audit Log has been configured to send Cell Edits, User State Changes and AdapTable Function selection audit messaes to the Console so they can be easily viewed.

### Server-Side Functionality
Everything in this demo takes place enitrely on the client in order to reduce the complexity.

However it is possible to run AdapTable in Server Mode where all the Queries and Filters can be built by end-users in the UI but evaluated on the Server.  See the [Server Functionality Guide](https://docs.adaptabletools.com/docs/key-topics/server-functionality) for more details.

## Installation

NOTE: In order to be able to run `npm install`, you need to be logged into our private NPM registry - follow the instructions in the [Adaptable Angular Wrapper Documentation](https://docs.adaptabletools.com/docs/angular-wrapper/angular-wrapper-installation)

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

Licences can be purchased individually, for a team (minimum 30 end-users), for an organisation or for integration into software for onward sale.

We can make a trial licence available for a short period of time to allow you to try out AdapTable for yourself.

Please contact [`sales@adaptabletools.com`](mailto:sales@adaptabletools.com) for more information.
 
## Demo

To see AdapTable in action visit our [Demo Site](https://demo.adaptabletools.com).  Here you can see a large number of AdapTable demos each showing a different feature, function or option in AdapTable (using dummy data sets).

## Help

Developers can learn how to access AdapTable programmatically at [AdapTable Documentation](https://docs.adaptabletools.com).

For help on the Angular CLI use `ng help` or consult the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## More Information

General information about Adaptable Tools is available at our [Website](http://www.adaptabletools.com) 
 
## Support

For all support enquiries please email [`support@adaptabletools.com`](mailto:support@adaptabletools.com) or [raise a Support Ticket](https://adaptabletools.zendesk.com/hc/en-us/requests/new).
