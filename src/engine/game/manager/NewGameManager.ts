import { PartialResourceSet } from "../../resources/ResourceSet";
import { Farm, House, Quarry, Woods } from "../Building";
import { BuildingManager } from "./BuildingManager";
import { DecksManager } from "./DecksManager";
import { ResourceManager } from "./ResourceManager";
import { BaseSingleton } from "../Singleton";
import { Card } from "../card/Card";
import { Resource } from "../../resources/Resources";
import { Expand, Work } from "../../components/CardAction";

export class NewGameManager extends BaseSingleton {
    public startGame(): void {
        const decksManager = this.getSingleton(DecksManager);
        const buildingsManager = this.getSingleton(BuildingManager);
        const resourceManager = this.getSingleton(ResourceManager);
 
        const startingCardDefs = [
            new Work(),
            new Work(),
            new Work(),
            new Work(),
            new Expand(),
            new Expand(),
        ]

        const startingBuildings = [
            new House(this.game),
            new Farm(this.game),
            new Woods(this.game),
            new Quarry(this.game),
        ]

        startingCardDefs.forEach(cardDef => {
            decksManager.deck.addCardToEnd(new Card(cardDef));
        });
        decksManager.deck.shuffle();

        startingBuildings.forEach(building => {
            buildingsManager.addBuilding(building);
            let starting = {
                [building.resource]: building.getTotalStorageSpace()
            } as PartialResourceSet;
            resourceManager.resources.add(starting);
            // console.log("adding", starting, ':', resourceManager.resources);
            building.initialize();
        });
        // console.log('food', resourceManager.resources.get(Resource.Food))


    }
}