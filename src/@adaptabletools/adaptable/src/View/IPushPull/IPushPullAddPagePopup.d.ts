/// <reference types="react" />
import * as IPushPullRedux from '../../Redux/ActionsReducers/IPushPullRedux';
import { IPushPullDomain } from '../../PredefinedConfig/IPushPullState';
interface IPushPullAddPagePopupProps {
    IPushPullDomainsPages: IPushPullDomain[] | undefined;
    onAddPage: (folder: string, page: string) => IPushPullRedux.IPushPullAddPageAction;
    onCancel: () => any;
}
export declare let IPushPullAddPagePopup: import("react-redux").ConnectedComponent<(props: IPushPullAddPagePopupProps) => JSX.Element, Pick<IPushPullAddPagePopupProps, never>>;
export {};
