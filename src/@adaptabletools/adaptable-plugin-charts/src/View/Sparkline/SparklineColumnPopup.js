"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var react_redux_1 = require("react-redux");
var StrategyConstants = require("@adaptabletools/adaptable/src/Utilities/Constants/StrategyConstants");
var SparklineColumnRedux = require("@adaptabletools/adaptable/src/Redux/ActionsReducers/SparklineColumnRedux");
var TeamSharingRedux = require("@adaptabletools/adaptable/src/Redux/ActionsReducers/TeamSharingRedux");
var Helper_1 = require("@adaptabletools/adaptable/src/Utilities/Helpers/Helper");
var EditableConfigEntityState_1 = require("@adaptabletools/adaptable/src/View/Components/SharedProps/EditableConfigEntityState");
var ColumnHelper_1 = require("@adaptabletools/adaptable/src/Utilities/Helpers/ColumnHelper");
var EmptyContent_1 = require("@adaptabletools/adaptable/src/components/EmptyContent");
var rebass_1 = require("rebass");
var SparklineColumnEntityRow_1 = require("./SparklineColumnEntityRow");
var PanelWithButton_1 = require("@adaptabletools/adaptable/src/View/Components/Panels/PanelWithButton");
var AdaptableObjectCollection_1 = require("@adaptabletools/adaptable/src/View/Components/AdaptableObjectCollection");
var SparklineColumnWizard_1 = require("./Wizard/SparklineColumnWizard");
var ObjectFactory_1 = require("@adaptabletools/adaptable/src/Utilities/ObjectFactory");
var StringExtensions_1 = require("@adaptabletools/adaptable/src/Utilities/Extensions/StringExtensions");
var SparklineColumnPopupComponent = /** @class */ (function (_super) {
    tslib_1.__extends(SparklineColumnPopupComponent, _super);
    function SparklineColumnPopupComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.onSparklineTypeChange = function (sparklineColumn, sparklineType) {
            var clonedSparklineColumn = Helper_1.Helper.cloneObject(sparklineColumn);
            clonedSparklineColumn.SparklineType = sparklineType;
            _this.props.onEditSparklineColumn(clonedSparklineColumn);
        };
        _this.state = {
            EditedAdaptableObject: null,
            WizardStartIndex: 0,
            WizardStatus: EditableConfigEntityState_1.WizardStatus.None,
        };
        return _this;
    }
    SparklineColumnPopupComponent.prototype.componentDidMount = function () {
        if (this.props.PopupParams) {
            var sparklineColumnId_1 = this.props.PopupParams.columnId;
            if (sparklineColumnId_1) {
                var sparklineColumn = this.props.SparklineColumns.filter(function (c) { return c.ColumnId === sparklineColumnId_1; })[0];
                if (sparklineColumn) {
                    this.onEdit(sparklineColumn);
                }
            }
        }
    };
    SparklineColumnPopupComponent.prototype.render = function () {
        var _this = this;
        var infoBody = ['Use Sparklines to render columns with arrays of numeric values'];
        var colItems = [
            { Content: 'Column', Size: 2 },
            { Content: 'Type', Size: 2 },
            { Content: 'Min', Size: 2 },
            { Content: 'Max', Size: 2 },
            { Content: 'Color', Size: 2 },
            { Content: '', Size: 2 },
        ];
        var SparklineItems = this.props.SparklineColumns.map(function (sparklineColumn) {
            var column = ColumnHelper_1.ColumnHelper.getColumnFromId(sparklineColumn.ColumnId, _this.props.Columns);
            return (React.createElement(SparklineColumnEntityRow_1.SparklineColumnEntityRow, { key: sparklineColumn.Uuid, colItems: colItems, AdaptableObject: sparklineColumn, Column: column, Columns: _this.props.Columns, UserFilters: _this.props.UserFilters, ColorPalette: _this.props.ColorPalette, onEdit: function () { return _this.onEdit(sparklineColumn); }, onShare: function () { return _this.props.onShare(sparklineColumn); }, TeamSharingActivated: _this.props.TeamSharingActivated, onDeleteConfirm: SparklineColumnRedux.SparklineColumnsDelete(sparklineColumn), onMinimumValueChanged: function (sparklineColumn, minimumValue) {
                    return _this.onMinimumValueChanged(sparklineColumn, minimumValue);
                }, onSparklineTypeChange: _this.onSparklineTypeChange, onMaximumValueChanged: function (sparklineColumn, maximumValue) {
                    return _this.onMaximumValueChanged(sparklineColumn, maximumValue);
                }, onLineColorChanged: function (sparklineColumn, color) {
                    return _this.onLineColorChanged(sparklineColumn, color);
                }, AccessLevel: _this.props.AccessLevel }));
        });
        return (React.createElement(rebass_1.Flex, { flex: 1, flexDirection: "column" },
            React.createElement(PanelWithButton_1.PanelWithButton, { headerText: StrategyConstants.SparklineColumnStrategyFriendlyName, style: { height: '100%' }, glyphicon: StrategyConstants.SparklinesGlyph, infoBody: infoBody, bodyProps: { padding: 0 } },
                SparklineItems.length > 0 ? (React.createElement(AdaptableObjectCollection_1.AdaptableObjectCollection, { colItems: colItems, items: SparklineItems })) : (React.createElement(EmptyContent_1.default, null,
                    React.createElement("p", null, "You do not have any Sparkline Columns in your Grid."))),
                this.state.EditedAdaptableObject != null && (React.createElement(SparklineColumnWizard_1.SparklineColumnWizard, { EditedAdaptableObject: this.state.EditedAdaptableObject, ConfigEntities: null, ColorPalette: this.props.ColorPalette, Adaptable: this.props.Adaptable, ModalContainer: this.props.ModalContainer, Columns: this.props.Columns, UserFilters: this.props.UserFilters, SystemFilters: this.props.SystemFilters, NamedFilters: this.props.NamedFilters, ColumnCategories: this.props.ColumnCategories, WizardStartIndex: this.state.WizardStartIndex, onCloseWizard: function () { return _this.onCloseWizard(); }, onFinishWizard: function () { return _this.onFinishWizard(); }, canFinishWizard: function () { return _this.canFinishWizard(); } })))));
    };
    SparklineColumnPopupComponent.prototype.onMinimumValueChanged = function (sparklineColumn, minimumValue) {
        var clonedSparklineColumn = Helper_1.Helper.cloneObject(sparklineColumn);
        clonedSparklineColumn.MinimumValue = minimumValue;
        this.props.onEditSparklineColumn(clonedSparklineColumn);
    };
    SparklineColumnPopupComponent.prototype.onMaximumValueChanged = function (sparklineColumn, maximumValue) {
        var clonedSparklineColumn = Helper_1.Helper.cloneObject(sparklineColumn);
        clonedSparklineColumn.MaximumValue = maximumValue;
        this.props.onEditSparklineColumn(clonedSparklineColumn);
    };
    SparklineColumnPopupComponent.prototype.onLineColorChanged = function (sparklineColumn, color) {
        var clonedSparklineColumn = Helper_1.Helper.cloneObject(sparklineColumn);
        clonedSparklineColumn.LineColor = color;
        this.props.onEditSparklineColumn(clonedSparklineColumn);
    };
    SparklineColumnPopupComponent.prototype.onNewFromColumn = function (sparklineColumn) {
        this.setState({
            EditedAdaptableObject: sparklineColumn,
            WizardStatus: EditableConfigEntityState_1.WizardStatus.New,
            WizardStartIndex: 1,
        });
    };
    SparklineColumnPopupComponent.prototype.onNew = function () {
        this.setState({
            EditedAdaptableObject: ObjectFactory_1.default.CreateEmptySparklineColumn(),
            WizardStatus: EditableConfigEntityState_1.WizardStatus.New,
            WizardStartIndex: 0,
        });
    };
    SparklineColumnPopupComponent.prototype.onEdit = function (sparklineColumn) {
        var clonedObject = Helper_1.Helper.cloneObject(sparklineColumn);
        this.setState({
            EditedAdaptableObject: clonedObject,
            WizardStartIndex: 1,
            WizardStatus: EditableConfigEntityState_1.WizardStatus.Edit,
        });
    };
    SparklineColumnPopupComponent.prototype.onCloseWizard = function () {
        this.props.onClearPopupParams();
        this.setState({
            EditedAdaptableObject: null,
            WizardStartIndex: 0,
            WizardStatus: EditableConfigEntityState_1.WizardStatus.None,
        });
    };
    SparklineColumnPopupComponent.prototype.onFinishWizard = function () {
        var sparklineColumn = Helper_1.Helper.cloneObject(this.state.EditedAdaptableObject);
        if (this.state.WizardStatus == EditableConfigEntityState_1.WizardStatus.Edit) {
            this.props.onEditSparklineColumn(sparklineColumn);
        }
        else {
            this.props.onAddSparklineColumn(sparklineColumn);
        }
        this.setState({
            EditedAdaptableObject: null,
            WizardStartIndex: 0,
            WizardStatus: EditableConfigEntityState_1.WizardStatus.None,
        });
    };
    SparklineColumnPopupComponent.prototype.canFinishWizard = function () {
        var sparklineColumn = this.state.EditedAdaptableObject;
        if (StringExtensions_1.default.IsNullOrEmpty(sparklineColumn.ColumnId)) {
            return false;
        }
        return true;
    };
    return SparklineColumnPopupComponent;
}(React.Component));
function mapStateToProps(state) {
    return {
        SparklineColumns: state.SparklineColumn.SparklineColumns,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        onAddSparklineColumn: function (sparklineColumn) {
            return dispatch(SparklineColumnRedux.SparklineColumnsAdd(sparklineColumn));
        },
        onEditSparklineColumn: function (sparklineColumn) {
            return dispatch(SparklineColumnRedux.SparklineColumnsEdit(sparklineColumn));
        },
        onShare: function (entity) {
            return dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyConstants.SparklineStrategyId));
        },
    };
}
exports.SparklineColumnPopup = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(SparklineColumnPopupComponent);
