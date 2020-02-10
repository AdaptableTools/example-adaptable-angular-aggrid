import { IPreviewResult, IPreviewValidationSummary, IPreviewInfo } from '../Interface/IPreview';
import { GridCell } from '../../PredefinedConfig/Selection/GridCell';
export declare function GetPreviewValidationSummary(previewResults: IPreviewResult[]): IPreviewValidationSummary;
export declare function GetValidationMessage(previewInfo: IPreviewInfo, newValue: string): string;
export declare function GetCellInfosFromPreview(previewInfo: IPreviewInfo, bypassCellValidationWarnings: boolean): GridCell[];
export declare const PreviewHelper: {
    GetPreviewValidationSummary: typeof GetPreviewValidationSummary;
    GetValidationMessage: typeof GetValidationMessage;
    GetCellInfosFromPreview: typeof GetCellInfosFromPreview;
};
export default PreviewHelper;
