import * as Redux from 'redux';
import { IValidationService } from './Interface/IValidationService';
import { IAdaptable } from '../../AdaptableInterfaces/IAdaptable';
import { AdaptableColumn } from '../../PredefinedConfig/Common/AdaptableColumn';
import { CellValidationRule } from '../../PredefinedConfig/CellValidationState';
import { DataChangedInfo } from '../../PredefinedConfig/Common/DataChangedInfo';
import { IUIConfirmation } from '../Interface/IMessage';
export declare class ValidationService implements IValidationService {
    private adaptable;
    constructor(adaptable: IAdaptable);
    GetValidationRulesForDataChange(dataChangedInfo: DataChangedInfo): CellValidationRule[];
    PerformCellValidation(dataChangedInfo: DataChangedInfo): boolean;
    private IsCellValidationRuleBroken;
    private GetCellValidationState;
    private logAuditValidationEvent;
    PerformServerValidation(dataChangedInfo: DataChangedInfo, config: {
        onServerValidationCompleted: () => void;
    }): () => boolean;
    createCellValidationDescription(cellValidationRule: CellValidationRule, columns: AdaptableColumn[]): string;
    createCellValidationUIConfirmation(confirmAction: Redux.Action, cancelAction: Redux.Action, warningMessage?: string): IUIConfirmation;
    CreateCellValidationMessage(CellValidation: CellValidationRule): string;
}
