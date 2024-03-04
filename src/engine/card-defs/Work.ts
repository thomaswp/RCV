// import { Workable } from "../components/BuildingProps";
// import { Food, Wood, Worker } from "../resources/Resources";
// import { CardDef } from "./CardDef";

// export const Work: CardDef = {
//     name: 'Work',
//     components: [
//         new Targets(typeof(Workable)),
//         new HasAdjustableTargetCost(
//             target => [1, target.workAvailable],
//             (value: number, target) => {
//                 Worker.name: target.Workable.foodCost * value,
//                 Food.name: target.Workable.foodCost * value,
//             }
//         )
//     ]
// }