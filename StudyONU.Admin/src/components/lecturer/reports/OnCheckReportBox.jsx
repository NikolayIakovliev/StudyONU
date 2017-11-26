﻿import * as React from 'react';

import { EmptyContent } from '../../shared/EmptyContent';
import { Downloader } from '../../../shared/download';
import { urls } from '../../../shared/api';

import { ReportList } from './ReportList';
import { CommentBox } from './CommentBox';
import { MarkModal } from './MarkModal';
import { OnCheckRightIconButton } from './RightIconButtons';

import './reportBox.scss';

export class OnCheckReportBox extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [],
            loaded: false,
            acceptItem: null
        }
    }

    componentDidMount() {
        this.load();
    }

    render() {
        const {
            items,
            loaded,
            acceptItem
        } = this.state;

        // TODO
        // Loading
        if (!loaded) {
            return null;
        }

        if (items.length == 0) {
            return <EmptyContent title="Нет отчётов" message="Все отчёты проверены" />;
        }

        const open = acceptItem != null;

        return (
            <div>
                <div className="report-box">
                    <ReportList
                        items={items}
                        rightIconButton={OnCheckRightIconButton(
                            report => this.setState({ acceptItem: report }),
                            report => this.reject(report),
                            report => this.download(report))
                        }
                    />
                    <CommentBox />
                </div>
                <MarkModal
                    open={open}
                    onRequestClose={() => this.setState({ acceptItem: null })}
                    onAccept={mark => this.accept(acceptItem, mark)}
                />
            </div>
        );
    }

    accept(report, mark) {
        let self = this;
        let url = urls.reports.accept(report.taskId, report.studentEmail, mark);

        this.props.put(url, null, result => self.load());
    }

    reject(report) {
        let self = this;
        let url = urls.reports.reject(report.taskId, report.studentEmail);

        this.props.put(url, null, result => self.load());
    }

    download(report) {
        const fileName = `${report.courseName}, ${report.taskTitle} - ${report.studentFullName}`;
        Downloader.download(report.filePath, fileName);
    }

    load() {
        let self = this;
        this.props.get(urls.reports.onCheck, result => {
            self.setState({
                items: result.data,
                loaded: true,
                acceptItem: null
            });
        });
    }
}