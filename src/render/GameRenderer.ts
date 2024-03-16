import { BuildingManager } from "../engine/game/manager/BuildingManager";
import { DecksManager } from "../engine/game/manager/DecksManager";
import { BoundContainer } from "./BoundContainer";
import { BuildingsRenderer } from "./BuildingsRenderer";
import { HandRenderer } from "./HandRenderer";

export class GameRenderer extends BoundContainer<void> {

    private buildings: BuildingsRenderer;
    private hand: HandRenderer;

    init() {
        super.init();
        this.buildings = new BuildingsRenderer(this.context, this.game.getSingleton(BuildingManager));
        this.hand = new HandRenderer(this.context, this.game.getSingleton(DecksManager));
    }

    refreshBinding(): void {
        this.buildings.y = 0;
        this.buildings.availableWidth = this.app.screen.width;
        this.buildings.availableHeight = this.app.screen.height / 2;
        this.addChild(this.buildings);

        this.hand.y = this.app.screen.height / 2;
        this.hand.availableWidth = this.app.screen.width;
        this.hand.availableHeight = this.app.screen.height / 2;
        this.addChild(this.hand);
    }
    
}