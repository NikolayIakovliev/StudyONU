import * as React from 'react';
import { List } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { Loading } from '../../shared/Loading';
import { EmptyContent } from '../../shared/EmptyContent';
import { StudentItem } from './StudentItem';

import Urls from '../../../shared/urls';

export class StudentQueueList extends React.Component {
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
        const {
            loaded,
            items,
            errors
        } = this.state;

        let render;

        if (!loaded) {
            render = <Loading />;
        } else if (errors.length) {
            render = <div>Возникла ошибка!</div>;
        } else {
            const getCourses = (studentId, callback) => this.props.get(Urls.studentQueue.courses(studentId), result => callback(result));

            render = (
                <div>
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
                                            getCourses={getCourses}
                                            onApprove={(id, courseIds) => this.approve(id, courseIds)}
                                            onDisapprove={id => this.disapprove(id)} />
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

    approve(studentId, courseIds) {
        const data = {
            id: studentId,
            courseIds: courseIds
        }

        this.modify(Urls.studentQueue.approve, data);
    }

    disapprove(studentId) {
        this.modify(Urls.studentQueue.disapprove(studentId), null);
    }

    modify(url, data) {
        let reload = () => this.load();
        this.props.post(url, data, result => {
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

        this.props.get(Urls.studentQueue.list, result => {
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