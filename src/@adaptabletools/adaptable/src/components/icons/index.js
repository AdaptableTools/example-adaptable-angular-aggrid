"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var ReactDOMServer = require("react-dom/server");
var arrow_right_1 = require("./arrow-right");
var arrow_down_1 = require("./arrow-down");
var arrow_up_1 = require("./arrow-up");
var arrow_left_1 = require("./arrow-left");
var triangle_up_1 = require("./triangle-up");
var triangle_down_1 = require("./triangle-down");
var check_1 = require("./check");
var attach_file_1 = require("./attach-file");
var plus_1 = require("./plus");
var clear_1 = require("./clear");
var advancedsearch_1 = require("./advancedsearch");
var info_1 = require("./info");
var alert_1 = require("./alert");
var list_1 = require("./list");
var smart_edit_1 = require("./smart-edit");
var column_chooser_1 = require("./column-chooser");
var home_1 = require("./home");
var justify_1 = require("./justify");
var error_1 = require("./error");
var export_1 = require("./export");
var build_1 = require("./build");
var warning_1 = require("./warning");
var conditional_style_1 = require("./conditional-style");
var dashboard_1 = require("./dashboard");
var undo_1 = require("./undo");
var fast_forward_1 = require("./fast-forward");
var fast_backward_1 = require("./fast-backward");
var sort_asc_1 = require("./sort-asc");
var sort_desc_1 = require("./sort-desc");
var calendar_1 = require("./calendar");
var delete_1 = require("./delete");
var color_drop_1 = require("./color-drop");
var check_circle_1 = require("./check-circle");
var refresh_1 = require("./refresh");
var save_1 = require("./save");
var chart_1 = require("./chart");
var application_1 = require("./application");
var bulk_update_1 = require("./bulk-update");
var import_export_1 = require("./import-export");
var calculated_column_1 = require("./calculated-column");
var cell_summary_1 = require("./cell-summary");
var cell_validation_1 = require("./cell-validation");
var column_category_1 = require("./column-category");
var column_filter_1 = require("./column-filter");
var column_info_1 = require("./column-info");
var custom_sort_1 = require("./custom-sort");
var system_status_1 = require("./system-status");
var data_source_1 = require("./data-source");
var flashing_cell_1 = require("./flashing-cell");
var edit_1 = require("./edit");
var format_column_1 = require("./format-column");
var freetext_column_1 = require("./freetext-column");
var comment_1 = require("./comment");
var layout_1 = require("./layout");
var state_management_1 = require("./state-management");
var percent_bar_1 = require("./percent-bar");
var gradient_column_1 = require("./gradient-column");
var spark_line_1 = require("./spark-line");
var pie_chart_1 = require("./pie-chart");
var plus_minus_1 = require("./plus-minus");
var quick_search_1 = require("./quick-search");
var reminder_1 = require("./reminder");
var schedule_1 = require("./schedule");
var shortcut_1 = require("./shortcut");
var team_share_1 = require("./team-share");
var updated_row_1 = require("./updated-row");
var user_filter_1 = require("./user-filter");
var align_justify_1 = require("./align-justify");
var login_1 = require("./login");
var logout_1 = require("./logout");
var theme_1 = require("./theme");
var check_box_1 = require("./check-box");
var check_box_outline_1 = require("./check-box-outline");
var tab_unselected_1 = require("./tab-unselected");
var cloud_upload_1 = require("./cloud-upload");
var ipushpull_1 = require("./ipushpull");
var folder_open_1 = require("./folder-open");
var folder_1 = require("./folder");
var folder_shared_1 = require("./folder-shared");
var play_1 = require("./play");
var stop_1 = require("./stop");
var pause_1 = require("./pause");
var newpage_1 = require("./newpage");
var LoggingHelper_1 = require("../../Utilities/Helpers/LoggingHelper");
var allIcons = {
    // toolbars
    'advanced-search': advancedsearch_1.default,
    application: application_1.default,
    alert: alert_1.default,
    'bulk-update': bulk_update_1.default,
    chart: chart_1.default,
    'cell-summary': cell_summary_1.default,
    'column-filter': column_filter_1.default,
    'data-source': data_source_1.default,
    export: export_1.default,
    layout: layout_1.default,
    'quick-search': quick_search_1.default,
    'smart-edit': smart_edit_1.default,
    theme: theme_1.default,
    // non toolbar strategy images
    'calculated-column': calculated_column_1.default,
    calendar: calendar_1.default,
    'cell-validation': cell_validation_1.default,
    'column-category': column_category_1.default,
    'column-chooser': column_chooser_1.default,
    'conditional-style': conditional_style_1.default,
    'column-info': column_info_1.default,
    'custom-sort': custom_sort_1.default,
    dashboard: dashboard_1.default,
    'flashing-cell': flashing_cell_1.default,
    'format-column': format_column_1.default,
    'freetext-column': freetext_column_1.default,
    'percent-bar': percent_bar_1.default,
    'gradient-column': gradient_column_1.default,
    'spark-line': spark_line_1.default,
    'pie-chart': pie_chart_1.default,
    'plus-minus': plus_minus_1.default,
    reminder: reminder_1.default,
    schedule: schedule_1.default,
    shortcut: shortcut_1.default,
    'state-management': state_management_1.default,
    'system-status': system_status_1.default,
    'team-share': team_share_1.default,
    'updated-row': updated_row_1.default,
    'user-filter': user_filter_1.default,
    // others
    edit: edit_1.default,
    'tab-unselected': tab_unselected_1.default,
    'check-box': check_box_1.default,
    'check-box-outline': check_box_outline_1.default,
    unchecked: check_box_outline_1.default,
    checked: check_box_1.default,
    'arrow-right': arrow_right_1.default,
    'arrow-up': arrow_up_1.default,
    'triangle-up': triangle_up_1.default,
    'arrow-down': arrow_down_1.default,
    'triangle-down': triangle_down_1.default,
    'arrow-left': arrow_left_1.default,
    'color-drop': color_drop_1.default,
    'check-circle': check_circle_1.default,
    comment: comment_1.default,
    list: list_1.default,
    undo: undo_1.default,
    delete: delete_1.default,
    build: build_1.default,
    save: save_1.default,
    trash: delete_1.default,
    refresh: refresh_1.default,
    error: error_1.default,
    exclamation: error_1.default,
    'exclamation-sign': error_1.default,
    'fast-forward': fast_forward_1.default,
    'fast-backward': fast_backward_1.default,
    warning: warning_1.default,
    'notification-important': alert_1.default,
    'warning-sign': warning_1.default,
    justify: justify_1.default,
    check: check_1.default,
    ok: check_1.default,
    'ok-sign': check_1.default,
    plus: plus_1.default,
    home: home_1.default,
    'sort-asc': sort_asc_1.default,
    'sort-desc': sort_desc_1.default,
    'align-justify': align_justify_1.default,
    login: login_1.default,
    logout: logout_1.default,
    clear: clear_1.default,
    'import-export': import_export_1.default,
    'attach-file': attach_file_1.default,
    info: info_1.default,
    'info-sign': info_1.default,
    add: plus_1.default,
    'cloud-upload': cloud_upload_1.default,
    ipushpull: ipushpull_1.default,
    'folder-open': folder_open_1.default,
    'folder-shared': folder_shared_1.default,
    play: play_1.default,
    stop: stop_1.default,
    pause: pause_1.default,
    folder: folder_1.default,
    newpage: newpage_1.default,
};
Object.keys(allIcons).forEach(function (name) {
    var ReactCmp = allIcons[name];
    allIcons[name] = function (props) { return React.createElement(ReactCmp, tslib_1.__assign({}, props, { name: name })); };
});
exports.Icon = function (_a) {
    var name = _a.name, style = _a.style, className = _a.className, props = tslib_1.__rest(_a, ["name", "style", "className"]);
    var IconCmp = (allIcons[name] || null);
    if (!IconCmp) {
        LoggingHelper_1.default.LogAdaptableWarning('NO icon found for ' + name);
        return React.createElement("svg", null);
    }
    return React.createElement(IconCmp, tslib_1.__assign({}, props, { style: style, name: name, className: className }));
};
exports.iconToString = function (name, props) {
    return ReactDOMServer.renderToString(React.createElement(exports.Icon, tslib_1.__assign({ name: name }, props)));
};
exports.default = allIcons;
