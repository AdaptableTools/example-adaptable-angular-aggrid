/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { createAdaptable as adaptableFactory } from './createAdaptable';
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
        this.adaptableFactory = adaptableFactory({
            adaptableOptions: this.adaptableOptions,
            adaptableContainerId: this.adaptableContainerId,
            gridContainerId: this.gridContainerId,
            modules: this.modules,
        });
    };
    AdaptableAngularAgGridComponent.decorators = [
        { type: Component, args: [{
                    entryComponents: [],
                    selector: 'adaptable-angular-aggrid',
                    template: "\n    <div [id]=\"adaptableContainerId\" [class]=\"wrapperClassName\"></div>\n    <div class=\"ab__ng-wrapper-aggrid\">\n      <div\n        [id]=\"gridContainerId\"\n        style=\"position: relative; flex: 1\"\n        [class]=\"agGridContainerClassName\"\n      >\n        <ag-grid-override\n          [gridContainerId]=\"gridContainerId\"\n          [adaptableFactory]=\"adaptableFactory\"\n          [gridOptions]=\"gridOptions\"\n          [onAdaptableReady]=\"onAdaptableReady\"\n        ></ag-grid-override>\n      </div>\n    </div>\n  ",
                    styles: ["\n      .ab__ng-wrapper-aggrid {\n        flex: 1;\n        display: flex;\n        flex-flow: column;\n      }\n      :host {\n        display: flex;\n        flex-flow: var(--ab_flex-direction, column);\n        min-height: var(--ab_min-height, 100px);\n      }\n    "]
                }] }
    ];
    /** @nocollapse */
    AdaptableAngularAgGridComponent.ctorParameters = function () { return []; };
    AdaptableAngularAgGridComponent.propDecorators = {
        adaptableOptions: [{ type: Input }],
        gridOptions: [{ type: Input }],
        modules: [{ type: Input }],
        agGridContainerClassName: [{ type: Input }],
        onAdaptableReady: [{ type: Input }]
    };
    return AdaptableAngularAgGridComponent;
}());
export { AdaptableAngularAgGridComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRhcHRhYmxlLWFuZ3VsYXItYWdncmlkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhZGFwdGFibGV0b29scy9hZGFwdGFibGUtYW5ndWxhci1hZ2dyaWQvIiwic291cmNlcyI6WyJsaWIvYWRhcHRhYmxlLWFuZ3VsYXItYWdncmlkLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFRekQsT0FBTyxFQUFFLGVBQWUsSUFBSSxnQkFBZ0IsRUFBRSxNQUFNLG1CQUFtQixDQUFDOzs7OztBQUV4RSxTQUFTLFlBQVksQ0FBQyxHQUFXO0lBQy9CLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQ3JELENBQUM7QUFFRDtJQW9ERTtRQUpPLHFCQUFnQixHQUFHLGdCQUFnQixDQUFDOztZQUtuQyxNQUFNLEdBQU0sWUFBWSxDQUFDLElBQUksQ0FBQyxTQUFJLElBQUksQ0FBQyxHQUFHLEVBQUk7UUFFcEQsSUFBSSxDQUFDLG9CQUFvQixHQUFHLGVBQWEsTUFBUSxDQUFDO1FBQ2xELElBQUksQ0FBQyxlQUFlLEdBQUcsVUFBUSxNQUFRLENBQUM7SUFDMUMsQ0FBQzs7OztJQUVELGtEQUFROzs7SUFBUjtRQUNFLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxnQkFBZ0IsQ0FBQztZQUN2QyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsZ0JBQWdCO1lBQ3ZDLG9CQUFvQixFQUFFLElBQUksQ0FBQyxvQkFBb0I7WUFDL0MsZUFBZSxFQUFFLElBQUksQ0FBQyxlQUFlO1lBQ3JDLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTztTQUN0QixDQUFDLENBQUM7SUFDTCxDQUFDOztnQkFsRUYsU0FBUyxTQUFDO29CQUNULGVBQWUsRUFBRSxFQUFFO29CQUNuQixRQUFRLEVBQUUsMEJBQTBCO29CQUNwQyxRQUFRLEVBQUUsb2lCQWdCVDs2QkFFQywrUUFXQztpQkFFSjs7Ozs7bUNBRUUsS0FBSzs4QkFDTCxLQUFLOzBCQUNMLEtBQUs7MkNBQ0wsS0FBSzttQ0FDTCxLQUFLOztJQTJCUixzQ0FBQztDQUFBLEFBbkVELElBbUVDO1NBaENZLCtCQUErQjs7O0lBQzFDLDJEQUE0Qzs7SUFDNUMsc0RBQWtDOztJQUNsQyxrREFBNEI7O0lBQzVCLG1FQUEwQzs7SUFDMUMsMkRBR1c7O0lBRVgsK0RBQW9DOztJQUNwQywwREFBK0I7O0lBRS9CLDJEQUEyQzs7SUFFM0MsMkRBQTZCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7XG4gIEFkYXB0YWJsZU9wdGlvbnMsXG4gIEFkYXB0YWJsZUFwaSxcbn0gZnJvbSAnQGFkYXB0YWJsZXRvb2xzL2FkYXB0YWJsZS90eXBlcyc7XG5cbmltcG9ydCB7IEdyaWRPcHRpb25zLCBNb2R1bGUgfSBmcm9tICdAYWctZ3JpZC1jb21tdW5pdHkvYWxsLW1vZHVsZXMnO1xuaW1wb3J0IHsgY3JlYXRlQWRhcHRhYmxlIGFzIGFkYXB0YWJsZUZhY3RvcnkgfSBmcm9tICcuL2NyZWF0ZUFkYXB0YWJsZSc7XG5cbmZ1bmN0aW9uIGdldFJhbmRvbUludChtYXg6IG51bWJlcik6IG51bWJlciB7XG4gIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBNYXRoLmZsb29yKG1heCkpO1xufVxuXG5AQ29tcG9uZW50KHtcbiAgZW50cnlDb21wb25lbnRzOiBbXSxcbiAgc2VsZWN0b3I6ICdhZGFwdGFibGUtYW5ndWxhci1hZ2dyaWQnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgW2lkXT1cImFkYXB0YWJsZUNvbnRhaW5lcklkXCIgW2NsYXNzXT1cIndyYXBwZXJDbGFzc05hbWVcIj48L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwiYWJfX25nLXdyYXBwZXItYWdncmlkXCI+XG4gICAgICA8ZGl2XG4gICAgICAgIFtpZF09XCJncmlkQ29udGFpbmVySWRcIlxuICAgICAgICBzdHlsZT1cInBvc2l0aW9uOiByZWxhdGl2ZTsgZmxleDogMVwiXG4gICAgICAgIFtjbGFzc109XCJhZ0dyaWRDb250YWluZXJDbGFzc05hbWVcIlxuICAgICAgPlxuICAgICAgICA8YWctZ3JpZC1vdmVycmlkZVxuICAgICAgICAgIFtncmlkQ29udGFpbmVySWRdPVwiZ3JpZENvbnRhaW5lcklkXCJcbiAgICAgICAgICBbYWRhcHRhYmxlRmFjdG9yeV09XCJhZGFwdGFibGVGYWN0b3J5XCJcbiAgICAgICAgICBbZ3JpZE9wdGlvbnNdPVwiZ3JpZE9wdGlvbnNcIlxuICAgICAgICAgIFtvbkFkYXB0YWJsZVJlYWR5XT1cIm9uQWRhcHRhYmxlUmVhZHlcIlxuICAgICAgICA+PC9hZy1ncmlkLW92ZXJyaWRlPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIGAsXG4gIHN0eWxlczogW1xuICAgIGBcbiAgICAgIC5hYl9fbmctd3JhcHBlci1hZ2dyaWQge1xuICAgICAgICBmbGV4OiAxO1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBmbGV4LWZsb3c6IGNvbHVtbjtcbiAgICAgIH1cbiAgICAgIDpob3N0IHtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgZmxleC1mbG93OiB2YXIoLS1hYl9mbGV4LWRpcmVjdGlvbiwgY29sdW1uKTtcbiAgICAgICAgbWluLWhlaWdodDogdmFyKC0tYWJfbWluLWhlaWdodCwgMTAwcHgpO1xuICAgICAgfVxuICAgIGAsXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIEFkYXB0YWJsZUFuZ3VsYXJBZ0dyaWRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASW5wdXQoKSBhZGFwdGFibGVPcHRpb25zOiBBZGFwdGFibGVPcHRpb25zO1xuICBASW5wdXQoKSBncmlkT3B0aW9uczogR3JpZE9wdGlvbnM7XG4gIEBJbnB1dCgpIG1vZHVsZXM/OiBNb2R1bGVbXTtcbiAgQElucHV0KCkgYWdHcmlkQ29udGFpbmVyQ2xhc3NOYW1lOiBzdHJpbmc7XG4gIEBJbnB1dCgpIG9uQWRhcHRhYmxlUmVhZHk/OiAoYWRhcHRhYmxlUmVhZHlJbmZvOiB7XG4gICAgYWRhcHRhYmxlQXBpOiBBZGFwdGFibGVBcGk7XG4gICAgdmVuZG9yR3JpZDogR3JpZE9wdGlvbnM7XG4gIH0pID0+IHZvaWQ7XG5cbiAgcHVibGljIGFkYXB0YWJsZUNvbnRhaW5lcklkOiBzdHJpbmc7XG4gIHB1YmxpYyBncmlkQ29udGFpbmVySWQ6IHN0cmluZztcblxuICBwdWJsaWMgd3JhcHBlckNsYXNzTmFtZSA9ICdhYl9fbmctd3JhcHBlcic7XG5cbiAgcHVibGljIGFkYXB0YWJsZUZhY3Rvcnk6IGFueTtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBjb25zdCBzZWVkSWQgPSBgJHtnZXRSYW5kb21JbnQoMTAwMCl9LSR7RGF0ZS5ub3coKX1gO1xuXG4gICAgdGhpcy5hZGFwdGFibGVDb250YWluZXJJZCA9IGBhZGFwdGFibGUtJHtzZWVkSWR9YDtcbiAgICB0aGlzLmdyaWRDb250YWluZXJJZCA9IGBncmlkLSR7c2VlZElkfWA7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmFkYXB0YWJsZUZhY3RvcnkgPSBhZGFwdGFibGVGYWN0b3J5KHtcbiAgICAgIGFkYXB0YWJsZU9wdGlvbnM6IHRoaXMuYWRhcHRhYmxlT3B0aW9ucyxcbiAgICAgIGFkYXB0YWJsZUNvbnRhaW5lcklkOiB0aGlzLmFkYXB0YWJsZUNvbnRhaW5lcklkLFxuICAgICAgZ3JpZENvbnRhaW5lcklkOiB0aGlzLmdyaWRDb250YWluZXJJZCxcbiAgICAgIG1vZHVsZXM6IHRoaXMubW9kdWxlcyxcbiAgICB9KTtcbiAgfVxufVxuIl19