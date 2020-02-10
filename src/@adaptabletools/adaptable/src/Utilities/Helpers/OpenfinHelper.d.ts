export interface IEvent<TSender, TArgs> {
    Subscribe(fn: (sender: TSender, args: TArgs) => void): void;
    Unsubscribe(fn: (sender: TSender, args: TArgs) => void): void;
}
export declare class EventDispatcher<TSender, TArgs> implements IEvent<TSender, TArgs> {
    private _subscriptions;
    Subscribe(fn: (sender: TSender, args: TArgs) => void): void;
    Unsubscribe(fn: (sender: TSender, args: TArgs) => void): void;
    Dispatch(sender: TSender, args: TArgs): void;
}
export declare function OnExcelDisconnected(): IEvent<any, any>;
export declare function OnWorkbookDisconnected(): IEvent<any, any>;
export declare function OnWorkbookSaved(): IEvent<any, {
    OldName: string;
    NewName: string;
}>;
export declare function isRunningInOpenfin(): boolean;
export declare function isExcelOpenfinLoaded(): boolean;
export declare function pushData(workBookName: string, data: any[]): Promise<any>;
export declare function initOpenFinExcel(): Promise<string>;
export declare const OpenfinHelper: {
    OnExcelDisconnected: typeof OnExcelDisconnected;
    OnWorkbookDisconnected: typeof OnWorkbookDisconnected;
    OnWorkbookSaved: typeof OnWorkbookSaved;
    isRunningInOpenfin: typeof isRunningInOpenfin;
    isExcelOpenfinLoaded: typeof isExcelOpenfinLoaded;
    pushData: typeof pushData;
    initOpenFinExcel: typeof initOpenFinExcel;
};
export default OpenfinHelper;
