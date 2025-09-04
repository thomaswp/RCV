import { PartialResourceSet, toResourceSet } from "../resources/ResourceSet";
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

    isAnyStorageAvailable(): boolean {
        const production = toResourceSet(this.peekReturnResources());
        const storageAvailable = this.getSingleton(ResourceManager).getAvailableStorage();
        // If at least one resource can be stored, we can work
        for (const resource of Object.values(Resource)) {
            const produced = production.get(resource);
            if (produced == 0) continue;
            if (produced <= storageAvailable.get(resource)) {
                return true;
            }
        }
        return false;
    }
    
    canWork(): boolean {
        if (this.getResourceAvailable() == 0) return false;
        return this.isAnyStorageAvailable();
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
    protected abstract peekReturnResources(): PartialResourceSet;
    abstract getResourceAvailable(): number
    
    getTotalStorageSpace(): number {
        return this.storageLevel;
    }

    expand() {
        this.expansionLevel++;
    }

    private get resourceStored() {
        return this.getSingleton(ResourceManager).resources.get(this.resource);
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

    peekReturnResources(): PartialResourceSet {
        return {};
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

    peekReturnResources(): PartialResourceSet {
        return {
            [Resource.Food]: SeasonFoodMultiplier[this.season]
        }
    }

    workAndReturnResources(): PartialResourceSet {
        return this.peekReturnResources();
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

    protected peekReturnResources(): PartialResourceSet {
        return {
            [Resource.Wood]: 1
        }
    }

    workAndReturnResources(): PartialResourceSet {
        this.woodCount--;
        return this.peekReturnResources();
    }
}

export class Quarry extends ProductionBuilding {

    resource = Resource.Stone;
    name = "Quarry";

    private stoneCount: number = 0;

    canWork(): boolean {
        return this.isAnyStorageAvailable();
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

    peekReturnResources(): PartialResourceSet {
        if (this.stoneCount == 0) {
            return {};
        }
        return {
            [Resource.Stone]: 1
        }
    }

    workAndReturnResources(): PartialResourceSet {
        if (this.stoneCount == 0) {
            this.stoneCount = this.getMaxAvailable();
            return {};
        }
        this.stoneCount--;
        return this.peekReturnResources();
    }
}