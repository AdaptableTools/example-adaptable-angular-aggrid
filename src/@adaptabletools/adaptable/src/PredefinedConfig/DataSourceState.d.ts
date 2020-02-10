import { RunTimeState } from './RunTimeState';
import { AdaptableObject } from './Common/AdaptableObject';
export interface DataSourceState extends RunTimeState {
    DataSources?: DataSource[];
    CurrentDataSource?: string;
}
export interface DataSource extends AdaptableObject {
    Name: string;
    Description: string;
    DataSourceParams?: DataSourceParams[];
}
export interface DataSourceParams {
    Name: string;
    DataType: 'String' | 'Number' | 'Boolean' | 'Date';
    Value?: any;
}
