import { PartialResourceSet } from "../resources/ResourceSet";
import { Resource } from "../resources/Resources";
import { Event } from "../util/Event";
import { Game } from "./Game";
import { BaseGameObject } from "./GameObject";
import { GameSettings } from "./GameSettings";
import { ResourceManager } from "./manager/ResourceManager";
import { Season, SeasonManager } from "./manager/SeasonManager";
import { TurnManager } from "./manager/TurnManager";


export abstract class ProductionBuilding extends BaseGameObject {
    
    readonly resource: Resource;
    readonly name: string;

    protected expansionLevel: number = 1;
    protected storageLevel: number = 1;

    get level() { return this.expansionLevel; }
    
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

    getExpansionCost() {
        return {
            [Resource.Wood]: 1 * this.expansionLevel,
            [Resource.Stone]: 1 * this.expansionLevel,
        }
    }

    work() {
        const resources = this.getSingleton(ResourceManager).resources;
        let product = this.workAndReturnResources();
        resources.add(product);
    }

    protected abstract workAndReturnResources(): PartialResourceSet;
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

// TODO: This really shouldn't be a production building
export class House extends ProductionBuilding {

    resource = Resource.Worker;
    name = "House";

    initialize(): void {
        const resourceManager = this.getSingleton(ResourceManager);
        this.getSingleton(TurnManager).TurnStarted.on(_ => {
            resourceManager.resources.set(Resource.Worker, this.expansionLevel + 1);
        });
    }

    getResourceAvailable(): number {
        return 0;
    }

    canWork(): boolean {
        return false;
    }

    workAndReturnResources(): PartialResourceSet {
        throw new Error("Cannot work House.");
    }
}

export class Farm extends ProductionBuilding {

    resource = Resource.Food;
    name = "Farm";

    private get season() {
        return this.getSingleton(SeasonManager).season;
    }

    getResourceAvailable(): number {
        return SeasonFoodMultiplier[this.season];
    }

    workAndReturnResources(): PartialResourceSet {
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
    name = "Woods";

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
    }

    getResourceAvailable(): number {
        return this.woodCount;
    }

    workAndReturnResources(): PartialResourceSet {
        this.woodCount--;
        return {
            [Resource.Wood]: 1
        }
    }
}

export class Quarry extends ProductionBuilding {

    resource = Resource.Stone;
    name = "Quarry";

    private stoneCount: number = 0;

    canWork(): boolean {
        // Can always work, either to replenish or to get stone
        return true;
    }

    getMaxAvailable(): number {
        return this.settings.quary.startingStone + 
            this.expansionLevel * this.settings.quary.maxCountPerExpansion;
    }

    initialize() {
        this.stoneCount = this.getMaxAvailable();
    }

    getResourceAvailable(): number {
        return this.stoneCount;
    }

    getWorkCost() {
        if (this.stoneCount == 0) {
            return {
                [Resource.Worker]: 1,
                [Resource.Wood]: 2
            }
        }
        return super.getWorkCost();
    }

    workAndReturnResources(): PartialResourceSet {
        if (this.stoneCount == 0) {
            this.stoneCount = this.getMaxAvailable();
            return {};
        }
        this.stoneCount--;
        return {
            [Resource.Stone]: 1
        }
    }
}