import { Component } from "../components/Component";

export interface CardDef {
    name: string;
}

export namespace Cards {
    export namespace Actions {
        export const Work : CardDef = {
            name: 'Work',
        };
    
        export const UpgradeStorage : CardDef = {
            name: 'Upgrade Storage',
        };
    }
    export namespace Buildings {

        export const House : CardDef = {
            name: 'House',
        }
        
        export const Farm : CardDef = {
            name: 'Farm',
        }
    
        export const Woods : CardDef = {
            name: 'Woods',
        }
    
        export const Quarry : CardDef = {
            name: 'Quarry',
        }
    }
}