"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var useSelection_1 = require("./useSelection");
var CheckBox_1 = require("../../../components/CheckBox");
var Radio_1 = require("../../../components/Radio");
var AdaptableObjectRow_1 = require("../../Components/AdaptableObjectRow");
var AdaptableObjectCollection_1 = require("../../Components/AdaptableObjectCollection");
var Dropdown_1 = require("../../../components/Dropdown");
var Input_1 = require("../../../components/Input");
var Helper_1 = require("../../../Utilities/Helpers/Helper");
var react_1 = require("react");
var dataTypes = [
    {
        value: 'abColDefString',
        label: 'Text (string)',
    },
    { value: 'abColDefNumber', label: 'Number' },
    {
        value: 'abColDefDate',
        label: 'Date',
    },
    {
        value: 'abColDefBoolean',
        label: 'Boolean',
    },
];
var inputStyle = { width: '100%', minWidth: 50, textAlign: 'start' };
var useForceRender = function () {
    var _a = tslib_1.__read(react_1.useState(Date.now()), 2), setNow = _a[1];
    return function () {
        setNow(Date.now());
    };
};
var ColumnsList = function (_a) {
    var cols = _a.columns, handle = _a.handle, onValidityChange = _a.onValidityChange;
    var rerender = useForceRender();
    var columnsRef = react_1.useRef(cols);
    var silentSetColumns = function (columns) {
        columnsRef.current = columns;
    };
    var setColumns = function (columns) {
        silentSetColumns(columns);
        rerender();
    };
    var getColumns = function () { return columnsRef.current; };
    var columns = columnsRef.current;
    var onColumnChange = function (col, value, property) {
        var _a;
        col = tslib_1.__assign(tslib_1.__assign({}, col), (_a = {}, _a[property] = value, _a));
        var cols = getColumns().map(function (c) {
            if (c.field === col.field) {
                return col;
            }
            return c;
        });
        setColumns(cols);
    };
    var onColumnBatchChange = function (value, property) {
        var cols = getColumns().map(function (c) {
            var _a;
            return (tslib_1.__assign(tslib_1.__assign({}, c), (_a = {}, _a[property] = value, _a)));
        });
        setColumns(cols);
    };
    var setColumnCaption = function (caption, field) {
        var cols = getColumns().map(function (c) {
            if (c.field === field) {
                var newCol = tslib_1.__assign(tslib_1.__assign({}, c), { caption: caption });
                return newCol;
            }
            return c;
        });
        silentSetColumns(cols);
    };
    var onColumnTypeChange = function (col, type) {
        var cols = getColumns().map(function (c) {
            if (c.field === col.field) {
                return tslib_1.__assign(tslib_1.__assign({}, c), { type: type });
            }
            return c;
        });
        setColumns(cols);
    };
    var _b = tslib_1.__read(React.useState(columns[0].field), 2), primaryKeyField = _b[0], setPrimaryKeyField = _b[1];
    var _c = useSelection_1.default(columns, true, null), includedColumnsMap = _c.selected, isIncludedColumn = _c.isSelected, isAllIncludedColumns = _c.isAllSelected, isNoneIncludedColumns = _c.isNoneSelected, includeColumn = _c.selectColumn, excludeColumn = _c.deselectColumn, includeAllColumns = _c.selectAll, excludeAllColumns = _c.deselectAll;
    handle.current = {
        getColumns: function () { return getColumns().filter(function (col) { return isIncludedColumn(col.field); }); },
        getPrimaryKey: function () { return primaryKeyField; },
    };
    var _d = useSelection_1.default(columns, true, 'sortable', {
        onBatchChange: function (flag) {
            onColumnBatchChange(flag, 'sortable');
        },
        onChange: function (col, flag) {
            onColumnChange(col, flag, 'sortable');
        },
    }), isSortableColumn = _d.isSelected, isAllSortableColumns = _d.isAllSelected, isNoneSortableColumns = _d.isNoneSelected, setSortableColumn = _d.selectColumn, setUnsortableColumn = _d.deselectColumn, setAllSortable = _d.selectAll, setAllUnsortable = _d.deselectAll;
    var _e = useSelection_1.default(columns, true, 'resizable', {
        onBatchChange: function (flag) {
            onColumnBatchChange(flag, 'resizable');
        },
        onChange: function (col, flag) {
            onColumnChange(col, flag, 'resizable');
        },
    }), isResizableColumn = _e.isSelected, isAllResizableColumns = _e.isAllSelected, isNoneResizableColumns = _e.isNoneSelected, setResizableColumn = _e.selectColumn, setUnresizableColumn = _e.deselectColumn, setAllResizable = _e.selectAll, setAllUnresizable = _e.deselectAll;
    var _f = useSelection_1.default(columns, true, 'editable', {
        onBatchChange: function (flag) {
            onColumnBatchChange(flag, 'editable');
        },
        onChange: function (col, flag) {
            onColumnChange(col, flag, 'editable');
        },
    }), isEditableColumn = _f.isSelected, isAllEditableColumns = _f.isAllSelected, isNoneEditableColumns = _f.isNoneSelected, setEditableColumn = _f.selectColumn, setUneditableColumn = _f.deselectColumn, setAllEditable = _f.selectAll, setAllUneditable = _f.deselectAll;
    var _g = useSelection_1.default(columns, true, 'filter', {
        onBatchChange: function (flag) {
            onColumnBatchChange(flag, 'filter');
        },
        onChange: function (col, flag) {
            onColumnChange(col, flag, 'filter');
        },
    }), isFilterableColumn = _g.isSelected, isAllFilterableColumns = _g.isAllSelected, isNoneFilterableColumns = _g.isNoneSelected, setFilterableColumn = _g.selectColumn, setUnFilterableColumn = _g.deselectColumn, setAllFilterable = _g.selectAll, setAllUnfilterable = _g.deselectAll;
    var allIncluded = isAllIncludedColumns();
    var allExcluded = isNoneIncludedColumns();
    var colItems = [
        { Content: 'Primary Key', Size: 3, key: 'pk' },
        {
            key: 'included',
            Content: (React.createElement("b", null,
                React.createElement(CheckBox_1.default, { checked: allIncluded ? true : allExcluded ? false : null, onChange: function (allIncluded) {
                        if (allIncluded) {
                            includeAllColumns();
                        }
                        else {
                            excludeAllColumns();
                        }
                    } }, "Included"))),
            Size: 3,
        },
        { Content: 'Field', Size: 5, key: 'field' },
        { Content: 'Type', Size: 4, key: 'size' },
        {
            key: 'sortable',
            Content: (React.createElement("b", null,
                ' ',
                React.createElement(CheckBox_1.default, { checked: isAllSortableColumns() ? true : isNoneSortableColumns() ? false : null, onChange: function (allSortable) {
                        if (allSortable) {
                            setAllSortable();
                        }
                        else {
                            setAllUnsortable();
                        }
                    } }, "Sortable"))),
            Size: 3,
        },
        {
            key: 'editable',
            Content: (React.createElement("b", null,
                ' ',
                React.createElement(CheckBox_1.default, { checked: isAllEditableColumns() ? true : isNoneEditableColumns() ? false : null, onChange: function (allEditable) {
                        if (allEditable) {
                            setAllEditable();
                        }
                        else {
                            setAllUneditable();
                        }
                    } }, "Editable"))),
            Size: 3,
        },
        {
            Size: 3,
            key: 'resizable',
            Content: (React.createElement("b", null,
                ' ',
                React.createElement(CheckBox_1.default, { checked: isAllResizableColumns() ? true : isNoneResizableColumns() ? false : null, onChange: function (allResizable) {
                        if (allResizable) {
                            setAllResizable();
                        }
                        else {
                            setAllUnresizable();
                        }
                    } }, "Resizable"))),
        },
        {
            Content: (React.createElement("b", null,
                ' ',
                React.createElement(CheckBox_1.default, { checked: isAllFilterableColumns() ? true : isNoneFilterableColumns() ? false : null, onChange: function (allFilterable) {
                        if (allFilterable) {
                            setAllFilterable();
                        }
                        else {
                            setAllUnfilterable();
                        }
                    } }, "Filterable"))),
            Size: 3,
            key: 'filterable',
        },
    ];
    var items = columns.map(function (col) {
        var isPrimaryKey = col.field === primaryKeyField;
        var cItems = colItems.map(function (c) { return (tslib_1.__assign({}, c)); });
        cItems[0].Content = (React.createElement(Radio_1.default, { checked: isPrimaryKey, onChange: function (checked) {
                if (checked && isIncludedColumn(col.field)) {
                    setPrimaryKeyField(col.field);
                }
            } }));
        cItems[1].Content = (React.createElement(CheckBox_1.default, { checked: isIncludedColumn(col.field), onChange: function (included) {
                if (included) {
                    includeColumn(col.field);
                }
                else {
                    excludeColumn(col.field);
                }
            } }));
        var humanized = Helper_1.humanize(col.field);
        cItems[2].Content = (React.createElement(Input_1.default, { style: inputStyle, defaultValue: col.caption != undefined ? col.caption : humanized, placeholder: humanized, onChange: function (event) {
                setColumnCaption(event.target.value, col.field);
            } }));
        cItems[3].Content = (React.createElement(Dropdown_1.default, { style: inputStyle, showClearButton: false, options: dataTypes, value: col.type, onChange: onColumnTypeChange.bind(null, col) }));
        cItems[4].Content = (React.createElement(CheckBox_1.default, { checked: isSortableColumn(col.field), onChange: function (sortable) {
                sortable ? setSortableColumn(col.field) : setUnsortableColumn(col.field);
            } }));
        cItems[5].Content = (React.createElement(CheckBox_1.default, { checked: isEditableColumn(col.field), onChange: function (editable) {
                editable ? setEditableColumn(col.field) : setUneditableColumn(col.field);
            } }));
        cItems[6].Content = (React.createElement(CheckBox_1.default, { checked: isResizableColumn(col.field), onChange: function (resizable) {
                resizable ? setResizableColumn(col.field) : setUnresizableColumn(col.field);
            } }));
        cItems[7].Content = (React.createElement(CheckBox_1.default, { checked: isFilterableColumn(col.field), onChange: function (filterable) {
                filterable ? setFilterableColumn(col.field) : setUnFilterableColumn(col.field);
            } }));
        return React.createElement(AdaptableObjectRow_1.AdaptableObjectRow, { key: col.field, colItems: cItems, style: { cursor: 'pointer' } });
    });
    React.useEffect(function () {
        onValidityChange(isIncludedColumn(primaryKeyField));
    }, [includedColumnsMap, primaryKeyField]);
    return (React.createElement(AdaptableObjectCollection_1.AdaptableObjectCollection, { style: { display: 'flex', flexFlow: 'column', height: '100%', textAlign: 'center' }, colItems: colItems, items: items }));
};
function areEqual() {
    /**
     * Make the ColumnList not render on subsequent prop changes
     * in order to boost performance
     */
    return true;
}
exports.default = React.memo(ColumnsList, areEqual);
