import * as React from 'react';
import * as Redux from 'redux';
import { AdaptableColumn } from '../../../PredefinedConfig/Common/AdaptableColumn';
import { AdaptableObject } from '../../../PredefinedConfig/Common/AdaptableObject';
import { UserFilter } from '../../../PredefinedConfig/UserFilterState';
import { IColItem } from '../../UIInterfaces';
import { AccessLevel } from '../../../PredefinedConfig/Common/Enums';
export interface BaseRowProps<View> extends React.ClassAttributes<View> {
    colItems: IColItem[];
}
export interface BaseEntityRowProps<View> extends BaseRowProps<View> {
    AdaptableObject: AdaptableObject;
    onDeleteConfirm: Redux.Action;
    onEdit: (AdaptableObject: AdaptableObject) => void;
}
export interface SharedEntityRowProps<View> extends BaseEntityRowProps<View> {
    onShare: () => void;
    TeamSharingActivated: boolean;
    AccessLevel: AccessLevel;
}
export interface ExpressionEntityRowProps<View> extends BaseEntityRowProps<View> {
    Columns: AdaptableColumn[];
    UserFilters: UserFilter[];
}
export interface SharedEntityExpressionRowProps<View> extends SharedEntityRowProps<View> {
    Columns: AdaptableColumn[];
    UserFilters: UserFilter[];
}
