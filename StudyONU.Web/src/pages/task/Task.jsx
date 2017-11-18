import * as React from 'react';

import { urls } from '../../shared/api';
import { DateHelper } from '../../shared/date';

import { Header } from '../shared/Header';
import { TaskItem } from '../task/TaskItem';

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
            const comments = task.comments.map(comment => {
                comment.dateCreated = DateHelper.toDate(comment.dateCreated, '.');
                return comment;
            });

            self.setState({
                id: id,
                title: title,
                description: description,
                filePaths: filePaths,
                reportStatus: reportStatus,
                mark: mark,
                dateOverdue: dateOverdue,
                dateAccepted: dateAccepted,
                comments: comments,
                loaded: true
            });
        });
    }

    render() {
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
                <TaskItem
                    id={id}
                    title={title}
                    description={description}
                    reportStatus={reportStatus}
                    filePaths={filePaths}
                    dateOverdue={dateOverdue}
                    className=""
                />
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
}