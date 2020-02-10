/// <reference types="react" />
import { AdaptableColumn } from '../../../PredefinedConfig/Common/AdaptableColumn';
import { IAdaptable } from '../../../AdaptableInterfaces/IAdaptable';
import { UserFilter } from '../../../PredefinedConfig/UserFilterState';
import { AdaptableObject } from '../../../PredefinedConfig/Common/AdaptableObject';
import { NamedFilter } from '../../../PredefinedConfig/NamedFilterState';
import { ColumnCategory } from '../../../PredefinedConfig/ColumnCategoryState';
export interface AdaptableWizardStep {
    canNext(): boolean;
    canBack(): boolean;
    Next(): void;
    Back(): void;
    GetIndexStepIncrement(): number;
    GetIndexStepDecrement(): number;
}
export interface AdaptableWizardStepProps<T> {
    Data?: T;
    UpdateGoBackState?(): void;
    Adaptable?: IAdaptable;
    Columns?: AdaptableColumn[];
}
export interface ExpressionWizardProps<T> extends AdaptableWizardStepProps<T> {
    UserFilters: UserFilter[];
    SystemFilters: string[];
    NamedFilters: NamedFilter[];
    ColumnCategories: ColumnCategory[];
}
export interface AdaptableObjectExpressionAdaptableWizardProps<View> extends AdaptableObjectAdaptableWizardProps<View> {
    Columns: Array<AdaptableColumn>;
    UserFilters: UserFilter[];
    SystemFilters: string[];
    NamedFilters: NamedFilter[];
    ColumnCategories: ColumnCategory[];
    Adaptable: IAdaptable;
}
export interface AdaptableWizardProps<View> extends React.ClassAttributes<View> {
    WizardStartIndex: number;
    onCloseWizard: () => void;
    onFinishWizard: () => void;
    ModalContainer: HTMLElement;
    canFinishWizard: Function;
}
export interface AdaptableObjectAdaptableWizardProps<View> extends AdaptableWizardProps<View> {
    ConfigEntities: AdaptableObject[];
    EditedAdaptableObject: AdaptableObject;
}
