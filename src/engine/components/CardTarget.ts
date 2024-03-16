import { Game } from "../game/Game";
import { BuildingManager } from "../game/manager/BuildingManager";
import { DecksManager } from "../game/manager/DecksManager";

export interface CardTarget {
    getTargets(game: Game): any[];
}

export class AnyBuilding implements CardTarget {
    getTargets(game: Game): any[] {
        return game.getSingleton(BuildingManager).buildings;
    }
}