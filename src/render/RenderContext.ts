import { Application } from "pixi.js";
import { Game } from "../engine/game/Game";
import { BoundContainer } from "./BoundContainer";
import { TargetManager } from "./TargetManager";

export class RenderContext {

    readonly containers: BoundContainer<any>[] = [];
    readonly targetManager = new TargetManager(this);

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