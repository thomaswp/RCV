import { ProductionBuilding } from "./Building";
import { BaseSingleton } from "./Singleton";

export class BuildingManager extends BaseSingleton {

    private buildings: ProductionBuilding[] = [];

    public addBuilding(building: ProductionBuilding) {
        this.buildings.push(building);
    }
}