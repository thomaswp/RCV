import { CardDef } from "../../card-defs/CardDef";

export class Card {
    def: CardDef;

    constructor(def: CardDef) {
        this.def = def;
    }
}