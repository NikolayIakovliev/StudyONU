import { AuthorizationData } from './authorizationData';

export class Api {
    static get(url) {
        let init = createInit('GET');

        return fetch(url, init).catch(error => console.log(error));
    }

    static post(url, data) {
        let init = createInit('POST', data);

        return fetch(url, init).catch(error => console.log(error));
    }

    static postFormData(url, data) {
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

        return fetch(url, init).catch(error => console.log(error));
    }

    static put(url, data) {
        let init = createInit('PUT', data);

        return fetch(url, init).catch(error => console.log(error));
    }

    static putFormData(url, data) {
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

        return fetch(url, init).catch(error => console.log(error));
    }

    static delete(url, data) {
        let init = createInit('DELETE', data);

        return fetch(url, init).catch(error => console.log(error));
    }

    static token(data, onComplete) {
        let init = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }

        fetch(urls.token, init)
            .then(checkStatus)
            .then(res => res.json())
            .then(res => onComplete(res))
            .catch(error => console.log(error));
    }
}

export const urls = {
    check: '/api/check',
    token: '/api/token',
    account: {
        password: '/api/account/password'
    },
    lecturers: '/api/lecturers',
    specialities: '/api/specialities',
    courses: '/api/courses',
    guides: '/api/guides',
    tasks: {
        common: '/api/tasks',
        files: '/api/tasks/files'
    },
    studentQueue: {
        list: '/api/studentQueue',
        courses: (id) => `/api/studentQueue/${id}/courses`,
        approve: '/api/studentQueue/approve',
        disapprove: (id) => `/api/studentQueue/${id}/disapprove`
    }
}

const checkStatus = (response) => {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }

    let error = new Error(response.statusText);
    error.response = response;
    throw error;
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
    let token = authorizationData.token;

    return {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }
}