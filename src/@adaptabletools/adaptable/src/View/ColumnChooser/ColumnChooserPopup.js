"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var react_redux_1 = require("react-redux");
var SystemRedux = require("../../Redux/ActionsReducers/SystemRedux");
var PanelWithImage_1 = require("../Components/Panels/PanelWithImage");
var StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
var DualListBoxEditor_1 = require("../Components/ListBox/DualListBoxEditor");
var ColumnHelper_1 = require("../../Utilities/Helpers/ColumnHelper");
var ArrayExtensions_1 = require("../../Utilities/Extensions/ArrayExtensions");
var rebass_1 = require("rebass");
var ColumnChooserPopupComponent = /** @class */ (function (_super) {
    tslib_1.__extends(ColumnChooserPopupComponent, _super);
    function ColumnChooserPopupComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ColumnChooserPopupComponent.prototype.render = function () {
        var _this = this;
        var availableValues;
        var selectedValues;
        var masterChildren;
        if (ArrayExtensions_1.ArrayExtensions.IsNotEmpty(this.props.ColumnCategories)) {
            masterChildren = this.props.ColumnCategories.map(function (cc) {
                return {
                    Master: cc.ColumnCategoryId,
                    Children: cc.ColumnIds.map(function (ci) {
                        return ColumnHelper_1.ColumnHelper.getFriendlyNameFromColumnId(ci, _this.props.Columns);
                    }),
                };
            });
        }
        availableValues = this.props.Columns.map(function (x) {
            return ColumnHelper_1.ColumnHelper.getFriendlyNameFromColumn(x.ColumnId, x);
        });
        selectedValues = this.props.Columns.filter(function (x) { return x.Visible; }).map(function (x) {
            return ColumnHelper_1.ColumnHelper.getFriendlyNameFromColumn(x.ColumnId, x);
        });
        var infoBody = [
            "Move items between the 'Hidden Columns' and 'Visible Columns' listboxes to hide / show them.",
            React.createElement("br", null),
            React.createElement("br", null),
            "Use the buttons on the right of the 'Visible Columns' listbox to order them as required.",
            React.createElement("br", null),
            React.createElement("br", null),
            'All changes made while using the Column Chooser are implemented in Adaptable immediately.',
        ];
        return (React.createElement(PanelWithImage_1.PanelWithImage, { variant: "primary", header: StrategyConstants.ColumnChooserStrategyFriendlyName, glyphicon: StrategyConstants.ColumnChooserGlyph, infoBody: infoBody, bodyProps: {
                style: { display: 'flex' },
            } },
            React.createElement(rebass_1.Flex, { padding: 2, style: { width: '100%' } },
                React.createElement(DualListBoxEditor_1.DualListBoxEditor, { AvailableValues: availableValues, SelectedValues: selectedValues, HeaderAvailable: "Hidden Columns", HeaderSelected: "Visible Columns", MasterChildren: masterChildren, onChange: function (SelectedValues) { return _this.ColumnListChange(SelectedValues); } }))));
    };
    ColumnChooserPopupComponent.prototype.ColumnListChange = function (columnList) {
        var cols = ColumnHelper_1.ColumnHelper.getColumnsFromFriendlyNames(columnList, this.props.Columns);
        this.props.onNewColumnListOrder(cols);
    };
    return ColumnChooserPopupComponent;
}(React.Component));
function mapStateToProps(state, ownProps) {
    return {
        ColumnCategories: state.ColumnCategory.ColumnCategories,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        onNewColumnListOrder: function (VisibleColumnList) {
            return dispatch(SystemRedux.SetNewColumnListOrder(VisibleColumnList));
        },
    };
}
exports.ColumnChooserPopup = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(ColumnChooserPopupComponent);
