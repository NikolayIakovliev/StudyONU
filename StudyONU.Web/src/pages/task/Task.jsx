import * as React from 'react';

import { urls } from '../../shared/api';
import { DateHelper } from '../../shared/date';

import { Header } from '../shared/Header';
import { TaskItem } from '../task/TaskItem';
import { ReportBox } from '../task/ReportBox';

import { CommentBox } from './CommentBox';

import './task.scss';

export class Task extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: null,
            title: '',
            description: '',
            filePaths: null,
            reportStatus: null,
            mark: null,
            dateOverdue: null,
            dateAccepted: null,
            comments: [],
            loaded: false
        }
    }

    componentDidMount() {
        this.load();
    }

    render() {
        if (!this.props.user.isLoggedIn) {
            this.props.history.push('/courses/public');
        }

        if (!this.state.loaded) {
            // TODO
            // Replace by Loading
            return null;
        }

        const {
            id,
            title,
            description,
            filePaths,
            reportStatus,
            mark,
            dateOverdue,
            dateAccepted,
            comments
        } = this.state;

        let navigationLinks = this.getNavigationLinks();

        return (
            <div>
                <Header navigationLinks={navigationLinks} backLink={`/courses/${this.props.match.params.courseId}/tasks`} {...this.props} />
                <div className="task-details">
                    <TaskItem
                        id={id}
                        title={title}
                        description={description}
                        reportStatus={reportStatus}
                        filePaths={filePaths}
                        dateOverdue={dateOverdue}
                        className="task-box"
                    />
                    <div className="right-content">
                        <ReportBox
                            className="report-box"
                            reportStatus={reportStatus}
                            mark={mark}
                            dateOverdue={dateOverdue}
                            dateAccepted={dateAccepted}
                            onSend={files => this.onSend(files)}
                            onCancel={() => this.onCancel()}
                        />
                        <CommentBox
                            items={comments}
                            userEmail={this.props.user.email}
                            sendComment={text => this.sendComment(text)}
                        />
                    </div>
                </div>
            </div>
        );
    }

    getNavigationLinks() {
        const courseId = this.props.match.params.courseId;

        return [
            { to: `/courses/${courseId}/tasks`, title: 'Задачи' },
            { to: `/courses/${courseId}/guides`, title: 'Методички' },
            { to: `/courses/${courseId}/progress`, title: 'Успеваемость' }
        ];
    }

    onSend(files) {
        const data = {
            files: files,
            taskId: this.state.id
        }

        let self = this;
        this.props.postFormData(urls.reports.create, data, result => {
            self.load();
        });
    }

    onCancel() {
        let self = this;
        this.props.put(urls.reports.cancel(this.state.id), null, result => self.load(), result => location.reload());
    }

    sendComment(text) {
        const data = {
            text: text,
            taskId: this.state.id
        }

        let self = this;
        this.props.post(urls.comments.create, data, result => self.loadComments());
    }

    load() {
        let self = this;

        this.props.get(urls.tasks.details(this.props.match.params.id), result => {
            let task = result.data;

            const id = task.id;
            const title = task.title;
            const description = task.description;
            const filePaths = task.filePaths;
            const reportStatus = task.reportStatus;
            const mark = task.mark;
            const dateOverdue = task.dateOverdue ? DateHelper.toDate(task.dateOverdue, '.') : null;
            const dateAccepted = task.dateAccepted ? DateHelper.toDate(task.dateAccepted, '.') : null;

            self.setState({
                id: id,
                title: title,
                description: description,
                filePaths: filePaths,
                reportStatus: reportStatus,
                mark: mark,
                dateOverdue: dateOverdue,
                dateAccepted: dateAccepted,
                loaded: true
            });

            self.loadComments();
        });
    }

    loadComments() {
        const taskId = this.state.id;

        let self = this;
        let url = urls.comments.list(taskId);

        this.props.get(url, result => {
            let comments = result.data.map(comment => {
                comment.dateCreated = DateHelper.toDate(comment.dateCreated, '.');
                comment.text = comment.text.replace(/(?:\r\n|\r|\n)/g, '<br />');

                return comment;
            });

            self.setState({
                comments
            });
        });
    }
}