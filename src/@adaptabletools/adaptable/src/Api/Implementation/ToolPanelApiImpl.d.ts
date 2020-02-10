import { ApiBase } from './ApiBase';
import { ToolPanelApi } from '../ToolPanelApi';
import { ToolPanelState } from '../../PredefinedConfig/ToolPanelState';
export declare class ToolPanelApiImpl extends ApiBase implements ToolPanelApi {
    GetToolPanelState(): ToolPanelState;
    showToolPanelPopup(): void;
}
