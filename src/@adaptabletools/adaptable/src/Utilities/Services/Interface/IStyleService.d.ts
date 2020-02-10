import { AdaptableObject } from '../../../PredefinedConfig/Common/AdaptableObject';
import { AdaptableFunctionName } from '../../../PredefinedConfig/Common/Types';
export interface IStyleService {
    CreateStyleName(functionName: AdaptableFunctionName): string;
    CreateUniqueStyleName(functionName: AdaptableFunctionName, adaqptableObject: AdaptableObject): string;
}
