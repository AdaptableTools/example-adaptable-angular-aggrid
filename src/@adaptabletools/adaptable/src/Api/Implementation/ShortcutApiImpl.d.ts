import { ApiBase } from './ApiBase';
import { ShortcutApi } from '../ShortcutApi';
import { ShortcutState, Shortcut } from '../../PredefinedConfig/ShortcutState';
export declare class ShortcutApiImpl extends ApiBase implements ShortcutApi {
    getShortcutState(): ShortcutState;
    getAllShortcut(): Shortcut[];
    addShortcut(shortcut: Shortcut): void;
    deleteShortcut(shortcut: Shortcut): void;
    deleteAllShortcut(): void;
    showShortcutPopup(): void;
}
