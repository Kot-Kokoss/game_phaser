import Phaser from "../lib/phaser.js";

export class Preloader extends Phaser.Scene {
    constructor() {
        super("preloader");
    }

    preload() {
        this.load.image('tiles', 'src/img/assets/full tilemap.png')
        this.load.tilemapTiledJSON('dungeon', 'src/img/assets/tileMap.json')
    }

    create() {
        this.scene.start("game");
    }
}