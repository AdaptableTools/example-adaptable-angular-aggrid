import * as React from 'react';
import { AdaptableColumn } from '../../PredefinedConfig/Common/AdaptableColumn';
import { SharedEntityExpressionRowProps } from '../Components/SharedProps/ConfigEntityRowProps';
import { ActionMode } from '../../PredefinedConfig/Common/Enums';
import { CellValidationRule } from '../../PredefinedConfig/CellValidationState';
import { IValidationService } from '../../Utilities/Services/Interface/IValidationService';
export interface CellValidationEntityRowProps extends SharedEntityExpressionRowProps<CellValidationEntityRow> {
    Column: AdaptableColumn;
    ValidationService: IValidationService;
    onChangeActionMode: (cellValidationRule: CellValidationRule, ActionMode: ActionMode) => void;
}
export declare class CellValidationEntityRow extends React.Component<CellValidationEntityRowProps, {}> {
    render(): any;
    setExpressionDescription(CellValidation: CellValidationRule): string;
    private getColumnandRule;
    onActionModeChanged(cellValidationRule: CellValidationRule, value: string): void;
}
