import { BaseSingleton } from "./Singleton";

export class GameSettings extends BaseSingleton {
    cardsDrawnPerTurn: number = 3;
}