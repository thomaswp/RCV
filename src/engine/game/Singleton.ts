
// Doesn't do anything, since there's not contract of a Singleton except

import { Game } from "./Game";
import { BaseGameObject, GameObject } from "./GameObject";

export interface Singleton extends GameObject {
    /**
     *  Called after all singletons are added to the game
     */ 
    initialize(): void;
}

export class BaseSingleton extends BaseGameObject implements Singleton {

    constructor(game: Game) {
        super(game);
        game.registerSingleton(this);
    }

    initialize(): void {
        
    }

}