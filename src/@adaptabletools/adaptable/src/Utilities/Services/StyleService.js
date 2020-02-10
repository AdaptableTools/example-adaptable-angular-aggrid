"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var StyleConstants = require("../../Utilities/Constants/StyleConstants");
var StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
var EnumExtensions_1 = require("../Extensions/EnumExtensions");
var StringExtensions_1 = require("../Extensions/StringExtensions");
var QuickSearchRedux = require("../../Redux/ActionsReducers/QuickSearchRedux");
var FormatColumnRedux = require("../../Redux/ActionsReducers/FormatColumnRedux");
var ConditionalStyleRedux = require("../../Redux/ActionsReducers/ConditionalStyleRedux");
var AlertRedux = require("../../Redux/ActionsReducers/AlertRedux");
var FlashingCellsRedux = require("../../Redux/ActionsReducers/FlashingCellsRedux");
var UpdatedRowRedux = require("../../Redux/ActionsReducers/UpdatedRowRedux");
var StyleService = /** @class */ (function () {
    function StyleService(adaptable) {
        var _this = this;
        this.adaptable = adaptable;
        this.adaptable = adaptable;
        // Create the <style> tag
        this.style = document.createElement('style');
        this.style.id = adaptable.adaptableOptions.containerOptions.adaptableContainer + "_" + adaptable.adaptableOptions.adaptableId + "-style";
        // WebKit hack :(
        this.style.appendChild(document.createTextNode(''));
        // Add the <style> element to the page
        document.head.appendChild(this.style);
        this.setUpStoreListeners();
        this.adaptable.api.eventApi.on('AdaptableReady', function () {
            _this.setUpFirstUsage();
        });
    }
    StyleService.prototype.CreateStyleName = function (functionName) {
        return (StyleConstants.AB_HEADER +
            functionName +
            '-' +
            this.adaptable.adaptableOptions.adaptableId
                .trim()
                .replace(/\s/g, '')
                .replace('.', ''));
    };
    StyleService.prototype.CreateUniqueStyleName = function (functionName, adaptableObject) {
        return (StyleConstants.AB_HEADER +
            functionName +
            '-' +
            this.adaptable.adaptableOptions.adaptableId
                .trim()
                .replace(/\s/g, '')
                .replace('.', '') +
            '-' +
            adaptableObject.Uuid);
    };
    StyleService.prototype.setUpFirstUsage = function () {
        // need to check that its all initiliased - perhps onready is better?
        this.setUpFormatColumn();
        this.setUpFlashingCells();
        this.setUpUpdatedRow();
        this.setUpAlerts();
        this.setUpConditionalStyle();
        this.createAdaptableFunctionStyles();
    };
    StyleService.prototype.setUpFormatColumn = function () {
        var formatColumnStrategy = this.adaptable.strategies.get(StrategyConstants.FormatColumnStrategyId);
        formatColumnStrategy.initStyles();
    };
    StyleService.prototype.setUpFlashingCells = function () {
        var flashingCellsStrategy = this.adaptable.strategies.get(StrategyConstants.FlashingCellsStrategyId);
        flashingCellsStrategy.initStyles();
    };
    StyleService.prototype.setUpUpdatedRow = function () {
        var updatedRowStrategy = this.adaptable.strategies.get(StrategyConstants.UpdatedRowStrategyId);
        updatedRowStrategy.initStyles();
    };
    StyleService.prototype.setUpAlerts = function () {
        var alertStrategy = this.adaptable.strategies.get(StrategyConstants.AlertStrategyId);
        alertStrategy.initStyles();
    };
    StyleService.prototype.setUpConditionalStyle = function () {
        var conditionalStyleStrategy = this.adaptable.strategies.get(StrategyConstants.ConditionalStyleStrategyId);
        conditionalStyleStrategy.initStyles();
    };
    /**
     * this method is still not great but its better than the old version at least as it uses the new ever On... from the Store which is better
     * this class is still not perfect as we still delete and recreate all styles every time we create a conditional style, format column or flashing cell
     * but actually that is not the end of the world as it doenst happen so often and at least we are not doing it when quick search is applied.
     */
    StyleService.prototype.createAdaptableFunctionStyles = function () {
        var _this = this;
        this.clearCSSRules();
        // Format Column
        this.adaptable.api.formatColumnApi.getAllFormatColumn().forEach(function (formatColumn) {
            var styleName = _this.CreateUniqueStyleName(StrategyConstants.FormatColumnStrategyId, formatColumn);
            _this.addCSSRule("." + styleName, "background-color: " + formatColumn.Style.BackColor + " !important;color: " + formatColumn.Style.ForeColor + " !important;font-weight: " + formatColumn.Style.FontWeight + " !important;font-style: " + formatColumn.Style.FontStyle + " !important;" + (formatColumn.Style.FontSize
                ? "font-size: " + EnumExtensions_1.EnumExtensions.getCssFontSizeFromFontSizeEnum(formatColumn.Style.FontSize) + " !important"
                : ''));
        });
        // we define first the row conditions and then columns so priority of CS col > CS Row and allow a record to have both
        var conditionalStyles = this.adaptable.api.conditionalStyleApi.getAllConditionalStyle();
        conditionalStyles
            .filter(function (x) { return x.ConditionalStyleScope == 'Row'; })
            .forEach(function (element) {
            var styleName = _this.CreateUniqueStyleName(StrategyConstants.ConditionalStyleStrategyId, element);
            _this.addCSSRule("." + styleName, "background-color: " + element.Style.BackColor + " !important;color: " + element.Style.ForeColor + " !important;font-weight: " + element.Style.FontWeight + " !important;font-style: " + element.Style.FontStyle + " !important;" + (element.Style.FontSize
                ? "font-size: " + EnumExtensions_1.EnumExtensions.getCssFontSizeFromFontSizeEnum(element.Style.FontSize) + " !important"
                : ''));
        });
        conditionalStyles
            .filter(function (x) { return x.ConditionalStyleScope == 'ColumnCategory'; })
            .forEach(function (element) {
            var styleName = _this.CreateUniqueStyleName(StrategyConstants.ConditionalStyleStrategyId, element);
            _this.addCSSRule("." + styleName, "background-color: " + element.Style.BackColor + " !important;color: " + element.Style.ForeColor + " !important;font-weight: " + element.Style.FontWeight + " !important;font-style: " + element.Style.FontStyle + " !important;" + (element.Style.FontSize
                ? "font-size: " + EnumExtensions_1.EnumExtensions.getCssFontSizeFromFontSizeEnum(element.Style.FontSize) + " !important"
                : ''));
        });
        conditionalStyles
            .filter(function (cs) { return cs.ConditionalStyleScope == 'Column'; })
            .forEach(function (element) {
            var styleName = _this.CreateUniqueStyleName(StrategyConstants.ConditionalStyleStrategyId, element);
            _this.addCSSRule("." + styleName, "background-color: " + element.Style.BackColor + " !important;color: " + element.Style.ForeColor + " !important;font-weight: " + element.Style.FontWeight + " !important;font-style: " + element.Style.FontStyle + " !important;" + (element.Style.FontSize
                ? "font-size: " + EnumExtensions_1.EnumExtensions.getCssFontSizeFromFontSizeEnum(element.Style.FontSize) + " !important"
                : ''));
        });
        /*
        conditionalStyles
          .filter(cs => cs.ConditionalStyleScope == 'DataType')
          .forEach(element => {
            const styleName = this.CreateUniqueStyleName(
              StrategyConstants.ConditionalStyleStrategyId,
              element
            );
            this.addCSSRule(
              `.${styleName}`,
              `background-color: ${element.Style.BackColor} !important;color: ${
                element.Style.ForeColor
              } !important;font-weight: ${element.Style.FontWeight} !important;font-style: ${
                element.Style.FontStyle
              } !important;${
                element.Style.FontSize
                  ? `font-size: ${EnumExtensions.getCssFontSizeFromFontSizeEnum(
                      element.Style.FontSize
                    )} !important`
                  : ''
              }`
            );
          });
          */
        // next we do Updated Rows - still not quite sure how this will work...
        var updatedRowState = this.adaptable.api.updatedRowApi.getUpdatedRowState();
        if (updatedRowState.EnableUpdatedRow) {
            this.addCSSRule("." + StyleConstants.UPDATED_ROW_UP_STYLE, "background-color: " + updatedRowState.UpColor + " !important");
            this.addCSSRule("." + StyleConstants.UPDATED_ROW_DOWN_STYLE, "background-color: " + updatedRowState.DownColor + " !important");
            this.addCSSRule("." + StyleConstants.UPDATED_ROW_NEUTRAL_STYLE, "background-color: " + updatedRowState.NeutralColor + " !important");
        }
        // quick search
        var quickSearchStyle = this.adaptable.api.quickSearchApi.getQuickSearchStyle();
        if (StringExtensions_1.StringExtensions.IsNullOrEmpty(quickSearchStyle.ClassName)) {
            var styleName = this.CreateStyleName(StrategyConstants.QuickSearchStrategyId);
            this.addCSSRule("." + styleName, "background-color: " + quickSearchStyle.BackColor + " !important;color: " + quickSearchStyle.ForeColor + " !important;font-weight: " + quickSearchStyle.FontWeight + " !important;font-style: " + quickSearchStyle.FontStyle + " !important;" + (quickSearchStyle.FontSize
                ? "font-size: " + EnumExtensions_1.EnumExtensions.getCssFontSizeFromFontSizeEnum(quickSearchStyle.FontSize) + " !important"
                : ''));
        }
        // alert
        // nothing to do as it uses existing styles
        // we define last Flash since it has the highest priority
        this.adaptable.api.flashingCellApi.getAllFlashingCell().forEach(function (element) {
            if (element.IsLive) {
                _this.addCSSRule("." + StyleConstants.FLASH_CELL_UP_STYLE + "-" + element.Uuid, "background-color: " + element.UpColor + " !important");
                _this.addCSSRule("." + StyleConstants.FLASH_CELL_DOWN_STYLE + "-" + element.Uuid, "background-color: " + element.DownColor + " !important");
            }
        });
    };
    StyleService.prototype.clearCSSRules = function () {
        this.style.innerHTML = '';
    };
    StyleService.prototype.addCSSRule = function (selector, rules) {
        this.style.innerHTML += selector + "{" + rules + "}" + '\n';
    };
    // not sure if this is better than us keeping a copy of the state and listening to it which is what we used to do.
    // I suspsect it is so we dont have lots of bits of state being stored and compared
    StyleService.prototype.setUpStoreListeners = function () {
        var _this = this;
        //  Quick Search - no need to set up styles for Quick Search as done in AB not the Strategy = need to test!!!
        this.adaptable.AdaptableStore.on(QuickSearchRedux.QUICK_SEARCH_SET_DISPLAY, function () {
            _this.createAdaptableFunctionStyles();
        });
        this.adaptable.AdaptableStore.on(QuickSearchRedux.QUICK_SEARCH_SET_STYLE, function () {
            _this.createAdaptableFunctionStyles();
        });
        // Format Column
        this.adaptable.AdaptableStore.on(FormatColumnRedux.FORMAT_COLUMN_ADD, function () {
            _this.setUpFormatColumn();
            _this.createAdaptableFunctionStyles();
        });
        this.adaptable.AdaptableStore.on(FormatColumnRedux.FORMAT_COLUMN_EDIT, function () {
            _this.setUpFormatColumn();
            _this.createAdaptableFunctionStyles();
        });
        this.adaptable.AdaptableStore.on(FormatColumnRedux.FORMAT_COLUMN_DELETE, function () {
            _this.setUpFormatColumn();
            _this.createAdaptableFunctionStyles();
        });
        // Conditional Style
        this.adaptable.AdaptableStore.on(ConditionalStyleRedux.CONDITIONAL_STYLE_ADD, function () {
            _this.setUpConditionalStyle();
            _this.createAdaptableFunctionStyles();
        });
        this.adaptable.AdaptableStore.on(ConditionalStyleRedux.CONDITIONAL_STYLE_EDIT, function () {
            _this.setUpConditionalStyle();
            _this.createAdaptableFunctionStyles();
        });
        this.adaptable.AdaptableStore.on(ConditionalStyleRedux.CONDITIONAL_STYLE_DELETE, function () {
            _this.setUpConditionalStyle();
            _this.createAdaptableFunctionStyles();
        });
        // Alert Definition (note we dont need to create styles)
        this.adaptable.AdaptableStore.on(AlertRedux.ALERT_DEFIINITION_ADD, function () {
            _this.setUpAlerts();
            // this.createAdaptableFunctionStyles();
        });
        this.adaptable.AdaptableStore.on(AlertRedux.ALERT_DEFIINITION_EDIT, function () {
            _this.setUpAlerts();
            // this.createAdaptableFunctionStyles();
        });
        this.adaptable.AdaptableStore.on(AlertRedux.ALERT_DEFIINITION_DELETE, function () {
            _this.setUpAlerts();
            //  this.createAdaptableFunctionStyles();
        });
        // Updated Row
        this.adaptable.AdaptableStore.on(UpdatedRowRedux.UPDATED_ROW_ENABLE_DISABLE, function () {
            _this.setUpUpdatedRow();
            _this.createAdaptableFunctionStyles();
        });
        this.adaptable.AdaptableStore.on(UpdatedRowRedux.UP_COLOR_SET, function () {
            _this.setUpUpdatedRow();
            _this.createAdaptableFunctionStyles();
        });
        this.adaptable.AdaptableStore.on(UpdatedRowRedux.DOWN_COLOR_SET, function () {
            _this.setUpUpdatedRow();
            _this.createAdaptableFunctionStyles();
        });
        this.adaptable.AdaptableStore.on(UpdatedRowRedux.NEUTRAL_COLOR_SET, function () {
            _this.setUpUpdatedRow();
            _this.createAdaptableFunctionStyles();
        });
        // Flashing Cell
        this.adaptable.AdaptableStore.on(FlashingCellsRedux.FLASHING_CELL_SELECT, function () {
            _this.setUpFlashingCells();
            _this.createAdaptableFunctionStyles();
        });
        this.adaptable.AdaptableStore.on(FlashingCellsRedux.FLASHING_CELL_SELECT_ALL, function () {
            _this.setUpFlashingCells();
            _this.createAdaptableFunctionStyles();
        });
        this.adaptable.AdaptableStore.on(FlashingCellsRedux.FLASHING_CELL_CHANGE_UP_COLOR, function () {
            _this.setUpFlashingCells();
            _this.createAdaptableFunctionStyles();
        });
        this.adaptable.AdaptableStore.on(FlashingCellsRedux.FLASHING_CELL_CHANGE_DOWN_COLOR, function () {
            _this.setUpFlashingCells();
            _this.createAdaptableFunctionStyles();
        });
        this.adaptable.AdaptableStore.on(FlashingCellsRedux.FLASHING_CELL_CHANGE_DURATION, function () {
            _this.setUpFlashingCells();
            _this.createAdaptableFunctionStyles();
        });
    };
    return StyleService;
}());
exports.StyleService = StyleService;
