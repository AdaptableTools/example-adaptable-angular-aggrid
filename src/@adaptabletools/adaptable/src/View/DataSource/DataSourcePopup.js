"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var react_redux_1 = require("react-redux");
var DataSourceRedux = require("../../Redux/ActionsReducers/DataSourceRedux");
var TeamSharingRedux = require("../../Redux/ActionsReducers/TeamSharingRedux");
var StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
var DataSourceEntityRow_1 = require("./DataSourceEntityRow");
var DataSourceWizard_1 = require("./Wizard/DataSourceWizard");
var PanelWithButton_1 = require("../Components/Panels/PanelWithButton");
var ObjectFactory_1 = require("../../Utilities/ObjectFactory");
var ButtonNew_1 = require("../Components/Buttons/ButtonNew");
var EditableConfigEntityState_1 = require("../Components/SharedProps/EditableConfigEntityState");
var AdaptableObjectCollection_1 = require("../Components/AdaptableObjectCollection");
var UIHelper_1 = require("../UIHelper");
var StringExtensions_1 = require("../../Utilities/Extensions/StringExtensions");
var Helper_1 = require("../../Utilities/Helpers/Helper");
var EmptyContent_1 = require("../../components/EmptyContent");
var DataSourcePopupComponent = /** @class */ (function (_super) {
    tslib_1.__extends(DataSourcePopupComponent, _super);
    function DataSourcePopupComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.state = UIHelper_1.UIHelper.getEmptyConfigState();
        return _this;
    }
    DataSourcePopupComponent.prototype.render = function () {
        var _this = this;
        var infoBody = [
            'Use DataSources to select from existing server queries what data to show in Adaptable.',
        ];
        var colItems = [
            { Content: 'Name', Size: 5 },
            { Content: 'Description', Size: 5 },
            { Content: '', Size: 2 },
        ];
        var dataSources = this.props.DataSources.map(function (dataSource, index) {
            return (React.createElement(DataSourceEntityRow_1.DataSourceEntityRow, { AdaptableObject: dataSource, key: 'ns' + index, onEdit: function () { return _this.onEdit(dataSource); }, colItems: colItems, onShare: function () { return _this.props.onShare(dataSource); }, TeamSharingActivated: _this.props.TeamSharingActivated, onDeleteConfirm: DataSourceRedux.DataSourceDelete(dataSource), onChangeName: function (dataSource, name) { return _this.onChangeName(dataSource, name); }, onChangeDescription: function (dataSource, description) {
                    return _this.onChangeDescription(dataSource, description);
                }, AccessLevel: _this.props.AccessLevel }));
        });
        var newButton = (React.createElement(ButtonNew_1.ButtonNew, { onClick: function () { return _this.CreateDataSource(); }, tooltip: "Create New DataSource", AccessLevel: this.props.AccessLevel }));
        var DataSource = this.state.EditedAdaptableObject;
        return (React.createElement(PanelWithButton_1.PanelWithButton, { headerText: StrategyConstants.DataSourceStrategyFriendlyName, button: newButton, bodyProps: { padding: 0 }, glyphicon: StrategyConstants.DataSourceGlyph, infoBody: infoBody },
            dataSources.length > 0 ? (React.createElement(AdaptableObjectCollection_1.AdaptableObjectCollection, { colItems: colItems, items: dataSources })) : (React.createElement(EmptyContent_1.default, null, "Click 'New' to add a new DataSource.")),
            this.state.EditedAdaptableObject != null && (React.createElement(DataSourceWizard_1.DataSourceWizard, { EditedAdaptableObject: DataSource, ConfigEntities: this.props.DataSources, ModalContainer: this.props.ModalContainer, Columns: this.props.Columns, UserFilters: this.props.UserFilters, SystemFilters: this.props.SystemFilters, NamedFilters: this.props.NamedFilters, ColumnCategories: this.props.ColumnCategories, Adaptable: this.props.Adaptable, WizardStartIndex: this.state.WizardStartIndex, onCloseWizard: function () { return _this.onCloseWizard(); }, onFinishWizard: function () { return _this.onFinishWizard(); }, canFinishWizard: function () { return _this.canFinishWizard(); } }))));
    };
    DataSourcePopupComponent.prototype.onChangeName = function (dataSource, name) {
        var clonedDataSource = Helper_1.Helper.cloneObject(dataSource);
        clonedDataSource.Name = name;
        this.props.onEditDataSource(clonedDataSource);
    };
    DataSourcePopupComponent.prototype.onChangeDescription = function (dataSource, description) {
        var clonedDataSource = Helper_1.Helper.cloneObject(dataSource);
        clonedDataSource.Description = description;
        this.props.onEditDataSource(clonedDataSource);
    };
    DataSourcePopupComponent.prototype.onEdit = function (dataSource) {
        var clonedObject = Helper_1.Helper.cloneObject(dataSource);
        this.setState({
            EditedAdaptableObject: clonedObject,
            WizardStartIndex: 0,
            WizardStatus: EditableConfigEntityState_1.WizardStatus.Edit,
        });
    };
    DataSourcePopupComponent.prototype.onCloseWizard = function () {
        this.props.onClearPopupParams();
        this.setState({
            EditedAdaptableObject: null,
            WizardStartIndex: 0,
            WizardStatus: EditableConfigEntityState_1.WizardStatus.None,
        });
    };
    DataSourcePopupComponent.prototype.onFinishWizard = function () {
        //  let searchIndex: number = this.state.EditedAdaptableObjectIndex;
        //  let currentSearchIndex: number = this.props.DataSources.findIndex(
        //    as => as.Name == this.props.CurrentDataSource
        //  );
        var clonedObject = Helper_1.Helper.cloneObject(this.state.EditedAdaptableObject);
        if (this.state.WizardStatus == EditableConfigEntityState_1.WizardStatus.Edit) {
            this.props.onEditDataSource(clonedObject);
        }
        else {
            this.props.onAddDataSource(clonedObject);
        }
        this.setState({
            EditedAdaptableObject: null,
            WizardStartIndex: 0,
            WizardStatus: EditableConfigEntityState_1.WizardStatus.None,
        });
        //  if (searchIndex == -1 || searchIndex == currentSearchIndex) {
        // its new so make it the new search or we are editing the current search (but might have changed the name)
        //  this.props.onSelectDataSource(clonedObject.Name);
        //  }
    };
    DataSourcePopupComponent.prototype.canFinishWizard = function () {
        var DataSource = this.state.EditedAdaptableObject;
        return (StringExtensions_1.StringExtensions.IsNotNullOrEmpty(DataSource.Name) &&
            StringExtensions_1.StringExtensions.IsNotNullOrEmpty(DataSource.Description));
    };
    DataSourcePopupComponent.prototype.CreateDataSource = function () {
        this.setState({
            EditedAdaptableObject: ObjectFactory_1.ObjectFactory.CreateEmptyDataSource(),
            WizardStartIndex: 0,
        });
    };
    return DataSourcePopupComponent;
}(React.Component));
function mapStateToProps(state) {
    return {
        DataSources: state.DataSource.DataSources,
        CurrentDataSource: state.DataSource.CurrentDataSource,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        onAddDataSource: function (DataSource) {
            return dispatch(DataSourceRedux.DataSourceAdd(DataSource));
        },
        onEditDataSource: function (DataSource) {
            return dispatch(DataSourceRedux.DataSourceEdit(DataSource));
        },
        onSelectDataSource: function (SelectedDataSource) {
            return dispatch(DataSourceRedux.DataSourceSelect(SelectedDataSource));
        },
        onShare: function (entity) {
            return dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyConstants.DataSourceStrategyId));
        },
    };
}
exports.DataSourcePopup = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(DataSourcePopupComponent);
