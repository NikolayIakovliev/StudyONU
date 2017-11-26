import * as React from 'react';

import { EmptyContent } from '../../shared/EmptyContent';
import { Downloader } from '../../../shared/download';
import { urls } from '../../../shared/api';

import { ReportList } from './ReportList';
import { CommentBox } from './CommentBox';
import { SentRightIconButton } from './RightIconButtons';

import './reportBox.scss';

export class SentReportBox extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [],
            loaded: false
        }
    }

    componentDidMount() {
        this.load();
    }

    render() {
        const {
            items,
            loaded
        } = this.state;

        // TODO
        // Loading
        if (!loaded) {
            return null;
        }

        if (items.length == 0) {
            return <EmptyContent title="Нет отчётов" message="Ещё не отправлено ни одного отчёта" />;
        }

        return (
            <div className="report-box">
                <ReportList
                    items={items}
                    rightIconButton={RightIconButton(report => this.startChecking(report))}
                />
                <CommentBox />
            </div>
        );
    }

    startChecking(report) {
        const fileName = `${report.courseName}, ${report.taskTitle} - ${report.studentFullName}`;
        Downloader.download(report.filePath, fileName);

        let self = this;
        this.props.put(urls.reports.check(report.taskId, report.studentEmail), null, result => {
            self.load();
        });
    }

    load() {
        let self = this;
        this.props.get(urls.reports.sent, result => {
            self.setState({
                items: result.data,
                loaded: true
            });
        });
    }
}