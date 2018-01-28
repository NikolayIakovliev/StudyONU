import * as React from 'react';
import { List } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import { Loading } from '../../shared/Loading';
import { EmptyContent } from '../../shared/EmptyContent';

import LecturerList from './LecturerList';
import ApproveDialog from './ApproveDialog';

import Urls from '../../../shared/urls';

export default class LecturerQueue extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loaded: false,
            items: [],
            lecturerId: null,
            approve: null
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
        
        if (!loaded) {
            return <Loading />;
        }
        
        return (
            <div>
                {items.length == 0 && <EmptyContent title="Заявок нет" message="Пока нет новых заявок на регистрацию" />}
                {items.length > 0 &&
                    <Paper zDepth={3}>
                        <LecturerList
                            items={items}
                            onSelect={(lecturerId, approve) => this.setState({ lecturerId, approve })}
                        />
                        {this.renderDialog()}
                    </Paper>
                }
            </div>
        );
    }

    renderDialog() {
        const {
            approve,
            lecturerId
        } = this.state;

        const open = lecturerId != null;
        const title = 'Утверждение преподавателя';
        const text = approve
            ? 'Вы уверены, что хотите утвердить преподавателя?'
            : 'Вы уверены, что не хотите утверждать преподавателя?';
        const onSubmit = approve
            ? () => this.approve(lecturerId)
            : () => this.disapprove(lecturerId);
        const onRequestClose = () => this.setState({ lecturerId: null, approve: null });

        return <ApproveDialog
            open={open}
            title={title}
            text={text}
            onSubmit={onSubmit}
            onRequestClose={onRequestClose}
        />;
    }

    approve(id) {
        this.props.post(Urls.lecturerQueue.approve(id), null, () => this.load());
    }

    disapprove(id) {
        this.props.post(Urls.lecturerQueue.disapprove(id), null, () => this.load());
    }

    load() {
        this.props.get(Urls.lecturerQueue.list, items => this.setState({
            loaded: true,
            items: items
        }));
    }
}