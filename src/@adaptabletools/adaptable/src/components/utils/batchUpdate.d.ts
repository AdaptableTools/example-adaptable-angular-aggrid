export interface BatchUpdateQueue {
    (fn: () => void): void;
    commit: (lastFn?: () => void) => void;
}
declare const BatchUpdate: (fn?: () => void) => {
    (fn: () => void): void;
    commit(lastFn?: () => void): void;
};
export default BatchUpdate;
