import * as React from 'react';
import { Api, urls } from '../../../shared/api';
import { List } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import { Dialog } from '../../shared/Dialog';
import { Loading } from '../../shared/Loading';
import { LecturerItem } from './LecturerItem';
import { LecturerForm } from './LecturerForm';
import { LecturerEditDialog } from './LecturerEditDialog';

import './lecturerList.scss';

export class LecturerList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loaded: false,
            items: [],
            errors: [],
            itemEditRequest: null,
            itemDeleteRequest: null
        };
    }

    componentDidMount() {
        this.load();
    }

    render() {
        const { loaded, items, errors, itemEditRequest, itemDeleteRequest } = this.state;
        let render;

        if (!loaded) {
            render = <Loading />;
        } else if (errors.length > 0) {
            render = <div>Возникла ошибка!</div>;
        } else {
            render = (
                <div>
                    {itemEditRequest != null &&
                        <LecturerEditDialog
                            message="Введите новые данные"
                            open={true}
                            item={itemEditRequest}
                            onClose={() => this.setState({ itemEditRequest: null })}
                            onSubmit={item => this.modifyItem(this.props.put, item)} />
                    }
                    {itemDeleteRequest != null &&
                        <Dialog
                            title="Подтвердите действие"
                            message="Вы уверены, что хотите удалить аккаунт преподавателя? Данное действие необратимо"
                            open={true}
                            actionLabel="Удалить"
                            onClose={() => this.setState({ itemDeleteRequest: null })}
                            onSubmit={() => this.modifyItem(this.props.delete, itemDeleteRequest)} />
                    }
                    <div className="list-form-container">
                        {items.length &&
                            <Paper zDepth={3} className="flex-grow-1">
                                <List>
                                    <Subheader>Преподаватели</Subheader>
                                    <Divider />
                                    {items.map((item, index) => {
                                        return <LecturerItem
                                            key={item.id}
                                            item={item}
                                            onEdit={item => this.setState({ itemEditRequest: item })}
                                            onDelete={item => this.setState({ itemDeleteRequest: item })} />
                                    })}
                                </List>
                            </Paper>
                        }
                        <LecturerForm createItem={data => this.modifyItem(this.props.postFormData, data)} />
                    </div>
                </div>
            );
        }

        return render;
    }

    modifyItem(method, data) {
        let reload = () => this.load();
        method(urls.lecturers, data, result => {
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
        let self = this;

        this.props.get(urls.lecturers, response => {
            let newState = {
                loaded: true,
                itemEditRequest: null,
                itemDeleteRequest: null,
                errors: response.errors,
                items: response.success === true
                    ? response.data
                    : []
            }

            if (response.success != true) {
                // TODO
                // implement error display
                console.log(result);
            }

            self.setState(newState);
        });
    }
}