import { Reducer } from 'react';
import { FileDroppableState } from './FileDroppableState';
export declare enum ActionTypes {
    DRAG_OVER = "DRAG_OVER",
    DRAG_OUT = "DRAG_OUT",
    SET_INVALID_FILE = "SET_INVALID_FILE",
    DROP_SUCCES = "DROP_SUCCES"
}
export interface Action {
    type: ActionTypes;
    payload?: any;
}
declare const reducer: Reducer<FileDroppableState, any>;
export default reducer;
