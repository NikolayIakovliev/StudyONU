import * as React from 'react';
import { List } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import { Dialog } from '../../shared/Dialog';
import { Loading } from '../../shared/Loading';
import { LecturerItem } from './LecturerItem';
import { LecturerForm } from './LecturerForm';
import { LecturerEditDialog } from './LecturerEditDialog';

import Urls from '../../../shared/urls';

export class LecturerList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loaded: false,
            items: [],
            itemEditRequest: null,
            itemDeleteRequest: null
        };
    }

    componentDidMount() {
        this.load();
    }

    render() {
        const {
            loaded,
            items,
            itemEditRequest,
            itemDeleteRequest
        } = this.state;

        let render;

        if (!loaded) {
            render = <Loading />;
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
                    {items.length == 0 &&
                        <div>
                            <EmptyContent title="Преподавателей нет" message="Ещё не зарегистрировано ни одного преподавателя" />
                            <LecturerForm createItem={data => this.modifyItem(this.props.postFormData, data)} />
                        </div>
                    }
                    {items.length > 0 &&
                        <div className="list-form-container">
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
                            <LecturerForm createItem={data => this.modifyItem(this.props.postFormData, data)} />
                        </div>
                    }
                </div>
            );
        }

        return render;
    }

    modifyItem(method, data) {
        method(Urls.lecturers, data, () => this.load());
    }

    load() {
        this.props.get(Urls.lecturers, data => this.setState({
            loaded: true,
            itemEditRequest: null,
            itemDeleteRequest: null,
            items: data
        }));
    }
}