import { ConnectedComponent } from 'react-redux';
import { AdaptableFunctionName } from '../PredefinedConfig/Common/Types';
export declare const AdaptableViewFactory: IAdaptableViewFactory;
export declare const AdaptableDashboardFactory: Map<AdaptableFunctionName, ConnectedComponent<any, any>>;
export declare const AdaptableToolPanelFactory: Map<AdaptableFunctionName, ConnectedComponent<any, any>>;
export declare const AdaptableDashboardPermanentToolbarFactory: Map<string, ConnectedComponent<any, any>>;
export interface IAdaptableViewFactory {
    [key: string]: any;
}
