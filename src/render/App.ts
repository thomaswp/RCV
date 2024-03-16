import { Application } from 'pixi.js';
import { Game } from '../engine/game/Game';
import { RenderContext } from './RenderContext';
import { GameRenderer } from './GameRenderer';

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

    let context = new RenderContext(app, game);
    let renderer = new GameRenderer(context);
    context.init();
    context.refresh();
    app.stage.addChild(renderer);

    game.start();

    context.refresh();
};