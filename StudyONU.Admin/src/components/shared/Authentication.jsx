import * as React from 'react';
import { Login } from './Login';
import { AuthorizationData } from '../../shared/authorizationData';
import { Api } from '../../shared/api';

export const Authentication = (WrappedComponent) => {
    return class WithAuthentication extends React.Component {
        constructor(props) {
            super(props);

            this.state = {
                userRole: '',
                token: ''
            }
        }

        componentDidMount() {
            this.update();
        }

        render() {
            let renderedComponent = this.state.userRole
                ? <WrappedComponent
                    userRole={this.state.userRole}
                    get={(url, callback) => this.get(url, callback)}
                    post={(url, data, callback) => this.post(url, data, callback)}
                    onLogout={() => {
                        AuthorizationData.clear();
                        this.update();
                    }}
                />
                : <Login
                    onLoginSuccess={data => {
                        AuthorizationData.save(data);
                        this.update();
                    }}
                />;

            return renderedComponent;
        }

        get(url, callback) {
            Api.get(url)
                .then(response => this.checkUnauthorized(response))
                .then(result => {
                    if (!result.isAuthOk) {
                        AuthorizationData.clear();
                        this.update();
                    } else if (result.exception) {
                        console.error(result.response);
                    } else {
                        result.response.json().then(r => callback(r));
                    }
                });
        }

        post(url, data, callback) {
            Api.post(url, data)
                .then(response => this.checkUnauthorized(response))
                .then(result => {
                    if (!result.isAuthOk) {
                        AuthorizationData.clear();
                        this.update();
                    } else if (result.exception) {
                        console.error(result.response);
                    } else {
                        result.response.json().then(r => callback(r));
                    }
                });
        }

        put(url, data, callback) {

        }

        delete(url, callback) {

        }

        checkUnauthorized(response) {
            let result = {
                response: response,
                isAuthOk: response.status != 401,
                exception: response.status != 200 && response.status != 400
            }

            return result
        }

        update() {
            let state = {
                userRole: '',
                token: ''
            };

            let userLoggedIn = AuthorizationData.any();
            if (userLoggedIn) {
                let authorizationData = AuthorizationData.get();
                state.userRole = authorizationData.userRole;
                state.token = authorizationData.token;
            }

            this.setState(state);
        }
    }
}