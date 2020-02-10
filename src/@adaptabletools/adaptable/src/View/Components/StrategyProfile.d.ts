import * as React from 'react';
import { AdaptableFunctionName } from '../../PredefinedConfig/Common/Types';
export interface StrategyProfileProps extends React.ClassAttributes<StrategyProfile> {
    FunctionName: AdaptableFunctionName;
}
export declare class StrategyProfile extends React.Component<StrategyProfileProps, {}> {
    render(): any;
}
