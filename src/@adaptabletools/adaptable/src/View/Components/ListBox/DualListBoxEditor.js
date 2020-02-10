"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var Enums_1 = require("../../../PredefinedConfig/Common/Enums");
var ListBoxFilterSortComponent_1 = require("./ListBoxFilterSortComponent");
var ArrayExtensions_1 = require("../../../Utilities/Extensions/ArrayExtensions");
var StringExtensions_1 = require("../../../Utilities/Extensions/StringExtensions");
var ListGroupItem_1 = require("../../../components/List/ListGroupItem");
var CheckBox_1 = require("../../../components/CheckBox");
var SimpleButton_1 = require("../../../components/SimpleButton");
var rebass_1 = require("rebass");
var Panel_1 = require("../../../components/Panel");
var ListGroup_1 = require("../../../components/List/ListGroup");
var SelectableList_1 = require("../../../components/SelectableList");
var DisplaySize;
(function (DisplaySize) {
    DisplaySize[DisplaySize["Large"] = 0] = "Large";
    DisplaySize[DisplaySize["Small"] = 1] = "Small";
    DisplaySize[DisplaySize["XSmall"] = 2] = "XSmall";
})(DisplaySize = exports.DisplaySize || (exports.DisplaySize = {}));
var ButtonDirection = function (props) { return (React.createElement(SimpleButton_1.default, tslib_1.__assign({}, props, { style: tslib_1.__assign({ whiteSpace: 'nowrap', justifyContent: 'center' }, props.style) }))); };
var DualListBoxEditor = /** @class */ (function (_super) {
    tslib_1.__extends(DualListBoxEditor, _super);
    function DualListBoxEditor(props) {
        var _this = _super.call(this, props) || this;
        _this.isValueFilteredOut = function (item, FilterValue, Values) {
            if (FilterValue === void 0) { FilterValue = _this.state.FilterValue; }
            if (Values === void 0) { Values = _this.state.AvailableValues; }
            // if not master child then simply filter on the value
            if (ArrayExtensions_1.ArrayExtensions.IsNullOrEmpty(_this.state.MasterValues)) {
                return (FilterValue != '' && item.toLocaleLowerCase().indexOf(FilterValue.toLocaleLowerCase()) < 0);
            }
            var masterNames = _this.state.MasterValues.map(function (mv) {
                return mv.value;
            });
            var isFilterMode = StringExtensions_1.StringExtensions.IsNotEmpty(FilterValue);
            if (ArrayExtensions_1.ArrayExtensions.ContainsItem(masterNames, item)) {
                var masterChildren = _this.props.MasterChildren.find(function (mc) { return mc.Master == item; });
                var filterMaster_1 = true;
                if (masterChildren) {
                    // so we are dealing with a Master
                    masterChildren.Children.forEach(function (c) {
                        if (ArrayExtensions_1.ArrayExtensions.ContainsItem(Values, c)) {
                            // we need the child to be present to show the master
                            if (isFilterMode) {
                                // if there is a filter then the child needs to pass that in order to display the Master
                                if (c.toLocaleLowerCase().indexOf(FilterValue.toLocaleLowerCase()) >= 0) {
                                    filterMaster_1 = false;
                                }
                            }
                            else {
                                // if no filter, then always show the Master
                                filterMaster_1 = false;
                            }
                        }
                    });
                }
                return filterMaster_1;
            }
            else {
                // its a child - so first check that the Master is open
                var masterChildren_1 = _this.props.MasterChildren.find(function (mc) {
                    return ArrayExtensions_1.ArrayExtensions.ContainsItem(mc.Children, item);
                });
                if (masterChildren_1) {
                    var masterValue = _this.state.MasterValues.find(function (mv) { return mv.value == masterChildren_1.Master; });
                    if (!masterValue.isOpen) {
                        // no open Master so always filter
                        return true;
                    }
                    else {
                        // if there is a filter then check on that, otherwise return false
                        if (isFilterMode) {
                            return item.toLocaleLowerCase().indexOf(FilterValue.toLocaleLowerCase()) < 0;
                        }
                        else {
                            return false;
                        }
                    }
                }
                else {
                    // for orphans filter as normal
                    return item.toLocaleLowerCase().indexOf(FilterValue.toLocaleLowerCase()) < 0;
                }
            }
        };
        _this.getSelectedItemId = function (index) {
            var item = _this.state.SelectedValues[index];
            if (!item) {
                return -1;
            }
            var display = _this.props.DisplayMember ? item[_this.props.DisplayMember] : item;
            if (_this.isValueFilteredOut(display, _this.state.SelectedValuesFilterValue, _this.state.SelectedValues)) {
                return -1;
            }
            return item;
        };
        _this.onSelectedListSelectionChange = function (selection) {
            var UiSelectedSelectedValues = Object.keys(selection);
            UiSelectedSelectedValues.sort(function (a, b) { return _this.state.SelectedValues.indexOf(a) - _this.state.SelectedValues.indexOf(b); });
            _this.setState({ UiSelectedSelectedValues: UiSelectedSelectedValues });
        };
        _this.getAvailableItemId = function (index) {
            var item = _this.state.AvailableValues[index];
            if (!item) {
                return -1;
            }
            var display = _this.props.DisplayMember ? item[_this.props.DisplayMember] : item;
            var value = _this.props.ValueMember ? item[_this.props.ValueMember] : item;
            if (_this.isValueFilteredOut(display)) {
                return -1;
            }
            return value;
        };
        /**
         * @param selection - is a map, values being item keys (their textual representation), while values being true
         */
        _this.onAvailableListSelectionChange = function (selection) {
            var UiSelectedAvailableValues = Object.keys(selection);
            var availableValues = _this.state.AvailableValues;
            var availableValuesMap = {};
            if (_this.props.ValueMember) {
                availableValues = availableValues.map(function (x) {
                    var key = x[_this.props.ValueMember];
                    availableValuesMap[key] = x;
                    return key;
                });
            }
            UiSelectedAvailableValues.sort(function (a, b) { return availableValues.indexOf(a) - availableValues.indexOf(b); });
            if (_this.props.ValueMember) {
                UiSelectedAvailableValues = UiSelectedAvailableValues.map(function (k) { return availableValuesMap[k]; });
            }
            _this.setState({ UiSelectedAvailableValues: UiSelectedAvailableValues });
        };
        _this.placeholder = document.createElement('button');
        _this.placeholder.className = 'placeholder';
        _this.placeholder.classList.add('list-group-item');
        _this.placeholder.type = 'button';
        var availableValues = new Array();
        _this.refFirstSelectedSelected = function (node) {
            _this.firstSelected = node;
        };
        _this.props.AvailableValues.forEach(function (x) {
            if (_this.props.ValueMember) {
                if (_this.props.SelectedValues.findIndex(function (y) { return y == x[_this.props.ValueMember]; }) < 0) {
                    availableValues.push(x);
                }
            }
            else {
                if (_this.props.SelectedValues.indexOf(x) < 0) {
                    availableValues.push(x);
                }
            }
        });
        _this.state = {
            SelectedValues: _this.props.SelectedValues,
            AvailableValues: _this.createAvailableValuesList(availableValues, Enums_1.SortOrder.Ascending, _this.props.SortMember),
            UiSelectedSelectedValues: [],
            UiSelectedAvailableValues: [],
            FilterValue: '',
            SelectedValuesFilterValue: '',
            SortOrder: Enums_1.SortOrder.Ascending,
            SelectedValuesSortOrder: Enums_1.SortOrder.Ascending,
            AllValues: _this.props.AvailableValues,
            MasterValues: _this.buildMasterValues(_this.props.MasterChildren),
        };
        return _this;
    }
    DualListBoxEditor.prototype.UNSAFE_componentWillReceiveProps = function (nextProps, nextContext) {
        var availableValues = new Array();
        nextProps.AvailableValues.forEach(function (x) {
            if (nextProps.ValueMember) {
                if (nextProps.SelectedValues.findIndex(function (y) { return y == x[nextProps.ValueMember]; }) < 0) {
                    availableValues.push(x);
                }
            }
            else {
                if (nextProps.SelectedValues.indexOf(x) < 0) {
                    availableValues.push(x);
                }
            }
        });
        //we need to rebuild the list of UI Selected items in case we are managing non primitive objects as we compare stuff on instance rather than properties
        var uiAvailableSelected;
        var uiSelectedSelected;
        if (nextProps.ValueMember) {
            uiAvailableSelected = [];
            this.state.UiSelectedAvailableValues.forEach(function (x) {
                var item = availableValues.find(function (y) { return y[nextProps.ValueMember] == x[nextProps.ValueMember]; });
                if (item) {
                    uiAvailableSelected.push(item);
                }
            });
            uiSelectedSelected = [];
            this.state.UiSelectedSelectedValues.forEach(function (x) {
                var item = nextProps.SelectedValues.find(function (y) { return y == x; });
                if (item) {
                    uiSelectedSelected.push(item);
                }
            });
        }
        else {
            uiAvailableSelected = this.state.UiSelectedAvailableValues;
            uiSelectedSelected = this.state.UiSelectedSelectedValues;
        }
        this.setState({
            SelectedValues: nextProps.SelectedValues,
            AvailableValues: this.createAvailableValuesList(availableValues, this.state.SortOrder, nextProps.SortMember),
            UiSelectedAvailableValues: uiAvailableSelected,
            UiSelectedSelectedValues: uiSelectedSelected,
            FilterValue: this.state.FilterValue,
            SortOrder: this.state.SortOrder,
            MasterValues: this.buildMasterValues(nextProps.MasterChildren),
        });
    };
    DualListBoxEditor.prototype.render = function () {
        var _this = this;
        var setRefFirstSelectedSelected = true;
        var displaySize = this.props.DisplaySize
            ? this.props.DisplaySize
            : DisplaySize.Large;
        // build selected elements
        var selectedElements = this.state.SelectedValues.map(function (x, index) {
            var isActive = _this.state.UiSelectedSelectedValues.indexOf(x) >= 0;
            var display = _this.props.DisplayMember ? x[_this.props.DisplayMember] : x;
            if (_this.isValueFilteredOut(display, _this.state.SelectedValuesFilterValue, _this.state.SelectedValues)) {
                return null;
            }
            var result = (React.createElement(ListGroupItem_1.default, { key: x + "-1", index: index, className: "Selected", draggable: true, style: listGroupItemStyle, active: isActive, ref: isActive && setRefFirstSelectedSelected ? _this.refFirstSelectedSelected : null, onDragStart: function (event) { return _this.DragSelectedStart(event, x); }, onDragEnd: function () { return _this.DragSelectedEnd(); }, value: x }, x));
            if (isActive && setRefFirstSelectedSelected) {
                setRefFirstSelectedSelected = false;
            }
            return result;
        });
        // build available elements - might have master/children
        var availableElements = this.state.AvailableValues.map(function (x, index) {
            var isActive = _this.state.UiSelectedAvailableValues.indexOf(x) >= 0;
            var display = _this.props.DisplayMember ? x[_this.props.DisplayMember] : x;
            var value = _this.props.ValueMember ? x[_this.props.ValueMember] : x;
            var masterValue = _this.state.MasterValues.find(function (mv) { return mv.value == x; });
            var isMasterElement = masterValue != null;
            if (_this.isValueFilteredOut(display)) {
                return null;
            }
            else {
                return isMasterElement ? (React.createElement(ListGroupItem_1.default, { key: value + "-master", className: "Available", index: index, selectionId: value, style: listGroupItemStyle, active: isActive, draggable: false, value: value },
                    React.createElement(CheckBox_1.default, { key: masterValue.value, checked: masterValue.isOpen, onChange: function (checked) { return _this.onMasterValueCheckChanged(checked, x); } }, display))) : (React.createElement(ListGroupItem_1.default, { className: "Available", style: listGroupItemStyle, active: isActive, index: index, draggable: true, key: value + "-not-master", onDragStart: function (event) { return _this.DragAvailableStart(event, x); }, onDragEnd: function () { return _this.DragAvailableEnd(); }, value: value }, display));
            }
        });
        var headerFirstListBox = (React.createElement(ListBoxFilterSortComponent_1.ListBoxFilterSortComponent, { FilterValue: this.state.FilterValue, sortColumnValues: function () { return _this.sortColumnValues(); }, SortOrder: this.state.SortOrder, handleChangeFilterValue: function (e) { return _this.handleChangeFilterValue(e); }, DisableSort: ArrayExtensions_1.ArrayExtensions.IsNotEmpty(this.state.MasterValues) }));
        var headerSecondListBox = (React.createElement(ListBoxFilterSortComponent_1.ListBoxFilterSortComponent, { FilterValue: this.state.SelectedValuesFilterValue, sortColumnValues: function () { return _this.sortSelectedColumnValues(); }, SortOrder: this.state.SelectedValuesSortOrder, handleChangeFilterValue: function (e) { return _this.handleChangeSelectedValuesFilterValue(e); }, DisableSort: ArrayExtensions_1.ArrayExtensions.IsNotEmpty(this.state.MasterValues) }));
        return (React.createElement(rebass_1.Flex, { alignItems: "stretch", flexDirection: "row", style: tslib_1.__assign(tslib_1.__assign({}, this.props.style), { maxHeight: '100%', width: '100%' }) },
            React.createElement(Panel_1.default, { header: this.props.HeaderAvailable, bodyProps: { padding: 0 }, marginRight: 2, style: { flex: '4 0 0%' }, bodyScroll: true },
                headerFirstListBox,
                React.createElement(SelectableList_1.default, { getItemId: this.getAvailableItemId, onSelectedChange: this.onAvailableListSelectionChange },
                    React.createElement(ListGroup_1.default, { className: "ab-AvailableDropZone", style: listGroupStyle, onDragEnter: function (event) { return _this.DragEnterAvailable(event); }, onDragOver: function (event) { return _this.DragOverAvailable(event); }, onDragLeave: function (event) { return _this.DragLeaveAvailable(event); } }, availableElements))),
            React.createElement(rebass_1.Flex, { flexDirection: "column", justifyContent: "center" },
                React.createElement(ButtonDirection, { marginBottom: 2, icon: "fast-forward", iconPosition: "end", disabled: this.state.AvailableValues.length == 0, onClick: function () { return _this.AddAll(); } }, "Add All"),
                React.createElement(ButtonDirection, { iconPosition: "end", icon: 'arrow-right', marginBottom: 3, disabled: this.state.UiSelectedAvailableValues.length == 0, onClick: function () { return _this.Add(); } }, "Add"),
                React.createElement(ButtonDirection, { icon: 'arrow-left', marginBottom: 2, iconPosition: "start", disabled: this.state.UiSelectedSelectedValues.length == 0, onClick: function () { return _this.Remove(); } }, "Remove"),
                React.createElement(ButtonDirection, { marginBottom: 2, icon: "fast-backward", iconPosition: "start", disabled: this.state.SelectedValues.length == 0, onClick: function () { return _this.RemoveAll(); } }, "Remove All")),
            React.createElement(Panel_1.default, { header: this.props.HeaderSelected, bodyScroll: true, bodyProps: {
                    padding: 0,
                }, style: { flex: '4 0 0%' }, marginLeft: 2, marginRight: 2 },
                headerSecondListBox,
                React.createElement(SelectableList_1.default, { getItemId: this.getSelectedItemId, onSelectedChange: this.onSelectedListSelectionChange },
                    React.createElement(ListGroup_1.default, { style: listGroupStyle, className: "ab-SelectedDropZone", onDragEnter: function (event) { return _this.DragEnterSelected(event); }, onDragOver: function (event) { return _this.DragOverSelected(event); }, onDragLeave: function (event) { return _this.DragLeaveSelected(event); } }, selectedElements))),
            React.createElement(rebass_1.Flex, { flexDirection: "column", justifyContent: "center" },
                React.createElement(ButtonDirection, { marginBottom: 2, iconPosition: "start", icon: "triangle-up", disabled: !this.canGoTopOrUp(), onClick: function () { return _this.Top(); } }, "Top"),
                React.createElement(ButtonDirection, { marginBottom: 2, iconPosition: "start", icon: "arrow-up", disabled: !this.canGoTopOrUp(), onClick: function () { return _this.Up(); } }, "Up"),
                React.createElement(ButtonDirection, { marginBottom: 2, icon: "arrow-down", iconPosition: "start", disabled: !this.canGoDownOrBottom(), onClick: function () { return _this.Down(); } }, "Down"),
                React.createElement(ButtonDirection, { marginBottom: 2, icon: "triangle-down", iconPosition: "start", disabled: !this.canGoDownOrBottom(), onClick: function () { return _this.Bottom(); } }, "Bottom"))));
    };
    DualListBoxEditor.prototype.buildMasterValues = function (masterChildren) {
        if (ArrayExtensions_1.ArrayExtensions.IsNullOrEmpty(masterChildren)) {
            return [];
        }
        return this.props.MasterChildren.map(function (mc) {
            return { value: mc.Master, isAvailable: false, isOpen: true };
        });
    };
    DualListBoxEditor.prototype.onMasterValueCheckChanged = function (checked, item) {
        var masterValues = [].concat(this.state.MasterValues);
        var currentMasterValue = masterValues.find(function (mv) { return mv.value == item; });
        currentMasterValue.isOpen = checked;
        var newArray = tslib_1.__spread(this.state.UiSelectedAvailableValues);
        var index = this.state.UiSelectedAvailableValues.indexOf(item);
        if (index >= 0) {
            var newArray_1 = tslib_1.__spread(this.state.UiSelectedAvailableValues);
            newArray_1.splice(index, 1);
        }
        this.setState({
            MasterValues: masterValues,
            UiSelectedAvailableValues: newArray,
        });
    };
    DualListBoxEditor.prototype.createAvailableValuesList = function (availableValues, sortOrder, sortMember) {
        var _this = this;
        // if there are no master / children then sort the values
        if (ArrayExtensions_1.ArrayExtensions.IsNullOrEmpty(this.props.MasterChildren)) {
            var valstoReturn = ArrayExtensions_1.ArrayExtensions.sortArrayWithProperty(sortOrder, availableValues, sortMember);
            return valstoReturn;
        }
        // we do have master / children
        var returnValues = [];
        // first add any orphans = that are not masters or are not children
        availableValues.forEach(function (av) {
            var masterChildren = _this.props.MasterChildren.find(function (mc) { return mc.Master == av || ArrayExtensions_1.ArrayExtensions.ContainsItem(mc.Children, av); });
            if (!masterChildren) {
                returnValues.push(av);
            }
        });
        // now add all the Master Children
        this.props.MasterChildren.forEach(function (mc) {
            var availableChildren = [];
            mc.Children.forEach(function (c) {
                if (ArrayExtensions_1.ArrayExtensions.ContainsItem(availableValues, c)) {
                    availableChildren.push(c);
                }
            });
            // only add the item if there are available children
            if (ArrayExtensions_1.ArrayExtensions.IsNotEmpty(availableChildren)) {
                returnValues.push(mc.Master);
                availableChildren.forEach(function (c) {
                    returnValues.push(c);
                });
            }
        });
        return returnValues;
    };
    DualListBoxEditor.prototype.canGoTopOrUp = function () {
        var _this = this;
        return (this.state.UiSelectedSelectedValues.length != 0 &&
            this.state.UiSelectedSelectedValues.every(function (x) { return _this.state.SelectedValues.indexOf(x) > 0; }));
    };
    DualListBoxEditor.prototype.canGoDownOrBottom = function () {
        var _this = this;
        return (this.state.UiSelectedSelectedValues.length != 0 &&
            this.state.UiSelectedSelectedValues.every(function (x) { return _this.state.SelectedValues.indexOf(x) < _this.state.SelectedValues.length - 1; }));
    };
    DualListBoxEditor.prototype.ensureFirstSelectedItemVisible = function (top) {
        var itemComponentDOMNode = this.firstSelected;
        if (itemComponentDOMNode) {
            itemComponentDOMNode.scrollIntoView(top);
        }
    };
    DualListBoxEditor.prototype.Top = function () {
        var _this = this;
        var newSelectedValues = [].concat(this.state.UiSelectedSelectedValues, this.state.SelectedValues.filter(function (x) { return _this.state.UiSelectedSelectedValues.indexOf(x) < 0; }));
        this.setState({
            SelectedValues: newSelectedValues,
            UiSelectedSelectedValues: [],
        }, function () {
            _this.raiseOnChange();
            _this.ensureFirstSelectedItemVisible(true);
        });
    };
    DualListBoxEditor.prototype.Up = function () {
        var e_1, _a;
        var _this = this;
        var newSelectedValues = tslib_1.__spread(this.state.SelectedValues);
        try {
            for (var _b = tslib_1.__values(this.state.UiSelectedSelectedValues), _c = _b.next(); !_c.done; _c = _b.next()) {
                var selElement = _c.value;
                var index = newSelectedValues.indexOf(selElement);
                ArrayExtensions_1.ArrayExtensions.moveArray(newSelectedValues, index, index - 1);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        this.setState({
            SelectedValues: newSelectedValues,
        }, function () {
            _this.raiseOnChange();
            _this.ensureFirstSelectedItemVisible(false);
        });
    };
    DualListBoxEditor.prototype.Bottom = function () {
        var _this = this;
        var newSelectedValues = [].concat(this.state.SelectedValues.filter(function (x) { return _this.state.UiSelectedSelectedValues.indexOf(x) < 0; }), this.state.UiSelectedSelectedValues);
        this.setState({
            SelectedValues: newSelectedValues,
            UiSelectedSelectedValues: [],
        }, function () {
            _this.raiseOnChange();
            _this.ensureFirstSelectedItemVisible(true);
        });
    };
    DualListBoxEditor.prototype.Down = function () {
        var _this = this;
        var newSelectedValues = tslib_1.__spread(this.state.SelectedValues);
        for (var index = this.state.UiSelectedSelectedValues.length - 1; index >= 0; index--) {
            var indexglob = newSelectedValues.indexOf(this.state.UiSelectedSelectedValues[index]);
            ArrayExtensions_1.ArrayExtensions.moveArray(newSelectedValues, indexglob, indexglob + 1);
        }
        this.setState({
            SelectedValues: newSelectedValues,
        }, function () {
            _this.raiseOnChange();
            _this.ensureFirstSelectedItemVisible(false);
        });
    };
    DualListBoxEditor.prototype.Add = function () {
        var _this = this;
        var newSelectedValues = tslib_1.__spread(this.state.SelectedValues);
        var newAvailableValues = tslib_1.__spread(this.state.AvailableValues);
        var valuesToAdd = this.getValuesToAdd(this.state.UiSelectedAvailableValues);
        valuesToAdd.forEach(function (x) {
            var index = newAvailableValues.indexOf(x);
            newAvailableValues.splice(index, 1);
            if (_this.props.ValueMember) {
                newSelectedValues.push(x[_this.props.ValueMember]);
            }
            else {
                newSelectedValues.push(x);
            }
        });
        newAvailableValues = this.createAvailableValuesList(newAvailableValues, this.state.SortOrder, this.props.SortMember);
        this.setState({
            UiSelectedAvailableValues: [],
            SelectedValues: newSelectedValues,
            AvailableValues: newAvailableValues,
        }, function () { return _this.raiseOnChange(); });
    };
    DualListBoxEditor.prototype.AddAll = function () {
        var _this = this;
        var newSelectedValues = [].concat(this.state.SelectedValues);
        var valuesToAdd = this.getValuesToAdd(this.state.AvailableValues);
        valuesToAdd.forEach(function (x) {
            if (_this.props.ValueMember) {
                newSelectedValues.push(x[_this.props.ValueMember]);
            }
            else {
                if (ArrayExtensions_1.ArrayExtensions.NotContainsItem(_this.state.MasterValues, x)) {
                    newSelectedValues.push(x);
                }
            }
        });
        var newAvailableValues = [];
        this.setState({
            UiSelectedSelectedValues: [],
            UiSelectedAvailableValues: [],
            SelectedValues: newSelectedValues,
            AvailableValues: newAvailableValues,
        }, function () { return _this.raiseOnChange(); });
    };
    DualListBoxEditor.prototype.getValuesToAdd = function (addedValues) {
        var _this = this;
        if (ArrayExtensions_1.ArrayExtensions.IsNullOrEmpty(this.props.MasterChildren)) {
            return addedValues;
        }
        var newAvailableValues = [];
        addedValues.forEach(function (av) {
            var masterChildren = _this.props.MasterChildren.find(function (mc) { return mc.Master == av; });
            if (masterChildren) {
                masterChildren.Children.forEach(function (c) {
                    if (ArrayExtensions_1.ArrayExtensions.ContainsItem(_this.state.AvailableValues, c)) {
                        ArrayExtensions_1.ArrayExtensions.AddItem(newAvailableValues, c);
                    }
                });
            }
            else {
                ArrayExtensions_1.ArrayExtensions.AddItem(newAvailableValues, av);
            }
        });
        return newAvailableValues;
    };
    DualListBoxEditor.prototype.RemoveAll = function () {
        var _this = this;
        var newSelectedValues = [];
        var newAvailableValues = [].concat(this.state.AllValues);
        newAvailableValues = this.createAvailableValuesList(newAvailableValues, this.state.SortOrder, this.props.SortMember);
        this.setState({
            UiSelectedSelectedValues: [],
            UiSelectedAvailableValues: [],
            SelectedValues: newSelectedValues,
            AvailableValues: newAvailableValues,
        }, function () { return _this.raiseOnChange(); });
    };
    DualListBoxEditor.prototype.Remove = function () {
        var _this = this;
        var newSelectedValues = tslib_1.__spread(this.state.SelectedValues);
        var newAvailableValues = tslib_1.__spread(this.state.AvailableValues);
        this.state.UiSelectedSelectedValues.forEach(function (x) {
            var index = newSelectedValues.indexOf(x);
            newSelectedValues.splice(index, 1);
            if (_this.props.ValueMember) {
                var originalItem = _this.state.AllValues.find(function (y) { return y[_this.props.ValueMember] == x; });
                if (originalItem) {
                    newAvailableValues.push(originalItem);
                }
            }
            else {
                var originalItem = _this.state.AllValues.find(function (y) { return y == x; });
                if (originalItem) {
                    newAvailableValues.push(originalItem);
                }
            }
        });
        newAvailableValues = this.createAvailableValuesList(newAvailableValues, this.state.SortOrder, this.props.SortMember);
        this.setState({
            UiSelectedSelectedValues: [],
            SelectedValues: newSelectedValues,
            AvailableValues: newAvailableValues,
        }, function () { return _this.raiseOnChange(); });
    };
    DualListBoxEditor.prototype.DragSelectedStart = function (e, listElement) {
        this.draggedHTMLElement = e.currentTarget;
        this.draggedElement = listElement;
    };
    DualListBoxEditor.prototype.DragSelectedEnd = function () {
        var _this = this;
        if (this.overHTMLElement && this.draggedElement) {
            //now we need to check in which drop area we dropped the selected item
            var to = void 0;
            var from = this.state.SelectedValues.indexOf(this.draggedElement);
            var newSelectedArray = void 0;
            var newAvailableValues = void 0;
            if (this.overHTMLElement.classList.contains('Available')) {
                if (this.props.DisplayMember) {
                    to = this.state.AvailableValues.findIndex(function (x) { return x[_this.props.DisplayMember] == _this.overHTMLElement.innerText; });
                }
                else {
                    to = this.state.AvailableValues.indexOf(this.overHTMLElement.innerText);
                }
                newSelectedArray = tslib_1.__spread(this.state.SelectedValues);
                newSelectedArray.splice(from, 1);
                newAvailableValues = tslib_1.__spread(this.state.AvailableValues);
                if (this.props.ValueMember) {
                    var originalItem_1 = this.state.AllValues.find(function (y) { return y[_this.props.ValueMember] == _this.draggedElement; });
                    if (originalItem_1) {
                        var checkForExistig = newAvailableValues.find(function (x) { return x == originalItem_1; });
                        if (!checkForExistig) {
                            newAvailableValues.splice(to, 0, originalItem_1);
                        }
                    }
                }
                else {
                    var originalItem_2 = this.state.AllValues.find(function (y) { return y == _this.draggedElement; });
                    if (originalItem_2) {
                        var checkForExistig = newAvailableValues.find(function (x) { return x == originalItem_2; });
                        if (!checkForExistig) {
                            newAvailableValues.splice(to, 0, originalItem_2);
                        }
                    }
                }
            }
            else if (this.overHTMLElement.classList.contains('ab-AvailableDropZone')) {
                newSelectedArray = tslib_1.__spread(this.state.SelectedValues);
                newSelectedArray.splice(from, 1);
                newAvailableValues = tslib_1.__spread(this.state.AvailableValues);
                if (this.props.ValueMember) {
                    var originalItem_3 = this.state.AllValues.find(function (y) { return y[_this.props.ValueMember] == _this.draggedElement; });
                    if (originalItem_3) {
                        var checkForExistig = newAvailableValues.find(function (x) { return x == originalItem_3; });
                        if (!checkForExistig) {
                            newAvailableValues.push(originalItem_3);
                        }
                    }
                }
                else {
                    var originalItem_4 = this.state.AllValues.find(function (y) { return y == _this.draggedElement; });
                    if (originalItem_4) {
                        var checkForExistig = newAvailableValues.find(function (x) { return x == originalItem_4; });
                        if (!checkForExistig) {
                            newAvailableValues.push(originalItem_4);
                        }
                    }
                }
            }
            else if (this.overHTMLElement.classList.contains('Selected')) {
                to = this.state.SelectedValues.indexOf(this.overHTMLElement.innerText);
                newSelectedArray = tslib_1.__spread(this.state.SelectedValues);
                newSelectedArray.splice(from, 1);
                newSelectedArray.splice(to, 0, this.draggedElement);
                newAvailableValues = tslib_1.__spread(this.state.AvailableValues);
            }
            else if (this.overHTMLElement.classList.contains('ab-SelectedDropZone')) {
                newSelectedArray = tslib_1.__spread(this.state.SelectedValues);
                newSelectedArray.splice(from, 1);
                newSelectedArray.push(this.draggedElement);
                newAvailableValues = tslib_1.__spread(this.state.AvailableValues);
            }
            //We remove our awesome placeholder
            if (this.overHTMLElement.classList.contains('ab-SelectedDropZone') ||
                this.overHTMLElement.classList.contains('ab-AvailableDropZone')) {
                this.overHTMLElement.removeChild(this.placeholder);
            }
            else {
                this.overHTMLElement.parentNode.removeChild(this.placeholder);
            }
            this.overHTMLElement = null;
            this.draggedHTMLElement = null;
            this.draggedElement = null;
            // Update state
            newAvailableValues = this.createAvailableValuesList(newAvailableValues, this.state.SortOrder, this.props.SortMember);
            this.setState({
                SelectedValues: newSelectedArray,
                AvailableValues: newAvailableValues,
                UiSelectedSelectedValues: [],
                UiSelectedAvailableValues: [],
            }, function () { return _this.raiseOnChange(); });
        }
    };
    DualListBoxEditor.prototype.DragAvailableStart = function (e, listElement) {
        this.draggedHTMLElement = e.currentTarget;
        this.draggedElement = listElement;
    };
    DualListBoxEditor.prototype.DragAvailableEnd = function () {
        var _this = this;
        if (this.overHTMLElement && this.draggedElement) {
            var to = void 0;
            var from = this.state.AvailableValues.indexOf(this.draggedElement);
            var newSelectedArray = void 0;
            var newAvailableValues = void 0;
            if (this.overHTMLElement.classList.contains('Selected')) {
                from = this.state.AvailableValues.indexOf(this.draggedElement);
                to = this.state.SelectedValues.indexOf(this.overHTMLElement.innerText);
                newSelectedArray = tslib_1.__spread(this.state.SelectedValues);
                if (this.props.ValueMember) {
                    newSelectedArray.splice(to, 0, this.draggedElement[this.props.ValueMember]);
                }
                else {
                    newSelectedArray.splice(to, 0, this.draggedElement);
                }
                newAvailableValues = tslib_1.__spread(this.state.AvailableValues);
                newAvailableValues.splice(from, 1);
            }
            else if (this.overHTMLElement.classList.contains('ab-SelectedDropZone')) {
                newSelectedArray = tslib_1.__spread(this.state.SelectedValues);
                if (this.props.ValueMember) {
                    newSelectedArray.push(this.draggedElement[this.props.ValueMember]);
                }
                else {
                    newSelectedArray.push(this.draggedElement);
                }
                newAvailableValues = tslib_1.__spread(this.state.AvailableValues);
                newAvailableValues.splice(from, 1);
            }
            //We remove our awesome placeholder
            if (this.overHTMLElement.classList.contains('ab-SelectedDropZone')) {
                this.overHTMLElement.removeChild(this.placeholder);
            }
            else {
                this.overHTMLElement.parentNode.removeChild(this.placeholder);
            }
            this.overHTMLElement = null;
            this.draggedHTMLElement = null;
            this.draggedElement = null;
            // Update state
            this.setState({
                SelectedValues: newSelectedArray,
                AvailableValues: newAvailableValues,
                UiSelectedSelectedValues: [],
                UiSelectedAvailableValues: [],
            }, function () { return _this.raiseOnChange(); });
        }
    };
    DualListBoxEditor.prototype.DragEnterAvailable = function (e) {
        e.preventDefault();
        e.stopPropagation();
    };
    DualListBoxEditor.prototype.DragOverAvailable = function (e) {
        e.preventDefault();
        e.stopPropagation();
        //we can only drop selected data into available
        if (!this.draggedHTMLElement.classList.contains('Selected')) {
            e.dataTransfer.dropEffect = 'none';
            return;
        }
        var targetElement = e.target;
        //we want to keep the reference of the last intem we were over to
        if (targetElement.classList.contains('placeholder')) {
            return;
        }
        this.overHTMLElement = targetElement;
        if (this.overHTMLElement.classList.contains('ab-AvailableDropZone')) {
            targetElement.appendChild(this.placeholder);
        }
        else {
            targetElement.parentNode.insertBefore(this.placeholder, targetElement);
        }
    };
    DualListBoxEditor.prototype.DragLeaveAvailable = function (e) {
        e.preventDefault();
        e.stopPropagation();
        var targetElement = e.target;
        if (targetElement.classList.contains('ab-AvailableDropZone') ||
            targetElement.classList.contains('placeholder')) {
            if (this.overHTMLElement) {
                if (this.overHTMLElement.classList.contains('ab-AvailableDropZone')) {
                    this.overHTMLElement.removeChild(this.placeholder);
                }
                else {
                    this.overHTMLElement.parentNode.removeChild(this.placeholder);
                }
                this.overHTMLElement = null;
            }
        }
    };
    DualListBoxEditor.prototype.DragEnterSelected = function (e) {
        e.preventDefault();
        e.stopPropagation();
    };
    DualListBoxEditor.prototype.DragOverSelected = function (e) {
        e.preventDefault();
        e.stopPropagation();
        var targetElement = e.target;
        //we want to keep the reference of the last intem we were over to
        if (targetElement.classList.contains('placeholder')) {
            return;
        }
        this.overHTMLElement = targetElement;
        if (this.overHTMLElement.classList.contains('ab-SelectedDropZone')) {
            targetElement.appendChild(this.placeholder);
        }
        else {
            targetElement.parentNode.insertBefore(this.placeholder, targetElement);
        }
    };
    DualListBoxEditor.prototype.DragLeaveSelected = function (e) {
        e.preventDefault();
        e.stopPropagation();
        var targetElement = e.target;
        if (targetElement.classList.contains('ab-SelectedDropZone') ||
            targetElement.classList.contains('placeholder')) {
            if (this.overHTMLElement) {
                if (this.overHTMLElement.classList.contains('ab-SelectedDropZone')) {
                    this.overHTMLElement.removeChild(this.placeholder);
                }
                else {
                    this.overHTMLElement.parentNode.removeChild(this.placeholder);
                }
                this.overHTMLElement = null;
            }
        }
    };
    DualListBoxEditor.prototype.handleChangeFilterValue = function (x) {
        this.setState({
            FilterValue: x,
        });
    };
    DualListBoxEditor.prototype.handleChangeSelectedValuesFilterValue = function (x) {
        this.setState({
            SelectedValuesFilterValue: x,
        });
    };
    DualListBoxEditor.prototype.sortColumnValues = function () {
        if (this.state.SortOrder == Enums_1.SortOrder.Ascending) {
            this.setState({
                AvailableValues: ArrayExtensions_1.ArrayExtensions.sortArrayWithProperty(Enums_1.SortOrder.Descending, this.state.AvailableValues, this.props.SortMember),
                SortOrder: Enums_1.SortOrder.Descending,
            });
        }
        else {
            this.setState({
                AvailableValues: ArrayExtensions_1.ArrayExtensions.sortArrayWithProperty(Enums_1.SortOrder.Ascending, this.state.AvailableValues, this.props.SortMember),
                SortOrder: Enums_1.SortOrder.Ascending,
            });
        }
    };
    DualListBoxEditor.prototype.sortSelectedColumnValues = function () {
        if (this.state.SelectedValuesSortOrder == Enums_1.SortOrder.Ascending) {
            this.setState({
                SelectedValues: ArrayExtensions_1.ArrayExtensions.sortArrayWithProperty(Enums_1.SortOrder.Descending, this.state.SelectedValues, this.props.SortMember),
                SelectedValuesSortOrder: Enums_1.SortOrder.Descending,
            });
        }
        else {
            this.setState({
                SelectedValues: ArrayExtensions_1.ArrayExtensions.sortArrayWithProperty(Enums_1.SortOrder.Ascending, this.state.SelectedValues, this.props.SortMember),
                SelectedValuesSortOrder: Enums_1.SortOrder.Ascending,
            });
        }
    };
    DualListBoxEditor.prototype.raiseOnChange = function () {
        this.props.onChange(this.state.SelectedValues);
    };
    return DualListBoxEditor;
}(React.Component));
exports.DualListBoxEditor = DualListBoxEditor;
var listGroupStyle = {
    overflowY: 'auto',
    marginBottom: '0px',
};
var listGroupItemStyle = {
    fontSize: 'small',
    padding: 'var(--ab-space-1)',
};
