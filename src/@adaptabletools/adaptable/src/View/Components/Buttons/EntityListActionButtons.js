"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var ButtonEdit_1 = require("./ButtonEdit");
var ButtonDelete_1 = require("./ButtonDelete");
var Enums_1 = require("../../../PredefinedConfig/Common/Enums");
var rebass_1 = require("rebass");
var ButtonShare_1 = require("./ButtonShare");
var stopPropagation = function (e) {
    e.stopPropagation();
};
var EntityListActionButtons = /** @class */ (function (_super) {
    tslib_1.__extends(EntityListActionButtons, _super);
    function EntityListActionButtons() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EntityListActionButtons.prototype.render = function () {
        var _this = this;
        return (React.createElement(rebass_1.Flex, { justifyContent: this.props.justifyContent || 'center', margin: 0, padding: 0, onClick: stopPropagation },
            this.props.showEdit && (React.createElement(ButtonEdit_1.ButtonEdit, { onClick: function () { return (_this.props.editClick ? _this.props.editClick() : null); }, style: {
                    marginLeft: '0px',
                    marginTop: '2px',
                    marginBottom: '2px',
                    marginRight: '2px',
                    color: 'var(--ab-color-text-on-info)',
                    fill: 'var(--ab-color-text-on-info)',
                    background: 'var(--ab-color-info)',
                }, disabled: this.props.overrideDisableEdit || this.props.AccessLevel == Enums_1.AccessLevel.ReadOnly, tooltip: this.props.overrideTooltipEdit, AccessLevel: this.props.AccessLevel })),
            this.props.showDelete && (React.createElement(ButtonDelete_1.ButtonDelete, { style: {
                    marginLeft: '1px',
                    marginTop: '2px',
                    marginBottom: '2px',
                    marginRight: '1px',
                    color: 'var(--ab-color-text-on-error)',
                    fill: 'var(--ab-color-text-on-error)',
                    background: 'var(--ab-color-error)',
                }, disabled: this.props.overrideDisableDelete || this.props.AccessLevel == Enums_1.AccessLevel.ReadOnly, tooltip: this.props.overrideTooltipDelete, ConfirmAction: this.props.ConfirmDeleteAction, ConfirmationMsg: 'Are you sure you want to delete this ' + this.props.EntityType + '?', ConfirmationTitle: 'Delete ' + this.props.EntityType, AccessLevel: this.props.AccessLevel })),
            this.props.showShare && (React.createElement(ButtonShare_1.ButtonShare, { onClick: function () { return (_this.props.shareClick ? _this.props.shareClick() : null); }, style: { marginLeft: '2px', marginTop: '2px', marginBottom: '2px', marginRight: '0px' }, disabled: this.props.overrideDisableShare || this.props.AccessLevel == Enums_1.AccessLevel.ReadOnly, tooltip: this.props.overrideTooltipShare, AccessLevel: this.props.AccessLevel }))));
    };
    EntityListActionButtons.defaultProps = {
        showEdit: true,
        showDelete: true,
        showShare: false,
        overrideDisableEdit: false,
        overrideDisableDelete: false,
        overrideDisableShare: false,
        ConfirmDeleteAction: null,
        EntityType: '',
        AccessLevel: Enums_1.AccessLevel.Full,
        editSize: 'xsmall',
        deleteSize: 'xsmall',
        shareSize: 'xsmall',
    };
    return EntityListActionButtons;
}(React.Component));
exports.EntityListActionButtons = EntityListActionButtons;
