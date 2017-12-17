import * as React from 'react';

import { Loading } from '../../shared/Loading';
import { Filter } from '../../shared/filter/Filter';

import Urls from '../../../shared/urls';

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
        this.props.get(Urls.courses, data => this.setState({
            courses: data,
            loaded: true
        }));
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
            this.props.get(Urls.courseProgress(courseId), data => {
                const tasks = data.tasks;
                const students = data.students;

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