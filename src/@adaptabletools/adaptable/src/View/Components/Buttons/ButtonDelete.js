"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var react_redux_1 = require("react-redux");
var PopupRedux = require("../../../Redux/ActionsReducers/PopupRedux");
var Enums_1 = require("../../../PredefinedConfig/Common/Enums");
var SimpleButton_1 = require("../../../components/SimpleButton");
var ButtonDeleteComponent = /** @class */ (function (_super) {
    tslib_1.__extends(ButtonDeleteComponent, _super);
    function ButtonDeleteComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ButtonDeleteComponent.prototype.render = function () {
        var _this = this;
        var _a = this.props, onConfirmWarning = _a.onConfirmWarning, ConfirmAction = _a.ConfirmAction, ConfirmationMsg = _a.ConfirmationMsg, ConfirmationTitle = _a.ConfirmationTitle, onClickAction = _a.onClickAction, props = tslib_1.__rest(_a, ["onConfirmWarning", "ConfirmAction", "ConfirmationMsg", "ConfirmationTitle", "onClickAction"]);
        return (React.createElement(SimpleButton_1.default, tslib_1.__assign({ tooltip: "Delete", variant: "text", icon: "trash", iconSize: 20 }, props, { onClick: function () { return _this.onClick(); } })));
    };
    ButtonDeleteComponent.prototype.onClick = function () {
        if (this.props.ConfirmAction) {
            var confirmation = {
                CancelButtonText: 'Cancel',
                Header: this.props.ConfirmationTitle,
                Msg: this.props.ConfirmationMsg,
                ConfirmButtonText: 'Delete',
                CancelAction: null,
                ConfirmAction: this.props.ConfirmAction,
                ShowInputBox: false,
                MessageType: Enums_1.MessageType.Warning,
            };
            this.props.onConfirmWarning(confirmation);
        }
        else {
            this.props.onClickAction();
        }
    };
    return ButtonDeleteComponent;
}(React.Component));
function mapStateToProps(state, ownProps) {
    return {
        ConfirmAction: ownProps.ConfirmAction,
        ConfirmationMsg: ownProps.ConfirmationMsg,
        ConfirmationTitle: ownProps.ConfirmationTitle,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        onConfirmWarning: function (confirmation) {
            return dispatch(PopupRedux.PopupShowConfirmation(confirmation));
        },
    };
}
exports.ButtonDelete = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(ButtonDeleteComponent);
