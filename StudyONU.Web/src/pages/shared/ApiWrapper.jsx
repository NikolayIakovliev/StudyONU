import * as React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { Api } from '../../shared/api';
import { Logger } from '../../shared/logger';
import { LoginDialog } from './LoginDialog';

import './shared.scss';

export const ApiWrapper = (user, onLogin, onLogout) => (WrappedComponent) => {
    return class WithApiWrapper extends React.Component {
        constructor(props) {
            super(props);

            this.state = {
                openLoginDialog: false,
                loginError: false
            }
        }

        render() {
            const {
                openLoginDialog,
                loginError
            } = this.state;

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
                            error={message => Logger.error(message)}
                            onLogin={() => this.setState({ openLoginDialog: true })}
                            onLogout={() => onLogout()}
                        />
                        <LoginDialog
                            open={openLoginDialog}
                            error={loginError}
                            onClose={() => this.setState({ openLoginDialog: false, loginError: false })}
                            onSubmit={data => this.login(data)}
                        />
                    </div>
                </MuiThemeProvider>
            );
        }

        callApi(method, callback) {
            method()
                .then(response => this.checkUnauthorized(response))
                .then(result => {
                    if (!result.isAuthOk) {
                        onLogout();
                    } else if (result.exception) {
                        Logger.error(result.response);
                    } else {
                        let json = result.response.json();
                        if (json.errors && json.errors.length > 0) {
                            Logger.error(errors);
                        }

                        json.then(r => callback(r));
                    }
                });
        }

        checkUnauthorized(response) {
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