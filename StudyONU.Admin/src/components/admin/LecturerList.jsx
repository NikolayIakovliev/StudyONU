import * as React from 'react';
import { Api, urls } from '../../shared/api';
import { LecturerItem } from './LecturerItem';
import { LecturerForm } from './LecturerForm';

export class LecturerList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loaded: false,
            lecturers: [],
            errors: []
        };
    }

    componentDidMount() {
        this.load();
    }

    render() {
        const { loaded, lecturers, errors } = this.state;
        let render;

        if (!loaded) {
            render = <div>Загрузка...</div>;
        } else if (errors.length > 0) {
            render = <div>Возникла ошибка!</div>;
        } else if (lecturers.length > 0) {
            render = (
                <div>
                    <LecturerForm post={this.createLecturer} />
                    {lecturers.map((lecturer, index) => {
                        return <LecturerItem key={index} item={lecturer} />
                    })}
                </div>
            );
        } else {
            render = (
                <div>
                    <LecturerForm post={this.createLecturer} />
                    <div>Нет преподавателей!</div>
                </div>
            );
        }

        return render;
    }

    createLecturer(data) {
        console.log(data);
    }

    load() {
        let _this = this;

        this.props.get(urls.lecturers, response => {
            if (response.success) {
                _this.setState({
                    loaded: true,
                    lecturers: response.data
                });
            } else {
                console.error(response.errors);
                _this.setState({
                    loaded: true
                });
            }
        });
    }
}