import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import { IAdaptable } from '../AdaptableInterfaces/IAdaptable';
import { IDataSourceStrategy } from './Interface/IDataSourceStrategy';
import { AdaptableMenuItem } from '../PredefinedConfig/Common/Menu';
export declare class DataSourceStrategy extends AdaptableStrategyBase implements IDataSourceStrategy {
    constructor(adaptable: IAdaptable);
    addFunctionMenuItem(): AdaptableMenuItem | undefined;
}
