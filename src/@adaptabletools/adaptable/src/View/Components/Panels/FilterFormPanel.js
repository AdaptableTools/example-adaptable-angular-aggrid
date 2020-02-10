"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var rebass_1 = require("rebass");
var Enums_1 = require("../../../PredefinedConfig/Common/Enums");
var Panel_1 = require("../../../components/Panel");
var Radio_1 = require("../../../components/Radio");
var SimpleButton_1 = require("../../../components/SimpleButton");
var FilterFormPanel = /** @class */ (function (_super) {
    tslib_1.__extends(FilterFormPanel, _super);
    function FilterFormPanel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FilterFormPanel.prototype.render = function () {
        var _this = this;
        var header = (React.createElement(rebass_1.Flex, { alignItems: "center", flexDirection: "row", style: { width: '100%' } },
            this.props.IsAlwaysFilter ? (React.createElement(rebass_1.Flex, { flex: 6, marginRight: 2 }, "Filter")) : (React.createElement(rebass_1.Flex, { flex: 6, flexDirection: "column" },
                React.createElement(rebass_1.Flex, null,
                    React.createElement(rebass_1.Flex, { flex: 3 }),
                    React.createElement(rebass_1.Flex, { flex: 9 },
                        React.createElement(Radio_1.default, { value: "Menu", checked: this.props.ColumnMenuTab == Enums_1.ColumnMenuTab.Menu, onChange: function () { return _this.onSelectMenu(); } }, "Menu"))),
                React.createElement(rebass_1.Flex, null,
                    React.createElement(rebass_1.Flex, { flex: 3 }),
                    React.createElement(rebass_1.Flex, { flex: 9 },
                        React.createElement(Radio_1.default, { value: "Filter", checked: this.props.ColumnMenuTab == Enums_1.ColumnMenuTab.Filter, onChange: function () { return _this.onSelectFilter(); } }, "Filter"))))),
            this.props.clearFilterButton &&
                this.props.ColumnMenuTab == Enums_1.ColumnMenuTab.Filter &&
                this.props.clearFilterButton,
            this.props.saveButton &&
                this.props.ColumnMenuTab == Enums_1.ColumnMenuTab.Filter &&
                this.props.saveButton));
        return (React.createElement(rebass_1.Flex, { flexDirection: "column" },
            React.createElement(Panel_1.default, { className: "ab-FilterFormPanel", header: header, headerProps: { padding: 1 }, style: tslib_1.__assign(tslib_1.__assign({}, this.props.style), { flex: 1 }), bodyProps: { padding: 1, style: { maxHeight: '50vh' } }, bodyScroll: true, borderRadius: 0, border: "none" }, this.props.children),
            this.props.autoApplyFilter ? null : (React.createElement(rebass_1.Flex, { flex: "none", flexDirection: "row", padding: 1, justifyContent: "flex-end" },
                React.createElement(SimpleButton_1.default, { variant: "raised", tone: "accent", disabled: this.props.applyFilterButtonDisabled, onClick: function () { return _this.onApplyFilterClicked(); } }, "Apply Filter")))));
    };
    FilterFormPanel.prototype.onApplyFilterClicked = function () {
        this.props.onFilterApplied();
    };
    FilterFormPanel.prototype.onSelectMenu = function () {
        this.props.ColumnMenuTabChanged(Enums_1.ColumnMenuTab.Menu);
    };
    FilterFormPanel.prototype.onSelectFilter = function () {
        this.props.ColumnMenuTabChanged(Enums_1.ColumnMenuTab.Filter);
    };
    return FilterFormPanel;
}(React.Component));
exports.FilterFormPanel = FilterFormPanel;
