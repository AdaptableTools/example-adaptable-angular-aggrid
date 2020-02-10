import { AdaptableObject } from '../../../PredefinedConfig/Common/AdaptableObject';
export declare enum WizardStatus {
    New = "New",
    Edit = "Edit",
    None = "None"
}
export interface EditableConfigEntityState {
    EditedAdaptableObject: AdaptableObject;
    WizardStartIndex: number;
    WizardStatus: WizardStatus;
}
