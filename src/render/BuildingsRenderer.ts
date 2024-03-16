import { Graphics, Text } from "pixi.js";
import { BuildingManager } from "../engine/game/manager/BuildingManager";
import { ProductionBuilding } from "../engine/game/Building";
import { BoundContainer } from "./BoundContainer";

export class BuildingsRenderer extends BoundContainer<BuildingManager> {

    private buildings: BuildingRenderer[] = [];
    
    init() {
        super.init();
        this.data.BuildingAdded.on(this.addBuilding.bind(this));
    }

    addBuilding(building: ProductionBuilding) {
        // console.log('addBuilding', building);
        let sprite = new BuildingRenderer(this.context, building);
        this.addChild(sprite);
        this.buildings.push(sprite);
    }

    refreshBinding(): void {
        this.layoutBuildings();
    }

    layoutBuildings() {
        if (this.buildings.length === 0) return;
        // console.log('layoutBuildings', this.availableWidth);

        let buildingWidth = this.buildings[0].width;

        // center buildings on the screen, with equal space between
        // each and the edge of the container
        let totalWidth = this.buildings.length * buildingWidth;
        let space = (this.availableWidth - totalWidth) / (this.buildings.length + 1);
        let x = space;
        for (let building of this.buildings) {
            building.x = x;
            building.y = (this.availableHeight - building.height) / 2;
            x += space + buildingWidth;
        }
    }
}

export class BuildingRenderer extends BoundContainer<ProductionBuilding> {

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
    }

    refreshBinding(card: ProductionBuilding): void {
        this.text.text = card.describe();
        let tint = 0xffffff;
        if (this.context.targetting != null) {
            console.log(this.context.targetting);
            if (!this.context.targetting.possibleTargets.includes(this.data)) {
                tint = 0x777777;
            }
        }
        this.back.tint = tint;
    }
    
}