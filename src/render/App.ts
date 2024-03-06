import { Application, Graphics } from 'pixi.js';
import { Game } from '../engine/game/Game';
import { Buildings } from './Buildings';
import { Hand } from './Hand';

// Asynchronous IIFE
export async function initUI() {
    // Create a PixiJS application.
    const app = new Application();

    // Intialize the application.
    await app.init({ background: '#222222', resizeTo: window });

    // Then adding the application's canvas to the DOM body.
    document.body.appendChild(app.canvas);

    let game = new Game();
    game.initialize();

    let buildings = new Buildings(game, app.screen.width, app.screen.height / 2);
    app.stage.addChild(buildings.container);

    let hand = new Hand(game, app.screen.width, app.screen.height / 2);
    app.stage.addChild(hand.container);
    hand.container.y = app.screen.height / 2;

    game.start();
};