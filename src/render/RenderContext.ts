import { Application } from "pixi.js";
import { Game } from "../engine/game/Game";
import { BoundContainer } from "./BoundContainer";
import { Card } from "../engine/game/card/Card";

type Targetting = {
    card: Card;
    possibleTargets: any[];
}

export class RenderContext {

    readonly containers: BoundContainer<any>[] = [];
    targetting: Targetting = null;

    constructor(
        readonly app: Application,
        readonly game: Game
    ) {}

    init() {
        this.app.ticker.add(this.update.bind(this));
    }

    addContainer(container: BoundContainer<any>) {
        this.containers.push(container);
    }

    refresh() {
        for (let container of this.containers) {
            container.refresh();
        }
    }

    private update() {
        for (let container of this.containers) {
            container.update();
        }
    }
}