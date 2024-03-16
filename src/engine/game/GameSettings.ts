import { BaseSingleton } from "./Singleton";

export class GameSettings extends BaseSingleton {
    cardsDrawnPerTurn: number = 4;

    farm = {
        storageMultiplier: 2
    }

    woods = {
        maxCountPerExpansion: 3
    }

    quary = {
        startingStone: 3,
        maxCountPerExpansion: 2
    }
}