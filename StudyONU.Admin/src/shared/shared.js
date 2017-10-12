const authorizationKey = 'authorization';

export function isUserLoggedIn() {
    let authorizationData = localStorage.getItem(authorizationKey);
    return authorizationData != null
        ? true
        : false;
}

export function saveAuthorizationData(authorizationData) {
    localStorage.setItem(authorizationKey, authorizationData);
}

export function clearAuthorizationData() {
    localStorage.clear();
}