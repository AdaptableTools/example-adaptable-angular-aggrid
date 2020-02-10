import { ApiBase } from './ApiBase';
import { DataSourceApi } from '../DataSourceApi';
import { DataSourceState, DataSource } from '../../PredefinedConfig/DataSourceState';
export declare class DataSourceApiImpl extends ApiBase implements DataSourceApi {
    getDataSourceState(): DataSourceState;
    getAllDataSource(): DataSource[];
    getCurrentDataSource(): DataSource;
    getDataSourceByName(dataSourceName: string): DataSource;
    setDataSource(dataSourceName: string): void;
    createDataSource(dataSourceName: string, dataSourceDescription: string): void;
    addDataSource(dataSource: DataSource): void;
    clearDataSource(): void;
    showDataSourcePopup(): void;
}
