import { CardDef } from "../card-defs/CardDef";
import { Property } from "./Property";

export class Building {
    readonly cardDef: CardDef;
    private properties: Map<Property, number> = new Map();

    getProperty(property: Property): Property {
        return this.properties.get(property) ?? 0;
    }

    setProperty(property: Property, value: number): void {
        this.properties.set(property, value);
    }
}