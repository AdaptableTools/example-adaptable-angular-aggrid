import * as React from 'react';
import * as Redux from 'redux';
import { AccessLevel } from '../../../PredefinedConfig/Common/Enums';
export interface EntityListActionButtonsProps extends React.ClassAttributes<EntityListActionButtons> {
    editClick?: () => void;
    shareClick?: () => void;
    showEdit?: boolean;
    showDelete?: boolean;
    showShare?: boolean;
    overrideDisableEdit?: boolean;
    overrideDisableDelete?: boolean;
    overrideDisableShare?: boolean;
    overrideTooltipEdit?: string;
    overrideTooltipDelete?: string;
    overrideTooltipShare?: string;
    ConfirmDeleteAction: Redux.Action;
    EntityType: string;
    justifyContent?: string;
    AccessLevel: AccessLevel;
    editSize: any;
    deleteSize: any;
    shareSize: any;
}
export declare class EntityListActionButtons extends React.Component<EntityListActionButtonsProps, {}> {
    static defaultProps: EntityListActionButtonsProps;
    render(): JSX.Element;
}
