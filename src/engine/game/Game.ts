import { Singleton } from "./Singleton";


export class Game {

    private singletons: Map<string, Singleton>;

    getSingleton<T extends Singleton>(type: new (...args: any[]) => T): T {
        return this.singletons.get(type.name) as T;
    }

    registerSingleton(singleton: Singleton) {
        this.singletons.set(singleton.constructor.name, singleton);
    }

}