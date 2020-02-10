import * as React from 'react';
import { CustomToolbarStrategyViewPopupProps } from '../Components/SharedProps/ToolbarStrategyViewPopupProps';
interface CustomToolbarControlComponentProps extends CustomToolbarStrategyViewPopupProps<CustomToolbarControlComponent> {
}
declare class CustomToolbarControlComponent extends React.Component<CustomToolbarControlComponentProps, {}> {
    render(): any;
}
export declare const CustomToolbarControl: import("react-redux").ConnectedComponent<typeof CustomToolbarControlComponent, Pick<CustomToolbarControlComponentProps, "key" | "ref" | "AccessLevel" | "Columns" | "UserFilters" | "SystemFilters" | "NamedFilters" | "ColumnCategories" | "Adaptable" | "ColumnSorts" | "ColorPalette" | "ColumnFilters" | "PopupParams" | "TeamSharingActivated" | "ModalContainer" | "onClearPopupParams" | "onClosePopup" | "CustomToolbar">>;
export {};
