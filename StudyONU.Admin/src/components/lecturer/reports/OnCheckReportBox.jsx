import * as React from 'react';

import { EmptyContent } from '../../shared/EmptyContent';
import { Downloader } from '../../../shared/download';

import Urls from '../../../shared/urls';
import DateHelper from '../../../shared/date';

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
            acceptItem: null,
            comments: [],
            openComments: false,
            taskId: null,
            studentEmail: null
        }
    }

    componentDidMount() {
        this.load();
    }

    render() {
        const {
            items,
            loaded,
            acceptItem,
            comments,
            openComments
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
                        onSelect={item => this.loadComments(item.taskId, item.studentEmail)}
                        openFile={filePath => this.openFile(filePath)}
                    />
                    <CommentBox
                        open={openComments}
                        items={comments}
                        userEmail={this.props.user.email}
                        sendComment={text => this.sendComment(text)}
                        onClose={() => this.setState({ openComments: false })}
                    />
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
        let url = Urls.reports.accept(report.taskId, report.studentEmail, mark);
        this.props.put(url, null, () => this.load());
    }

    reject(report) {
        let url = Urls.reports.reject(report.taskId, report.studentEmail);
        this.props.put(url, null, () => this.load());
    }

    download(report) {
        const fileName = `${report.courseName}, ${report.taskTitle} - ${report.studentFullName}`;

        for (let i = 0; i < report.filePaths.length; i++) {
            let filePath = report.filePaths[i];

            Downloader.download(filePath, `${fileName} (${i + 1})`);
        }
    }

    sendComment(text) {
        let studentEmail = this.state.studentEmail;
        let taskId = this.state.taskId;

        const data = {
            text: text,
            studentEmail: studentEmail,
            taskId: taskId
        }
        
        this.props.post(Urls.comments.create, data, () => this.loadComments(taskId, studentEmail));
    }

    openFile(filePath) {
        window.open(filePath);
    }

    load() {
        this.props.get(Urls.reports.onCheck, data => this.setState({
            items: data,
            loaded: true,
            acceptItem: null,
            comments: [],
            openComments: false,
            taskId: null,
            studentEmail: null
        }));
    }

    loadComments(taskId, studentEmail) {
        let self = this;
        let url = Urls.comments.list(taskId, studentEmail);

        this.props.get(url, data => {
            let comments = data.map(comment => {
                comment.dateCreated = DateHelper.toDate(comment.dateCreated, '.');
                comment.text = comment.text.replace(/(?:\r\n|\r|\n)/g, '<br />');

                return comment;
            });

            self.setState({
                comments,
                openComments: true,
                taskId: taskId,
                studentEmail: studentEmail
            });
        });
    }
}