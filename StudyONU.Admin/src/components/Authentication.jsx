import * as React from 'react';
import { Login } from './Login';
import { isUserLoggedIn, saveAuthorizationData } from '../shared/shared';

export class Authentication extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let _this = this;
        let component = isUserLoggedIn()
            ? this.props.children
            : <Login onLoginSuccess={data => {
                saveAuthorizationData(data);
                _this.setState({});
            }} />;

        return component;
    }
}