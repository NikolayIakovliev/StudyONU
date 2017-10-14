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
            let _this = this;

            let renderedComponent = this.state.userRole
                ? <WrappedComponent
                    userRole={this.state.userRole}
                    get={(url, callback) => _this.get(url, callback)}
                    post={(url, callback) => _this.post(url, callback)}
                    onLogout={() => {
                        AuthorizationData.clear();
                        _this.update();
                    }}
                />
                : <Login
                    onLoginSuccess={data => {
                        AuthorizationData.save(data);
                        _this.update();
                    }}
                />;

            return renderedComponent;
        }

        get(url, callback) {
            let _this = this;

            Api.get(url)
                .then(_this.checkUnauthorized)
                .then(result => {
                    if (result.isAuthOk) {
                        result.response.json().then(r => callback(r));
                    } else {
                        AuthorizationData.clear();
                        this.update();
                    }
                });
        }

        post(url, data, callback) {
            let _this = this;

            Api.post(url, data)
                .then(_this.checkUnauthorized)
                .then(result => {
                    if (result.isAuthOk) {
                        callback(result.response.json());
                    } else {
                        AuthorizationData.clear();
                        this.update();
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
                isAuthOk: response.status != 401
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