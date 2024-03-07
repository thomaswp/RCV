import { CardDef } from "../card-defs/CardDef";
import { PartialResourceSet } from "../resources/Cost";
import { Resource } from "../resources/Resources";
import { Event } from "../util/Event";
import { Game } from "./Game";
import { BaseGameObject } from "./GameObject";
import { GameSettings } from "./GameSettings";
import { ResourceManager } from "./manager/ResourceManager";
import { Season, SeasonManager } from "./manager/SeasonManager";


export abstract class ProductionBuilding extends BaseGameObject {
    
    readonly resource: Resource;

    protected expansionLevel: number = 1;
    protected storageLevel: number = 1;

    // protected resourceStored: number = 0;

    public readonly cardDef: CardDef;

    public readonly Updated = new Event<void>();

    get name() {
        return this.cardDef.name;
    }

    constructor(
        game: Game,
        cardDef: CardDef
    ) {
        super(game);
        this.cardDef = cardDef;
    }
    
    initialize(): void {

    }
    
    canWork(): boolean {
        return this.getResourceAvailable() > 0;
    }

    getWorkCost() {
        return {
            [Resource.Worker]: 1
        }
    }

    abstract work(): PartialResourceSet;
    abstract getResourceAvailable(): number
    
    getTotalStorageSpace(): number {
        return this.storageLevel;
    }

    expand() {
        this.expansionLevel++;
    }

    private get resourceStored() {
        return this.game.getSingleton(ResourceManager).resources.get(this.resource);
    }

    describe(): string {
        return `${this.name}
Level: ${this.expansionLevel}
Available: ${this.getResourceAvailable()}
Storage ${this.resourceStored} / ${this.getTotalStorageSpace()}`;
    }
}

export const SeasonFoodMultiplier = {
    [Season.Spring]: 1,
    [Season.Summer]: 2,
    [Season.Autumn]: 3,
    [Season.Winter]: 0
}

export class Farm extends ProductionBuilding {

    resource = Resource.Food;

    private get season() {
        return this.getSingleton(SeasonManager).season;
    }

    getResourceAvailable(): number {
        return SeasonFoodMultiplier[this.season];
    }

    work(): PartialResourceSet {
        let season = this.game.getSingleton(SeasonManager).season;
        return {
            [Resource.Food]: SeasonFoodMultiplier[season]
        }
    }

    getTotalStorageSpace(): number {
        return this.storageLevel * 
            this.settings.farm.storageMultiplier;
    }
}

export class Woods extends ProductionBuilding {

    resource = Resource.Wood;

    private woodCount: number = 0;

    getMaxAvailable(): number {
        return this.expansionLevel * this.settings.woods.maxCountPerExpansion;
    }

    initialize() {
        this.getSingleton(SeasonManager).OnSeasonChange.on(_ => {
            this.woodCount += this.expansionLevel;
            this.woodCount = Math.min(this.woodCount, this.getMaxAvailable());
        });

        this.woodCount = this.getMaxAvailable();

        this.Updated.emit();
    }

    getResourceAvailable(): number {
        return this.woodCount;
    }

    work(): PartialResourceSet {
        this.woodCount--;
        return {
            [Resource.Wood]: 1
        }
    }
}
