"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var EntityListActionButtons_1 = require("../Components/Buttons/EntityListActionButtons");
var AdaptableObjectRow_1 = require("../Components/AdaptableObjectRow");
var ExpressionHelper_1 = require("../../Utilities/Helpers/ExpressionHelper");
var StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
var EntityRowItem_1 = require("../Components/EntityRowItem");
var Radio_1 = require("../../components/Radio");
var AdvancedSearchEntityRow = /** @class */ (function (_super) {
    tslib_1.__extends(AdvancedSearchEntityRow, _super);
    function AdvancedSearchEntityRow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AdvancedSearchEntityRow.prototype.render = function () {
        var _this = this;
        var advancedSearch = this.props.AdaptableObject;
        var colItems = [].concat(this.props.colItems);
        colItems[0].Content = (React.createElement(Radio_1.default, { onChange: function () { return _this.props.onSelect(advancedSearch); }, checked: this.props.IsCurrentAdvancedSearch }));
        colItems[1].Content = React.createElement(EntityRowItem_1.EntityRowItem, { Content: advancedSearch.Name });
        colItems[2].Content = (React.createElement(EntityRowItem_1.EntityRowItem, { Content: ExpressionHelper_1.ExpressionHelper.ConvertExpressionToString(advancedSearch.Expression, this.props.Columns) }));
        var buttons = (React.createElement(EntityListActionButtons_1.EntityListActionButtons, { ConfirmDeleteAction: this.props.onDeleteConfirm, showShare: this.props.TeamSharingActivated, editClick: function () { return _this.props.onEdit(advancedSearch); }, shareClick: function () { return _this.props.onShare(); }, overrideDisableEdit: undefined, EntityType: StrategyConstants.AdvancedSearchStrategyFriendlyName, AccessLevel: this.props.AccessLevel }));
        colItems[3].Content = buttons;
        return (React.createElement(AdaptableObjectRow_1.AdaptableObjectRow, { colItems: colItems, onClick: function () { return _this.props.onSelect(advancedSearch); }, style: { cursor: 'pointer' } }));
    };
    return AdvancedSearchEntityRow;
}(React.Component));
exports.AdvancedSearchEntityRow = AdvancedSearchEntityRow;
