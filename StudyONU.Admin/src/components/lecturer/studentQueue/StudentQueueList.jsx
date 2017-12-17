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
            items: []
        };
    }

    componentDidMount() {
        this.load();
    }

    render() {
        const {
            loaded,
            items
        } = this.state;

        let render;

        if (!loaded) {
            render = <Loading />;
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
        this.props.post(url, data, () => this.load());
    }

    load() {
        this.props.get(Urls.studentQueue.list, data => this.setState({
            loaded: true,
            itemActionRequest: null,
            approve: null,
            items: data
        }));
    }
}