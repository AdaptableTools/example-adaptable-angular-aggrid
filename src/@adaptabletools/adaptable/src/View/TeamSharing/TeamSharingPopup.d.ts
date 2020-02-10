import * as React from 'react';
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux';
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps';
import { SharedEntity } from '../../Utilities/Interface/SharedEntity';
import { AdaptableObject } from '../../PredefinedConfig/Common/AdaptableObject';
import { AdaptableFunctionName } from '../../PredefinedConfig/Common/Types';
interface TeamSharingPopupProps extends StrategyViewPopupProps<TeamSharingPopupComponent> {
    Entities: Array<SharedEntity>;
    onGetSharedItems: () => TeamSharingRedux.TeamSharingShareAction;
    onImportItem: (entity: AdaptableObject, strategy: AdaptableFunctionName) => TeamSharingRedux.TeamSharingImportItemAction;
}
declare class TeamSharingPopupComponent extends React.Component<TeamSharingPopupProps, {}> {
    componentDidMount(): void;
    render(): JSX.Element;
    getSharedItemDetails(sharedEntity: SharedEntity): JSX.Element | "NEED TO DO  COLUMN FILTER" | "NOT IMPLEMENTED";
}
export declare let TeamSharingPopup: import("react-redux").ConnectedComponent<typeof TeamSharingPopupComponent, any>;
export {};
