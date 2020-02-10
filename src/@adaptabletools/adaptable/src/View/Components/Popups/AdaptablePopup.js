"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var Enums_1 = require("../../../PredefinedConfig/Common/Enums");
var AdaptableViewFactory_1 = require("../../AdaptableViewFactory");
var GeneralConstants = require("../../../Utilities/Constants/GeneralConstants");
var AdaptableHelper_1 = require("../../../Utilities/Helpers/AdaptableHelper");
var UIHelper_1 = require("../../UIHelper");
var SimpleButton_1 = require("../../../components/SimpleButton");
var rebass_1 = require("rebass");
var PopupWithFooter_1 = require("../../../components/PopupWithFooter");
var PopupContext_1 = require("./PopupContext");
var AdaptablePopup = /** @class */ (function (_super) {
    tslib_1.__extends(AdaptablePopup, _super);
    function AdaptablePopup() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AdaptablePopup.prototype.render = function () {
        var _this = this;
        var modalContainer = UIHelper_1.UIHelper.getModalContainer(this.props.Adaptable.adaptableOptions, document);
        var accessLevel = AdaptableHelper_1.AdaptableHelper.getEntitlementAccessLevelForStrategy(this.props.Adaptable.api.entitlementsApi.getAllEntitlements(), this.props.ComponentStrategy);
        if (this.props.ComponentName) {
            var bodyElement = AdaptableViewFactory_1.AdaptableViewFactory[this.props.ComponentName];
            //Warning : FilterForm needs to be changed if we add properties since it uses the same interface
            var commonProps = {
                PopupParams: this.props.PopupParams,
                onClearPopupParams: function () {
                    return _this.props.onClearPopupParams ? _this.props.onClearPopupParams() : null;
                },
                onClosePopup: function () {
                    if (_this.props.onHide) {
                        _this.props.onHide();
                    }
                },
                TeamSharingActivated: AdaptableHelper_1.AdaptableHelper.isConfigServerEnabled(this.props.Adaptable.adaptableOptions),
                Columns: this.props.Adaptable.api.gridApi.getColumns(),
                UserFilters: this.props.Adaptable.api.userFilterApi.getAllUserFilter(),
                SystemFilters: this.props.Adaptable.api.systemFilterApi.getAllSystemFilter(),
                NamedFilters: this.props.Adaptable.api.namedFilterApi.getAllNamedFilter(),
                ColumnFilters: this.props.Adaptable.api.columnFilterApi.getAllColumnFilter(),
                ModalContainer: modalContainer,
                ColumnCategories: this.props.Adaptable.api.columnCategoryApi.getAllColumnCategory(),
                ColorPalette: this.props.Adaptable.api.userInterfaceApi.getColorPalette(),
                ColumnSorts: this.props.Adaptable.api.gridApi.getColumnSorts(),
                AccessLevel: accessLevel,
                Adaptable: this.props.Adaptable,
            };
            var body = React.createElement(bodyElement, commonProps);
        }
        return (React.createElement(PopupContext_1.default.Provider, { value: {
                hidePopup: function () {
                    if (_this.props.onHide) {
                        _this.props.onHide();
                    }
                },
            } },
            React.createElement(PopupWithFooter_1.PopupWithFooter, tslib_1.__assign({ showModal: this.props.showModal, onHide: this.props.onHide, modal: true, padding: 0, footer: React.createElement(React.Fragment, null,
                    React.createElement(SimpleButton_1.default, { onClick: function () {
                            if (_this.props.onHide) {
                                _this.props.onHide();
                            }
                        }, variant: "text" }, "CLOSE")) }, this.props.PopupProps),
                React.createElement(rebass_1.Flex, { flexDirection: "column", flex: 1, className: accessLevel == Enums_1.AccessLevel.ReadOnly ? GeneralConstants.READ_ONLY_STYLE : '' }, body))));
    };
    return AdaptablePopup;
}(React.Component));
exports.AdaptablePopup = AdaptablePopup;
