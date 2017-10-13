const authorizationKey = 'authorization';

export function isUserLoggedIn() {
    let authorization = localStorage.getItem(authorizationKey);
    return authorization != null
        ? true
        : false;
}

export function getAuthorizationData() {
    let json = localStorage.getItem(authorizationKey);
    let authorizationData = JSON.parse(json);

    return authorizationData;
}

export function saveAuthorizationData(authorizationData) {
    let json = JSON.stringify(authorizationData);
    localStorage.setItem(authorizationKey, json);
}

export function clearAuthorizationData() {
    localStorage.clear();
}