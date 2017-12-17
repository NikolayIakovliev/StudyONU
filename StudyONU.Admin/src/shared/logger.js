export default class Logger {
    static error(message) {
        if (process.env.NODE_ENV === 'development') {
            console.warn('-- Logger --');
            console.error(message);
        }
    }

    static warn(message) {
        if (process.env.NODE_ENV === 'development') {
            console.warn('-- Logger --');
            console.warn(message);
        }
    }
}