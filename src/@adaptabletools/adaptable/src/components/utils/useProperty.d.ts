declare const useProperty: <TS>(props: any, propName: string, defaultValue?: any, config?: {
    onChange?: (value: TS, ...args: any[]) => void;
}) => [TS, (...args: any[]) => any];
export default useProperty;
