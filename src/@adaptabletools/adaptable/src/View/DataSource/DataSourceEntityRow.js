"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
var EntityListActionButtons_1 = require("../Components/Buttons/EntityListActionButtons");
var AdaptableObjectRow_1 = require("../Components/AdaptableObjectRow");
var EntityRowItem_1 = require("../Components/EntityRowItem");
var DataSourceEntityRow = /** @class */ (function (_super) {
    tslib_1.__extends(DataSourceEntityRow, _super);
    function DataSourceEntityRow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DataSourceEntityRow.prototype.render = function () {
        var _this = this;
        var dataSource = this.props.AdaptableObject;
        var colItems = [].concat(this.props.colItems);
        // put in the ability to change name / description later...
        colItems[0].Content = React.createElement(EntityRowItem_1.EntityRowItem, { Content: dataSource.Name });
        colItems[1].Content = React.createElement(EntityRowItem_1.EntityRowItem, { Content: dataSource.Description });
        colItems[2].Content = (React.createElement(EntityListActionButtons_1.EntityListActionButtons, { editClick: function () { return _this.props.onEdit(dataSource); }, shareClick: function () { return _this.props.onShare(); }, showShare: this.props.TeamSharingActivated, ConfirmDeleteAction: this.props.onDeleteConfirm, EntityType: StrategyConstants.DataSourceStrategyFriendlyName, AccessLevel: this.props.AccessLevel }));
        return React.createElement(AdaptableObjectRow_1.AdaptableObjectRow, { colItems: colItems });
    };
    DataSourceEntityRow.prototype.onDescriptionChange = function (event) {
        var e = event.target;
        this.props.onChangeDescription(this.props.AdaptableObject, e.value);
    };
    DataSourceEntityRow.prototype.onNameChange = function (event) {
        var e = event.target;
        this.props.onChangeName(this.props.AdaptableObject, e.value);
    };
    return DataSourceEntityRow;
}(React.Component));
exports.DataSourceEntityRow = DataSourceEntityRow;
