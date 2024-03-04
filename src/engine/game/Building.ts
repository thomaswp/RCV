import { CardDef } from "../card-defs/CardDef";
import { PartialResourceSet } from "../resources/Cost";
import { Resource } from "../resources/Resources";
import { BaseGameObject } from "./GameObject";
import { Season, SeasonManager } from "./Season";


export abstract class ProductionBuilding extends BaseGameObject {
    
    readonly resource: Resource;

    protected expansionLevel: number = 1;
    protected storageLevel: number = 1;

    protected resourceStored: number = 0;
    
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

}

export const SeasonFoodMultiplier = {
    [Season.Spring]: 1,
    [Season.Summer]: 2,
    [Season.Autumn]: 3,
    [Season.Winter]: 0
}

export class Farm extends ProductionBuilding {

    resource: Resource.Food;

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
        return this.storageLevel;
    }
}

export class Woods extends ProductionBuilding {

    resource: Resource.Wood;

    private woodCount: number = 0;

    initialize() {
        this.getSingleton(SeasonManager).OnSeasonChange.register(season => {
            this.woodCount += this.expansionLevel;
        });
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
