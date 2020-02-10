import * as React from 'react';
import * as Redux from 'redux';
import { AdaptableObject } from '../../../PredefinedConfig/Common/AdaptableObject';
export interface StrategyDetailProps extends React.ClassAttributes<StrategyDetail> {
    key: string;
    Item1: any;
    Item2: any;
    ConfigEnity: AdaptableObject;
    EntityType: string;
    onEdit: () => void;
    onShare: () => void;
    onDelete: Redux.Action;
    showBold?: boolean;
    showEdit?: boolean;
    showShare?: boolean;
}
export declare class StrategyDetail extends React.Component<StrategyDetailProps, {}> {
    render(): any;
}
