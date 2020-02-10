"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GeneralConstants_1 = require("../../Utilities/Constants/GeneralConstants");
exports.TEAMSHARING_SHARE = 'TEAMSHARING_SHARE';
exports.TEAMSHARING_SET = 'TEAMSHARING_SET';
exports.TEAMSHARING_IMPORT_ITEM = 'TEAMSHARING_IMPORT_ITEM';
exports.TEAMSHARING_GET = 'TEAMSHARING_GET';
exports.TeamSharingShare = function (Entity, FunctionName) { return ({
    type: exports.TEAMSHARING_SHARE,
    Entity: Entity,
    FunctionName: FunctionName,
}); };
exports.TeamSharingSet = function (Entities) { return ({
    type: exports.TEAMSHARING_SET,
    Entities: Entities,
}); };
exports.TeamSharingImportItem = function (Entity, FunctionName) { return ({
    type: exports.TEAMSHARING_IMPORT_ITEM,
    Entity: Entity,
    FunctionName: FunctionName,
}); };
exports.TeamSharingGet = function () { return ({
    type: exports.TEAMSHARING_GET,
}); };
var initialTeamSharingState = {
    Activated: false,
    SharedEntities: GeneralConstants_1.EMPTY_ARRAY,
};
exports.TeamSharingReducer = function (state, action) {
    if (state === void 0) { state = initialTeamSharingState; }
    switch (action.type) {
        case exports.TEAMSHARING_SET: {
            var actionTyped = action;
            return Object.assign({}, state, {
                SharedEntities: actionTyped.Entities,
            });
        }
        default:
            return state;
    }
};
