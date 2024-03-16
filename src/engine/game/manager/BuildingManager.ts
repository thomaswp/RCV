import { Event } from "../../util/Event";
import { ProductionBuilding } from "../Building";
import { BaseSingleton } from "../Singleton";

export class BuildingManager extends BaseSingleton {

    readonly buildings: ProductionBuilding[] = [];

    public readonly BuildingAdded = new Event<ProductionBuilding>();
    public readonly BuildingRemoved = new Event<ProductionBuilding>();

    public addBuilding(building: ProductionBuilding) {
        this.buildings.push(building);
        this.BuildingAdded.emit(building);
    }

    public build(building: ConstructorOf<ProductionBuilding>) {
        let existing = this.buildings.find(b => b instanceof building);
        if (existing) {
            existing.expand();
        } else {
            let newBuilding = new building(this.game);
            this.addBuilding(newBuilding);
            newBuilding.initialize();
        }
    }
}