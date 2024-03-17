import { Event as EventHandler } from "../../util/Event";
import { BaseSingleton } from "../Singleton";
import { DecksManager } from "./DecksManager";
import { UIManager } from "./UIManager";

export class TurnManager extends BaseSingleton {
    private _turn: number = 0;

    readonly TurnStarted = new EventHandler<number>();
    readonly TurnEnded = new EventHandler<number>();

    public get turn(): number {
        return this._turn;
    }

    public startTurn() {
        this._turn++;
        this.TurnStarted.emit(this._turn);
        this.getSingleton(DecksManager).drawCardsForTurnStart();
        // this.getSingleton(UIManager).doTurnUI().then(() => this.endTurn());
    }

    public endTurn() {
        this.TurnEnded.emit(this._turn);
        this.getSingleton(DecksManager).discardCardsForEndOfTurn();
    }
}