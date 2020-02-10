/// <reference types="react" />
import * as Glue42Redux from '../../Redux/ActionsReducers/Glue42Redux';
interface Glue42LoginPopupProps {
    glue42Login: string | undefined;
    glue42Password: string | undefined;
    glue42LoginErrorMessage: string | undefined;
    onLogin: (login: string, password: string) => Glue42Redux.Glue42LoginAction;
    onCancel: () => any;
}
export declare let Glue42LoginPopup: import("react-redux").ConnectedComponent<(props: Glue42LoginPopupProps) => JSX.Element, Pick<Glue42LoginPopupProps, never>>;
export {};
