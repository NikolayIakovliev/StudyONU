import * as React from 'react';
import { Login } from './Login';
import { isUserLoggedIn } from '../shared/shared';

export class Authentication extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return isUserLoggedIn()
            ? this.props.children
            : <Login />;
    }
}