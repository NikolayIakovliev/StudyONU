import * as React from 'react';
import MaterialDialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

export class Dialog extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const actions = [
            <FlatButton
                label={this.props.actionLabel}
                secondary={true}
                onClick={() => this.props.onSubmit()} />,
            <FlatButton
                label="Отменить"
                primary={true}
                onClick={() => this.props.onClose()} />
        ];

        return (
            <MaterialDialog
                title={this.props.title}
                actions={actions}
                open={this.props.open}
                onRequestClose={() => this.props.onClose()}>
                {this.props.message}
            </MaterialDialog>
        );
    }
}