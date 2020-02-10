import * as React from 'react';
import * as ConditionalStyleRedux from '../../Redux/ActionsReducers/ConditionalStyleRedux';
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps';
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux';
import { EditableConfigEntityState } from '../Components/SharedProps/EditableConfigEntityState';
import { AdaptableObject } from '../../PredefinedConfig/Common/AdaptableObject';
import { ColumnCategory } from '../../PredefinedConfig/ColumnCategoryState';
import { ConditionalStyle } from '../../PredefinedConfig/ConditionalStyleState';
interface ConditionalStylePopupProps extends StrategyViewPopupProps<ConditionalStylePopupComponent> {
    ConditionalStyles: ConditionalStyle[];
    StyleClassNames: string[];
    ColumnCategories: ColumnCategory[];
    onAddConditionalStyle: (condiditionalStyleCondition: ConditionalStyle) => ConditionalStyleRedux.ConditionalStyleAddAction;
    onEditConditionalStyle: (condiditionalStyleCondition: ConditionalStyle) => ConditionalStyleRedux.ConditionalStyleEditAction;
    onShare: (entity: AdaptableObject) => TeamSharingRedux.TeamSharingShareAction;
}
declare class ConditionalStylePopupComponent extends React.Component<ConditionalStylePopupProps, EditableConfigEntityState> {
    constructor(props: ConditionalStylePopupProps);
    shouldClosePopupOnFinishWizard: boolean;
    componentDidMount(): void;
    render(): JSX.Element;
    onNew(): void;
    onEdit(condition: ConditionalStyle): void;
    onCloseWizard(): void;
    onFinishWizard(): void;
    canFinishWizard(): boolean;
}
export declare let ConditionalStylePopup: import("react-redux").ConnectedComponent<typeof ConditionalStylePopupComponent, Pick<ConditionalStylePopupProps, "key" | "ref" | "AccessLevel" | "Columns" | "UserFilters" | "SystemFilters" | "NamedFilters" | "Adaptable" | "ColumnSorts" | "ColorPalette" | "ColumnFilters" | "PopupParams" | "TeamSharingActivated" | "ModalContainer" | "onClearPopupParams" | "onClosePopup">>;
export {};
