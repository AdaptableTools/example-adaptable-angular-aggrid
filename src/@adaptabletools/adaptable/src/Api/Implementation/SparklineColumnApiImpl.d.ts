import { ApiBase } from './ApiBase';
import { SparklineColumnApi } from '../SparklineColumnApi';
import { SparklineColumnState, SparklineColumn } from '../../PredefinedConfig/SparklineColumnState';
export declare class SparklineColumnApiImpl extends ApiBase implements SparklineColumnApi {
    getSparklineColumnState(): SparklineColumnState;
    getAllSparklineColumn(): SparklineColumn[];
    isSparklineColumn(columnId: string): boolean;
}
