import * as React from 'react';
import Snackbar from 'material-ui/Snackbar';

export default class Alert extends React.Component {
    render() {
        return <Snackbar
            open={this.props.open}
            message={this.props.message}
            action="Закрыть"
            autoHideDuration={5000}
            onActionTouchTap={this.props.onRequestClose}
            onRequestClose={this.props.onRequestClose}
        />
    }
}
