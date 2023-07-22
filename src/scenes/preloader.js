import Phaser from "../lib/phaser.js";

export class Preloader extends Phaser.Scene {
    constructor() {
        super("preloader");
    }

    preload() {
        this.load.image('tiles_file', 'src/img/assets/full_tilemap_upd.png')
        this.load.tilemapTiledJSON('dungeon', 'src/img/assets/map.json')

        this.load.spritesheet("hero_idle_right", "src/img/assets/spritesheets/hero_idle_spritesheet_right.png", {
            frameWidth: 16,
            frameHeight: 16
        });
        this.load.spritesheet("hero_idle_left", "src/img/assets/spritesheets/hero_idle_spritesheet_left.png", {
            frameWidth: 16,
            frameHeight: 16
        });
        this.load.spritesheet("hero_run_right", "src/img/assets/spritesheets/hero_run_spritesheet_right.png", {
            frameWidth: 16,
            frameHeight: 16
        });
        this.load.spritesheet("hero_run_left", "src/img/assets/spritesheets/hero_run_spritesheet_left.png", {
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
        this.load.spritesheet("slash", "src/img/assets/spritesheets/slash_effect_anim_spritesheet.png", {
            frameWidth: 16,
            frameHeight: 16
        })
        this.load.spritesheet("dead_enemy", "src/img/assets/spritesheets/enemy_afterdead_explosion_anim_spritesheet.png", {
            frameWidth: 16,
            frameHeight: 16
        })
        this.load.image("sword", "src/img/frames/weapon_sword_1.png", {
            frameWidth: 16,
            frameHeight: 16
        })
        this.load.image("goblin_knife", "src/img/frames/goblin_knife.png", {
            frameWidth: 16,
            frameHeight: 16
        })
    }

    create() {
        this.scene.start("game");

        this.anims.create({
            key: "hero_idle_anim_right",
            frames: this.anims.generateFrameNumbers("hero_idle_right"),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: "hero_idle_anim_left",
            frames: this.anims.generateFrameNumbers("hero_idle_left"),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: "hero_run_anim_right",
            frames: this.anims.generateFrameNumbers("hero_run_right", { frames: [6, 5, 4, 3, 2, 1] }),
            frameRate: 15,
            repeat: -1
        })
        this.anims.create({
            key: "hero_run_anim_left",
            frames: this.anims.generateFrameNumbers("hero_run_left", { frames: [6, 5, 4, 3, 2, 1] }),
            frameRate: 15,
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
        this.anims.create({
            key: "slash_anim",
            frames: this.anims.generateFrameNumbers("slash"),
            frameRate: 15,
            repeat: 0,
            hideOnComplete: true
        });
        this.anims.create({
            key: "dead_enemy_anim",
            frames: this.anims.generateFrameNumbers("dead_enemy"),
            frameRate: 15,
            repeat: 0,
            hideOnComplete: true
        });
    }
}