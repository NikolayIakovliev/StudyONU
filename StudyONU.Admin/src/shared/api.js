import { AuthorizationData } from './authorizationData';

export class Api {
    static get(url) {
        let init = initGET();

        return fetch(url, init).catch(error => console.log(error));
    }

    static post(url, data) {
        let init = initPOST(data);

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
    token: '/api/token',
    lecturers: '/api/lecturers',
    specialities: '/api/specialities',
    courses: '/api/courses'
}

const checkStatus = (response) => {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }

    let error = new Error(response.statusText);
    error.response = response;
    throw error;
}

function initGET() {
    let init = {
        method: 'GET',
        headers: headers()
    }

    return init;
}

function initPOST(data) {
    let init = {
        method: 'POST',
        headers: headers(),
        body: JSON.stringify(data)
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