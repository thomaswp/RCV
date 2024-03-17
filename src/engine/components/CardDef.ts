import { ProductionBuilding } from "../game/Building";
import { Game } from "../game/Game";
import { BuildingManager } from "../game/manager/BuildingManager";
import { PartialResourceSet } from "../resources/ResourceSet";
import { Resource } from "../resources/Resources";

export interface CardDef<T> {
    name: string;
    getPossibleTargets(game: Game): T[];
    getCost(game: Game, target: T): PartialResourceSet;
    do(game: Game, target: T): void;
}

export class Work implements CardDef<ProductionBuilding> {
    readonly name = 'Work';

    getPossibleTargets(game: Game): ProductionBuilding[] {
        return game.getSingleton(BuildingManager).buildings.filter(b => b.canWork());
    }

    getCost(game: Game, target: ProductionBuilding): any {
        return target.getWorkCost();
    }

    do(game: Game, target: ProductionBuilding): void {
        target.work();
    }
}

export class Expand implements CardDef<ProductionBuilding> {
    readonly name = 'Expand';

    getPossibleTargets(game: Game): ProductionBuilding[] {
        return game.getSingleton(BuildingManager).buildings;
    }

    getCost(game: Game, target: ProductionBuilding): any {
        return target.getExpansionCost();
    }

    do(game: Game, target: ProductionBuilding): void {
        target.expand();
    }
}

export class Build implements CardDef<void> {
    readonly name = 'Build';

    constructor(readonly building: ConstructorOf<ProductionBuilding>) {}

    getPossibleTargets(game: Game): void[] {
        return [null];
    }

    getCost(game: Game, target: void) {
        return {
            // TODO
        }
    }

    do(game: Game): void {
        game.getSingleton(BuildingManager).build(this.building);
    }    
}