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
        this.load.spritesheet("goblin_idle_right", "src/img/assets/spritesheets/goblin_idle_spritesheet_right.png", {
            frameWidth: 16,
            frameHeight: 16
        })
        this.load.spritesheet("goblin_idle_left", "src/img/assets/spritesheets/goblin_idle_spritesheet_left.png", {
            frameWidth: 16,
            frameHeight: 16
        })
        this.load.spritesheet("goblin_run_right", "src/img/assets/spritesheets/goblin_run_spritesheet_right.png", {
            frameWidth: 16,
            frameHeight: 16
        })
        this.load.spritesheet("goblin_run_left", "src/img/assets/spritesheets/goblin_run_spritesheet_left.png", {
            frameWidth: 16,
            frameHeight: 16
        })
        this.load.spritesheet("slime_idle_right", "src/img/assets/spritesheets/slime_idle_spritesheet_right.png", {
            frameWidth: 16,
            frameHeight: 16
        })
        this.load.spritesheet("slime_idle_left", "src/img/assets/spritesheets/slime_idle_spritesheet_left.png", {
            frameWidth: 16,
            frameHeight: 16
        })
        this.load.spritesheet("slime_run_right", "src/img/assets/spritesheets/slime_run_spritesheeet_right.png", {
            frameWidth: 16,
            frameHeight: 16
        })
        this.load.spritesheet("slime_run_left", "src/img/assets/spritesheets/slime_run_spritesheeet_left.png", {
            frameWidth: 16,
            frameHeight: 16
        })
        this.load.spritesheet("fly_right", "src/img/assets/spritesheets/fly_anim_spritesheet_right.png", {
            frameWidth: 16,
            frameHeight: 16
        })
        this.load.spritesheet("fly_left", "src/img/assets/spritesheets/fly_anim_spritesheet_left.png", {
            frameWidth: 16,
            frameHeight: 16
        })
        this.load.spritesheet("demon_idle_right", "src/img/assets/spritesheets/demon_idle_spritesheet_right.png", {
            frameWidth: 32,
            frameHeight: 36
        })
        this.load.spritesheet("demon_idle_left", "src/img/assets/spritesheets/demon_idle_spritesheet_left.png", {
            frameWidth: 32,
            frameHeight: 36
        })
        this.load.spritesheet("demon_run_right", "src/img/assets/spritesheets/demon_run_spritesheet_right.png", {
            frameWidth: 32,
            frameHeight: 36
        })
        this.load.spritesheet("demon_run_left", "src/img/assets/spritesheets/demon_run_spritesheet_left.png", {
            frameWidth: 32,
            frameHeight: 36
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
        this.load.image("crosshair", "src/img/frames/crosshair_3.png", {
            frameWidth: 16,
            frameHeight: 16
        })
        this.load.image("ui_helth_empty", "src/img/frames/health_ui_empty.png", {
            frameWidth: 80,
            frameHeight: 16
        })
        this.load.image("ui_helth_1_bank", "src/img/frames/health_ui_1_bank.png", {
            frameWidth: 80,
            frameHeight: 16
        })
        this.load.image("ui_helth_2_bank", "src/img/frames/health_ui_2_bank.png", {
            frameWidth: 80,
            frameHeight: 16
        })
        this.load.image("ui_helth_3_bank", "src/img/frames/health_ui_3_bank.png", {
            frameWidth: 80,
            frameHeight: 16
        })
        this.load.image("ui_helth_4_bank", "src/img/frames/health_ui_4_bank.png", {
            frameWidth: 80,
            frameHeight: 16
        })
        this.load.spritesheet("torch", "src/img/assets/spritesheets/torch_spritesheet.png", {
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
            frames: this.anims.generateFrameNumbers("hero_run_right"),
            frameRate: 15,
            repeat: -1
        })
        this.anims.create({
            key: "hero_run_anim_left",
            frames: this.anims.generateFrameNumbers("hero_run_left", { frames: [5, 4, 3, 2, 1, 0] }),
            frameRate: 15,
            repeat: -1
        })
        this.anims.create({
            key: "goblin_idle_anim_right",
            frames: this.anims.generateFrameNumbers("goblin_idle_right"),
            frameRate: 8,
            repeat: -1
        })
        this.anims.create({
            key: "goblin_idle_anim_left",
            frames: this.anims.generateFrameNumbers("goblin_idle_left"),
            frameRate: 8,
            repeat: -1
        })
        this.anims.create({
            key: "goblin_run_anim_right",
            frames: this.anims.generateFrameNumbers("goblin_run_right"),
            frameRate: 15,
            repeat: -1
        })
        this.anims.create({
            key: "goblin_run_anim_left",
            frames: this.anims.generateFrameNumbers("goblin_run_left",  { frames: [5, 4, 3, 2, 1, 0] }),
            frameRate: 15,
            repeat: -1
        })
        this.anims.create({
            key: "slime_idle_anim_right",
            frames: this.anims.generateFrameNumbers("slime_idle_right"),
            frameRate: 8,
            repeat: -1
        })
        this.anims.create({
            key: "slime_idle_anim_left",
            frames: this.anims.generateFrameNumbers("slime_idle_left"),
            frameRate: 8,
            repeat: -1
        })
        this.anims.create({
            key: "slime_run_anim_right",
            frames: this.anims.generateFrameNumbers("slime_run_right"),
            frameRate: 15,
            repeat: -1
        })
        this.anims.create({
            key: "slime_run_anim_left",
            frames: this.anims.generateFrameNumbers("slime_run_left",  { frames: [5, 4, 3, 2, 1, 0] }),
            frameRate: 15,
            repeat: -1
        })
        this.anims.create({
            key: "fly_anim_right",
            frames: this.anims.generateFrameNumbers("fly_right"),
            frameRate: 15,
            repeat: -1
        })
        this.anims.create({
            key: "fly_anim_left",
            frames: this.anims.generateFrameNumbers("fly_left",  { frames: [3, 2, 1, 0] }),
            frameRate: 15,
            repeat: -1
        })     
        this.anims.create({
            key: "demon_idle_anim_right",
            frames: this.anims.generateFrameNumbers("demon_idle_right"),
            frameRate: 8,
            repeat: -1
        })
        this.anims.create({
            key: "demon_idle_anim_left",
            frames: this.anims.generateFrameNumbers("demon_idle_left"),
            frameRate: 8,
            repeat: -1
        })
        this.anims.create({
            key: "demon_run_anim_right",
            frames: this.anims.generateFrameNumbers("demon_run_right"),
            frameRate: 15,
            repeat: -1
        })
        this.anims.create({
            key: "demon_run_anim_left",
            frames: this.anims.generateFrameNumbers("demon_run_left",  { frames: [3, 2, 1, 0] }),
            frameRate: 15,
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
        this.anims.create({
            key: "torch_anim",
            frames: this.anims.generateFrameNumbers("torch"),
            frameRate: 5,
            repeat: -1
        })
        
    }
}