import { Event } from "../../util/Event";
import { BaseSingleton } from "../Singleton";

export enum Season {
    Spring,
    Summer,
    Autumn,
    Winter,
}

export class SeasonManager extends BaseSingleton {
    private _season: Season = Season.Spring;

    public OnSeasonChange = new Event<Season>();

    public get season(): Season {
        return this._season;
    }

    public incrementSeason() {
        this._season = (this._season + 1) % 4;
        this.OnSeasonChange.emit(this._season);
    }

}