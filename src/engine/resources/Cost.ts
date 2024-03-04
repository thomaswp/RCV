import { Resource } from "./Resources";


export type PartialResourceSet = {
    [key in Resource]?: number;
};

export class ResourceSet {

    private Map: Map<Resource, number> = new Map();

    constructor(resources?: PartialResourceSet) {
        if (!resources) return;
        for (const key in resources) {
            this.Map.set(Resource[key], resources[key]);
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
        return this.Map.get(key) || 0;
    }

    setResources() {
        return this.Map.keys();
    }

    add(cost: ResourceSetOrPartial): void {
        cost = toResourceSet(cost);
        for (const key of cost.setResources()) {
            this.Map.set(key, this.get(key) + cost.get(key));
        }
    }

    subtract(cost: ResourceSetOrPartial): void {
        cost = toResourceSet(cost);
        for (const key of cost.setResources()) {
            this.Map.set(key, this.get(key) - cost.get(key));
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