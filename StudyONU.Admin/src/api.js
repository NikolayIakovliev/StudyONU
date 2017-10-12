export const urls = {
    token: '/api/token'
}

const checkStatus = (response) => {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }

    let error = new Error(response.statusText);
    error.response = response;
    throw error;
}

export class Api {
    static get(url) {
        return fetch(url)
            .then(checkStatus)
            .then(res => res.json())
            .catch(error => console.log(error));
    }

    static token(data, onComplete) {
        const init = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
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