import * as React from 'react';

import { EmptyContent } from '../../shared/EmptyContent';

import Urls from '../../../shared/urls';
import DateHelper from '../../../shared/date';

import { ReportList } from './ReportList';
import { CommentBox } from './CommentBox';
import { SentRightIconButton } from './RightIconButtons';

import './reportBox.scss';

export class SentReportBox extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [],
            loaded: false,
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
            comments,
            openComments
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
                    rightIconButton={SentRightIconButton(report => this.startChecking(report))}
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
        );
    }

    startChecking(report) {
        let self = this;
        this.props.put(Urls.reports.check(report.taskId, report.studentEmail), null, result => self.load());
    }

    sendComment(text) {
        let studentEmail = this.state.studentEmail;
        let taskId = this.state.taskId;

        const data = {
            text: text,
            studentEmail: studentEmail,
            taskId: taskId
        }

        let self = this;
        this.props.post(Urls.comments.create, data, result => self.loadComments(taskId, studentEmail));
    }

    openFile(filePath) {
        window.open(filePath);
    }

    load() {
        let self = this;
        this.props.get(Urls.reports.sent, result => {
            self.setState({
                items: result.data,
                loaded: true,
                comments: [],
                openComments: false,
                taskId: null,
                studentEmail: null
            });
        });
    }

    loadComments(taskId, studentEmail) {
        let self = this;
        let url = Urls.comments.list(taskId, studentEmail);

        this.props.get(url, result => {
            let comments = result.data.map(comment => {
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
