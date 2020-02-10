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
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { ComponentUtil } from '@ag-grid-community/all-modules';
import { AgGridAngular, AngularFrameworkOverrides, AngularFrameworkComponentWrapper, } from '@ag-grid-community/angular';
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
        this.gridOptions = ComponentUtil.copyAttributesToGridOptions(this.gridOptions, this, true);
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
        { type: Component, args: [{
                    selector: 'ag-grid-override',
                    template: '',
                    providers: [AngularFrameworkOverrides, AngularFrameworkComponentWrapper]
                }] }
    ];
    AgGridOverrideComponent.propDecorators = {
        adaptableFactory: [{ type: Input }],
        gridContainerId: [{ type: Input }],
        onAdaptableReady: [{ type: Input }]
    };
    return AgGridOverrideComponent;
}(AgGridAngular));
export { AgGridOverrideComponent };
if (false) {
    /** @type {?} */
    AgGridOverrideComponent.prototype.adaptableFactory;
    /** @type {?} */
    AgGridOverrideComponent.prototype.gridContainerId;
    /** @type {?} */
    AgGridOverrideComponent.prototype.onAdaptableReady;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWdncmlkLWFuZ3VsYXItb3ZlcnJpZGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFkYXB0YWJsZXRvb2xzL2FkYXB0YWJsZS1hbmd1bGFyLWFnZ3JpZC8iLCJzb3VyY2VzIjpbImxpYi9hZ2dyaWQtYW5ndWxhci1vdmVycmlkZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVqRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFFL0QsT0FBTyxFQUNMLGFBQWEsRUFDYix5QkFBeUIsRUFDekIsZ0NBQWdDLEdBRWpDLE1BQU0sNEJBQTRCLENBQUM7QUFLcEM7SUFPNkMsMkNBQWE7SUFQMUQ7O0lBcUVBLENBQUM7Ozs7SUF0REMsaURBQWU7OztJQUFmO1FBQ0UsQ0FBQyxtQkFBQSxJQUFJLEVBQU8sQ0FBQyxDQUFDLHdCQUF3QixFQUFFLENBQUM7UUFFekMsSUFBSSxDQUFDLFdBQVcsR0FBRyxhQUFhLENBQUMsMkJBQTJCLENBQzFELElBQUksQ0FBQyxXQUFXLEVBQ2hCLElBQUksRUFDSixJQUFJLENBQ0wsQ0FBQztRQUVGLENBQUMsbUJBQUEsSUFBSSxFQUFPLENBQUMsQ0FBQyxVQUFVLEdBQUc7WUFDekIsbUJBQW1CLEVBQUUsQ0FBQyxtQkFBQSxJQUFJLEVBQU8sQ0FBQyxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDakUsa0JBQWtCLEVBQUUsQ0FBQyxtQkFBQSxJQUFJLEVBQU8sQ0FBQyxDQUFDLHlCQUF5QjtZQUMzRCxxQkFBcUIsRUFBRTtnQkFDckIseUJBQXlCLEVBQUUsQ0FBQyxtQkFBQSxJQUFJLEVBQU8sQ0FBQyxDQUFDLHlCQUF5QjthQUNuRTtZQUNELE9BQU8sRUFBRSxtQkFBQSxDQUFDLElBQUksQ0FBQyxPQUFPLElBQUksRUFBRSxDQUFDLEVBQU87U0FDckMsQ0FBQztRQUVGLElBQUksSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDM0MsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHOzs7O1lBQUMsVUFBQyxNQUFvQjtnQkFDbEUsT0FBTyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDM0IsQ0FBQyxFQUFDLENBQUM7U0FDSjs7WUFFSyxTQUFTLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUNyQyxJQUFJLENBQUMsV0FBVyxFQUNoQixDQUFDLG1CQUFBLElBQUksRUFBTyxDQUFDLENBQUMsVUFBVSxDQUN6QjtRQUVELFlBQVk7UUFDWixrQ0FBa0M7UUFDbEMsc0JBQXNCO1FBQ3RCLDZCQUE2QjtRQUM3QixLQUFLO1FBRUwsSUFBSSxTQUFTLENBQUMsV0FBVyxDQUFDLEdBQUcsRUFBRTtZQUM3QixJQUFJLENBQUMsR0FBRyxHQUFHLFNBQVMsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDO1NBQ3RDO1FBRUQsSUFBSSxTQUFTLENBQUMsV0FBVyxDQUFDLFNBQVMsRUFBRTtZQUNuQyxJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDO1NBQ2xEO1FBRUQsQ0FBQyxtQkFBQSxJQUFJLEVBQU8sQ0FBQyxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7UUFFbEMsdUZBQXVGO1FBQ3ZGLG9HQUFvRztRQUNwRyx5RkFBeUY7UUFDekYsQ0FBQyxtQkFBQSxJQUFJLEVBQU8sQ0FBQyxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsSUFBSTs7OztRQUFFLFVBQUMsT0FBWSxJQUFLLE9BQUEsT0FBTyxFQUFQLENBQU8sRUFBQyxDQUFDO1FBRXRFLElBQUksSUFBSSxDQUFDLGdCQUFnQixFQUFFO1lBQ3pCLFNBQVMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztTQUNwRTtJQUNILENBQUM7O2dCQXBFRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLGtCQUFrQjtvQkFDNUIsUUFBUSxFQUFFLEVBQUU7b0JBQ1osU0FBUyxFQUFFLENBQUMseUJBQXlCLEVBQUUsZ0NBQWdDLENBQUM7aUJBR3pFOzs7bUNBRUUsS0FBSztrQ0FDTCxLQUFLO21DQUNMLEtBQUs7O0lBMkRSLDhCQUFDO0NBQUEsQUFyRUQsQ0FPNkMsYUFBYSxHQThEekQ7U0E5RFksdUJBQXVCOzs7SUFDbEMsbURBQXVEOztJQUN2RCxrREFBaUM7O0lBQ2pDLG1EQUdXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBDb21wb25lbnRVdGlsIH0gZnJvbSAnQGFnLWdyaWQtY29tbXVuaXR5L2FsbC1tb2R1bGVzJztcblxuaW1wb3J0IHtcbiAgQWdHcmlkQW5ndWxhcixcbiAgQW5ndWxhckZyYW1ld29ya092ZXJyaWRlcyxcbiAgQW5ndWxhckZyYW1ld29ya0NvbXBvbmVudFdyYXBwZXIsXG4gIEFnR3JpZENvbHVtbixcbn0gZnJvbSAnQGFnLWdyaWQtY29tbXVuaXR5L2FuZ3VsYXInO1xuaW1wb3J0IHsgR3JpZE9wdGlvbnMgfSBmcm9tICdAYWctZ3JpZC1jb21tdW5pdHkvYWxsLW1vZHVsZXMnO1xuaW1wb3J0IEFkYXB0YWJsZSBmcm9tICdAYWRhcHRhYmxldG9vbHMvYWRhcHRhYmxlL3NyYy9hZ0dyaWQnO1xuaW1wb3J0IHsgQWRhcHRhYmxlQXBpIH0gZnJvbSAnQGFkYXB0YWJsZXRvb2xzL2FkYXB0YWJsZS90eXBlcyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FnLWdyaWQtb3ZlcnJpZGUnLFxuICB0ZW1wbGF0ZTogJycsXG4gIHByb3ZpZGVyczogW0FuZ3VsYXJGcmFtZXdvcmtPdmVycmlkZXMsIEFuZ3VsYXJGcmFtZXdvcmtDb21wb25lbnRXcmFwcGVyXSxcbiAgLy8gdGVsbCBhbmd1bGFyIHdlIGRvbid0IHdhbnQgdmlldyBlbmNhcHN1bGF0aW9uLCB3ZSBkb24ndCB3YW50IGEgc2hhZG93IHJvb3RcbiAgLy8gZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxufSlcbmV4cG9ydCBjbGFzcyBBZ0dyaWRPdmVycmlkZUNvbXBvbmVudCBleHRlbmRzIEFnR3JpZEFuZ3VsYXIge1xuICBASW5wdXQoKSBhZGFwdGFibGVGYWN0b3J5OiAoLi4uYXJnczogYW55KSA9PiBBZGFwdGFibGU7XG4gIEBJbnB1dCgpIGdyaWRDb250YWluZXJJZDogc3RyaW5nO1xuICBASW5wdXQoKSBvbkFkYXB0YWJsZVJlYWR5PzogKGFkYXB0YWJsZVJlYWR5SW5mbzoge1xuICAgIGFkYXB0YWJsZUFwaTogQWRhcHRhYmxlQXBpO1xuICAgIHZlbmRvckdyaWQ6IEdyaWRPcHRpb25zO1xuICB9KSA9PiB2b2lkO1xuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICAodGhpcyBhcyBhbnkpLmNoZWNrRm9yRGVwcmVjYXRlZEV2ZW50cygpO1xuXG4gICAgdGhpcy5ncmlkT3B0aW9ucyA9IENvbXBvbmVudFV0aWwuY29weUF0dHJpYnV0ZXNUb0dyaWRPcHRpb25zKFxuICAgICAgdGhpcy5ncmlkT3B0aW9ucyxcbiAgICAgIHRoaXMsXG4gICAgICB0cnVlXG4gICAgKTtcblxuICAgICh0aGlzIGFzIGFueSkuZ3JpZFBhcmFtcyA9IHtcbiAgICAgIGdsb2JhbEV2ZW50TGlzdGVuZXI6ICh0aGlzIGFzIGFueSkuZ2xvYmFsRXZlbnRMaXN0ZW5lci5iaW5kKHRoaXMpLFxuICAgICAgZnJhbWV3b3JrT3ZlcnJpZGVzOiAodGhpcyBhcyBhbnkpLmFuZ3VsYXJGcmFtZXdvcmtPdmVycmlkZXMsXG4gICAgICBwcm92aWRlZEJlYW5JbnN0YW5jZXM6IHtcbiAgICAgICAgZnJhbWV3b3JrQ29tcG9uZW50V3JhcHBlcjogKHRoaXMgYXMgYW55KS5mcmFtZXdvcmtDb21wb25lbnRXcmFwcGVyLFxuICAgICAgfSxcbiAgICAgIG1vZHVsZXM6ICh0aGlzLm1vZHVsZXMgfHwgW10pIGFzIGFueSxcbiAgICB9O1xuXG4gICAgaWYgKHRoaXMuY29sdW1ucyAmJiB0aGlzLmNvbHVtbnMubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy5ncmlkT3B0aW9ucy5jb2x1bW5EZWZzID0gdGhpcy5jb2x1bW5zLm1hcCgoY29sdW1uOiBBZ0dyaWRDb2x1bW4pID0+IHtcbiAgICAgICAgcmV0dXJuIGNvbHVtbi50b0NvbERlZigpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgY29uc3QgYWRhcHRhYmxlID0gdGhpcy5hZGFwdGFibGVGYWN0b3J5KFxuICAgICAgdGhpcy5ncmlkT3B0aW9ucyxcbiAgICAgICh0aGlzIGFzIGFueSkuZ3JpZFBhcmFtc1xuICAgICk7XG5cbiAgICAvLyBuZXcgR3JpZChcbiAgICAvLyAgICh0aGlzIGFzIGFueSkuX25hdGl2ZUVsZW1lbnQsXG4gICAgLy8gICB0aGlzLmdyaWRPcHRpb25zLFxuICAgIC8vICAgKHRoaXMgYXMgYW55KS5ncmlkUGFyYW1zXG4gICAgLy8gKTtcblxuICAgIGlmIChhZGFwdGFibGUuZ3JpZE9wdGlvbnMuYXBpKSB7XG4gICAgICB0aGlzLmFwaSA9IGFkYXB0YWJsZS5ncmlkT3B0aW9ucy5hcGk7XG4gICAgfVxuXG4gICAgaWYgKGFkYXB0YWJsZS5ncmlkT3B0aW9ucy5jb2x1bW5BcGkpIHtcbiAgICAgIHRoaXMuY29sdW1uQXBpID0gYWRhcHRhYmxlLmdyaWRPcHRpb25zLmNvbHVtbkFwaTtcbiAgICB9XG5cbiAgICAodGhpcyBhcyBhbnkpLl9pbml0aWFsaXNlZCA9IHRydWU7XG5cbiAgICAvLyBzb21ldGltZXMsIGVzcGVjaWFsbHkgaW4gbGFyZ2UgY2xpZW50IGFwcHMgZ3JpZFJlYWR5IGNhbiBmaXJlIGJlZm9yZSBuZ0FmdGVyVmlld0luaXRcbiAgICAvLyB0aGlzIHRpZXMgdGhlc2UgdG9nZXRoZXIgc28gdGhhdCBncmlkUmVhZHkgd2lsbCBhbHdheXMgZmlyZSBhZnRlciBhZ0dyaWRBbmd1bGFyJ3MgbmdBZnRlclZpZXdJbml0XG4gICAgLy8gdGhlIGFjdHVhbCBjb250YWluaW5nIGNvbXBvbmVudCdzIG5nQWZ0ZXJWaWV3SW5pdCB3aWxsIGZpcmUganVzdCBhZnRlciBhZ0dyaWRBbmd1bGFyJ3NcbiAgICAodGhpcyBhcyBhbnkpLl9mdWxseVJlYWR5LnJlc29sdmVOb3cobnVsbCwgKHJlc29sdmU6IGFueSkgPT4gcmVzb2x2ZSk7XG5cbiAgICBpZiAodGhpcy5vbkFkYXB0YWJsZVJlYWR5KSB7XG4gICAgICBhZGFwdGFibGUuYXBpLmV2ZW50QXBpLm9uKCdBZGFwdGFibGVSZWFkeScsIHRoaXMub25BZGFwdGFibGVSZWFkeSk7XG4gICAgfVxuICB9XG59XG4iXX0=