"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ApiBase_1 = require("./ApiBase");
var StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
var ScreenPopups = require("../../Utilities/Constants/ScreenPopups");
var ToolPanelApiImpl = /** @class */ (function (_super) {
    tslib_1.__extends(ToolPanelApiImpl, _super);
    function ToolPanelApiImpl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ToolPanelApiImpl.prototype.GetToolPanelState = function () {
        return this.getAdaptableState().ToolPanel;
    };
    /*
    public SetAvailableToolbars(availableToolbars: AdaptableToolPanels): void {
    //  this.dispatchAction(ToolPanelRedux.ToolPanelSetAvailableToolbars(availableToolbars));
    }
  
    public SetVisibleToolbars(visibleToolbars: AdaptableToolPanels): void {
    //  visibleToolbars.forEach((vt: AdaptableToolPanelToolbar) => {
    //    this.ShowToolbar(vt);
    //  });
    }
  
    public ShowToolbar(visibleToolbar: AdaptableToolPanel): void {
    //  this.dispatchAction(ToolPanelRedux.ToolPanelShowToolbar(visibleToolbar));
    }
  
    public HideToolbar(visibleToolbar: AdaptableToolPanel): void {
    //  this.dispatchAction(ToolPanelRedux.ToolPanelHideToolbar(visibleToolbar));
    }
  
    public SetVisibleButtons(functionButtons: AdaptableFunctionButtons): void {
     // this.dispatchAction(ToolPanelRedux.ToolPanelSetFunctionButtons(functionButtons));
    }
  
    public SetVisibility(ToolPanelVisibility: 'Minimised' | 'Visible' | 'Hidden'): void {
    //  this.dispatchAction(ToolPanelRedux.ToolPanelSetVisibility(ToolPanelVisibility as Visibility));
    }
  
    public Show(): void {
   //   this.SetVisibility(Visibility.Visible);
    }
  
    public Hide(): void {
    //  this.SetVisibility(Visibility.Hidden);
    }
  
  
    public ShowFunctionsDropdown(): void {
      // this.dispatchAction(ToolPanelRedux.ToolPanelShowFunctionsDropdown());
    }
  
    public HideFunctionsDropdown(): void {
      // this.dispatchAction(ToolPanelRedux.ToolPanelHideFunctionsDropdown());
    }
  
    public ShowToolbarsDropdown(): void {
      //  this.dispatchAction(ToolPanelRedux.ToolPanelShowToolbarsDropdown());
    }
  
    public HideToolbarsDropdown(): void {
      //  this.dispatchAction(ToolPanelRedux.ToolPanelHideToolbarsDropdown());
    }
  */
    //  public getToolPanelTitle(): string | undefined {
    //    return this.GetToolPanelState().ToolPanelTitle;
    //  }
    ToolPanelApiImpl.prototype.showToolPanelPopup = function () {
        this.adaptable.api.internalApi.showPopupScreen(StrategyConstants.ToolPanelStrategyId, ScreenPopups.ToolPanelPopup);
    };
    return ToolPanelApiImpl;
}(ApiBase_1.ApiBase));
exports.ToolPanelApiImpl = ToolPanelApiImpl;
