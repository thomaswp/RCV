import { Resource } from "../../resources/Resources";
import { PartialResourceSet, ResourceSet } from "../../resources/ResourceSet";
import { BaseSingleton } from "../Singleton";
import { BuildingManager } from "./BuildingManager";

// TODO: Remove excess at the end of the turn
export class ResourceManager extends BaseSingleton {

    readonly resources = new ResourceSet();

    getTotalStorageOf(resource: Resource): number {
        return this.getTotalStorage().get(resource);
    }

    getTotalStorage(): ResourceSet {
        const totalStorage = new ResourceSet();
        this.getSingleton(BuildingManager).buildings.forEach(building => {
            totalStorage.add({
                [building.resource]: building.getTotalStorageSpace()
            });
        });
        return totalStorage;
    }

    getAvailableStorage(): ResourceSet {
        const totalStorage = this.getTotalStorage();
        return totalStorage.minus(this.resources);
    }

    getAvailableStorageOf(resource: Resource): number {
        return this.getTotalStorageOf(resource) - this.resources.get(resource);
    }

}