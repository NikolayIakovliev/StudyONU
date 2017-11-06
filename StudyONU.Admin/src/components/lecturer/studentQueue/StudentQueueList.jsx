import * as React from 'react';
import { urls } from '../../../shared/api';
import { List } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { Loading } from '../../shared/Loading';
import { EmptyContent } from '../../shared/EmptyContent';
import { StudentItem } from './StudentItem';

export class StudentQueueList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loaded: false,
            items: [],
            errors: [],
            itemActionRequest: null,
            approve: null
        };
    }

    componentDidMount() {
        this.load();
    }

    render() {
        const {
            loaded,
            items,
            errors,
            itemActionRequest,
            approve
        } = this.state;

        const actions = [
            <FlatButton
                label="Подтвердить"
                primary={true}
                onClick={() => this.modifyItem()}
            />,
            <FlatButton
                label="Отменить"
                primary={true}
                onClick={() => this.setState({ itemActionRequest: null })}
            />
        ];

        let render;

        if (!loaded) {
            render = <Loading />;
        } else if (errors.length) {
            render = <div>Возникла ошибка!</div>;
        } else {
            let open = itemActionRequest != null;
            render = (
                <div>
                    <Dialog
                        actions={actions}
                        open={open}
                        onRequestClose={() => this.setState({ itemActionRequest: null })}>Подтвердите действие</Dialog>
                    {items.length == 0 && <EmptyContent title="Заявок нет" message="Пока нет новых заявок на регистрацию" />}
                    {items.length > 0 &&
                        <div className="list-form-container">
                            <Paper zDepth={3} className="flex-grow-1">
                                <List>
                                    <Subheader>Заявки студентов на регистрацию</Subheader>
                                    <Divider />
                                    {items.map((item, index) => {
                                        return <StudentItem
                                            key={item.id}
                                            item={item}
                                            onApprove={(item, approve) => this.setState({ itemActionRequest: item, approve: approve })} />
                                    })}
                                </List>
                            </Paper>
                        </div>
                    }
                </div>
            );
        }

        return render;
    }

    modifyItem() {
        let url;

        if (this.state.approve === true) {
            url = urls.studentQueue.approve;
        } else if (this.state.approve === false) {
            url = urls.studentQueue.disapprove;
        }

        let reload = () => this.load();
        this.props.post(`${url}?id=${this.state.itemActionRequest.id}`, null, result => {
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

        this.props.get(urls.studentQueue.list, result => {
            let newState = {
                loaded: true,
                itemActionRequest: null,
                approve: null,
                errors: result.errors,
                items: result.success === true
                    ? result.data
                    : []
            }

            if (result.success != true) {
                // TODO
                // implement error display
                console.log(result);
            }

            self.setState(newState);
        });
    }
}