import { CardDef } from "../../components/CardDef";

export class Card {
    def: CardDef<any>;

    get name() {
        return this.def.name;
    }

    constructor(def: CardDef<any>) {
        this.def = def;
    }
}