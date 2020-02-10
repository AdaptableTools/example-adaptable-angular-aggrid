"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var Enums_1 = require("../../../PredefinedConfig/Common/Enums");
var StringExtensions_1 = require("../../../Utilities/Extensions/StringExtensions");
var ColumnSelector_1 = require("../../Components/Selectors/ColumnSelector");
var ArrayExtensions_1 = require("../../../Utilities/Extensions/ArrayExtensions");
var rebass_1 = require("rebass");
var Radio_1 = require("../../../components/Radio");
var Dropdown_1 = require("../../../components/Dropdown");
var WizardPanel_1 = require("../../../components/WizardPanel");
var HelpBlock_1 = require("../../../components/HelpBlock");
var ConditionalStyleScopeWizard = /** @class */ (function (_super) {
    tslib_1.__extends(ConditionalStyleScopeWizard, _super);
    function ConditionalStyleScopeWizard(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            ColumnId: StringExtensions_1.StringExtensions.IsNull(_this.props.Data.ColumnId) ? '' : _this.props.Data.ColumnId,
            ColumnCategoryId: StringExtensions_1.StringExtensions.IsNull(_this.props.Data.ColumnCategoryId)
                ? ''
                : _this.props.Data.ColumnCategoryId,
            ConditionalStyleScope: _this.props.Data.ConditionalStyleScope,
        };
        return _this;
    }
    ConditionalStyleScopeWizard.prototype.render = function () {
        var _this = this;
        var optionDataTypes = ['String', 'Number', 'Boolean', 'Date'].map(function (cc) {
            return {
                value: cc,
                label: cc,
            };
        });
        var optionColumnCategorys = this.props.ColumnCategories.map(function (cc) {
            return {
                value: cc.ColumnCategoryId,
                label: cc.ColumnCategoryId,
            };
        });
        return (React.createElement(WizardPanel_1.default, null,
            React.createElement(rebass_1.Flex, { flexDirection: "column", padding: 2 },
                React.createElement(HelpBlock_1.default, { marginBottom: 1 }, "Apply the Conditional Style to ALL cells in each matching row."),
                React.createElement(Radio_1.default, { marginLeft: 3, value: "Row", checked: this.state.ConditionalStyleScope == 'Row', onChange: function (checked, e) { return _this.onScopeSelectChanged(e); } }, "Whole Row"),
                React.createElement(HelpBlock_1.default, { marginBottom: 1 }, "Apply the Conditional Style to a single Column"),
                React.createElement(Radio_1.default, { marginLeft: 3, value: "Column", checked: this.state.ConditionalStyleScope == 'Column', onChange: function (checked, e) { return _this.onScopeSelectChanged(e); } }, "Column"),
                this.state.ConditionalStyleScope == 'Column' && (React.createElement(rebass_1.Box, { marginBottom: 2 },
                    React.createElement(ColumnSelector_1.ColumnSelector, { SelectedColumnIds: [this.state.ColumnId], ColumnList: this.props.Columns, onColumnChange: function (columns) { return _this.onColumnSelectedChanged(columns); }, SelectionMode: Enums_1.SelectionMode.Single }))),
                ArrayExtensions_1.ArrayExtensions.IsNotNullOrEmpty(this.props.ColumnCategories) && (React.createElement(rebass_1.Box, null,
                    React.createElement(HelpBlock_1.default, { marginBottom: 2 }, "Apply the Conditional Style to all the columns in a Column Category"),
                    React.createElement(Radio_1.default, { marginLeft: 3, value: "ColumnCategory", checked: this.state.ConditionalStyleScope == 'ColumnCategory', onChange: function (checked, e) {
                            return _this.onScopeSelectChanged(e);
                        } }, "Column Category"))),
                ArrayExtensions_1.ArrayExtensions.IsNotNullOrEmpty(this.props.ColumnCategories) &&
                    this.state.ConditionalStyleScope == 'ColumnCategory' && (React.createElement(rebass_1.Box, null,
                    React.createElement(Dropdown_1.default, { placeholder: "Select a Column Category", value: this.state.ColumnCategoryId, showEmptyItem: false, onChange: function (value) { return _this.onColumnCategorySelectedChanged(value); }, options: tslib_1.__spread([
                            {
                                label: 'Select',
                                value: 'select',
                            }
                        ], optionColumnCategorys) })))))
        /*
        
            </Box>
            <Box >
            <HelpBlock marginBottom={2}>
            Pick the column from the list below which will have conditional style applied.
            </HelpBlock>
              <Radio
               
                value="Column"
                checked={this.state.ConditionalStyleScope == 'Column'}
                onChange={(checked: boolean, e: React.SyntheticEvent) => this.onScopeSelectChanged(e)}
              >
                Column
              </Radio>{' '}
              
            </Box>
  
           
            {ArrayExtensions.IsNotNullOrEmpty(this.props.ColumnCategories) && (
               <HelpBlock marginBottom={2}>
              Pick the Column Category from the list below to apply the conditional style to all Column Categorys.
               </HelpBlock>
              <Box >
               {' '}
                <AdaptablePopover
                 
                  headerText={'Conditional Style: Column Categorys'}
                  bodyText={[
                    'Pick the Column Category from the list below to apply the conditional style to all Column Categorys.',
                  ]}
                />
              </Box>
            )}
            {ArrayExtensions.IsNotNullOrEmpty(this.props.ColumnCategories) &&
              this.state.ConditionalStyleScope == 'ColumnCategory' && (
                
              )}
          </WizardPanel>
        </div>
        */
        );
    };
    ConditionalStyleScopeWizard.prototype.onColumnSelectedChanged = function (columns) {
        var _this = this;
        this.setState({
            ColumnId: columns.length > 0 ? columns[0].ColumnId : '',
        }, function () { return _this.props.UpdateGoBackState(); });
    };
    ConditionalStyleScopeWizard.prototype.onColumnCategorySelectedChanged = function (value) {
        var _this = this;
        this.setState({ ColumnCategoryId: value }, function () {
            return _this.props.UpdateGoBackState();
        });
    };
    /*
    private onDataTypeSelectedChanged(value: any) {
      this.setState({ DataType: value } as ConditionalStyleScopeWizardState, () =>
        this.props.UpdateGoBackState()
      );
    }
    */
    ConditionalStyleScopeWizard.prototype.onScopeSelectChanged = function (event) {
        var _this = this;
        var e = event.target;
        if (e.value == 'Column') {
            this.setState({ ConditionalStyleScope: 'Column' }, function () {
                return _this.props.UpdateGoBackState();
            });
        }
        else if (e.value == 'ColumnCategory') {
            this.setState({
                ConditionalStyleScope: 'ColumnCategory',
            }, function () { return _this.props.UpdateGoBackState(); });
            /*
          } else if (e.value == 'DataType') {
            this.setState(
              {
                ConditionalStyleScope: 'DataType',
              } as ConditionalStyleScopeWizardState,
              () => this.props.UpdateGoBackState()
            );
            */
        }
        else {
            this.setState({
                ConditionalStyleScope: 'Row',
                ColumnId: '',
            }, function () { return _this.props.UpdateGoBackState(); });
        }
    };
    ConditionalStyleScopeWizard.prototype.canNext = function () {
        if (!this.state.ConditionalStyleScope == null) {
            return false;
        }
        if (this.state.ConditionalStyleScope == 'Column' &&
            StringExtensions_1.StringExtensions.IsEmpty(this.state.ColumnId)) {
            return false;
        }
        //   if (
        //     this.state.ConditionalStyleScope == 'DataType' &&
        //     StringExtensions.IsNullOrEmpty(this.state.DataType)
        //   ) {
        //     return false;
        //   }
        if (this.state.ConditionalStyleScope == 'ColumnCategory' &&
            StringExtensions_1.StringExtensions.IsEmpty(this.state.ColumnCategoryId)) {
            return false;
        }
        return true;
    };
    ConditionalStyleScopeWizard.prototype.canBack = function () {
        return false;
    };
    ConditionalStyleScopeWizard.prototype.Next = function () {
        this.props.Data.ColumnId = this.state.ColumnId;
        this.props.Data.ColumnCategoryId = this.state.ColumnCategoryId;
        this.props.Data.ConditionalStyleScope = this.state.ConditionalStyleScope;
        //  this.props.Data.DataType =
        //    this.state.ConditionalStyleScope == 'DataType' ? this.state.DataType : undefined;
    };
    ConditionalStyleScopeWizard.prototype.Back = function () {
        // todo
    };
    ConditionalStyleScopeWizard.prototype.GetIndexStepIncrement = function () {
        return 1;
    };
    ConditionalStyleScopeWizard.prototype.GetIndexStepDecrement = function () {
        return 1;
    };
    return ConditionalStyleScopeWizard;
}(React.Component));
exports.ConditionalStyleScopeWizard = ConditionalStyleScopeWizard;
