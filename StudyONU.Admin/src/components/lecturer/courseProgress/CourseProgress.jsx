import * as React from 'react';

import { Loading } from '../../shared/Loading';
import { Filter } from '../../shared/filter/Filter';

import { urls } from '../../../shared/api';

import { ProgressTable } from './ProgressTable';

export class CourseProgress extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            courseId: null,
            courses: [],
            loaded: false,
            tasks: [],
            students: []
        }
    }

    componentDidMount() {
        this.load();
    }

    render() {
        const {
            courseId,
            loaded,
            tasks,
            students
        } = this.state;

        if (!loaded) {
            return <Loading />;
        }

        const filter = this.getFilter(courseId);
        if (!courseId) {
            return filter;
        }

        return (
            <div>
                {filter}
                <ProgressTable
                    tasks={tasks}
                    students={students}
                />
            </div>
            );
    }

    load() {
        let self = this;

        this.props.get(urls.courses, result => {
            self.setState({
                courses: result.data,
                loaded: true
            });
        });
    }

    getFilter(value) {
        return <Filter
            value={value}
            items={this.getCourses()}
            defaultText="Выберите курс"
            onChange={courseId => this.loadCourseProgress(courseId)}
        />;
    }

    getCourses() {
        return this.state.courses.map(course => {
            return {
                id: course.id,
                label: course.name
            }
        });
    }

    loadCourseProgress(courseId) {
        if (courseId) {
            let self = this;
            this.props.get(urls.courseProgress(courseId), result => {
                const tasks = result.data.tasks;
                const students = result.data.students;

                self.setState({
                    tasks,
                    students,
                    courseId
                })
            });
        } else {
            this.setState({ courseId });
        }
    }
}