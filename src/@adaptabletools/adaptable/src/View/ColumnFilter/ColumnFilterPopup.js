"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var react_redux_1 = require("react-redux");
var ColumnFilterRedux = require("../../Redux/ActionsReducers/ColumnFilterRedux");
var UserFilterRedux = require("../../Redux/ActionsReducers/UserFilterRedux");
var TeamSharingRedux = require("../../Redux/ActionsReducers/TeamSharingRedux");
var PopupRedux = require("../../Redux/ActionsReducers/PopupRedux");
var StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
var ColumnFilterEntityRow_1 = require("./ColumnFilterEntityRow");
var AdaptableObjectCollection_1 = require("../Components/AdaptableObjectCollection");
var PanelWithImage_1 = require("../Components/Panels/PanelWithImage");
var EmptyContent_1 = require("../../components/EmptyContent");
var ArrayExtensions_1 = require("../../Utilities/Extensions/ArrayExtensions");
var ColumnFilterPopupComponent = /** @class */ (function (_super) {
    tslib_1.__extends(ColumnFilterPopupComponent, _super);
    function ColumnFilterPopupComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.state = { EditedUserFilter: null, WizardStartIndex: 0 };
        return _this;
    }
    ColumnFilterPopupComponent.prototype.render = function () {
        var _this = this;
        var infoBody = [
            'Column Filters are set using the filter dropdown in the column header menu.',
            React.createElement("br", null),
            React.createElement("br", null),
            'This popup allows you to see which columns have filters applied with an option to clear them.',
        ];
        var colItems = [
            { Content: 'Column', Size: 3 },
            { Content: 'Filter', Size: 7 },
            { Content: '', Size: 2 },
        ];
        var columnFilterItems = this.props.ColumnFilters.map(function (columnFilter, index) {
            return (React.createElement(ColumnFilterEntityRow_1.ColumnFilterEntityRow, { key: index, colItems: colItems, AdaptableObject: null, ColumnFilter: columnFilter, Columns: _this.props.Columns, UserFilters: _this.props.UserFilters, onEdit: null, onDeleteConfirm: null, onClear: function () { return _this.onClearColumnFilter(columnFilter.ColumnId); }, onSaveColumnFilterasUserFilter: function () { return _this.onSaveColumnFilterasUserFilter(columnFilter); }, AccessLevel: _this.props.AccessLevel }));
        });
        return (React.createElement(PanelWithImage_1.PanelWithImage, { header: StrategyConstants.ColumnFilterStrategyFriendlyName, variant: "primary", infoBody: infoBody, glyphicon: StrategyConstants.ColumnFilterGlyph, style: { flex: 1 } }, columnFilterItems.length > 0 ? (React.createElement(AdaptableObjectCollection_1.AdaptableObjectCollection, { colItems: colItems, items: columnFilterItems })) : (React.createElement(EmptyContent_1.default, null,
            React.createElement("p", null, "There are currently no column filters applied."),
            React.createElement("p", null, "Create column filters by using the filter dropdown in each column header.")))));
    };
    ColumnFilterPopupComponent.prototype.onClearColumnFilter = function (columnId) {
        var _this = this;
        var columnFilters = this.props.ColumnFilters.filter(function (cf) { return cf.ColumnId == columnId; });
        if (ArrayExtensions_1.default.IsNotNullOrEmpty(columnFilters)) {
            columnFilters.forEach(function (cf) {
                _this.props.onClearColumnFilter(cf);
            });
            this.props.Adaptable.clearColumnFiltering([columnId]);
        }
    };
    ColumnFilterPopupComponent.prototype.onSaveColumnFilterasUserFilter = function (columnFilter) {
        var prompt = {
            Header: 'Enter name for User Filter',
            Msg: '',
            ConfirmAction: UserFilterRedux.CreateUserFilterFromColumnFilter(columnFilter, ''),
        };
        this.props.onShowPrompt(prompt);
    };
    return ColumnFilterPopupComponent;
}(React.Component));
function mapStateToProps(state, ownProps) {
    return {
        ColumnFilters: state.ColumnFilter.ColumnFilters,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        onClearColumnFilter: function (columnFilter) {
            return dispatch(ColumnFilterRedux.ColumnFilterClear(columnFilter));
        },
        onShowPrompt: function (prompt) { return dispatch(PopupRedux.PopupShowPrompt(prompt)); },
        onShare: function (entity) {
            return dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyConstants.ColumnFilterStrategyId));
        },
    };
}
exports.ColumnFilterPopup = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(ColumnFilterPopupComponent);
