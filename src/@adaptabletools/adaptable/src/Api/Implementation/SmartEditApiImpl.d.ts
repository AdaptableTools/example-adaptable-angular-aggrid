import { ApiBase } from './ApiBase';
import { SmartEditApi } from '../SmartEditApi';
import { SmartEditState } from '../../PredefinedConfig/SmartEditState';
export declare class SmartEditApiImpl extends ApiBase implements SmartEditApi {
    getSmartEditState(): SmartEditState;
    setSmartEditMathOperation(mathOperation: 'Add' | 'Subtract' | 'Multiply' | 'Divide' | 'Replace'): void;
    getSmartEditMathOperation(): string;
    setSmartEditValue(smartEditValue: number): void;
    getSmartEditValue(): number;
    showSmartEditPopup(): void;
}
