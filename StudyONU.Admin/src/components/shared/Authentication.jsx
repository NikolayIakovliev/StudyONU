import * as React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { Login } from './Login';
import Alert from './alert/Alert';

import Api from '../../shared/api';
import Urls from '../../shared/urls';
import AuthorizationStorage from '../../shared/authorizationStorage';

export const Authentication = (WrappedComponent) => {
    return class WithAuthentication extends React.Component {
        constructor(props) {
            super(props);

            this.state = this.getState();

            AuthorizationStorage.subscribe(this);
        }

        componentDidMount() {
            if (AuthorizationStorage.any()) {
                const onError = () => AuthorizationStorage.clear();

                Api.post(Urls.check, null, null, onError);
            }
        }

        render() {
            const user = this.state.user;
            const alert = this.getAlert();

            let renderedComponent = user.role
                ? <MuiThemeProvider>
                    <div>
                        <WrappedComponent
                            user={user}
                            get={(url, onSuccess, onError) => this.get(url, onSuccess, onError)}
                            post={(url, data, onSuccess, onError) => this.post(url, data, onSuccess, onError)}
                            postFormData={(url, data, onSuccess, onError) => this.postFormData(url, data, onSuccess, onError)}
                            put={(url, data, onSuccess, onError) => this.put(url, data, onSuccess, onError)}
                            putFormData={(url, data, onSuccess, onError) => this.putFormData(url, data, onSuccess, onError)}
                            delete={(url, data, onSuccess, onError) => this.delete(url, data, onSuccess, onError)}
                            onLogout={() => AuthorizationStorage.clear()}
                        />
                        <Alert
                            open={alert.open}
                            message={alert.message}
                            onRequestClose={() => this.setState({ errorMessage: '' })}
                        />
                    </div>
                </MuiThemeProvider>
                : <Login
                    onLoginSuccess={data => {
                        AuthorizationStorage.save(data);
                        this.update();
                        this.props.history.push('/');
                    }} />;

            return renderedComponent;
        }

        getAlert() {
            return {
                open: this.state.errorMessage.length > 0,
                message: this.state.errorMessage
            }
        }

        get(url, onSuccess, onError) {
            const _onError = onError || (errors => this.onError(errors));
            Api.get(url, onSuccess, _onError);
        }

        post(url, data, onSuccess, onError) {
            const _onError = onError || (errors => this.onError(errors));
            Api.post(url, data, onSuccess, _onError);
        }

        postFormData(url, data, onSuccess, onError) {
            const _onError = onError || (errors => this.onError(errors));
            Api.postFormData(url, data, onSuccess, _onError);
        }

        put(url, data, onSuccess, onError) {
            const _onError = onError || (errors => this.onError(errors));
            Api.put(url, data, onSuccess, _onError);
        }

        putFormData(url, data, onSuccess, onError) {
            const _onError = onError || (errors => this.onError(errors));
            Api.putFormData(url, data, onSuccess, _onError);
        }

        delete(url, data, onSuccess, onError) {
            const _onError = onError || (errors => this.onError(errors));
            Api.delete(url, data, onSuccess, _onError);
        }

        onError(errors) {
            let errorMessage = errors.common != undefined
                ? 'Неправильно введены данные'
                : 'Возникла ошибка при соединении. Перезагрузите страницу';

            this.setState({ errorMessage });
        }

        update() {
            const state = this.getState();
            this.setState(state);
        }

        getState() {
            let user = {
                email: '',
                role: '',
                token: '',
                firstName: '',
                lastName: '',
                patronymic: '',
                photoPath: ''
            };

            let userLoggedIn = AuthorizationStorage.any();
            if (userLoggedIn) {
                let storage = AuthorizationStorage.get();
                user.email = storage.email;
                user.role = storage.role;
                user.token = storage.token;
                user.firstName = storage.firstName;
                user.lastName = storage.lastName;
                user.patronymic = storage.patronymic;
                user.photoPath = storage.photoPath;
            }

            return {
                user,
                errorMessage: ''
            }
        }
    }
}