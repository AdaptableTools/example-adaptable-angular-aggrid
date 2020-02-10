"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AdaptableHelper_1 = require("../Utilities/Helpers/AdaptableHelper");
var ActionColumnRenderer = /** @class */ (function () {
    function ActionColumnRenderer() {
    }
    // gets called once before the renderer is used
    ActionColumnRenderer.prototype.init = function (params) {
        var adaptable = params.api.__adaptable;
        var actionCol = adaptable.api.actionColumnApi
            .getAllActionColumn()
            .find(function (ac) { return ac.ColumnId == params.colDef.colId; });
        if (actionCol) {
            // create the cell
            this.eGui = document.createElement('div');
            this.eGui.style.display = 'inline-block';
            var actionColumnRenderParams = {
                column: actionCol,
                rowData: params.data,
                rowNode: params.node,
            };
            // if there is a shouldRender function then run it and if returns false then do nothing
            var shouldRenderPredicate = actionCol.ShouldRenderPredicate;
            if (shouldRenderPredicate) {
                if (!shouldRenderPredicate(actionColumnRenderParams)) {
                    this.eGui.innerHTML = '';
                    return;
                }
            }
            // If we have a render Func then we use that, otherwise we use the name of the Button Text
            var renderFunc = actionCol.RenderFunction;
            if (renderFunc) {
                this.eGui.innerHTML = renderFunc(actionColumnRenderParams);
            }
            else {
                this.eGui.innerHTML =
                    '<span class="my-css-class"><button class="btn-simple">' +
                        actionCol.ButtonText +
                        '</button></span>';
            }
            // add event listener to button
            this.eventListener = function () {
                var actionColumnClickedInfo = {
                    actionColumn: actionCol,
                    primaryKeyValue: adaptable.getPrimaryKeyValueFromRowNode(params.node),
                    rowData: params.data,
                };
                var actionColumnClickedEventArgs = AdaptableHelper_1.default.createFDC3Message('Action Column Clicked Args', actionColumnClickedInfo);
                adaptable.api.eventApi.emit('ActionColumnClicked', actionColumnClickedEventArgs);
            };
            this.eGui.addEventListener('click', this.eventListener);
        }
    };
    // gets called once when grid ready to insert the element
    ActionColumnRenderer.prototype.getGui = function () {
        return this.eGui;
    };
    // gets called whenever the user gets the cell to refresh
    ActionColumnRenderer.prototype.refresh = function (params) {
        // return true to tell the grid we refreshed successfully
        return true;
    };
    // gets called when the cell is removed from the grid
    ActionColumnRenderer.prototype.destroy = function () {
        // do cleanup, remove event listener from button
        if (this.eGui) {
            this.eGui.removeEventListener('click', this.eventListener);
        }
    };
    return ActionColumnRenderer;
}());
exports.ActionColumnRenderer = ActionColumnRenderer;
