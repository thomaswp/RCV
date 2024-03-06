import { Application, Container, Graphics, Sprite, buildAdaptiveBezier } from "pixi.js";
import { Game } from "../engine/game/Game";
import { BuildingManager } from "../engine/game/manager/BuildingManager";
import { ProductionBuilding } from "../engine/game/Building";
import { DecksManager } from "../engine/game/manager/DecksManager";
import { Card } from "../engine/game/card/Card";

export class Hand {

    private cards: Graphics[] = [];
    readonly container: Container;

    constructor(
        readonly game: Game,
        private width: number,
        private height: number
    ) {
        this.container = new Container();
        game.getSingleton(DecksManager).CardDrawn.on(this.addCard.bind(this));
    }

    addCard(card: Card) {
        let sprite = this.createCardSprite(card);
        this.container.addChild(sprite);
        this.cards.push(sprite);
        this.layoutHand();
    }

    layoutHand() {
        if (this.cards.length === 0) return;

        let buildingWidth = this.cards[0].width;

        // center buildings on the screen, with equal space between
        // each and the edge of the container
        let totalWidth = this.cards.length * buildingWidth;
        let space = (this.width - totalWidth) / (this.cards.length + 1);
        let x = space;
        for (let building of this.cards) {
            building.x = x;
            building.y = (this.height - building.height) / 2;
            x += space + buildingWidth;
        }
    }

    createCardSprite(card: Card): Graphics {
        let g = new Graphics();
        g.roundRect(0, 0, 150, 200, 10);
        g.fill(0xcccccc);
        g.stroke(0x000000);
        return g;

    }
}