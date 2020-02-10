import * as React from 'react';
import * as Redux from 'redux';
import { ListGroupProps } from '../../../components/List/ListGroup';
import { AdaptableMenuItem } from '../../../PredefinedConfig/Common/Menu';
export interface ListBoxMenuProps extends ListGroupProps {
    MenuItems: AdaptableMenuItem[];
    onMenuItemClick: (action: Redux.Action) => Redux.Action;
}
export interface ListBoxMenuState extends React.ClassAttributes<ListBoxMenu> {
}
export declare class ListBoxMenu extends React.Component<ListBoxMenuProps, ListBoxMenuState> {
    constructor(props: ListBoxMenuProps);
    render(): JSX.Element;
    onClick(menuItem: AdaptableMenuItem): void;
}
