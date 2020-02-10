import { ApiBase } from './ApiBase';
import { UserInterfaceApi } from '../UserInterfaceApi';
import { UserInterfaceState, EditLookUpColumn, RowStyle, UserMenuItem, PermittedValuesColumn } from '../../PredefinedConfig/UserInterfaceState';
export declare class UserInterfaceApiImpl extends ApiBase implements UserInterfaceApi {
    getUserInterfaceState(): UserInterfaceState;
    getColorPalette(): string[];
    setColorPalette(colorPalette: string[]): void;
    addColorsToPalette(colorPalette: string[]): void;
    addStyleClassNames(styleClassNames: string[]): void;
    getAllPermittedValuesColumns(): PermittedValuesColumn[];
    getPermittedValuesColumnForColumn(columnId: string): PermittedValuesColumn;
    getPermittedValuesForColumn(columnId: string): any[];
    setColumnPermittedValues(column: string, permittedValues: string[]): void;
    clearColumnPermittedValues(column: string): void;
    getAllEditLookUpColumns(): EditLookUpColumn[];
    getEditLookUpColumnForColumn(columnId: string): EditLookUpColumn;
    getEditLookUpValuesForColumn(columnId: string): any[];
    isEditLookUpColumn(columnId: string): boolean;
    clearRowStyles(): void;
    setRowStyles(rowStyles: RowStyle[]): void;
    addContextMenuItem(contextMenuItem: UserMenuItem): void;
    createContextMenuItem(label: string, userMenuItemClickedFunction?: () => void, icon?: string, subMenuItems?: UserMenuItem[]): void;
}
