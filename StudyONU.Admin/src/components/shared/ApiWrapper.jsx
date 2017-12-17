import * as React from 'react';

import { Login } from './Login';
import Alert from './alert/Alert';

import Api from '../../shared/api';
import AuthorizationStorage from '../../shared/authorizationStorage';

const ApiWrapper = (user) => (WrappedComponent) => {
    return class WithApiWrapper extends React.Component {
        constructor(props) {
            super(props);

            this.state = {
                errorMessage: ''
            }
        }

        render() {
            const alert = this.getAlert();

            return (
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
            );
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
    }
}

export default ApiWrapper;