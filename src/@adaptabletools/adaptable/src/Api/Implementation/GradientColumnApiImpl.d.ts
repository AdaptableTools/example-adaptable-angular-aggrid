import { ApiBase } from './ApiBase';
import { GradientColumnApi } from '../GradientColumnApi';
import { GradientColumnState, GradientColumn } from '../../PredefinedConfig/GradientColumnState';
export declare class GradientColumnApiImpl extends ApiBase implements GradientColumnApi {
    getGradientColumnState(): GradientColumnState;
    getAllGradientColumn(): GradientColumn[];
    showGradientColumnPopup(): void;
}
