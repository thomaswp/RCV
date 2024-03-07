import { Event } from "../../util/Event";
import { GameSettings } from "../GameSettings";
import { BaseSingleton } from "../Singleton";
import { Card } from "../card/Card";
import { Deck } from "../card/Deck";
import { SeasonManager } from "./SeasonManager";
import { TurnManager } from "./TurnManager";

export class DecksManager extends BaseSingleton {
    readonly deck: Deck = new Deck();
    readonly hand: Deck = new Deck();
    readonly discard: Deck = new Deck();

    readonly CardDrawn = new Event<Card>();

    drawCardsForTurnStart() {
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
        this.hand.addCardToEnd(card);
        this.CardDrawn.emit(card);
        return true;
    }

    drawCards(count: number) {
        for (let i = 0; i < count; i++) {
            this.draw();
        }
    }
}