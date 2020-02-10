import { TeamSharingState } from '../../PredefinedConfig/TeamSharingState';
import * as Redux from 'redux';
import { AdaptableObject } from '../../PredefinedConfig/Common/AdaptableObject';
import { AdaptableFunctionName } from '../../PredefinedConfig/Common/Types';
import { SharedEntity } from '../../Utilities/Interface/SharedEntity';
export declare const TEAMSHARING_SHARE = "TEAMSHARING_SHARE";
export declare const TEAMSHARING_SET = "TEAMSHARING_SET";
export declare const TEAMSHARING_IMPORT_ITEM = "TEAMSHARING_IMPORT_ITEM";
export declare const TEAMSHARING_GET = "TEAMSHARING_GET";
export interface TeamSharingShareAction extends Redux.Action {
    Entity: AdaptableObject;
    FunctionName: AdaptableFunctionName;
}
export interface TeamSharingSetAction extends Redux.Action {
    Entities: SharedEntity[];
}
export interface TeamSharingImportItemAction extends Redux.Action {
    Entity: AdaptableObject;
    FunctionName: AdaptableFunctionName;
}
export interface TeamSharingGetAction extends Redux.Action {
}
export declare const TeamSharingShare: (Entity: AdaptableObject, FunctionName: AdaptableFunctionName) => TeamSharingShareAction;
export declare const TeamSharingSet: (Entities: SharedEntity[]) => TeamSharingSetAction;
export declare const TeamSharingImportItem: (Entity: AdaptableObject, FunctionName: AdaptableFunctionName) => TeamSharingImportItemAction;
export declare const TeamSharingGet: () => TeamSharingGetAction;
export declare const TeamSharingReducer: Redux.Reducer<TeamSharingState>;
