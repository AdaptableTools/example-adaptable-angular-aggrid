import { AdaptableStyle } from '../../PredefinedConfig/Common/AdaptableStyle';
import { ApiBase } from './ApiBase';
import { FormatColumnApi } from '../FormatColumnApi';
import { FormatColumnState, FormatColumn } from '../../PredefinedConfig/FormatColumnState';
export declare class FormatColumnApiImpl extends ApiBase implements FormatColumnApi {
    getFormatColumnState(): FormatColumnState;
    getAllFormatColumn(): FormatColumn[];
    addFormatColumn(column: string, style: AdaptableStyle): void;
    updateFormatColumn(column: string, style: AdaptableStyle): void;
    deleteFormatColumn(formatColumn: FormatColumn): void;
    deleteAllFormatColumn(): void;
    showFormatColumnPopup(): void;
}
