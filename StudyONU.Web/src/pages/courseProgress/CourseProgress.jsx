import * as React from 'react';

import { urls } from '../../shared/api';

import { Header } from '../shared/Header';

import { ProgressTable } from './ProgressTable';

export class CourseProgress extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tasks: [],
            students: [],
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

        const {
            loaded,
            tasks,
            students
        } = this.state;

        // TODO
        // Loading
        if (!loaded) {
            return null;
        }

        return (
            <div>
                <Header navigationLinks={this.getNavigationLinks()} backLink={this.props.user.isLoggedIn ? '/courses/my' : '/courses/public'} {...this.props} />
                <ProgressTable
                    tasks={tasks}
                    students={students}
                />
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

    load() {
        let self = this;
        this.props.get(urls.courseProgress(this.props.match.params.id), result => {
            const tasks = result.data.tasks;
            const students = result.data.students;

            self.setState({
                tasks,
                students,
                loaded: true
            });
        });
    }
}