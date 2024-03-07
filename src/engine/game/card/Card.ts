import { CardDef } from "../../card-defs/CardDef";

export class Card {
    def: CardDef;

    get name() {
        return this.def.name;
    }

    constructor(def: CardDef) {
        this.def = def;
    }
}