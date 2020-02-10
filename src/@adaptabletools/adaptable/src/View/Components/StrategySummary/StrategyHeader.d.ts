import * as React from 'react';
import { AccessLevel } from '../../../PredefinedConfig/Common/Enums';
import { AdaptableFunctionName } from '../../../PredefinedConfig/Common/Types';
export interface StrategyHeaderProps extends React.ClassAttributes<StrategyHeader> {
    key: string;
    FunctionName: AdaptableFunctionName;
    StrategySummary: any;
    onNew: () => void;
    NewButtonTooltip: string;
    NewButtonDisabled?: boolean;
    AccessLevel: AccessLevel;
}
export declare class StrategyHeader extends React.Component<StrategyHeaderProps, {}> {
    render(): any;
}
