import * as React from 'react';
import FlatButton from 'material-ui/FlatButton';
import ActionSubject from 'material-ui/svg-icons/action/subject';

import { urls } from '../../shared/api';
import { DateHelper } from '../../shared/date';

import { Header } from '../shared/Header';
import { TaskItem } from '../task/TaskItem';

import './course.scss';

export class Course extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tasks: [],
            loaded: false,
            courseInfo: null
        }
    }

    componentDidMount() {
        this.load();
    }

    load() {
        let self = this;
        const id = this.props.match.params.id;

        this.props.get(urls.courses.details(id), result => {
            self.setState({
                courseInfo: result.data
            });
        });

        this.props.get(urls.courses.taskList(id), result => {
            self.setState({
                loaded: true,
                tasks: result.data.map(task => {
                    if (task.dateOverdue) {
                        task.dateOverdue = DateHelper.toDate(task.dateOverdue, '.');
                    }

                    return task;
                })
            });
        });
    }

    render() {
        const {
            tasks,
            courseInfo
        } = this.state;

        let navigationLinks = this.getNavigationLinks();

        // TODO
        // Loading
        if (courseInfo == null) {
            return null;
        }

        const actions = (taskId) => (
            <FlatButton
                disabled={courseInfo.readOnly}
                label="Детали"
                primary={true}
                icon={<ActionSubject />}
                onClick={() => this.props.history.push(`/courses/${this.props.match.params.id}/tasks/${taskId}`)}
            />
        );

        return (
            <div>
                <Header navigationLinks={navigationLinks} backLink={this.props.user.isLoggedIn ? '/courses/my' : '/courses/public'} {...this.props} />
                {this.getCourseInfo(courseInfo)}
                <div className="task-list">
                    {
                        tasks.map(task => <TaskItem
                            id={task.id}
                            title={task.title}
                            description={task.description}
                            reportStatus={task.reportStatus}
                            filePaths={task.filePaths}
                            dateOverdue={task.dateOverdue}
                            readOnly={courseInfo.readOnly}
                            actions={actions(task.id)}
                            className="task-item"
                            shortenDescription={true}
                        />)
                    }
                </div>
            </div>
        );
    }

    getNavigationLinks() {
        const id = this.props.match.params.id;
        return [
            { to: `/courses/${id}/tasks`, title: 'Задачи' },
            { to: `/courses/${id}/guides`, title: 'Методички' },
            { to: `/courses/${id}/progress`, title: 'Успеваемость' }
        ];
    }

    getCourseInfo(courseInfo) {
        return (
            <div className="course-info">
                <h2 className="title">{courseInfo.name}</h2>
                <p className="speciality">{`${courseInfo.specialityName}, ${courseInfo.courseNumber} курс`}</p>
                <div className="lecturer-info">
                    <img className="lecturer-photo" src={courseInfo.lecturerPhotoPath} />
                    <span className="lecturer-name">{courseInfo.lecturerFullName}</span>
                </div>
            </div>
        );
    }
}
