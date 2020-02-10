import { IAdaptable } from '../../AdaptableInterfaces/IAdaptable';
import { AdaptableObject } from '../../PredefinedConfig/Common/AdaptableObject';
import { IStyleService } from './Interface/IStyleService';
import { AdaptableFunctionName } from '../../PredefinedConfig/Common/Types';
export declare class StyleService implements IStyleService {
    private adaptable;
    private style;
    constructor(adaptable: IAdaptable);
    CreateStyleName(functionName: AdaptableFunctionName): string;
    CreateUniqueStyleName(functionName: AdaptableFunctionName, adaptableObject: AdaptableObject): string;
    private setUpFirstUsage;
    private setUpFormatColumn;
    private setUpFlashingCells;
    private setUpUpdatedRow;
    private setUpAlerts;
    private setUpConditionalStyle;
    /**
     * this method is still not great but its better than the old version at least as it uses the new ever On... from the Store which is better
     * this class is still not perfect as we still delete and recreate all styles every time we create a conditional style, format column or flashing cell
     * but actually that is not the end of the world as it doenst happen so often and at least we are not doing it when quick search is applied.
     */
    private createAdaptableFunctionStyles;
    private clearCSSRules;
    private addCSSRule;
    private setUpStoreListeners;
}
