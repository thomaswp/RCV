import { Event } from "../../util/Event";
import { ProductionBuilding } from "../Building";
import { BaseSingleton } from "../Singleton";

export class BuildingManager extends BaseSingleton {

    private buildings: ProductionBuilding[] = [];

    public readonly BuildingAdded = new Event<ProductionBuilding>();
    public readonly BuildingRemoved = new Event<ProductionBuilding>();

    public addBuilding(building: ProductionBuilding) {
        this.buildings.push(building);
        this.BuildingAdded.emit(building);
    }
}