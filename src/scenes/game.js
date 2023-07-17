import Phaser from "../lib/phaser.js";

export class Game extends Phaser.Scene {
    constructor() {
        super("game")
    }

    preload() {

    }

    create() {
        const map = this.make.tilemap({key: "dungeon"});
        const tileset = map.addTilesetImage('Tiles', 'tiles')

        const ground = map.createLayer('Ground', tilesetkkmknmnjnj)
    }

    update() {

    }
}