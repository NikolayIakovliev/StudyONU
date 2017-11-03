import * as React from 'react';
import Snackbar from 'material-ui/Snackbar';

export class AlertConnection extends React.Component {
    render() {
        return (
            <Snackbar
                open={this.props.open}
                message="Возникла ошибка при соединении"
                action="Закрыть"
                autoHideDuration={4000}
                onActionTouchTap={this.props.onClose}
                onRequestClose={this.props.onClose} />
        );
    }
}
