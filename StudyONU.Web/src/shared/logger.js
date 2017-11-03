export class Logger {
    static error(message) {
        if (process.env.NODE_ENV === 'development') {
            console.error(message);
        }
    }
}