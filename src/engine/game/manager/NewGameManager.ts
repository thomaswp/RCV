import { PartialResourceSet } from "../../resources/Cost";
import { Farm, Woods } from "../Building";
import { BuildingManager } from "./BuildingManager";
import { DecksManager } from "./DecksManager";
import { ResourceManager } from "./ResourceManager";
import { BaseSingleton } from "../Singleton";
import { Card } from "../card/Card";
import { Cards } from "../../card-defs/CardDef";

export class NewGameManager extends BaseSingleton {
    public startGame(): void {
        const decksManager = this.getSingleton(DecksManager);
        const buildingsManager = this.getSingleton(BuildingManager);
        const resourceManager = this.getSingleton(ResourceManager);

        const startingCardDefs = [
            Cards.Buildings.House,
            Cards.Buildings.Farm,
            Cards.Buildings.Woods,
            Cards.Buildings.Quarry,
            Cards.Actions.Work,
            Cards.Actions.Work,
            Cards.Actions.Work,
            Cards.Actions.Work,
            Cards.Actions.UpgradeStorage,
            Cards.Actions.UpgradeStorage,
        ]

        const startingBuildings = [
            new Farm(this.game),
            new Woods(this.game),
        ]

        startingCardDefs.forEach(cardDef => {
            decksManager.deck.addCardToEnd(new Card(cardDef));
        });

        startingBuildings.forEach(building => {
            buildingsManager.addBuilding(building);
            building.initialize();
            let starting = {
                [building.resource]: building.getTotalStorageSpace()
            } as PartialResourceSet;
            resourceManager.resources.add(starting);
        });


    }
}