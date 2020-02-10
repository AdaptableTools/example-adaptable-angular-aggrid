/** based on emittery npm package, which is MIT */
export declare type EmitterCallback = (data?: any) => any;
export declare type EmitterAnyCallback = (eventName: string, data?: any) => any;
declare class Emittery {
    static mixin(emitteryPropertyName: string, methodNames: string[]): (target: any) => any;
    constructor();
    on(eventName: string, listener: EmitterCallback): any;
    off(eventName: string, listener: EmitterCallback): void;
    once(eventName: string): Promise<unknown>;
    emit(eventName: string, eventData?: any): Promise<any[]>;
    emitSerial(eventName: string, eventData: any): Promise<void>;
    onAny(listener: EmitterAnyCallback): any;
    offAny(listener: EmitterCallback): void;
    clearListeners(eventName: string): void;
    listenerCount(eventName: string): any;
    bindMethods(target: any, methodNames: string[]): void;
}
export default Emittery;
