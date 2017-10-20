import * as React from 'react';
import { urls } from '../../../shared/api';
import { TaskItem } from './TaskItem';
import { TaskForm } from './TaskForm';

export class TaskList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loaded: false,
            items: [],
            errors: []
        };
    }

    componentDidMount() {
        this.load();
    }

    render() {
        const { loaded, items, errors } = this.state;
        let render;

        if (!loaded) {
            render = <div>Загрузка...</div>;
        } else if (errors.length > 0) {
            render = <div>Возникла ошибка!</div>;
        } else if (items.length > 0) {
            render = (
                <div>
                    <TaskForm getCourses={callback => this.getCourses(callback)} createItem={data => this.createItem(data)} />
                    {items.map((item, index) => {
                        return <TaskItem key={index} item={item} />
                    })}
                </div>
            );
        } else {
            render = (
                <div>
                    <TaskForm getCourses={callback => this.getCourses(callback)} createItem={data => this.createItem(data)} />
                    <div>Нет Задач!</div>
                </div>
            );
        }

        return render;
    }

    getCourses(callback) {
        this.props.get(urls.courses, result => {
            if (result.success === true) {
                callback(result.data);
            } else {
                // TODO
                // implement error display
                alert('Error');
                console.log(result);
            }
        });
    }

    createItem(data) {
        let reload = () => this.load();
        this.props.postFormData(urls.tasks, data, result => {
            if (result.success === true) {
                reload();
            } else {
                // TODO
                // implement error display
                alert('Error');
                console.log(result);
            }
        });
    }

    load() {
        let _this = this;

        this.props.get(urls.tasks, response => {
            if (response.success === true) {
                _this.setState({
                    loaded: true,
                    items: response.data
                });
            } else {
                console.error(response.errors);
                _this.setState({
                    loaded: true,
                    items: []
                });
                // TODO
                // implement error display
                alert('Error');
                console.log(result);
            }
        });
    }
}