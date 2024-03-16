import { PartialResourceSet } from "../resources/ResourceSet";

export type CardCost = PartialResourceSet | CostComponent;

export interface CostComponent {
    calculateCost: (target: any) => PartialResourceSet;
}

// export class TargetedCost<T> implements CostComponent {
//     constructor(readonly cost: (target: T) => PartialResourceSet) {}
// }