﻿import * as React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { Api } from '../../shared/api';
import { Logger } from '../../shared/logger';
import { LoginDialog } from './LoginDialog';
import { AlertConnection } from './AlertConnection';

import './shared.scss';

export const ApiWrapper = (user, onLogin, onLogout) => (WrappedComponent) => {
    return class WithApiWrapper extends React.Component {
        constructor(props) {
            super(props);

            this.state = {
                openLoginDialog: false,
                loginError: false,
                errorMessage: ''
            }
        }

        render() {
            const {
                openLoginDialog,
                loginError,
                errorMessage
            } = this.state;

            const open = errorMessage.length > 0;

            return (
                <MuiThemeProvider>
                    <div style={{ padding: 30, backgroundColor: '#EBE8E8' }}>
                        <WrappedComponent {...this.props}
                            user={user}
                            get={(url, callback) => this.callApi(() => Api.get(url), callback)}
                            post={(url, data, callback) => this.callApi(() => Api.post(url, data), callback)}
                            postFormData={(url, data, callback) => this.callApi(() => Api.postFormData(url, data), callback)}
                            put={(url, data, callback) => this.callApi(() => Api.put(url, data), callback)}
                            putFormData={(url, data, callback) => this.callApi(() => Api.putFormData(url, data), callback)}
                            delete={(url, data, callback) => this.callApi(() => Api.delete(url, data), callback)}
                            onLogin={() => this.setState({ openLoginDialog: true })}
                            onLogout={() => onLogout()}
                        />
                        <LoginDialog
                            open={openLoginDialog}
                            error={loginError}
                            onClose={() => this.setState({ openLoginDialog: false, loginError: false })}
                            onSubmit={data => this.login(data)}
                        />
                        <AlertConnection
                            open={open}
                            message={errorMessage}
                            onClose={() => this.setState({ errorMessage: '' })}
                        />
                    </div>
                </MuiThemeProvider>
            );
        }

        callApi(method, callback) {
            let self = this;
            const history = this.props.history;

            method()
                .then(response => this.parseResponse(response))
                .then(result => {
                    if (!result.isAuthOk) {
                        onLogout();
                    } else if (result.exception) {
                        Logger.error(result.response);
                    } else {
                        let promise = result.response.json();
                        promise.then(json => {
                            if (json.success === true) {
                                callback(json);
                            } else {
                                let errors = json.errors;
                                if (errors.common) {
                                    Logger.error(errors.common ? errors.common : 'Error on server');
                                    self.setState({ errorMessage: 'Неправильно введены данные' });
                                } else if (errors.exception) {
                                    Logger.error(errors.exception ? errors.exception : 'Exception on server');
                                    self.setState({ errorMessage: 'Возникла ошибка при соединении. Перезагрузите страницу' });
                                } else if (errors.access) {
                                    Logger.error(errors.access ? errors.access : 'Access denied');
                                    history.push('/');
                                }
                            }
                        });
                    }
                });
        }

        parseResponse(response) {
            let result = {
                response: response,
                isAuthOk: response.status != 401,
                exception: response.status == 500
            }

            return result
        }

        login(data) {
            let self = this;
            Api.token(data, result => {
                if (result.success === true) {
                    onLogin(result.data);
                }

                self.setState({
                    loginError: result.success !== true,
                    openLoginDialog: result.success !== true
                });
            });
        }
    }
}