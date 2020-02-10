"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var react_redux_1 = require("react-redux");
var StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
var PercentBarRedux = require("../../Redux/ActionsReducers/PercentBarRedux");
var TeamSharingRedux = require("../../Redux/ActionsReducers/TeamSharingRedux");
var Helper_1 = require("../../Utilities/Helpers/Helper");
var PanelWithButton_1 = require("../Components/Panels/PanelWithButton");
var PercentBarWizard_1 = require("./Wizard/PercentBarWizard");
var StringExtensions_1 = require("../../Utilities/Extensions/StringExtensions");
var ObjectFactory_1 = require("../../Utilities/ObjectFactory");
var ButtonNew_1 = require("../Components/Buttons/ButtonNew");
var AdaptableObjectCollection_1 = require("../Components/AdaptableObjectCollection");
var PercentBarEntityRow_1 = require("./PercentBarEntityRow");
var EditableConfigEntityState_1 = require("../Components/SharedProps/EditableConfigEntityState");
var ColumnHelper_1 = require("../../Utilities/Helpers/ColumnHelper");
var EmptyContent_1 = require("../../components/EmptyContent");
var rebass_1 = require("rebass");
var PercentBarPopupComponent = /** @class */ (function (_super) {
    tslib_1.__extends(PercentBarPopupComponent, _super);
    function PercentBarPopupComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.shouldClosePopupOnFinishWizard = false;
        _this.state = {
            EditedAdaptableObject: null,
            WizardStartIndex: 0,
            WizardStatus: EditableConfigEntityState_1.WizardStatus.None,
        };
        return _this;
    }
    PercentBarPopupComponent.prototype.componentDidMount = function () {
        if (this.props.PopupParams) {
            if (this.props.PopupParams.action && this.props.PopupParams.columnId) {
                var columnId_1 = this.props.PopupParams.columnId;
                if (this.props.PopupParams.action == 'New') {
                    var distinctColumnsValues = this.props.Adaptable.StrategyService.getDistinctColumnValues(columnId_1);
                    var newPercentRender = ObjectFactory_1.ObjectFactory.CreateEmptyPercentBar();
                    newPercentRender.ColumnId = columnId_1;
                    var negativeValue = Math.min.apply(Math, tslib_1.__spread(distinctColumnsValues));
                    newPercentRender.NegativeValue = negativeValue < 0 ? negativeValue : undefined;
                    if (negativeValue > 0) {
                        newPercentRender.NegativeColor = undefined;
                    }
                    var positiveValue = Math.max.apply(Math, tslib_1.__spread(distinctColumnsValues));
                    newPercentRender.PositiveValue = positiveValue > 0 ? positiveValue : undefined;
                    this.onNewFromColumn(newPercentRender);
                }
                if (this.props.PopupParams.action == 'Edit') {
                    var editPercentRender = this.props.PercentBars.find(function (x) { return x.ColumnId == columnId_1; });
                    this.onEdit(editPercentRender);
                }
            }
            this.shouldClosePopupOnFinishWizard =
                this.props.PopupParams.source && this.props.PopupParams.source == 'ColumnMenu';
        }
    };
    PercentBarPopupComponent.prototype.render = function () {
        var _this = this;
        var infoBody = [
            'Use Percent Bars to render numeric columns with a coloured bar, the length of which is dependent on the column value',
            React.createElement("br", null),
            React.createElement("br", null),
            'For each Percent Bar you can select the colours and range boundaries.',
        ];
        var colItems = [
            { Content: 'Column', Size: 2 },
            { Content: 'Min', Size: 2 },
            { Content: 'Max', Size: 2 },
            { Content: 'Positive', Size: 2 },
            { Content: 'Negative', Size: 2 },
            { Content: '', Size: 2 },
        ];
        var PercentBarItems = this.props.PercentBars.map(function (percentBar, index) {
            var column = ColumnHelper_1.ColumnHelper.getColumnFromId(percentBar.ColumnId, _this.props.Columns);
            return (React.createElement(PercentBarEntityRow_1.PercentBarEntityRow, { key: percentBar.Uuid, colItems: colItems, AdaptableObject: percentBar, Column: column, Columns: _this.props.Columns, UserFilters: _this.props.UserFilters, ColorPalette: _this.props.ColorPalette, onEdit: function () { return _this.onEdit(percentBar); }, onShare: function () { return _this.props.onShare(percentBar); }, TeamSharingActivated: _this.props.TeamSharingActivated, onDeleteConfirm: PercentBarRedux.PercentBarDelete(percentBar), onMinimumValueChanged: function (percentBar, minimumValue) {
                    return _this.onMinimumValueChanged(percentBar, minimumValue);
                }, onMaximumValueChanged: function (percentBar, maximumValue) {
                    return _this.onMaximumValueChanged(percentBar, maximumValue);
                }, onPositiveColorChanged: function (percentBar, positiveColor) {
                    return _this.onPositiveColorChanged(percentBar, positiveColor);
                }, onNegativeColorChanged: function (percentBar, negativeColor) {
                    return _this.onNegativeColorChanged(percentBar, negativeColor);
                }, AccessLevel: _this.props.AccessLevel }));
        });
        var newButton = (React.createElement(ButtonNew_1.ButtonNew, { onClick: function () { return _this.onNew(); }, tooltip: "Create Percent Bar ", AccessLevel: this.props.AccessLevel }));
        return (React.createElement(rebass_1.Flex, { flex: 1, flexDirection: "column" },
            React.createElement(PanelWithButton_1.PanelWithButton, { headerText: StrategyConstants.PercentBarStrategyFriendlyName, style: { height: '100%' }, button: newButton, glyphicon: StrategyConstants.PercentBarGlyph, infoBody: infoBody, bodyProps: { padding: 0 } },
                PercentBarItems.length > 0 ? (React.createElement(AdaptableObjectCollection_1.AdaptableObjectCollection, { colItems: colItems, items: PercentBarItems })) : (React.createElement(EmptyContent_1.default, null,
                    React.createElement("p", null, "Click 'New' to start creating Percent Bars."),
                    React.createElement("p", null, "Visualise numeric columns as a bar (positive, negative or both) in order better to see their contents."))),
                this.state.EditedAdaptableObject != null && (React.createElement(PercentBarWizard_1.PercentBarWizard, { EditedAdaptableObject: this.state.EditedAdaptableObject, ConfigEntities: null, Adaptable: this.props.Adaptable, ModalContainer: this.props.ModalContainer, Columns: this.props.Columns, ColorPalette: this.props.ColorPalette, UserFilters: this.props.UserFilters, SystemFilters: this.props.SystemFilters, NamedFilters: this.props.NamedFilters, ColumnCategories: this.props.ColumnCategories, WizardStartIndex: this.state.WizardStartIndex, onCloseWizard: function () { return _this.onCloseWizard(); }, onFinishWizard: function () { return _this.onFinishWizard(); }, canFinishWizard: function () { return _this.canFinishWizard(); } })))));
    };
    PercentBarPopupComponent.prototype.onMinimumValueChanged = function (percentBar, minimumValue) {
        var clonedPercentBar = Helper_1.Helper.cloneObject(percentBar);
        clonedPercentBar.NegativeValue = minimumValue;
        this.props.onEditPercentBar(clonedPercentBar);
    };
    PercentBarPopupComponent.prototype.onMaximumValueChanged = function (percentBar, maximumValue) {
        var clonedPercentBar = Helper_1.Helper.cloneObject(percentBar);
        clonedPercentBar.PositiveValue = maximumValue;
        this.props.onEditPercentBar(clonedPercentBar);
    };
    PercentBarPopupComponent.prototype.onPositiveColorChanged = function (percentBar, positiveColor) {
        var clonedPercentBar = Helper_1.Helper.cloneObject(percentBar);
        clonedPercentBar.PositiveColor = positiveColor;
        this.props.onEditPercentBar(clonedPercentBar);
    };
    PercentBarPopupComponent.prototype.onNegativeColorChanged = function (percentBar, negativeColor) {
        var clonedPercentBar = Helper_1.Helper.cloneObject(percentBar);
        clonedPercentBar.NegativeColor = negativeColor;
        this.props.onEditPercentBar(clonedPercentBar);
    };
    PercentBarPopupComponent.prototype.onNewFromColumn = function (percentBar) {
        this.setState({
            EditedAdaptableObject: percentBar,
            WizardStatus: EditableConfigEntityState_1.WizardStatus.New,
            WizardStartIndex: 1,
        });
    };
    PercentBarPopupComponent.prototype.onNew = function () {
        this.setState({
            EditedAdaptableObject: ObjectFactory_1.ObjectFactory.CreateEmptyPercentBar(),
            WizardStatus: EditableConfigEntityState_1.WizardStatus.New,
            WizardStartIndex: 0,
        });
    };
    PercentBarPopupComponent.prototype.onEdit = function (percentBar) {
        var clonedObject = Helper_1.Helper.cloneObject(percentBar);
        this.setState({
            EditedAdaptableObject: clonedObject,
            WizardStartIndex: 1,
            WizardStatus: EditableConfigEntityState_1.WizardStatus.Edit,
        });
    };
    PercentBarPopupComponent.prototype.onCloseWizard = function () {
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
    PercentBarPopupComponent.prototype.onFinishWizard = function () {
        var percentBar = Helper_1.Helper.cloneObject(this.state.EditedAdaptableObject);
        if (this.state.WizardStatus == EditableConfigEntityState_1.WizardStatus.Edit) {
            this.props.onEditPercentBar(percentBar);
        }
        else {
            this.props.onAddPercentBar(percentBar);
        }
        this.setState({
            EditedAdaptableObject: null,
            WizardStartIndex: 0,
            WizardStatus: EditableConfigEntityState_1.WizardStatus.None,
        });
        this.shouldClosePopupOnFinishWizard = false;
    };
    PercentBarPopupComponent.prototype.canFinishWizard = function () {
        var percentBar = this.state.EditedAdaptableObject;
        if (StringExtensions_1.StringExtensions.IsNullOrEmpty(percentBar.ColumnId)) {
            return false;
        }
        if (StringExtensions_1.StringExtensions.IsNullOrEmpty(percentBar.PositiveColor) &&
            StringExtensions_1.StringExtensions.IsNullOrEmpty(percentBar.NegativeColor)) {
            return false;
        }
        // we are not currently checking for columns - ok? or problem?
        return true;
    };
    return PercentBarPopupComponent;
}(React.Component));
function mapStateToProps(state, ownProps) {
    return {
        PercentBars: state.PercentBar.PercentBars,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        onAddPercentBar: function (percentBar) {
            return dispatch(PercentBarRedux.PercentBarAdd(percentBar));
        },
        onEditPercentBar: function (percentBar) {
            return dispatch(PercentBarRedux.PercentBarEdit(percentBar));
        },
        onShare: function (entity) {
            return dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyConstants.PercentBarStrategyId));
        },
    };
}
exports.PercentBarPopup = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(PercentBarPopupComponent);
