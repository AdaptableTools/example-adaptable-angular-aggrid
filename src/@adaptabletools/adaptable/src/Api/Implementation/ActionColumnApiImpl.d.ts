import { ApiBase } from './ApiBase';
import { ActionColumnApi } from '../ActionColumnApi';
import { ActionColumnState, ActionColumn } from '../../PredefinedConfig/ActionColumnState';
export declare class ActionColumnApiImpl extends ApiBase implements ActionColumnApi {
    getActionColumnState(): ActionColumnState;
    getAllActionColumn(): ActionColumn[];
}
