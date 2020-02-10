import * as React from 'react';
import * as ColumnCategoryRedux from '../../Redux/ActionsReducers/ColumnCategoryRedux';
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux';
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps';
import { EditableConfigEntityState } from '../Components/SharedProps/EditableConfigEntityState';
import { AdaptableObject } from '../../PredefinedConfig/Common/AdaptableObject';
import { ColumnCategory } from '../../PredefinedConfig/ColumnCategoryState';
interface ColumnCategoryPopupProps extends StrategyViewPopupProps<ColumnCategoryPopupComponent> {
    ColumnCategorys: ColumnCategory[];
    onAddColumnCategory: (columnCategory: ColumnCategory) => ColumnCategoryRedux.ColumnCategoryAddAction;
    onEditColumnCategory: (columnCategory: ColumnCategory) => ColumnCategoryRedux.ColumnCategoryEditAction;
    onShare: (entity: AdaptableObject) => TeamSharingRedux.TeamSharingShareAction;
}
declare class ColumnCategoryPopupComponent extends React.Component<ColumnCategoryPopupProps, EditableConfigEntityState> {
    constructor(props: ColumnCategoryPopupProps);
    shouldClosePopupOnFinishWizard: boolean;
    componentDidMount(): void;
    render(): JSX.Element;
    onNew(): void;
    onEdit(columnCategory: ColumnCategory): void;
    onCloseWizard(): void;
    onFinishWizard(): void;
    canFinishWizard(): boolean;
}
export declare let ColumnCategoryPopup: import("react-redux").ConnectedComponent<typeof ColumnCategoryPopupComponent, any>;
export {};
