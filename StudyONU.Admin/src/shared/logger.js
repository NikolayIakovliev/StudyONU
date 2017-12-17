export default class Logger {
    static error(message) {
        if (process.env.NODE_ENV === 'development') {
            console.warn('Logger message:');
            console.error(message);
        }
    }
}