import { CardDef } from "../../components/CardAction";

export class Card {
    def: CardDef<any>;

    get name() {
        return this.def.name;
    }

    constructor(def: CardDef<any>) {
        this.def = def;
    }
}