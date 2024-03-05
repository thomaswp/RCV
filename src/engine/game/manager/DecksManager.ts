import { GameSettings } from "../GameSettings";
import { BaseSingleton } from "../Singleton";
import { Deck } from "../card/Deck";
import { SeasonManager } from "./SeasonManager";
import { TurnManager } from "./TurnManager";

export class DecksManager extends BaseSingleton {
    readonly deck: Deck = new Deck();
    readonly hand: Deck = new Deck();
    readonly discard: Deck = new Deck();

    drawCardsForTurnStart() {
        // TODO: Config
        this.drawCards(this.getSingleton(GameSettings).cardsDrawnPerTurn);
    }

    draw() : boolean {
        if (this.deck.isEmpty) {
            this.deck.addCardsToEnd(this.discard.drawAll());
            this.deck.shuffle();
            this.getSingleton(SeasonManager).incrementSeason();
        }
        if (this.deck.isEmpty) {
            return false;
        }
        const card = this.deck.drawCard();
        if (card) {
            this.hand.addCardToEnd(card);
        }
        return true;
    }

    drawCards(count: number) {
        for (let i = 0; i < count; i++) {
            this.draw();
        }
    }
}