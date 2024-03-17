import { BaseSingleton } from "../Singleton";
import { Card } from "../card/Card";
import { DecksManager } from "./DecksManager";
import { ResourceManager } from "./ResourceManager";

export class ActionManager extends BaseSingleton {

    private decksManager: DecksManager;
    private resourceManager: ResourceManager;

    initialize(): void {
        this.decksManager = this.getSingleton(DecksManager);
        this.resourceManager = this.getSingleton(ResourceManager);
    }

    playCardFromHand(card: Card, target: any) {
        let cost = card.def.getCost(this.game, target);
        const resources = this.resourceManager.resources;
        if (!resources.has(cost)) {
            console.error("Not enough resources to play card.");
            return false;
        }
        resources.subtract(cost);
        card.def.do(this.game, target);
        this.decksManager.discardCard(card);
        return true;
    }
}