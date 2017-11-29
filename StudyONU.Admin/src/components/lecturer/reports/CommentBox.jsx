import * as React from 'react';
import Paper from 'material-ui/Paper';

import { CommentList } from './CommentList';
import { CommentInput } from './CommentInput';

export class CommentBox extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            items,
            open
        } = this.props;

        if (!open) {
            return null;
        }

        const list = this.getList();

        return (
            <Paper zDepth={3}>
                {list}
                <CommentInput
                    onSubmit={text => this.props.sendComment(text)}
                    onClose={() => this.props.onClose()}
                />
            </Paper>
        );
    }

    getList() {
        const {
            items,
            userEmail
        } = this.props;

        return items.length == 0
            ? (
                <div style={{ padding: 30, borderBottom: '1px solid gainsboro' }}>
                    Комментариев ещё нет
                </div>
            )
            : (
                <CommentList
                    items={items}
                    isSender={email => userEmail === email}
                />
            );
    }
}