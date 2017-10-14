const authorizationKey = 'authorization';

export class AuthorizationData {
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
    }

    static clear() {
        localStorage.clear();
    }
}