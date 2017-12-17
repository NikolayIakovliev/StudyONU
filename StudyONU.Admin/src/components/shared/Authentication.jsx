import * as React from 'react';
import { Login } from './Login';
import { Api } from '../../shared/api';

import Urls from '../../shared/urls';
import AuthorizationStorage from '../../shared/authorizationStorage';

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

            AuthorizationStorage.subscribe(this);
        }

        componentDidMount() {
            const onSuccess = () => this.update();
            const onError = () => {
                AuthorizationStorage.clear();
                this.update();
            }

            Api.post(Urls.check, null, onSuccess, onError);
        }

        render() {
            const user = this.state.user;

            let renderedComponent = user.role
                ? <WrappedComponent
                    user={user}
                    get={(url, onSuccess, onError) => this.get(url, onSuccess, onError)}
                    post={(url, data, onSuccess, onError) => this.post(url, data, onSuccess, onError)}
                    postFormData={(url, data, onSuccess, onError) => this.postFormData(url, data, onSuccess, onError)}
                    put={(url, data, onSuccess, onError) => this.put(url, data, onSuccess, onError)}
                    putFormData={(url, data, onSuccess, onError) => this.putFormData(url, data, onSuccess, onError)}
                    delete={(url, data, onSuccess, onError) => this.delete(url, data, onSuccess, onError)}
                    onLogout={() => AuthorizationStorage.clear()}
                />
                : <Login
                    onLoginSuccess={data => {
                        AuthorizationStorage.save(data);
                        this.update();
                        this.props.history.push('/');
                    }} />;

            return renderedComponent;
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
            // TODO
            //let errorMessage = errors.common != undefined
            //    ? 'Неправильно введены данные'
            //    : 'Возникла ошибка при соединении. Перезагрузите страницу';

            //this.setState({ errorMessage });
            alert('Error');
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
            
            this.setState({ user });
        }
    }
}