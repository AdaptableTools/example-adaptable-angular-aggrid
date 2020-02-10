"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var AdaptableForm = /** @class */ (function (_super) {
    tslib_1.__extends(AdaptableForm, _super);
    function AdaptableForm() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.CancelOnFormSubmit = function (e) {
            e.preventDefault();
            if (_this.props.onSubmit) {
                _this.props.onSubmit(null);
            }
        };
        return _this;
    }
    AdaptableForm.prototype.render = function () {
        var _a = this.props, children = _a.children, attrs = tslib_1.__rest(_a, ["children"]);
        return (React.createElement("form", tslib_1.__assign({}, attrs, { onSubmit: this.CancelOnFormSubmit }), children));
    };
    return AdaptableForm;
}(React.Component));
exports.AdaptableForm = AdaptableForm;
