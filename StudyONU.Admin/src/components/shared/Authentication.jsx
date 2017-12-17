﻿import * as React from 'react';
import { Login } from './Login';
import { AuthorizationData } from '../../shared/authorizationData';
import { Api } from '../../shared/api';

import Urls from '../../shared/urls';

export const Authentication = (WrappedComponent) => {
    return class WithAuthentication extends React.Component {
        constructor(props) {
            super(props);

            this.state = {
                user: {
                    email: '',
                    role: '',
                    token: '',
                    firstName: '',
                    lastName: '',
                    patronymic: '',
                    photoPath: ''
                }
            }
        }

        componentDidMount() {
            let self = this;
            Api.post(Urls.check, null)
                .then(response => {
                    if (response.status == 401) {
                        AuthorizationData.clear();
                    }

                    self.update();
                });
        }

        render() {
            const user = this.state.user;

            let renderedComponent = user.role
                ? <WrappedComponent
                    user={user}
                    get={(url, callback) => this.get(url, callback)}
                    post={(url, data, callback) => this.post(url, data, callback)}
                    postFormData={(url, data, callback) => this.postFormData(url, data, callback)}
                    put={(url, data, callback) => this.put(url, data, callback)}
                    putFormData={(url, data, callback) => this.putFormData(url, data, callback)}
                    delete={(url, data, callback) => this.delete(url, data, callback)}
                    onLogout={() => {
                        AuthorizationData.clear();
                        this.update();
                    }} />
                : <Login
                    onLoginSuccess={data => {
                        AuthorizationData.save(data);
                        this.update();
                        this.props.history.push('/');
                    }} />;

            return renderedComponent;
        }

        get(url, callback) {
            const method = () => Api.get(url);
            this.callApi(method, callback);
        }

        post(url, data, callback) {
            const method = () => Api.post(url, data);
            this.callApi(method, callback);
        }

        postFormData(url, data, callback) {
            const method = () => Api.postFormData(url, data);
            this.callApi(method, callback);
        }

        put(url, data, callback) {
            const method = () => Api.put(url, data);
            this.callApi(method, callback);
        }

        putFormData(url, data, callback) {
            const method = () => Api.putFormData(url, data);
            this.callApi(method, callback);
        }

        delete(url, data, callback) {
            const method = () => Api.delete(url, data);
            this.callApi(method, callback);
        }

        callApi(method, callback) {
            let self = this;
            method()
                .then(response => this.checkUnauthorized(response))
                .then(result => {
                    if (!result.isAuthOk) {
                        AuthorizationData.clear();
                        self.update();
                    } else if (result.exception) {
                        console.error(result.response);
                    } else {
                        result.response.json().then(r => callback(r));
                    }
                });
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
            let user = {
                email: '',
                role: '',
                token: '',
                firstName: '',
                lastName: '',
                patronymic: '',
                photoPath: ''
            };

            let userLoggedIn = AuthorizationData.any();
            if (userLoggedIn) {
                let authorizationData = AuthorizationData.get();
                user.email = authorizationData.email;
                user.role = authorizationData.role;
                user.token = authorizationData.token;
                user.firstName = authorizationData.firstName;
                user.lastName = authorizationData.lastName;
                user.patronymic = authorizationData.patronymic;
                user.photoPath = authorizationData.photoPath;
            }

            let state = { user: user };
            this.setState(state);
        }
    }
}