﻿import { AuthorizationStorage } from './authorizationStorage';
import { Logger } from './logger';

export class Api {
    static get(url) {
        let init = createInit('GET');

        return fetch(url, init).catch(error => Logger.error(error));
    }

    static post(url, data) {
        let init = createInit('POST', data);

        return fetch(url, init).catch(error => Logger.error(error));
    }

    static postFormData(url, data) {
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

        let init = createInitFormData('POST', formData);

        return fetch(url, init).catch(error => Logger.error(error));
    }

    static put(url, data) {
        let init = createInit('PUT', data);

        return fetch(url, init).catch(error => Logger.error(error));
    }

    static putFormData(url, data) {
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

        let init = createInitFormData('PUT', formData);

        return fetch(url, init).catch(error => Logger.error(error));
    }

    static delete(url, data) {
        let init = createInit('DELETE', data);

        return fetch(url, init).catch(error => Logger.error(error));
    }

    static token(data, onSuccess, onError) {
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
            .then(res => onSuccess(res))
            .catch(error => {
                if (onError) {
                    onError();
                }
                Logger.error(error)
            });
    }
}

export const urls = {
    check: '/api/check',
    token: '/api/token',
    account: {
        checkStudentEmail: '/api/account/checkemail/student',
        checkLecturerEmail: '/api/account/checkemail/lecturer',
        password: '/api/account/password'
    },
    courses: {
        details: (id) => `/api/courses/${id}`,
        published: '/api/courses/published',
        my: '/api/courses/my',
        taskList: (id) => `/api/courses/${id}/tasks`,
        getBy: (specialityId, courseNumber) => `/api/courses?specialityId=${specialityId}&courseNumber=${courseNumber}`,
    },
    students: '/api/students',
    lecturers: '/api/lecturers',
    specialities: '/api/specialities',
    tasks: {
        details: (id) => `/api/tasks/${id}`
    },
    reports: {
        create: '/api/reports',
        cancel: (taskId) => `/api/reports/${taskId}/cancel`
    },
    comments: {
        create: '/api/comments',
        list: (taskId) => `/api/comments?taskId=${taskId}`
    },
    guides: (courseId) => `/api/guides?courseId=${courseId}`,
    courseProgress: (courseId) => `/api/courseReport/${courseId}`
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

const createInitFormData = (method, data) => {
    let init = {
        method: method,
        headers: headersFormData(),
        body: data
    }

    return init;
}

const headers = () => {
    if (AuthorizationStorage.any()) {
        let authorizationData = AuthorizationStorage.get();
        let token = authorizationData.token;

        return {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    } else {
        return {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }
}

const headersFormData = () => {
    if (AuthorizationStorage.any()) {
        let authorizationData = AuthorizationStorage.get();
        let token = authorizationData.token;

        return {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    } else {
        return {
            'Accept': 'application/json'
        }
    }
}