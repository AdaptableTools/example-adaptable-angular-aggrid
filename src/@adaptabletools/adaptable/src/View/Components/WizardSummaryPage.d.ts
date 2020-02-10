import * as React from 'react';
import { KeyValuePair } from '../../Utilities/Interface/KeyValuePair';
export interface WizardSummaryPageProps extends React.ClassAttributes<WizardSummaryPage> {
    KeyValuePairs: KeyValuePair[];
    header: string;
}
export declare class WizardSummaryPage extends React.Component<WizardSummaryPageProps, {}> {
    render(): any;
}
