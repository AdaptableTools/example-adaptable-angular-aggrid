import { ISearchService } from './Interface/ISearchService';
import { SearchChangedTrigger } from '../../PredefinedConfig/Common/Enums';
import { IAdaptable } from '../../AdaptableInterfaces/IAdaptable';
export declare class SearchService implements ISearchService {
    private adaptable;
    constructor(adaptable: IAdaptable);
    /**
     * Each time any of the objects that make up search are changed (e.g. filters, quick search, advanced search, data sources etc.) we fire an event
     * This is primarily to help users who want to run search on the server and so need to know what has changed
     * @param searchChangedTrigger function that triggered the event
     */
    publishSearchChanged(searchChangedTrigger: SearchChangedTrigger): void;
}
