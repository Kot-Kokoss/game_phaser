import Phaser from "../lib/phaser.js";

export class Preloader extends Phaser.Scene {
    constructor() {
        super("preloader");
    }

    preload() {
        this.load.image('tiles_file', 'src/img/assets/full_tilemap.png')
        this.load.tilemapTiledJSON('dungeon', 'src/img/assets/tileMap.json')

        this.load.spritesheet("hero_idle", "src/img/assets/spritesheets/hero_idle_spritesheet.png", {
            frameWidth: 16,
            frameHeight: 16
        });
        this.load.spritesheet("hero_run", "src/img/assets/spritesheets/hero_run_spritesheet.png", {
            frameWidth: 16,
            frameHeight: 16
        });
        this.load.spritesheet("goblin_idle", "src/img/assets/spritesheets/goblin_idle_spritesheet.png", {
            frameWidth: 16,
            frameHeight: 16
        })
        this.load.spritesheet("goblin_run", "src/img/assets/spritesheets/goblin_run_spritesheet.png", {
            frameWidth: 16,
            frameHeight: 16
        })
        this.load.spritesheet("hit", "src/img/assets/spritesheets/hit_effect_anim_spritesheet.png", {
            frameWidth: 8,
            frameHeight: 8
        })
    }

    create() {
        this.scene.start("game");

        this.anims.create({
            key: "hero_idle_anim",
            frames: this.anims.generateFrameNumbers("hero_idle"),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: "hero_run_anim",
            frames: this.anims.generateFrameNumbers("hero_run"),
            frameRate: 20,
            repeat: -1
        })
        this.anims.create({
            key: "goblin_idle_anim",
            frames: this.anims.generateFrameNumbers("goblin_idle"),
            frameRate: 5,
            repeat: -1
        })
        this.anims.create({
            key: "goblin_run_anim",
            frames: this.anims.generateFrameNumbers("goblin_run"),
            frameRate: 20,
            repeat: -1
        })
        this.anims.create({
            key: "hit_anim",
            frames: this.anims.generateFrameNumbers("hit"),
            frameRate: 15,
            repeat: 0,
            hideOnComplete: true
        });
    }
}