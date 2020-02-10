"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var EntityListActionButtons_1 = require("../Components/Buttons/EntityListActionButtons");
var AdaptableObjectRow_1 = require("../Components/AdaptableObjectRow");
var StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
var GeneralConstants_1 = require("../../Utilities/Constants/GeneralConstants");
var EntityRowItem_1 = require("../Components/EntityRowItem");
var Radio_1 = require("../../components/Radio");
var LayoutEntityRow = /** @class */ (function (_super) {
    tslib_1.__extends(LayoutEntityRow, _super);
    function LayoutEntityRow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LayoutEntityRow.prototype.render = function () {
        var _this = this;
        var layout = this.props.AdaptableObject;
        var colItems = [].concat(this.props.colItems);
        colItems[0].Content = (React.createElement(EntityRowItem_1.EntityRowItem, { Content: React.createElement(Radio_1.default, { style: { padding: '0px', margin: '0px' }, onChange: function () { return _this.props.onSelect(layout); }, checked: this.props.IsCurrentLayout }) }));
        colItems[1].Content = React.createElement(EntityRowItem_1.EntityRowItem, { Content: layout.Name });
        colItems[2].Content = (React.createElement(EntityRowItem_1.EntityRowItem, { Content: this.props.LayoutService.getLayoutDescription(layout, this.props.Columns) }));
        var buttons = (React.createElement(EntityListActionButtons_1.EntityListActionButtons, { ConfirmDeleteAction: this.props.onDeleteConfirm, showShare: this.props.TeamSharingActivated, editClick: function () { return _this.props.onEdit(layout); }, shareClick: function () { return _this.props.onShare(); }, overrideDisableEdit: false, overrideDisableDelete: layout.Name == GeneralConstants_1.DEFAULT_LAYOUT, EntityType: StrategyConstants.LayoutStrategyFriendlyName, AccessLevel: this.props.AccessLevel }));
        colItems[3].Content = buttons;
        return React.createElement(AdaptableObjectRow_1.AdaptableObjectRow, { colItems: colItems });
    };
    return LayoutEntityRow;
}(React.Component));
exports.LayoutEntityRow = LayoutEntityRow;
