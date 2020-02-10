"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var ListGroupItem_1 = require("../../../components/List/ListGroupItem");
var ListGroup_1 = require("../../../components/List/ListGroup");
var icons_1 = require("../../../components/icons");
var ListBoxMenu = /** @class */ (function (_super) {
    tslib_1.__extends(ListBoxMenu, _super);
    function ListBoxMenu(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {};
        return _this;
    }
    ListBoxMenu.prototype.render = function () {
        var _this = this;
        var menuItems = this.props.MenuItems.map(function (menuItem) {
            return (React.createElement(ListGroupItem_1.default, { key: menuItem.Label, onClick: function () { return _this.onClick(menuItem); } },
                React.createElement(icons_1.Icon, { name: menuItem.Icon }),
                " ",
                menuItem.Label));
        });
        return (React.createElement("div", { style: divStyle },
            React.createElement(ListGroup_1.default, null, menuItems)));
    };
    ListBoxMenu.prototype.onClick = function (menuItem) {
        this.props.onMenuItemClick(menuItem.ReduxAction);
    };
    return ListBoxMenu;
}(React.Component));
exports.ListBoxMenu = ListBoxMenu;
var divStyle = {
    overflowY: 'auto',
    overflowX: 'hidden',
    height: '450px',
    marginBottom: '0',
};
