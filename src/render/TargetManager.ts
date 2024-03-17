import { ProductionBuilding } from "../engine/game/Building";
import { Card } from "../engine/game/card/Card";
import { ActionManager } from "../engine/game/manager/ActionManager";
import { ResourceManager } from "../engine/game/manager/ResourceManager";
import { RenderContext } from "./RenderContext";

export enum Targetability {
    NotApplicable,
    InsufficientResources,
    Valid
}

export class TargetManager {
    private possibleTargets: any[] = null;
    targettingCard: Card = null;

    private readonly resourceManger: ResourceManager;
    private readonly actionManager: ActionManager;

    get isSelectingTarget() {
        return this.targettingCard !== null;
    }

    get game() {
        return this.context.game;
    }

    private get resources() {
        return this.resourceManger.resources;
    }

    constructor(readonly context: RenderContext) {
        this.resourceManger = context.game.getSingleton(ResourceManager);
        this.actionManager = context.game.getSingleton(ActionManager);
    }

    onHandCardClicked(card: Card) {
        if (this.isSelectingTarget) {
            this.deselectTargettingCard();
            return;
        }
        this.targettingCard = card;
        this.possibleTargets = card.def.getPossibleTargets(this.game);
        this.context.refresh();
    }

    deselectTargettingCard() {
        this.targettingCard = null;
        this.possibleTargets = null;
        this.context.refresh();
    }
    
    onBuildingClicked(building: ProductionBuilding) {
        if (!this.isSelectingTarget) return;
        if (this.getTargetability(building) !== Targetability.Valid) return;
        this.actionManager.playCardFromHand(this.targettingCard, building);
        this.deselectTargettingCard();
        this.context.refresh();
    }

    getTargetability(building: ProductionBuilding) {
        if (!this.possibleTargets.includes(building)) {
            return Targetability.NotApplicable;
        } else if (!this.resources.has(this.targettingCard.def.getCost(this.game, building))) {
            return Targetability.InsufficientResources;
        } else {
            return Targetability.Valid;
        }
    }
}