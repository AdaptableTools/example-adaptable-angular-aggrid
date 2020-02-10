"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var ReactDOM = require("react-dom");
var AdaptableViewFactory_1 = require("../../AdaptableViewFactory");
var UIHelper_1 = require("../../UIHelper");
var StrategyConstants = require("../../../Utilities/Constants/StrategyConstants");
var ScreenPopups = require("../../../Utilities/Constants/ScreenPopups");
var AdaptablePopup_1 = require("./AdaptablePopup");
var AdaptableHelper_1 = require("../../../Utilities/Helpers/AdaptableHelper");
var AdaptableChart = /** @class */ (function (_super) {
    tslib_1.__extends(AdaptableChart, _super);
    function AdaptableChart(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            chartContainer: UIHelper_1.UIHelper.getChartContainer(_this.props.Adaptable.adaptableOptions, document, _this.props.showModal),
            accessLevel: AdaptableHelper_1.default.getEntitlementAccessLevelForStrategy(_this.props.Adaptable.api.entitlementsApi.getAllEntitlements(), StrategyConstants.ChartStrategyId),
            isValidUserChartContainer: UIHelper_1.UIHelper.isValidUserChartContainer(_this.props.Adaptable.adaptableOptions, document),
        };
        return _this;
    }
    AdaptableChart.prototype.render = function () {
        var commonProps = {
            Columns: this.props.Adaptable.api.gridApi.getColumns(),
            ModalContainer: this.state.chartContainer,
            onClose: this.props.onClose,
            ShowModal: this.props.showModal,
            Adaptable: this.props.Adaptable,
            UserFilters: this.props.Adaptable.api.userFilterApi.getAllUserFilter(),
            SystemFilters: this.props.Adaptable.api.systemFilterApi.getAllSystemFilter(),
            NamedFilters: this.props.Adaptable.api.namedFilterApi.getAllNamedFilter(),
            ColumnCategories: this.props.Adaptable.api.columnCategoryApi.getAllColumnCategory(),
            ColumnFilters: this.props.Adaptable.api.columnFilterApi.getAllColumnFilter(),
            ColorPalette: this.props.Adaptable.api.userInterfaceApi.getColorPalette(),
            AccessLevel: this.state.accessLevel,
        };
        var ChartCmp = AdaptableViewFactory_1.AdaptableViewFactory[ScreenPopups.ChartDisplayPopup];
        var body = React.createElement(ChartCmp, tslib_1.__assign({}, commonProps));
        // var body: any = React.createElement(bodyElement, commonProps);
        return this.props.showModal ? (React.createElement(AdaptablePopup_1.AdaptablePopup, { Adaptable: this.props.Adaptable, onHide: this.props.onClose, showModal: true, PopupParams: null, ComponentName: ScreenPopups.ChartDisplayPopup, ComponentStrategy: StrategyConstants.ChartStrategyId }, body)) : this.state.isValidUserChartContainer ? (ReactDOM.createPortal(body, this.state.chartContainer)) : (body);
    };
    return AdaptableChart;
}(React.Component));
exports.AdaptableChart = AdaptableChart;
