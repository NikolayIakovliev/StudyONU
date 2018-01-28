import * as React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

export default class ApproveDialog extends React.Component {
    render() {
        const {
            open,
            title,
            text,
            onSubmit,
            onRequestClose
        } = this.props;

        const actions = [
            <FlatButton
                label="Подтвердить"
                primary={true}
                onClick={onSubmit}
            />,
            <FlatButton
                label="Отмена"
                primary={true}
                onClick={onRequestClose}
            />,
        ];

        return (
            <Dialog
                title={title}
                actions={actions}
                open={open}
                onRequestClose={onRequestClose}
            >
                {text}
            </Dialog>
        );
    }
}