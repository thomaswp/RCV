import { GameSettings } from "./GameSettings";
import { BuildingManager } from "./manager/BuildingManager";
import { DecksManager } from "./manager/DecksManager";
import { NewGameManager } from "./manager/NewGameManager";
import { ResourceManager } from "./manager/ResourceManager";
import { SeasonManager } from "./manager/SeasonManager";
import { Singleton } from "./Singleton";

// TODO: Is there a way for this to work with interfaces / abstract classes?
export type SingletonIdentifier = Singleton & { name: string }

export class Game {

    private singletons = new Map<string, Singleton>;

    initialize() {
        new BuildingManager(this);
        new DecksManager(this);
        new NewGameManager(this);
        new ResourceManager(this);
        new SeasonManager(this);
        new GameSettings(this);
    }

    getSingleton<T extends Singleton>(type: new (...args: any[]) => T): T {
        return this.singletons.get(type.name) as T;
    }

    registerSingleton(singleton: Singleton, name?: string) {
        if (!name) {
            name = singleton.constructor.name;
        }
        this.singletons.set(name, singleton);
    }

}