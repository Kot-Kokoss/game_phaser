import Phaser from "./lib/phaser.js";
import { Game } from "./scenes/game.js";
import { Preloader } from "./scenes/preloader.js";

export default new Phaser.Game({
    type: Phaser.AUTO,
    width: 1600,
    heught: 900,
    scene: [Preloader, Game],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                x: 0,
            },
        },
    },
    scale: {
        zoom: 2,
    },
});