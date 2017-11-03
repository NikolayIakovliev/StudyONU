import * as React from 'react';
import { AuthorizationStorage } from '../../shared/authorizationStorage';
import { Api } from '../../shared/api';
import { Logger } from '../../shared/logger';
import { LoginDialog } from './LoginDialog';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export const Authentication = (WrappedComponent) => {
    return class WithAuthentication extends React.Component {
        constructor(props) {
            super(props);

            this.state = {
                isLoggedIn: false,
                openLoginDialog: false,
                loginError: false,
                user: {
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
                isLoggedIn,
                openLoginDialog,
                loginError,
                user
            } = this.state;

            return (
                <MuiThemeProvider>
                    <div>
                        <WrappedComponent
                            isLoggedIn={isLoggedIn}
                            user={user}
                            get={(url, callback) => this.get(url, callback)}
                            post={(url, data, callback) => this.post(url, data, callback)}
                            postFormData={(url, data, callback) => this.postFormData(url, data, callback)}
                            put={(url, data, callback) => this.put(url, data, callback)}
                            putFormData={(url, data, callback) => this.putFormData(url, data, callback)}
                            delete={(url, data, callback) => this.delete(url, data, callback)}
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
            method()
                .then(response => this.checkUnauthorized(response))
                .then(result => {
                    if (!result.isAuthOk) {
                        AuthorizationStorage.clear();
                        this.update();
                    } else if (result.exception) {
                        Logger.error(result.response);
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
                user.role = authorizationData.role;
                user.token = authorizationData.token;
                user.firstName = authorizationData.firstName;
                user.lastName = authorizationData.lastName;
                user.patronymic = authorizationData.patronymic;
                user.photoPath = authorizationData.photoPath;
            }

            this.setState({
                isLoggedIn: userLoggedIn,
                user: user
            });
        }
    }
}