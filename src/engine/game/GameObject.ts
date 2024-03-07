import { Game } from "./Game";
import { GameSettings } from "./GameSettings";
import { Singleton } from "./Singleton";

export interface GameObject {
    game: Game;
}

export class BaseGameObject implements GameObject {
    
    game: Game;

    constructor(game: Game) {
        this.game = game;
    }

    getSingleton<T extends Singleton>(type: new (...args: any[]) => T): T {
        return this.game.getSingleton(type);
    }

    get settings() {
        return this.getSingleton(GameSettings);
    }
}