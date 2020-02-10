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
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import Adaptable from '@adaptabletools/adaptable/src/agGrid';
import { Grid } from '@ag-grid-community/all-modules';
import { AllCommunityModules, ModuleRegistry, } from '@ag-grid-community/all-modules';
ModuleRegistry.registerModules(AllCommunityModules);
/**
 * @param {?} __0
 * @return {?}
 */
export function createAdaptable(_a) {
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
                return new Grid(vendorContainer, theGridOptions, gridParams);
            }),
        }, true);
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlQWRhcHRhYmxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFkYXB0YWJsZXRvb2xzL2FkYXB0YWJsZS1hbmd1bGFyLWFnZ3JpZC8iLCJzb3VyY2VzIjpbImxpYi9jcmVhdGVBZGFwdGFibGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBRUEsT0FBTyxTQUFTLE1BQU0sc0NBQXNDLENBQUM7QUFDN0QsT0FBTyxFQUFFLElBQUksRUFBdUIsTUFBTSxnQ0FBZ0MsQ0FBQztBQUUzRSxPQUFPLEVBQ0wsbUJBQW1CLEVBQ25CLGNBQWMsR0FDZixNQUFNLGdDQUFnQyxDQUFDO0FBRXhDLGNBQWMsQ0FBQyxlQUFlLENBQUMsbUJBQW1CLENBQUMsQ0FBQzs7Ozs7QUFFcEQsTUFBTSxVQUFVLGVBQWUsQ0FBQyxFQVUvQjtRQVRDLHNDQUFnQixFQUNoQiw4Q0FBb0IsRUFDcEIsb0NBQWUsRUFDZixvQkFBTztJQU9QOzs7OztJQUFPLFVBQUMsV0FBd0IsRUFBRSxVQUFlO1FBQy9DLE9BQU8sSUFBSSxTQUFTLGNBRWIsZ0JBQWdCLElBQ25CLGdCQUFnQixlQUNYLGdCQUFnQixDQUFDLGdCQUFnQixJQUNwQyxrQkFBa0IsRUFBRSxvQkFBb0IsRUFDeEMsZUFBZSxFQUFFLGVBQWUsS0FFbEMsVUFBVSxFQUFFLFdBQVcsS0FFekIsSUFBSSxFQUNKO1lBQ0UsZUFBZTs7Ozs7WUFBRSxVQUFDLGVBQTRCLEVBQUUsY0FBYztnQkFDNUQsVUFBVSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7Z0JBQzdCLE9BQU8sSUFBSSxJQUFJLENBQUMsZUFBZSxFQUFFLGNBQWMsRUFBRSxVQUFVLENBQUMsQ0FBQztZQUMvRCxDQUFDLENBQUE7U0FDRixFQUNELElBQUksQ0FDTCxDQUFDO0lBQ0osQ0FBQyxFQUFDO0FBQ0osQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFkYXB0YWJsZU9wdGlvbnMgfSBmcm9tICdAYWRhcHRhYmxldG9vbHMvYWRhcHRhYmxlL3R5cGVzJztcblxuaW1wb3J0IEFkYXB0YWJsZSBmcm9tICdAYWRhcHRhYmxldG9vbHMvYWRhcHRhYmxlL3NyYy9hZ0dyaWQnO1xuaW1wb3J0IHsgR3JpZCwgR3JpZE9wdGlvbnMsIE1vZHVsZSB9IGZyb20gJ0BhZy1ncmlkLWNvbW11bml0eS9hbGwtbW9kdWxlcyc7XG5cbmltcG9ydCB7XG4gIEFsbENvbW11bml0eU1vZHVsZXMsXG4gIE1vZHVsZVJlZ2lzdHJ5LFxufSBmcm9tICdAYWctZ3JpZC1jb21tdW5pdHkvYWxsLW1vZHVsZXMnO1xuXG5Nb2R1bGVSZWdpc3RyeS5yZWdpc3Rlck1vZHVsZXMoQWxsQ29tbXVuaXR5TW9kdWxlcyk7XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVBZGFwdGFibGUoe1xuICBhZGFwdGFibGVPcHRpb25zLFxuICBhZGFwdGFibGVDb250YWluZXJJZCxcbiAgZ3JpZENvbnRhaW5lcklkLFxuICBtb2R1bGVzLFxufToge1xuICBhZGFwdGFibGVPcHRpb25zOiBBZGFwdGFibGVPcHRpb25zO1xuICBhZGFwdGFibGVDb250YWluZXJJZDogc3RyaW5nO1xuICBncmlkQ29udGFpbmVySWQ6IHN0cmluZztcbiAgbW9kdWxlcz86IE1vZHVsZVtdO1xufSkge1xuICByZXR1cm4gKGdyaWRPcHRpb25zOiBHcmlkT3B0aW9ucywgZ3JpZFBhcmFtczogYW55KSA9PiB7XG4gICAgcmV0dXJuIG5ldyBBZGFwdGFibGUoXG4gICAgICB7XG4gICAgICAgIC4uLmFkYXB0YWJsZU9wdGlvbnMsXG4gICAgICAgIGNvbnRhaW5lck9wdGlvbnM6IHtcbiAgICAgICAgICAuLi5hZGFwdGFibGVPcHRpb25zLmNvbnRhaW5lck9wdGlvbnMsXG4gICAgICAgICAgYWRhcHRhYmxlQ29udGFpbmVyOiBhZGFwdGFibGVDb250YWluZXJJZCxcbiAgICAgICAgICB2ZW5kb3JDb250YWluZXI6IGdyaWRDb250YWluZXJJZCxcbiAgICAgICAgfSxcbiAgICAgICAgdmVuZG9yR3JpZDogZ3JpZE9wdGlvbnMsXG4gICAgICB9LFxuICAgICAgdHJ1ZSxcbiAgICAgIHtcbiAgICAgICAgaW5zdGFudGlhdGVHcmlkOiAodmVuZG9yQ29udGFpbmVyOiBIVE1MRWxlbWVudCwgdGhlR3JpZE9wdGlvbnMpID0+IHtcbiAgICAgICAgICBncmlkUGFyYW1zLm1vZHVsZXMgPSBtb2R1bGVzO1xuICAgICAgICAgIHJldHVybiBuZXcgR3JpZCh2ZW5kb3JDb250YWluZXIsIHRoZUdyaWRPcHRpb25zLCBncmlkUGFyYW1zKTtcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICB0cnVlXG4gICAgKTtcbiAgfTtcbn1cbiJdfQ==