import * as React from 'react';

import { EmptyContent } from '../../shared/EmptyContent';
import { Downloader } from '../../../shared/download';

import { ReportList } from './ReportList';
import { CommentBox } from './CommentBox';

import './reportBox.scss';

export class ReportBox extends React.Component {
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
            return <EmptyContent title="Отчётов" message="Ещё не создано ни одного отчёта" />;
        }

        return (
            <div className="report-box">
                <ReportList
                    items={items}
                    onSelect={item => this.startChecking(item)}
                />
                <CommentBox />
            </div>
        );
    }

    startChecking(report) {
        const fileName = `${report.courseName}, ${report.taskTitle} - ${report.studentFullName}`;
        Downloader.download(report.filePath, fileName);

        let self = this;
        this.props.post(this.props.sendReportUrl(report.taskId, report.studentEmail), null, result => {
            self.load();
        });
    }

    load() {
        let self = this;
        this.props.get(this.props.getReportsUrl, result => {
            self.setState({
                items: result.data,
                loaded: true
            });
        });
    }
}