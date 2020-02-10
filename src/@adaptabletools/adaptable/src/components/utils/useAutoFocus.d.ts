import { RefObject } from 'react';
declare const useAutoFocus: (props: {
    autoFocus?: boolean;
    isOpen?: boolean;
    previous?: ({ autoFocus }: {
        autoFocus: boolean;
    }) => boolean;
    shouldFocus?: ({ autoFocus }: {
        autoFocus: boolean;
    }) => boolean;
}, focusElementRef: RefObject<HTMLElement>) => void;
export default useAutoFocus;
