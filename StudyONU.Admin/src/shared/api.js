import { AuthorizationData } from './authorizationData';
import Logger from './logger';

export class Api {
    static get(url, onSuccess, onError) {
        let init = createInit('GET');

        Api.sendRequest(url, init, onSuccess, onError);
    }

    static post(url, data, onSuccess, onError) {
        let init = createInit('POST', data);

        Api.sendRequest(url, init, onSuccess, onError);
    }

    static postFormData(url, data, onSuccess, onError) {
        let authorizationData = AuthorizationData.get();
        let token = authorizationData.token;

        let formData = new FormData();

        for (let name in data) {
            let value = data[name];

            if (Array.isArray(value)) {
                for (let i = 0; i < value.length; i++) {
                    formData.append(name, value[i]);
                }
            } else {
                formData.append(name, value);
            }
        }

        let init = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: formData
        }

        Api.sendRequest(url, init, onSuccess, onError);
    }

    static put(url, data, onSuccess, onError) {
        let init = createInit('PUT', data);

        Api.sendRequest(url, init, onSuccess, onError);
    }

    static putFormData(url, data, onSuccess, onError) {
        let authorizationData = AuthorizationData.get();
        let token = authorizationData.token;

        let formData = new FormData();

        for (let name in data) {
            let value = data[name];

            if (Array.isArray(value)) {
                for (let i = 0; i < value.length; i++) {
                    formData.append(name, value[i]);
                }
            } else {
                formData.append(name, value);
            }
        }

        let init = {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: formData
        }

        Api.sendRequest(url, init, onSuccess, onError);
    }

    static delete(url, data, onSuccess, onError) {
        let init = createInit('DELETE', data);

        Api.sendRequest(url, init, onSuccess, onError);
    }

    static sendRequest(url, init, onSuccess, onError) {
        let promise = fetch(url, init).then(response => Api.checkResponse(response, onError));
        if (promise) {
            promise
                .then(response => response.json())
                .then(result => Api.checkResult(result, onSuccess, onError))
                .catch(Api.log);
        }
    }

    static checkResponse(response, onError) {
        if (response.status == 401) {
            AuthorizationData.clear();
            return;
        }

        if (response.ok) {
            return response;
        } else if (onError) {
            onError(response, false);
        } else {
            let error = new Error(response.statusText);
            error.response = response;
            throw error;
        }
    }

    static checkResult(result, onSuccess, onError) {
        if (result.success) {
            if (onSuccess) {
                let data = result.data || result;
                onSuccess(data);
            }
        } else {
            if (onError) {
                onError(result.errors, true);
            }
            Api.log(result.errors);
        }
    }

    static log(error) {
        Logger.error(error);
    }
}

const createInit = (method, data) => {
    let init = {
        method: method,
        headers: headers(),
        body: data != null ? JSON.stringify(data) : data
    }

    return init;
}

const headers = () => {
    let authorizationData = AuthorizationData.get();

    if (authorizationData && authorizationData.token) {
        return {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authorizationData.token}`
        }
    } else {
        return {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }
}