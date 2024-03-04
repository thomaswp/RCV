
// Doesn't do anything, since there's not contract of a Singleton except

import { Game } from "./Game";
import { BaseGameObject, GameObject } from "./GameObject";

// not needing multiple...
export interface Singleton extends GameObject {

}

export class BaseSingleton extends BaseGameObject implements Singleton {

    constructor(game: Game) {
        super(game);
        game.registerSingleton(this);
    }

}