import { Resource } from "./Resources";


export type PartialResourceSet = {
    [key in Resource]?: number;
};

export class ResourceSet {

    private map: Map<Resource, number> = new Map();

    constructor(resources?: PartialResourceSet) {
        if (!resources) return;
        for (const [key, value] of Object.entries(resources)) {
            this.map.set(key as Resource, value);
        }
    }

    has(cost: ResourceSetOrPartial): boolean {
        cost = toResourceSet(cost);
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

    set(key: Resource, value: number) {
        this.map.set(key, value);
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

    plus(cost: ResourceSetOrPartial): ResourceSet {
        const result = this.copy();
        result.add(cost);
        return result;
    }

    minus(cost: ResourceSetOrPartial): ResourceSet {
        cost = toResourceSet(cost);
        const result = this.copy();
        result.subtract(cost);
        return result;
    }

    subtract(cost: ResourceSetOrPartial): void {
        cost = toResourceSet(cost);
        for (const key of cost.setResources()) {
            this.map.set(key, this.get(key) - cost.get(key));
        }
    }

    copy(): ResourceSet {
        return new ResourceSet(Object.fromEntries(this.map));
    }
}

export function toResourceSet(cost: ResourceSetOrPartial): ResourceSet {
    if (cost instanceof ResourceSet) {
        return cost;
    }
    return new ResourceSet(cost);
}

type ResourceSetOrPartial = ResourceSet | PartialResourceSet;