import { Container, Graphics, Text } from "pixi.js";
import { Game } from "../engine/game/Game";
import { Singleton } from "../engine/game/Singleton";
import { ProductionBuilding } from "../engine/game/Building";

export class ProxyContainer extends Container {
    protected game: Game;

    getSingleton<T extends Singleton>(type: new (...args: any[]) => T): T {
        return this.createProxy(this.game.getSingleton(type));
    }

    createProxy<T extends object>(obj: T) {
        return new Proxy(obj, {
            
        })
    }
}

class BuildingRenderer extends ProxyContainer {
    private text: Text;
    private background: Graphics;

    constructor(game: Game, private building: ProductionBuilding) {
        super();
    }
    
    init() {
        let container = new Container();
        container.removeChildren();
        let g = new Graphics();
        g.roundRect(0, 0, 150, 200, 10);
        g.fill(0xcccccc);
        g.stroke(0x000000);
        container.addChild(g);
        let text = new Text('', { 
            fontSize: 18, 
            wordWrap: true,
            wordWrapWidth: 150 - 10 * 2
        });
        text.x = 10;
        text.y = 10;
        container.addChild(text);
    }

    render() {
        this.text.text = this.building.describe();
    }
}
