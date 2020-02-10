"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var react_redux_1 = require("react-redux");
var StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
var TeamSharingRedux = require("../../Redux/ActionsReducers/TeamSharingRedux");
var GradientColumnRedux = require("../../Redux/ActionsReducers/GradientColumnRedux");
var Helper_1 = require("../../Utilities/Helpers/Helper");
var PanelWithButton_1 = require("../Components/Panels/PanelWithButton");
var StringExtensions_1 = require("../../Utilities/Extensions/StringExtensions");
var ObjectFactory_1 = require("../../Utilities/ObjectFactory");
var ButtonNew_1 = require("../Components/Buttons/ButtonNew");
var AdaptableObjectCollection_1 = require("../Components/AdaptableObjectCollection");
var GradientColumnEntityRow_1 = require("./GradientColumnEntityRow");
var EditableConfigEntityState_1 = require("../Components/SharedProps/EditableConfigEntityState");
var ColumnHelper_1 = require("../../Utilities/Helpers/ColumnHelper");
var EmptyContent_1 = require("../../components/EmptyContent");
var rebass_1 = require("rebass");
var GradientColumnWizard_1 = require("./Wizard/GradientColumnWizard");
var GradientColumnPopupComponent = /** @class */ (function (_super) {
    tslib_1.__extends(GradientColumnPopupComponent, _super);
    function GradientColumnPopupComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.shouldClosePopupOnFinishWizard = false;
        _this.state = {
            EditedAdaptableObject: null,
            WizardStartIndex: 0,
            WizardStatus: EditableConfigEntityState_1.WizardStatus.None,
        };
        return _this;
    }
    GradientColumnPopupComponent.prototype.componentDidMount = function () {
        if (this.props.PopupParams) {
            if (this.props.PopupParams.action && this.props.PopupParams.columnId) {
                var columnId_1 = this.props.PopupParams.columnId;
                if (this.props.PopupParams.action == 'New') {
                    var distinctColumnsValues = this.props.Adaptable.StrategyService.getDistinctColumnValues(columnId_1);
                    var newGradientColumn = ObjectFactory_1.ObjectFactory.CreateEmptyGradientColumn();
                    newGradientColumn.ColumnId = columnId_1;
                    var smallestValue = Math.min.apply(Math, tslib_1.__spread(distinctColumnsValues));
                    newGradientColumn.NegativeValue = smallestValue < 0 ? smallestValue : undefined;
                    var positiveValue = Math.max.apply(Math, tslib_1.__spread(distinctColumnsValues));
                    newGradientColumn.PositiveValue = positiveValue > 0 ? positiveValue : undefined;
                    // work out the base value
                    if (smallestValue > 0) {
                        newGradientColumn.BaseValue = smallestValue;
                        newGradientColumn.NegativeColor = undefined;
                    }
                    else {
                        var positiveValues = distinctColumnsValues.filter(function (f) { return f > 0; });
                        newGradientColumn.BaseValue = Math.min.apply(Math, tslib_1.__spread(positiveValues));
                    }
                    this.onNewFromColumn(newGradientColumn);
                }
                if (this.props.PopupParams.action == 'Edit') {
                    var editGradientColumn = this.props.GradientColumns.find(function (x) { return x.ColumnId == columnId_1; });
                    this.onEdit(editGradientColumn);
                }
            }
            this.shouldClosePopupOnFinishWizard =
                this.props.PopupParams.source && this.props.PopupParams.source == 'ColumnMenu';
        }
    };
    GradientColumnPopupComponent.prototype.render = function () {
        var _this = this;
        var infoBody = [
            'Use Gradient Columns to render numeric columns according to the ratio of the cell value to a given start and maximum value.',
            React.createElement("br", null),
            React.createElement("br", null),
            'For each Gradient Coumn you can select the colours and range boundaries, and choose whether to include negative numbers.',
        ];
        var colItems = [
            { Content: 'Column', Size: 2 },
            { Content: 'Pos', Size: 2 },
            { Content: 'Neg', Size: 2 },
            { Content: 'Base', Size: 2 },
            { Content: 'P1', Size: 2 },
            { Content: 'N1', Size: 2 },
            { Content: '', Size: 2 },
        ];
        var GradientColumnItems = this.props.GradientColumns.map(function (gradientColumn, index) {
            var column = ColumnHelper_1.ColumnHelper.getColumnFromId(gradientColumn.ColumnId, _this.props.Columns);
            return (React.createElement(GradientColumnEntityRow_1.GradientColumnEntityRow, { key: gradientColumn.Uuid, colItems: colItems, AdaptableObject: gradientColumn, Column: column, Columns: _this.props.Columns, UserFilters: _this.props.UserFilters, ColorPalette: _this.props.ColorPalette, onEdit: function () { return _this.onEdit(gradientColumn); }, onShare: function () { return _this.props.onShare(gradientColumn); }, TeamSharingActivated: _this.props.TeamSharingActivated, onDeleteConfirm: GradientColumnRedux.GradientColumnDelete(gradientColumn), onNegativeValueChanged: function (gradientColumn, minimumValue) {
                    return _this.onNegativeValueChanged(gradientColumn, minimumValue);
                }, onPositiveValueChanged: function (gradientColumn, maximumValue) {
                    return _this.onPositiveValueChanged(gradientColumn, maximumValue);
                }, onBaseValueChanged: function (gradientColumn, maximumValue) {
                    return _this.onBaseValueChanged(gradientColumn, maximumValue);
                }, onPositiveColorChanged: function (gradientColumn, positiveColor) {
                    return _this.onPositiveColorChanged(gradientColumn, positiveColor);
                }, onNegativeColorChanged: function (gradientColumn, negativeColor) {
                    return _this.onNegativeColorChanged(gradientColumn, negativeColor);
                }, AccessLevel: _this.props.AccessLevel }));
        });
        var newButton = (React.createElement(ButtonNew_1.ButtonNew, { onClick: function () { return _this.onNew(); }, tooltip: "Create Percent Bar ", AccessLevel: this.props.AccessLevel }));
        return (React.createElement(rebass_1.Flex, { flex: 1, flexDirection: "column" },
            React.createElement(PanelWithButton_1.PanelWithButton, { headerText: StrategyConstants.GradientColumnStrategyFriendlyName, style: { height: '100%' }, button: newButton, glyphicon: StrategyConstants.GradientColumnGlyph, infoBody: infoBody, bodyProps: { padding: 0 } },
                GradientColumnItems.length > 0 ? (React.createElement(AdaptableObjectCollection_1.AdaptableObjectCollection, { colItems: colItems, items: GradientColumnItems })) : (React.createElement(EmptyContent_1.default, null,
                    React.createElement("p", null, "Click 'New' to start creating Gradient Columns. "),
                    React.createElement("p", null, "Use Gradient Columns to render numeric columns according to the ratio of the cell value to a given start and maximum value."),
                    React.createElement("p", null, "You can select the colours and range boundaries for each Gradient Column."))),
                this.state.EditedAdaptableObject != null && (React.createElement(GradientColumnWizard_1.GradientColumnWizard, { EditedAdaptableObject: this.state.EditedAdaptableObject, ConfigEntities: null, Adaptable: this.props.Adaptable, ModalContainer: this.props.ModalContainer, Columns: this.props.Columns, ColorPalette: this.props.ColorPalette, UserFilters: this.props.UserFilters, SystemFilters: this.props.SystemFilters, NamedFilters: this.props.NamedFilters, ColumnCategories: this.props.ColumnCategories, WizardStartIndex: this.state.WizardStartIndex, onCloseWizard: function () { return _this.onCloseWizard(); }, onFinishWizard: function () { return _this.onFinishWizard(); }, canFinishWizard: function () { return _this.canFinishWizard(); } })))));
    };
    GradientColumnPopupComponent.prototype.onNegativeValueChanged = function (gradientColumn, negativeValue) {
        var clonedGradientColumn = Helper_1.Helper.cloneObject(gradientColumn);
        clonedGradientColumn.NegativeValue = negativeValue;
        this.props.onEditGradientColumn(clonedGradientColumn);
    };
    GradientColumnPopupComponent.prototype.onPositiveValueChanged = function (gradientColumn, positiveValue) {
        var clonedGradientColumn = Helper_1.Helper.cloneObject(gradientColumn);
        clonedGradientColumn.PositiveValue = positiveValue;
        this.props.onEditGradientColumn(clonedGradientColumn);
    };
    GradientColumnPopupComponent.prototype.onBaseValueChanged = function (gradientColumn, baseValue) {
        var clonedGradientColumn = Helper_1.Helper.cloneObject(gradientColumn);
        clonedGradientColumn.BaseValue = baseValue;
        this.props.onEditGradientColumn(clonedGradientColumn);
    };
    GradientColumnPopupComponent.prototype.onPositiveColorChanged = function (gradientColumn, positiveColor) {
        var clonedGradientColumn = Helper_1.Helper.cloneObject(gradientColumn);
        clonedGradientColumn.PositiveColor = positiveColor;
        this.props.onEditGradientColumn(clonedGradientColumn);
    };
    GradientColumnPopupComponent.prototype.onNegativeColorChanged = function (gradientColumn, negativeColor) {
        var clonedGradientColumn = Helper_1.Helper.cloneObject(gradientColumn);
        clonedGradientColumn.NegativeColor = negativeColor;
        this.props.onEditGradientColumn(clonedGradientColumn);
    };
    GradientColumnPopupComponent.prototype.onNewFromColumn = function (GradientColumn) {
        this.setState({
            EditedAdaptableObject: GradientColumn,
            WizardStatus: EditableConfigEntityState_1.WizardStatus.New,
            WizardStartIndex: 1,
        });
    };
    GradientColumnPopupComponent.prototype.onNew = function () {
        this.setState({
            EditedAdaptableObject: ObjectFactory_1.ObjectFactory.CreateEmptyGradientColumn(),
            WizardStatus: EditableConfigEntityState_1.WizardStatus.New,
            WizardStartIndex: 0,
        });
    };
    GradientColumnPopupComponent.prototype.onEdit = function (GradientColumn) {
        var clonedObject = Helper_1.Helper.cloneObject(GradientColumn);
        this.setState({
            EditedAdaptableObject: clonedObject,
            WizardStartIndex: 1,
            WizardStatus: EditableConfigEntityState_1.WizardStatus.Edit,
        });
    };
    GradientColumnPopupComponent.prototype.onCloseWizard = function () {
        this.props.onClearPopupParams();
        this.setState({
            EditedAdaptableObject: null,
            WizardStartIndex: 0,
            WizardStatus: EditableConfigEntityState_1.WizardStatus.None,
        });
        if (this.shouldClosePopupOnFinishWizard) {
            this.props.onClosePopup();
        }
    };
    GradientColumnPopupComponent.prototype.onFinishWizard = function () {
        var gradientColumn = Helper_1.Helper.cloneObject(this.state.EditedAdaptableObject);
        if (this.state.WizardStatus == EditableConfigEntityState_1.WizardStatus.Edit) {
            this.props.onEditGradientColumn(gradientColumn);
        }
        else {
            this.props.onAddGradientColumn(gradientColumn);
        }
        this.setState({
            EditedAdaptableObject: null,
            WizardStartIndex: 0,
            WizardStatus: EditableConfigEntityState_1.WizardStatus.None,
        });
        this.shouldClosePopupOnFinishWizard = false;
    };
    GradientColumnPopupComponent.prototype.canFinishWizard = function () {
        var gradientColumn = this.state.EditedAdaptableObject;
        if (StringExtensions_1.StringExtensions.IsNullOrEmpty(gradientColumn.ColumnId)) {
            return false;
        }
        if (StringExtensions_1.StringExtensions.IsNullOrEmpty(gradientColumn.PositiveColor) &&
            StringExtensions_1.StringExtensions.IsNullOrEmpty(gradientColumn.NegativeColor)) {
            return false;
        }
        if (!gradientColumn.PositiveValue && !gradientColumn.NegativeValue) {
            return false;
        }
        // if a positive value is set then need a positive colour
        if (gradientColumn.PositiveValue &&
            StringExtensions_1.StringExtensions.IsNullOrEmpty(gradientColumn.PositiveColor)) {
            return false;
        }
        // if a negative value is set then need a negative colour
        if (gradientColumn.NegativeValue &&
            StringExtensions_1.StringExtensions.IsNullOrEmpty(gradientColumn.NegativeColor)) {
            return false;
        }
        return true;
    };
    return GradientColumnPopupComponent;
}(React.Component));
function mapStateToProps(state, ownProps) {
    return {
        GradientColumns: state.GradientColumn.GradientColumns,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        onAddGradientColumn: function (GradientColumn) {
            return dispatch(GradientColumnRedux.GradientColumnAdd(GradientColumn));
        },
        onEditGradientColumn: function (GradientColumn) {
            return dispatch(GradientColumnRedux.GradientColumnEdit(GradientColumn));
        },
        onShare: function (entity) {
            return dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyConstants.GradientColumnStrategyId));
        },
    };
}
exports.GradientColumnPopup = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(GradientColumnPopupComponent);
