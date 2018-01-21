import * as React from 'react';
import { Redirect } from 'react-router-dom';
import Paper from 'material-ui/Paper';

export default class AccountInfo extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (!this.props.user.isLoggedIn) {
            return <Redirect to='/' />
        }

        return (
            <Paper zDepth={3}>
                AccountInfo
            </Paper>
        );
    }
}