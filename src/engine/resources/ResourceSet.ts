import { Resource } from "./Resources";


export type PartialResourceSet = {
    [key in Resource]?: number;
};

export class ResourceSet {

    private map: Map<number, number> = new Map();

    constructor(resources?: PartialResourceSet) {
        if (!resources) return;
        for (const key in resources) {
            // keys are always strings, but we want to store the map
            // as ints since that's what enums naturally map to
            let keyInt = parseInt(key);
            this.map.set(keyInt, resources[key]);
        }
    }

    has(cost: ResourceSet): boolean {
        for (const key of cost.setResources()) {
            if (this.get(key) < cost.get(key)) {
                return false;
            }
        }
        return true;
    }

    get(key: Resource): number {
        return this.map.get(key) || 0;
    }

    setResources() {
        return this.map.keys();
    }

    add(cost: ResourceSetOrPartial): void {
        cost = toResourceSet(cost);
        for (const key of cost.setResources()) {
            // console.log('adding', key, cost.get(key));
            this.map.set(key, this.get(key) + cost.get(key));
        }
    }

    subtract(cost: ResourceSetOrPartial): void {
        cost = toResourceSet(cost);
        for (const key of cost.setResources()) {
            this.map.set(key, this.get(key) - cost.get(key));
        }
    } 
}

function toResourceSet(cost: ResourceSetOrPartial): ResourceSet {
    if (cost instanceof ResourceSet) {
        return cost;
    }
    return new ResourceSet(cost);
}

type ResourceSetOrPartial = ResourceSet | PartialResourceSet;