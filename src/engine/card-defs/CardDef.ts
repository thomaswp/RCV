// import { Builds } from "../components/Builds";
// import { CardAction, Expands } from "../components/CardAction";
// import { CardCost } from "../components/CardCost";
// import { CardTarget } from "../components/CardTarget";
// import { Resource } from "../resources/Resources";

// export interface CardDef {
//     name: string;
//     target?: CardTarget;
//     cost?: CardCost;
//     actions?: CardAction[];
// }

// export namespace Cards {
//     export namespace Actions {
//         export const Work : CardDef = {
//             name: 'Work',
//         };

//         export const Expand : CardDef = {
//             name: 'Expand',
//             actions: [
//                 new Expands()
//             ]
//         };
    
//         export const UpgradeStorage : CardDef = {
//             name: 'Upgrade Storage',
//         };
//     }
//     export namespace Buildings {

//         // export const House : CardDef = {
//         //     name: 'House',
//         //     cost: {
//         //         [Resource.Wood]: 2,
//         //     },
//         //     // actions: [
//         //     //     new Builds(House),
//         //     // ]
//         // }
        
//         // export const Farm : CardDef = {
//         //     name: 'Farm',
//         //     cost: {
//         //         [Resource.Wood]: 2,
//         //     },
//         //     // actions: [
//         //     //     new Builds(House),
//         //     // ]
//         // }
    
//         // export const Woods : CardDef = {
//         //     name: 'Woods',
//         // }
    
//         // export const Quarry : CardDef = {
//         //     name: 'Quarry',
//         // }
//     }
// }