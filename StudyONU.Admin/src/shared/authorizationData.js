const authorizationKey = 'authorization';

let _subscribers = [];
export class AuthorizationData {
    static get subscribers() { return _subscribers; }

    static subscribe(subscriber) {
        AuthorizationData.subscribers.push(subscriber);
    }

    static any() {
        let authorization = localStorage.getItem(authorizationKey);
        return authorization != null
            ? true
            : false;
    }

    static get() {
        let json = localStorage.getItem(authorizationKey);
        let authorizationData = JSON.parse(json);

        return authorizationData;
    }

    static save(data) {
        let json = JSON.stringify(data);
        localStorage.setItem(authorizationKey, json);

        AuthorizationData.notify();
    }

    static clear() {
        localStorage.clear();

        AuthorizationData.notify();
    }

    static notify() {
        for (let i = 0; i < AuthorizationData.subscribers.length; i++) {
            let subscriber = AuthorizationData.subscribers[i];
            subscriber.update();
        }
    }
}