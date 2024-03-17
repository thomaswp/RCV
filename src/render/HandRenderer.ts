import { Application, Container, Graphics, Sprite, Text, buildAdaptiveBezier } from "pixi.js";
import { Game } from "../engine/game/Game";
import { BuildingManager } from "../engine/game/manager/BuildingManager";
import { ProductionBuilding } from "../engine/game/Building";
import { DecksManager } from "../engine/game/manager/DecksManager";
import { Card } from "../engine/game/card/Card";
import { BoundContainer } from "./BoundContainer";

export class HandRenderer extends BoundContainer<DecksManager> {

    private cards: CardRenderer[] = [];

    init() {
        super.init();
        this.data.CardDrawn.on(this.addCard.bind(this));
    }

    addCard(card: Card) {
        // console.log('addCard', card);
        let sprite = new CardRenderer(this.context, card);
        this.addChild(sprite);
        this.cards.push(sprite);
        this.layoutHand();
    }

    refreshBinding(): void {
        this.layoutHand();
    }

    layoutHand() {
        if (this.cards.length === 0) return;

        const decksManager = this.getSingleton(DecksManager);
        for (let i = 0; i < this.cards.length; i++) {
            let card = this.cards[i];
            if (decksManager.hand.indexOf(card.data) === -1) {
                this.removeChild(card);
                this.cards.splice(i, 1);
                i--;
            }
        }

        let buildingWidth = this.cards[0].width;

        // center buildings on the screen, with equal space between
        // each and the edge of the container
        let totalWidth = this.cards.length * buildingWidth;
        let space = (this.availableWidth - totalWidth) / (this.cards.length + 1);
        let x = space;
        for (let building of this.cards) {
            building.x = x;
            building.y = (this.availableHeight - building.height) / 2;
            x += space + buildingWidth;
        }
    }
}

export class CardRenderer extends BoundContainer<Card> {

    private back: Graphics;
    private text: Text;

    init() {
        let back = this.back = new Graphics();
        back.roundRect(0, 0, 150, 200, 10);
        back.fill(0xcccccc);
        back.stroke(0x000000);
        this.addChild(back);

        let text = this.text = new Text('', { 
            fontSize: 18, 
            wordWrap: true,
            wordWrapWidth: 150 - 10 * 2
        });
        text.x = 10;
        text.y = 10;
        this.addChild(text);

        this.interactive = true;
        this.onclick = () => {
            this.context.targetManager.onHandCardClicked(this.data);
        }
    }

    refreshBinding(card: Card): void {
        this.text.text = card.name;
        this.back.tint = this.context.targetManager.targettingCard === card ? 0x00ff00 : 0xffffff;
    }
    
}