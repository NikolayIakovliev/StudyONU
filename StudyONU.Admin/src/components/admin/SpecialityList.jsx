import * as React from 'react';
import { Api, urls } from '../../shared/api';
import { SpecialityItem } from './SpecialityItem';
import { SpecialityForm } from './SpecialityForm';

export class SpecialityList extends React.Component {
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
                    <SpecialityForm createItem={data => this.createItem(data)} />
                    {items.map((item, index) => {
                        return <SpecialityItem key={index} item={item} />
                    })}
                </div>
            );
        } else {
            render = (
                <div>
                    <SpecialityForm createItem={data => this.createItem(data)} />
                    <div>Нет специальностей!</div>
                </div>
            );
        }

        return render;
    }

    createItem(data) {
        let reload = () => this.load();
        this.props.post(urls.specialities, data, result => {
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

        this.props.get(urls.specialities, response => {
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