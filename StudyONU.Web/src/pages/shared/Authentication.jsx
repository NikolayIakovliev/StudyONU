import * as React from 'react';
import { AuthorizationStorage } from '../../shared/authorizationStorage';
import { Api } from '../../shared/api';
import { Logger } from '../../shared/logger';
import { LoginDialog } from './LoginDialog';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import './shared.scss';

export const Authentication = (WrappedComponent) => {
    return class WithAuthentication extends React.Component {
        constructor(props) {
            super(props);

            this.state = {
                openLoginDialog: false,
                loginError: false,
                user: {
                    isLoggedIn: false,
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
            this.update();
        }

        render() {
            const {
                openLoginDialog,
                loginError,
                user
            } = this.state;

            return (
                <MuiThemeProvider>
                    <div style={{ padding: 30 }}>
                        <WrappedComponent
                            history={this.props.history}
                            user={user}
                            get={(url, callback) => this.callApi(() => Api.get(url), callback)}
                            post={(url, data, callback) => this.callApi(() => Api.post(url, data), callback)}
                            postFormData={(url, data, callback) => this.callApi(() => Api.postFormData(url, data), callback)}
                            put={(url, data, callback) => this.callApi(() => Api.put(url, data), callback)}
                            putFormData={(url, data, callback) => this.callApi(() => Api.putFormData(url, data), callback)}
                            delete={(url, data, callback) => this.callApi(() => Api.delete(url, data), callback)}
                            error={message => Logger.error(message)}
                            onLogin={() => this.setState({ openLoginDialog: true })}
                            onLogout={() => {
                                AuthorizationStorage.clear();
                                this.update();
                            }}
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
                        AuthorizationStorage.clear();
                        this.update();
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
                exception: response.status != 200 && response.status != 400
            }

            return result
        }

        login(data) {
            let self = this;
            Api.token(data, result => {
                if (result.success === true) {
                    AuthorizationStorage.save(result.data);
                    self.update();
                }

                self.setState({
                    loginError: result.success !== true,
                    openLoginDialog: result.success !== true
                });
            });
        }

        update() {
            let user = {
                isLoggedIn: false,
                role: '',
                token: '',
                firstName: '',
                lastName: '',
                patronymic: '',
                photoPath: ''
            };

            let userLoggedIn = AuthorizationStorage.any();
            if (userLoggedIn) {
                let authorizationData = AuthorizationStorage.get();
                user.isLoggedIn = true;
                user.role = authorizationData.role;
                user.token = authorizationData.token;
                user.firstName = authorizationData.firstName;
                user.lastName = authorizationData.lastName;
                user.patronymic = authorizationData.patronymic;
                user.photoPath = authorizationData.photoPath;
            }

            this.setState({
                user: user
            });
        }
    }
}