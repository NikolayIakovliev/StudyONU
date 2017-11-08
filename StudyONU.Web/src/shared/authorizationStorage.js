const authorizationKey = 'authorization';

export class AuthorizationStorage {
    static subscribers = [];

    static subscribe(subscriber) {
        AuthorizationStorage.subscribers.push(subscriber);
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

        AuthorizationStorage.notify();
    }

    static clear() {
        localStorage.clear();

        AuthorizationStorage.notify();
    }

    static notify() {
        for (let i = 0; i < AuthorizationStorage.subscribers.length; i++) {
            let subscriber = AuthorizationStorage.subscribers[i];
            subscriber.update();
        }
    }
}