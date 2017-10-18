import * as React from 'react';
import { urls } from '../../../shared/api';
import { CourseItem } from './CourseItem';
import { CourseForm } from './CourseForm';

export class CourseList extends React.Component {
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
                    <CourseForm getSpecialities={callback => this.getSpecialities(callback)} createItem={data => this.createItem(data)} />
                    {items.map((item, index) => {
                        return <CourseItem key={index} item={item} />
                    })}
                </div>
            );
        } else {
            render = (
                <div>
                    <CourseForm getSpecialities={callback => this.getSpecialities(callback)} createItem={data => this.createItem(data)} />
                    <div>Нет Курсов!</div>
                </div>
            );
        }

        return render;
    }

    getSpecialities(callback) {
        this.props.get(urls.specialities, result => {
            if (result.success === true) {
                callback(result.data);
            } else {
                // TODO
                // implement error display
                alert('Error');
            }
        });
    }

    createItem(data) {
        let reload = () => this.load();
        this.props.post(urls.courses, data, result => {
            if (result.success === true) {
                reload();
            } else {
                // TODO
                // implement error display
                alert('Error');
            }
        });
    }

    load() {
        let _this = this;

        this.props.get(urls.courses, response => {
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
            }
        });
    }
}