import { ApiBase } from './ApiBase';
import { CalculatedColumnApi } from '../CalculatedColumnApi';
import { CalculatedColumnState, CalculatedColumn } from '../../PredefinedConfig/CalculatedColumnState';
export declare class CalculatedColumnApiImpl extends ApiBase implements CalculatedColumnApi {
    getCalculatedColumnState(): CalculatedColumnState;
    getAllCalculatedColumn(): CalculatedColumn[];
    addCalculatedColumn(calculatedColumn: CalculatedColumn): void;
    editCalculatedColumnExpression(column: string, columnExpression: string): void;
    deleteCalculatedColumn(column: string): void;
    showCalculatedColumnPopup(): void;
}
