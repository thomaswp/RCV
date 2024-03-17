import { Graphics, Text } from "pixi.js";
import { TurnManager } from "../engine/game/manager/TurnManager";
import { BoundContainer } from "./BoundContainer";

export class EndTurnButton extends BoundContainer<void> {

    private readonly turnManager = this.getSingleton(TurnManager);
    private back: Graphics;
    private text: Text;

    init() {
        let back = this.back = new Graphics();
        back.roundRect(0, 0, 100, 50, 10);
        back.fill(0xcccccc);
        back.stroke(0x000000);
        this.addChild(back);

        let text = this.text = new Text('End Turn', { 
            fontSize: 18, 
            wordWrap: true,
            wordWrapWidth: 150 - 10 * 2
        });
        text.x = 10;
        text.y = 10;
        this.addChild(text);

        this.interactive = true;
        this.onclick = () => {
            this.turnManager.endTurn();
            this.turnManager.startTurn();
            this.context.refresh();
        }
    }

    refreshBinding(): void {
        
    }
}