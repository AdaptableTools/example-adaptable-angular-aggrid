"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var EditableConfigEntityState_1 = require("../Components/SharedProps/EditableConfigEntityState");
var react_redux_1 = require("react-redux");
var Helper_1 = require("../../Utilities/Helpers/Helper");
var ConditionalStyleWizard_1 = require("./Wizard/ConditionalStyleWizard");
var ConditionalStyleRedux = require("../../Redux/ActionsReducers/ConditionalStyleRedux");
var ObjectFactory_1 = require("../../Utilities/ObjectFactory");
var StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
var ExpressionHelper_1 = require("../../Utilities/Helpers/ExpressionHelper");
var StyleVisualItem_1 = require("../Components/StyleVisualItem");
var StrategyHeader_1 = require("../Components/StrategySummary/StrategyHeader");
var StrategyDetail_1 = require("../Components/StrategySummary/StrategyDetail");
var TeamSharingRedux = require("../../Redux/ActionsReducers/TeamSharingRedux");
var UIHelper_1 = require("../UIHelper");
var StringExtensions_1 = require("../../Utilities/Extensions/StringExtensions");
var ConditionalStyleSummaryComponent = /** @class */ (function (_super) {
    tslib_1.__extends(ConditionalStyleSummaryComponent, _super);
    function ConditionalStyleSummaryComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.state = UIHelper_1.UIHelper.getEmptyConfigState();
        return _this;
    }
    ConditionalStyleSummaryComponent.prototype.render = function () {
        var _this = this;
        var strategySummaries = [];
        // title row
        var titleRow = (React.createElement(StrategyHeader_1.StrategyHeader, { key: StrategyConstants.ConditionalStyleStrategyFriendlyName, FunctionName: StrategyConstants.ConditionalStyleStrategyId, StrategySummary: Helper_1.Helper.ReturnItemCount(this.props.ConditionalStyles.filter(function (item) {
                return item.ColumnId == _this.props.SummarisedColumn.ColumnId &&
                    item.ConditionalStyleScope == 'Column';
            }), StrategyConstants.ConditionalStyleStrategyFriendlyName), onNew: function () { return _this.onNew(); }, NewButtonTooltip: StrategyConstants.ConditionalStyleStrategyFriendlyName, AccessLevel: this.props.AccessLevel }));
        strategySummaries.push(titleRow);
        // existing items
        this.props.ConditionalStyles.map(function (item, index) {
            if (item.ColumnId == _this.props.SummarisedColumn.ColumnId &&
                item.ConditionalStyleScope == 'Column') {
                var detailRow = (React.createElement(StrategyDetail_1.StrategyDetail, { key: 'CS' + index, Item1: React.createElement(StyleVisualItem_1.StyleVisualItem, { Style: item.Style }), Item2: ExpressionHelper_1.ExpressionHelper.ConvertExpressionToString(item.Expression, _this.props.Columns), ConfigEnity: item, EntityType: StrategyConstants.ConditionalStyleStrategyFriendlyName, showShare: _this.props.TeamSharingActivated, onEdit: function () { return _this.onEdit(item); }, onShare: function () { return _this.props.onShare(item); }, onDelete: ConditionalStyleRedux.ConditionalStyleDelete(item) }));
                strategySummaries.push(detailRow);
            }
        });
        return (React.createElement("div", null,
            strategySummaries,
            this.state.EditedAdaptableObject && (React.createElement(ConditionalStyleWizard_1.ConditionalStyleWizard, { EditedAdaptableObject: this.state.EditedAdaptableObject, ConfigEntities: null, ModalContainer: this.props.ModalContainer, Columns: this.props.Columns, UserFilters: this.props.UserFilters, SystemFilters: this.props.SystemFilters, NamedFilters: this.props.NamedFilters, ColumnCategories: this.props.ColumnCategories, ColorPalette: this.props.ColorPalette, StyleClassNames: this.props.StyleClassNames, Adaptable: this.props.Adaptable, WizardStartIndex: this.state.WizardStartIndex, onCloseWizard: function () { return _this.onCloseWizard(); }, onFinishWizard: function () { return _this.onFinishWizard(); }, canFinishWizard: function () { return _this.canFinishWizard(); } }))));
    };
    ConditionalStyleSummaryComponent.prototype.onNew = function () {
        var configEntity = ObjectFactory_1.ObjectFactory.CreateEmptyConditionalStyle();
        configEntity.ColumnId = this.props.SummarisedColumn.ColumnId;
        configEntity.ConditionalStyleScope = 'Column';
        this.setState({
            EditedAdaptableObject: configEntity,
            WizardStartIndex: 1,
            WizardStatus: EditableConfigEntityState_1.WizardStatus.New,
        });
    };
    ConditionalStyleSummaryComponent.prototype.onEdit = function (ConditionalStyle) {
        this.setState({
            EditedAdaptableObject: Helper_1.Helper.cloneObject(ConditionalStyle),
            WizardStartIndex: 1,
            WizardStatus: EditableConfigEntityState_1.WizardStatus.Edit,
        });
    };
    ConditionalStyleSummaryComponent.prototype.onCloseWizard = function () {
        this.setState({
            EditedAdaptableObject: null,
            WizardStartIndex: 0,
            WizardStatus: EditableConfigEntityState_1.WizardStatus.None,
        });
    };
    ConditionalStyleSummaryComponent.prototype.onFinishWizard = function () {
        if (this.state.WizardStatus == EditableConfigEntityState_1.WizardStatus.Edit) {
            this.props.onEditConditionalStyle(this.state.EditedAdaptableObject);
        }
        else {
            this.props.onAddConditionalStyle(this.state.EditedAdaptableObject);
        }
        this.setState({
            EditedAdaptableObject: null,
            WizardStartIndex: 0,
            WizardStatus: EditableConfigEntityState_1.WizardStatus.None,
        });
    };
    ConditionalStyleSummaryComponent.prototype.canFinishWizard = function () {
        var conditionalStyle = this.state.EditedAdaptableObject;
        return ((conditionalStyle.ConditionalStyleScope == 'Row' ||
            StringExtensions_1.StringExtensions.IsNotNullOrEmpty(conditionalStyle.ColumnId)) &&
            ExpressionHelper_1.ExpressionHelper.IsNotEmptyOrInvalidExpression(conditionalStyle.Expression) &&
            UIHelper_1.UIHelper.IsNotEmptyStyle(conditionalStyle.Style));
    };
    return ConditionalStyleSummaryComponent;
}(React.Component));
exports.ConditionalStyleSummaryComponent = ConditionalStyleSummaryComponent;
function mapStateToProps(state, ownProps) {
    return {
        Columns: state.Grid.Columns,
        ConditionalStyles: state.ConditionalStyle.ConditionalStyles,
        UserFilters: state.UserFilter.UserFilters,
        SystemFilters: state.SystemFilter.SystemFilters,
        NamedFilters: state.NamedFilter.NamedFilters,
        Entitlements: state.Entitlements.FunctionEntitlements,
        ColorPalette: state.UserInterface.ColorPalette,
        StyleClassNames: state.UserInterface.StyleClassNames,
        ColumnCategories: state.ColumnCategory.ColumnCategories,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        onAddConditionalStyle: function (conditionalStyle) {
            return dispatch(ConditionalStyleRedux.ConditionalStyleAdd(conditionalStyle));
        },
        onEditConditionalStyle: function (conditionalStyle) {
            return dispatch(ConditionalStyleRedux.ConditionalStyleEdit(conditionalStyle));
        },
        onShare: function (entity) {
            return dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyConstants.ConditionalStyleStrategyId));
        },
    };
}
exports.ConditionalStyleSummary = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(ConditionalStyleSummaryComponent);
