(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@adaptabletools/adaptable/src/agGrid'), require('@ag-grid-community/all-modules'), require('@ag-grid-community/angular'), require('@adaptabletools/adaptable/src/types')) :
    typeof define === 'function' && define.amd ? define('@adaptabletools/adaptable-angular-aggrid', ['exports', '@angular/core', '@adaptabletools/adaptable/src/agGrid', '@ag-grid-community/all-modules', '@ag-grid-community/angular', '@adaptabletools/adaptable/src/types'], factory) :
    (global = global || self, factory((global.adaptabletools = global.adaptabletools || {}, global.adaptabletools['adaptable-angular-aggrid'] = {}), global.ng.core, global.Adaptable, global.allModules, global.angular, global.types));
}(this, (function (exports, core, Adaptable, allModules, angular, types) { 'use strict';

    Adaptable = Adaptable && Adaptable.hasOwnProperty('default') ? Adaptable['default'] : Adaptable;

    var __assign = (this && this.__assign) || function () {
        __assign = Object.assign || function(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    allModules.ModuleRegistry.registerModules(allModules.AllCommunityModules);
    /**
     * @param {?} __0
     * @return {?}
     */
    function createAdaptable(_a) {
        var adaptableOptions = _a.adaptableOptions, adaptableContainerId = _a.adaptableContainerId, gridContainerId = _a.gridContainerId, modules = _a.modules;
        return (/**
         * @param {?} gridOptions
         * @param {?} gridParams
         * @return {?}
         */
        function (gridOptions, gridParams) {
            return new Adaptable(__assign({}, adaptableOptions, { containerOptions: __assign({}, adaptableOptions.containerOptions, { adaptableContainer: adaptableContainerId, vendorContainer: gridContainerId }), vendorGrid: gridOptions }), true, {
                instantiateGrid: (/**
                 * @param {?} vendorContainer
                 * @param {?} theGridOptions
                 * @return {?}
                 */
                function (vendorContainer, theGridOptions) {
                    gridParams.modules = modules;
                    return new allModules.Grid(vendorContainer, theGridOptions, gridParams);
                }),
            }, true);
        });
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @param {?} max
     * @return {?}
     */
    function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }
    var AdaptableAngularAgGridComponent = /** @class */ (function () {
        function AdaptableAngularAgGridComponent() {
            this.wrapperClassName = 'ab__ng-wrapper';
            /** @type {?} */
            var seedId = getRandomInt(1000) + "-" + Date.now();
            this.adaptableContainerId = "adaptable-" + seedId;
            this.gridContainerId = "grid-" + seedId;
        }
        /**
         * @return {?}
         */
        AdaptableAngularAgGridComponent.prototype.ngOnInit = /**
         * @return {?}
         */
        function () {
            this.adaptableFactory = createAdaptable({
                adaptableOptions: this.adaptableOptions,
                adaptableContainerId: this.adaptableContainerId,
                gridContainerId: this.gridContainerId,
                modules: this.modules,
            });
        };
        AdaptableAngularAgGridComponent.decorators = [
            { type: core.Component, args: [{
                        entryComponents: [],
                        selector: 'adaptable-angular-aggrid',
                        template: "\n    <div [id]=\"adaptableContainerId\" [class]=\"wrapperClassName\"></div>\n    <div class=\"ab__ng-wrapper-aggrid\">\n      <div\n        [id]=\"gridContainerId\"\n        style=\"position: relative; flex: 1\"\n        [class]=\"agGridContainerClassName\"\n      >\n        <ag-grid-override\n          [gridContainerId]=\"gridContainerId\"\n          [adaptableFactory]=\"adaptableFactory\"\n          [gridOptions]=\"gridOptions\"\n          [onAdaptableReady]=\"onAdaptableReady\"\n        ></ag-grid-override>\n      </div>\n    </div>\n  ",
                        styles: ["\n      .ab__ng-wrapper-aggrid {\n        flex: 1;\n        display: flex;\n        flex-flow: column;\n      }\n      :host {\n        display: flex;\n        flex-flow: var(--ab_flex-direction, column);\n        min-height: var(--ab_min-height, 100px);\n      }\n    "]
                    }] }
        ];
        /** @nocollapse */
        AdaptableAngularAgGridComponent.ctorParameters = function () { return []; };
        AdaptableAngularAgGridComponent.propDecorators = {
            adaptableOptions: [{ type: core.Input }],
            gridOptions: [{ type: core.Input }],
            modules: [{ type: core.Input }],
            agGridContainerClassName: [{ type: core.Input }],
            onAdaptableReady: [{ type: core.Input }]
        };
        return AdaptableAngularAgGridComponent;
    }());
    if (false) {
        /** @type {?} */
        AdaptableAngularAgGridComponent.prototype.adaptableOptions;
        /** @type {?} */
        AdaptableAngularAgGridComponent.prototype.gridOptions;
        /** @type {?} */
        AdaptableAngularAgGridComponent.prototype.modules;
        /** @type {?} */
        AdaptableAngularAgGridComponent.prototype.agGridContainerClassName;
        /** @type {?} */
        AdaptableAngularAgGridComponent.prototype.onAdaptableReady;
        /** @type {?} */
        AdaptableAngularAgGridComponent.prototype.adaptableContainerId;
        /** @type {?} */
        AdaptableAngularAgGridComponent.prototype.gridContainerId;
        /** @type {?} */
        AdaptableAngularAgGridComponent.prototype.wrapperClassName;
        /** @type {?} */
        AdaptableAngularAgGridComponent.prototype.adaptableFactory;
    }

    var __extends = (this && this.__extends) || (function () {
        var extendStatics = function (d, b) {
            extendStatics = Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
                function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
            return extendStatics(d, b);
        };
        return function (d, b) {
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    var AgGridOverrideComponent = /** @class */ (function (_super) {
        __extends(AgGridOverrideComponent, _super);
        function AgGridOverrideComponent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * @return {?}
         */
        AgGridOverrideComponent.prototype.ngAfterViewInit = /**
         * @return {?}
         */
        function () {
            ((/** @type {?} */ (this))).checkForDeprecatedEvents();
            this.gridOptions = allModules.ComponentUtil.copyAttributesToGridOptions(this.gridOptions, this, true);
            ((/** @type {?} */ (this))).gridParams = {
                globalEventListener: ((/** @type {?} */ (this))).globalEventListener.bind(this),
                frameworkOverrides: ((/** @type {?} */ (this))).angularFrameworkOverrides,
                providedBeanInstances: {
                    frameworkComponentWrapper: ((/** @type {?} */ (this))).frameworkComponentWrapper,
                },
                modules: (/** @type {?} */ ((this.modules || []))),
            };
            if (this.columns && this.columns.length > 0) {
                this.gridOptions.columnDefs = this.columns.map((/**
                 * @param {?} column
                 * @return {?}
                 */
                function (column) {
                    return column.toColDef();
                }));
            }
            /** @type {?} */
            var adaptable = this.adaptableFactory(this.gridOptions, ((/** @type {?} */ (this))).gridParams);
            // new Grid(
            //   (this as any)._nativeElement,
            //   this.gridOptions,
            //   (this as any).gridParams
            // );
            if (adaptable.gridOptions.api) {
                this.api = adaptable.gridOptions.api;
            }
            if (adaptable.gridOptions.columnApi) {
                this.columnApi = adaptable.gridOptions.columnApi;
            }
            ((/** @type {?} */ (this)))._initialised = true;
            // sometimes, especially in large client apps gridReady can fire before ngAfterViewInit
            // this ties these together so that gridReady will always fire after agGridAngular's ngAfterViewInit
            // the actual containing component's ngAfterViewInit will fire just after agGridAngular's
            ((/** @type {?} */ (this)))._fullyReady.resolveNow(null, (/**
             * @param {?} resolve
             * @return {?}
             */
            function (resolve) { return resolve; }));
            if (this.onAdaptableReady) {
                adaptable.api.eventApi.on('AdaptableReady', this.onAdaptableReady);
            }
        };
        AgGridOverrideComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'ag-grid-override',
                        template: '',
                        providers: [angular.AngularFrameworkOverrides, angular.AngularFrameworkComponentWrapper]
                    }] }
        ];
        AgGridOverrideComponent.propDecorators = {
            adaptableFactory: [{ type: core.Input }],
            gridContainerId: [{ type: core.Input }],
            onAdaptableReady: [{ type: core.Input }]
        };
        return AgGridOverrideComponent;
    }(angular.AgGridAngular));
    if (false) {
        /** @type {?} */
        AgGridOverrideComponent.prototype.adaptableFactory;
        /** @type {?} */
        AgGridOverrideComponent.prototype.gridContainerId;
        /** @type {?} */
        AgGridOverrideComponent.prototype.onAdaptableReady;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var AdaptableAngularAgGridModule = /** @class */ (function () {
        function AdaptableAngularAgGridModule() {
        }
        AdaptableAngularAgGridModule.decorators = [
            { type: core.NgModule, args: [{
                        declarations: [AgGridOverrideComponent, AdaptableAngularAgGridComponent],
                        imports: [],
                        exports: [AdaptableAngularAgGridComponent],
                        providers: [],
                    },] }
        ];
        return AdaptableAngularAgGridModule;
    }());

    Object.defineProperty(exports, 'AdaptablePlugin', {
        enumerable: true,
        get: function () {
            return types.AdaptablePlugin;
        }
    });
    exports.AdaptableAngularAgGridComponent = AdaptableAngularAgGridComponent;
    exports.AdaptableAngularAgGridModule = AdaptableAngularAgGridModule;
    exports.ɵa = AgGridOverrideComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=adaptabletools-adaptable-angular-aggrid.umd.js.map
