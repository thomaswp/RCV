

// A simple event class that can register handlers and
// be fired. It can handle any arguments.
export class Event<T> {
    private handlers: Array<(args: T) => void> = [];

    public on(handler: (args: T) => void) {
        this.handlers.push(handler);
    }

    public unregister(handler: (args: T) => void) {
        this.handlers = this.handlers.filter(h => h !== handler);
    }

    public emit(args: T) {
        for (let handler of this.handlers) {
            handler(args);
        }
    }
    
}