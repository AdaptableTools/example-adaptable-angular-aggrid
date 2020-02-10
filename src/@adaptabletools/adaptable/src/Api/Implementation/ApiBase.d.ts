import { Action } from 'redux';
import { IAdaptable } from '../../AdaptableInterfaces/IAdaptable';
import { AdaptableState } from '../../PredefinedConfig/AdaptableState';
export declare abstract class ApiBase {
    protected adaptable: IAdaptable;
    /**
     * Constructor for all the api classes which simply takes and assigns an instance of Adaptable
     * @param adaptable the core IAdaptable object
     */
    constructor(adaptable: IAdaptable);
    /**
     * Base api helper method which ensure that Adaptable Object being used in the function is not null or undefined
     *
     * If it does not exist then we log an error and the api method should stop
     * @param item AdaptableObject being checked
     * @param name the name of the object if it has one (e.g. if its a search)
     * @param type the actual type of the object being checked
     */
    protected checkItemExists(item: any, name: string, type: string): boolean;
    protected checkArrayExists(array: any): boolean;
    /**
     * Base api Helper method that dispatches a *Redux Action* to the Store
     * @param action the Redux Action to be dispatched
     */
    protected dispatchAction(action: Action): void;
    /**
     * Returns the entire State from the Store
     *
     * This is a simple *getState()* call
     */
    getAdaptableState(): AdaptableState;
}
