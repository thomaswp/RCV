import { Container } from "pixi.js";
import { Game } from "../engine/game/Game";
import { RenderContext } from "./RenderContext";
import { Singleton } from "../engine/game/Singleton";

export abstract class BoundContainer<T> extends Container {

    get game() {
        return this.context.game;
    }

    get app() {
        return this.context.app;
    }

    availableWidth: number = null;
    availableHeight: number = null;

    constructor(
        readonly context: RenderContext,
        readonly data: T
    ) {
        super();
        context.addContainer(this);
        this.init();
    }

    getSingleton<T extends Singleton>(type: new (...args: any[]) => T): T {
        return this.game.getSingleton(type);
    }

    refresh(): void {
        this.refreshBinding(this.data);
    }

    abstract refreshBinding(data: T): void;

    init(): void {

    }

    update(): void {

    }
}