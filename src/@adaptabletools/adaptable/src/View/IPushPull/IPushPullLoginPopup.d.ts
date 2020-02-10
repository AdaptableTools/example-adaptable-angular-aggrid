/// <reference types="react" />
import * as IPushPullRedux from '../../Redux/ActionsReducers/IPushPullRedux';
interface IPushPullLoginPopupProps {
    pushpullLogin: string | undefined;
    pushpullPassword: string | undefined;
    pushpullLoginErrorMessage: string | undefined;
    onLogin: (login: string, password: string) => IPushPullRedux.IPushPullLoginAction;
    onCancel: () => any;
}
export declare let IPushPullLoginPopup: import("react-redux").ConnectedComponent<(props: IPushPullLoginPopupProps) => JSX.Element, Pick<IPushPullLoginPopupProps, never>>;
export {};
