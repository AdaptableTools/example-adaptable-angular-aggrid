"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var react_redux_1 = require("react-redux");
var TeamSharingRedux = require("../../Redux/ActionsReducers/TeamSharingRedux");
var PanelWithImage_1 = require("../Components/Panels/PanelWithImage");
var PanelWithRow_1 = require("../Components/Panels/PanelWithRow");
var StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
var StrategyProfile_1 = require("../Components/StrategyProfile");
var ExpressionHelper_1 = require("../../Utilities/Helpers/ExpressionHelper");
var ColumnHelper_1 = require("../../Utilities/Helpers/ColumnHelper");
var StyleVisualItem_1 = require("../Components/StyleVisualItem");
var icons_1 = require("../../components/icons");
var SimpleButton_1 = require("../../components/SimpleButton");
var rebass_1 = require("rebass");
var Panel_1 = require("../../components/Panel");
var HelpBlock_1 = require("../../components/HelpBlock");
var ListGroup_1 = require("../../components/List/ListGroup");
var TeamSharingPopupComponent = /** @class */ (function (_super) {
    tslib_1.__extends(TeamSharingPopupComponent, _super);
    function TeamSharingPopupComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TeamSharingPopupComponent.prototype.componentDidMount = function () {
        this.props.onGetSharedItems();
    };
    TeamSharingPopupComponent.prototype.render = function () {
        var _this = this;
        var infoBody = ['Team Sharing'];
        var colItems = [
            { Content: 'Function', Size: 2 },
            { Content: 'Audit', Size: 3 },
            { Content: 'Details', Size: 6 },
            { Content: '', Size: 1 },
        ];
        var sharedItems = this.props.Entities.sort(function (a, b) {
            return a.functionName < b.functionName ? -1 : 1;
        }).map(function (x, index) {
            return (React.createElement("li", { className: "list-group-item", key: index },
                React.createElement(rebass_1.Flex, { flexDirection: "row", alignItems: "center" },
                    React.createElement(rebass_1.Flex, { flex: 2 },
                        React.createElement(StrategyProfile_1.StrategyProfile, { FunctionName: x.functionName })),
                    React.createElement(rebass_1.Flex, { flex: 3 },
                        x.user,
                        React.createElement("br", null),
                        x.timestamp.toLocaleString()),
                    React.createElement(rebass_1.Flex, { flex: 6, style: { fontSize: 'small' } },
                        React.createElement(Panel_1.default, { variant: "primary" }, _this.getSharedItemDetails(x))),
                    React.createElement(rebass_1.Flex, { flex: 1 },
                        React.createElement(SimpleButton_1.default, { variant: "text", tooltip: "import", onClick: function () { return _this.props.onImportItem(x.entity, x.functionName); } },
                            React.createElement(icons_1.Icon, { name: "import-export" }))))));
        });
        return (React.createElement(PanelWithImage_1.PanelWithImage, { header: StrategyConstants.TeamSharingStrategyFriendlyName, infoBody: infoBody, glyphicon: StrategyConstants.TeamSharingGlyph },
            this.props.Entities.length == 0 ? (React.createElement(HelpBlock_1.default, null, "Shared Items will appear here when available.")) : (React.createElement(PanelWithRow_1.PanelWithRow, { colItems: colItems })),
            React.createElement(ListGroup_1.default, null, sharedItems)));
    };
    TeamSharingPopupComponent.prototype.getSharedItemDetails = function (sharedEntity) {
        switch (sharedEntity.functionName) {
            case StrategyConstants.CustomSortStrategyId: {
                var customSort = sharedEntity.entity;
                return (React.createElement(rebass_1.Flex, { flexDirection: "row", alignItems: "center" },
                    React.createElement(rebass_1.Flex, { flex: 4 }, ColumnHelper_1.ColumnHelper.getFriendlyNameFromColumnId(customSort.ColumnId, this.props.Columns)),
                    React.createElement(rebass_1.Flex, { flex: 8 }, customSort.SortedValues.join(', '))));
            }
            case StrategyConstants.CalculatedColumnStrategyId: {
                var calcCol = sharedEntity.entity;
                return (React.createElement(rebass_1.Flex, { flexDirection: "row", alignItems: "center" },
                    React.createElement(rebass_1.Flex, { flex: 4 }, calcCol.ColumnId),
                    React.createElement(rebass_1.Flex, { flex: 8 }, calcCol.ColumnExpression)));
            }
            case StrategyConstants.CellValidationStrategyId: {
                var cellVal = sharedEntity.entity;
                return (React.createElement(rebass_1.Flex, { flexDirection: "row", alignItems: "center" },
                    React.createElement(rebass_1.Flex, { flex: 4 }, ColumnHelper_1.ColumnHelper.getFriendlyNameFromColumnId(cellVal.ColumnId, this.props.Columns)),
                    React.createElement(rebass_1.Flex, { flex: 4 }, this.props.Adaptable.ValidationService.createCellValidationDescription(cellVal, this.props.Columns)),
                    React.createElement(rebass_1.Flex, { flex: 4 }, ExpressionHelper_1.ExpressionHelper.IsNotNullOrEmptyExpression(cellVal.Expression)
                        ? ExpressionHelper_1.ExpressionHelper.ConvertExpressionToString(cellVal.Expression, this.props.Columns)
                        : 'No Expression')));
            }
            case StrategyConstants.ConditionalStyleStrategyId: {
                var cs = sharedEntity.entity;
                return (React.createElement(rebass_1.Flex, { flexDirection: "row", alignItems: "center" },
                    React.createElement(rebass_1.Flex, { flex: 4 }, cs.ConditionalStyleScope == 'Column'
                        ? ColumnHelper_1.ColumnHelper.getFriendlyNameFromColumnId(cs.ColumnId, this.props.Columns)
                        : 'Whole Row'),
                    React.createElement(rebass_1.Flex, { flex: 3 },
                        React.createElement(StyleVisualItem_1.StyleVisualItem, { Style: cs.Style })),
                    React.createElement(rebass_1.Flex, { flex: 5 }, ExpressionHelper_1.ExpressionHelper.ConvertExpressionToString(cs.Expression, this.props.Columns))));
            }
            case StrategyConstants.PlusMinusStrategyId: {
                var plusMinus = sharedEntity.entity;
                return (React.createElement(rebass_1.Flex, { flexDirection: "row", alignItems: "center" },
                    React.createElement(rebass_1.Flex, { flex: 4 }, ColumnHelper_1.ColumnHelper.getFriendlyNameFromColumnId(plusMinus.ColumnId, this.props.Columns)),
                    React.createElement(rebass_1.Flex, { flex: 3 }, plusMinus.NudgeValue.toString()),
                    React.createElement(rebass_1.Flex, { flex: 5 }, ExpressionHelper_1.ExpressionHelper.ConvertExpressionToString(plusMinus.Expression, this.props.Columns))));
            }
            case StrategyConstants.ShortcutStrategyId: {
                var shortcut = sharedEntity.entity;
                return (React.createElement(rebass_1.Flex, { flexDirection: "row", alignItems: "center" },
                    React.createElement(rebass_1.Flex, { flex: 4 }, shortcut.ColumnType),
                    React.createElement(rebass_1.Flex, { flex: 4 }, shortcut.ShortcutKey),
                    React.createElement(rebass_1.Flex, { flex: 4 }, shortcut.ShortcutResult)));
            }
            case StrategyConstants.UserFilterStrategyId: {
                var filter = sharedEntity.entity;
                var expressionString = ExpressionHelper_1.ExpressionHelper.ConvertExpressionToString(filter.Expression, this.props.Columns);
                return (React.createElement(rebass_1.Flex, { flexDirection: "row", alignItems: "center" },
                    React.createElement(rebass_1.Flex, { flex: 4 }, filter.Name),
                    React.createElement(rebass_1.Flex, { flex: 8 }, expressionString)));
            }
            case StrategyConstants.AdvancedSearchStrategyId: {
                var search = sharedEntity.entity;
                var expressionString = ExpressionHelper_1.ExpressionHelper.ConvertExpressionToString(search.Expression, this.props.Columns);
                return (React.createElement(rebass_1.Flex, { flexDirection: "row", alignItems: "center" },
                    React.createElement(rebass_1.Flex, { flex: 4 }, search.Name),
                    React.createElement(rebass_1.Flex, { flex: 8 }, expressionString)));
            }
            case StrategyConstants.LayoutStrategyId: {
                var layout = sharedEntity.entity;
                return (React.createElement(rebass_1.Flex, { flexDirection: "row", alignItems: "center" },
                    React.createElement(rebass_1.Flex, { flex: 4 }, layout.Name),
                    React.createElement(rebass_1.Flex, { flex: 8 }, layout.Columns.join(', '))));
            }
            case StrategyConstants.FormatColumnStrategyId: {
                var fc = sharedEntity.entity;
                return (React.createElement(rebass_1.Flex, { flexDirection: "row", alignItems: "center" },
                    React.createElement(rebass_1.Flex, { flex: 4 }, ColumnHelper_1.ColumnHelper.getFriendlyNameFromColumnId(fc.ColumnId, this.props.Columns)),
                    React.createElement(rebass_1.Flex, { flex: 8 },
                        React.createElement(StyleVisualItem_1.StyleVisualItem, { Style: fc.Style }))));
            }
            case StrategyConstants.ExportStrategyId: {
                var range = sharedEntity.entity;
                var expressionString = ExpressionHelper_1.ExpressionHelper.ConvertExpressionToString(range.Expression, this.props.Columns);
                return (React.createElement(rebass_1.Flex, { flexDirection: "row", alignItems: "center" },
                    React.createElement(rebass_1.Flex, { flex: 4 }, range.Name),
                    React.createElement(rebass_1.Flex, { flex: 8 }, expressionString)));
            }
            case StrategyConstants.ColumnFilterStrategyId: {
                return 'NEED TO DO  COLUMN FILTER'; // not sure actually
            }
            default:
                return 'NOT IMPLEMENTED';
        }
    };
    return TeamSharingPopupComponent;
}(React.Component));
function mapStateToProps(state, ownProps) {
    return {
        Entities: state.TeamSharing.SharedEntities,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        onGetSharedItems: function () { return dispatch(TeamSharingRedux.TeamSharingGet()); },
        onImportItem: function (entity, strategy) {
            return dispatch(TeamSharingRedux.TeamSharingImportItem(entity, strategy));
        },
    };
}
exports.TeamSharingPopup = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(TeamSharingPopupComponent);
