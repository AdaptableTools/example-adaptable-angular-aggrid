import * as React from 'react';
export interface PopupContextProps {
    hidePopup: () => void;
}
declare const PopupContext: React.Context<PopupContextProps>;
export declare const usePopupContext: () => PopupContextProps;
export default PopupContext;
