import { Application, Container, Graphics, Sprite, Text, buildAdaptiveBezier } from "pixi.js";
import { Game } from "../engine/game/Game";
import { BuildingManager } from "../engine/game/manager/BuildingManager";
import { ProductionBuilding } from "../engine/game/Building";

export class Buildings {

    private buildings: Container[] = [];
    readonly container: Container;

    constructor(
        readonly game: Game,
        private width: number,
        private height: number
    ) {
        this.container = new Container();
        game.getSingleton(BuildingManager).BuildingAdded.on(this.addBuilding.bind(this));
    }

    addBuilding(building: ProductionBuilding) {
        console.log('addBuilding', building);
        let sprite = this.createBuildingSprite(building);
        this.container.addChild(sprite);
        this.buildings.push(sprite);
        this.layoutBuildings();
    }

    layoutBuildings() {
        if (this.buildings.length === 0) return;

        let buildingWidth = this.buildings[0].width;

        // center buildings on the screen, with equal space between
        // each and the edge of the container
        let totalWidth = this.buildings.length * buildingWidth;
        let space = (this.width - totalWidth) / (this.buildings.length + 1);
        let x = space;
        for (let building of this.buildings) {
            building.x = x;
            building.y = (this.height - building.height) / 2;
            x += space + buildingWidth;
        }
    }

    createBuildingSprite(building: ProductionBuilding): Container {
        let container = new Container();
        container.removeChildren();
        let g = new Graphics();
        g.roundRect(0, 0, 150, 200, 10);
        g.fill(0xcccccc);
        g.stroke(0x000000);
        container.addChild(g);

        let text = new Text(building.describe(), { 
            fontSize: 18, 
            wordWrap: true,
            wordWrapWidth: 150 - 10 * 2
        });
        text.x = 10;
        text.y = 10;
        container.addChild(text);

        let update = () => {
            text.text = building.describe();
        }
        building.Updated.on(update);

        return container;

    }
}