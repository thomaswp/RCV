import { BaseSingleton } from "./Singleton";
import { Deck } from "./card/Deck";

export class DecksManager extends BaseSingleton {
    readonly deck: Deck = new Deck();
    readonly hand: Deck = new Deck();
    readonly discard: Deck = new Deck();

    
}