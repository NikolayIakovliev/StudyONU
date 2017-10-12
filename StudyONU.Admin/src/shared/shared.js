const authorizationKey = 'authorization';

export function isUserLoggedIn() {
    let authorization = localStorage.getItem(authorizationKey);
    return authorization != null
        ? true
        : false;
}

export function saveAuthorizationData(data) {
    localStorage.setItem(authorizationKey, data);
}