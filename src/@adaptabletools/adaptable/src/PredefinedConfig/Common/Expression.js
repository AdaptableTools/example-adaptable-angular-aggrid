"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Uuid_1 = require("../Uuid");
/**
 * The main Expression (or Query) object used in multiple Adaptable functions
 *
 * It is comprised of 3 (nullable) collections:
 *
 * - Column Values: actual cell value in the a Column - can be either Display or Raw Values
 *
 * - Filters: can be a mix of *Column Filters* (created by the user at run-time), *System Filters* (filters which are shipped by Adaptable) and *User Filters* (special filters which the user creates and names and can then re-use as required).
 *
 * - Ranges: an evaluation (e.g. 'GreaterThan 15', 'LessThan [Bid]' etc.)
 */
var Expression = /** @class */ (function () {
    /**
     * @property {ColumnValueExpressions} - Column values (as displayed in the Grid)
     */
    /**
     * @property {FilterExpressions} - User, System and Column Filters contained in the expression
     */
    /**
     * @property {RangeExpressions} - Ranges contained in the expression
     */
    function Expression(ColumnValueExpressions, FilterExpressions, RangeExpressions) {
        this.ColumnValueExpressions = ColumnValueExpressions;
        this.FilterExpressions = FilterExpressions;
        this.RangeExpressions = RangeExpressions;
        this.ColumnValueExpressions = ColumnValueExpressions == undefined ? [] : ColumnValueExpressions;
        this.FilterExpressions = FilterExpressions == undefined ? [] : FilterExpressions;
        this.RangeExpressions = RangeExpressions == undefined ? [] : RangeExpressions;
        this.Uuid = Uuid_1.createUuid();
    }
    return Expression;
}());
exports.Expression = Expression;
