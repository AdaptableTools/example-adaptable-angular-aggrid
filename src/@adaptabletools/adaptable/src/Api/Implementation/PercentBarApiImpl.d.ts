import { ApiBase } from './ApiBase';
import { PercentBarApi } from '../PercentBarApi';
import { PercentBarState, PercentBar } from '../../PredefinedConfig/PercentBarState';
export declare class PercentBarApiImpl extends ApiBase implements PercentBarApi {
    getPercentBarState(): PercentBarState;
    getAllPercentBar(): PercentBar[];
    getPercentBarByColumn(columnId: string): PercentBar;
    addPercentBar(percentBar: PercentBar): void;
    createPercentBar(columnId: string, positiveValue: number, positiveColor: string, negativeValue: number, negativeColor: string, showValue: boolean): void;
    editPercentBar(percentBar: PercentBar): void;
    editPercentBarNegativeValue(negativeValue: number, columnId: string): void;
    editPercentBarPostiiveValue(positiveValue: number, columnId: string): void;
    editPercentBarPositiveColor(positiveColor: string, columnId: string): void;
    editPercentBarNegativeColor(negativeColor: string, columnId: string): void;
    editPercentBarShowValue(showValue: boolean, columnId: string): void;
    deletePercentBar(columnId: string): void;
    showPercentBarPopup(): void;
}
