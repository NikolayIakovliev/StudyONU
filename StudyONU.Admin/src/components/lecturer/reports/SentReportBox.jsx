import * as React from 'react';

import { urls } from '../../../shared/api';

import { ReportBox } from './ReportBox';

export class SentReportBox extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <ReportBox
            getReportsUrl={urls.reports.sent}
            sendReportUrl={urls.reports.check}
            {...this.props} 
        />;
    }
}