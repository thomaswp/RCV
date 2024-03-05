import { BaseSingleton } from "../Singleton";
import { Card } from "../card/Card";
import { Deck } from "../card/Deck";
import { UserAction } from "../ui/UserAction";
import { DecksManager } from "./DecksManager";

export class UIManager extends BaseSingleton {
    

    // abstract selectCard(deck: Deck): Promise<Card>;

    // abstract selectCardTarget(card: Card, validTargets: Card[]): Promise<Card>;


    getValidActions(): UserAction[] {
        return [];
    }


    // doTurnUI() : Promise<void> {
        
    // }

    // async doOneAction() : Promise<boolean> {
    //     const decksManager = this.getSingleton(DecksManager);
    //     let card = await this.selectCard(decksManager.hand);
    //     if (!card) {
    //         return false;
    //     }
    //     let targets: Card[] = card.getValidTargets();

    //     let target = await this.selectCardTarget(card, decksManager.hand.cards);
    // }
}