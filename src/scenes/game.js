import Phaser from "../lib/phaser.js";

export class Game extends Phaser.Scene {
    constructor() {
        super("game")
    }

    preload() {

    }

    create() {
        //map
        const map = this.make.tilemap({ key: "dungeon" });
        const tileset = map.addTilesetImage('Tiles', 'tiles_file');

        const ground = map.createLayer('Ground', tileset);
        const walls = map.createLayer('Walls', tileset);
        const decor = map.createLayer('Decor', tileset);

        walls.setCollisionByProperty({ collides: true });
        decor.setCollisionByProperty({ collides: true });

        // chek collision
        const debugGraphics = this.add.graphics().setAlpha(0.7);
        walls.renderDebug(debugGraphics, {
            tileColor: null,
            collidingTleColor: new Phaser.Display.Color(231, 222, 48, 253),
            faceColor: new Phaser.Display.Color(231, 222, 56, 213),
        });
        decor.renderDebug(debugGraphics, {
            tileColor: null,
            collidingTleColor: new Phaser.Display.Color(231, 222, 48, 253),
            faceColor: new Phaser.Display.Color(231, 222, 56, 213),
        });
        //enemy
        this.goblin = this.add.sprite(250, 300, "goblin_idle");
        this.goblin.play("goblin_idle_anim");

        this.goblin.setInteractive();

        this.input.on('gameobjectdown', this.hit, this);

        this.hero = this.physics.add.sprite(260, 320, "hero_idle");

        this.hero.play("hero_idle_anim");

        this.physics.add.collider(this.hero, walls);
        this.physics.add.collider(this.hero, decor);

        this.cursorKeys = this.input.keyboard.createCursorKeys();
        this.analogCursorKeys = this.input.keyboard.addKeys({
            w: Phaser.Input.Keyboard.KeyCodes.W,
            a: Phaser.Input.Keyboard.KeyCodes.A,
            s: Phaser.Input.Keyboard.KeyCodes.S,
            d: Phaser.Input.Keyboard.KeyCodes.D
        })

        
    }

    update() {
        this.moveHeroManager();
    }

    hit(pointer, gameObject) {
        gameObject.setTexture("hit");
        gameObject.play("hit_anim");
    }

    moveHeroManager() {
        this.hero.setVelocity(0);

        if (Phaser.Input.Keyboard.JustDown(this.cursorKeys.up)) {
            this.hero.play("hero_run_anim", true);
        }
        if (Phaser.Input.Keyboard.JustUp(this.cursorKeys.up)) {
            this.hero.play("hero_idle_anim", true);
        }
        if (Phaser.Input.Keyboard.JustDown(this.cursorKeys.left)) {
            this.hero.play("hero_run_anim", true);
        }
        if (Phaser.Input.Keyboard.JustUp(this.cursorKeys.left)) {
            this.hero.play("hero_idle_anim", true);
        }
        if (Phaser.Input.Keyboard.JustDown(this.cursorKeys.down)) {
            this.hero.play("hero_run_anim", true);
        }
        if (Phaser.Input.Keyboard.JustUp(this.cursorKeys.down)) {
            this.hero.play("hero_idle_anim", true);
        }  
        if (Phaser.Input.Keyboard.JustDown(this.cursorKeys.right)) {
            this.hero.play("hero_run_anim", true);
        }
        if (Phaser.Input.Keyboard.JustUp(this.cursorKeys.right)) {
            this.hero.play("hero_idle_anim", true);
        } 
        if (Phaser.Input.Keyboard.JustDown(this.analogCursorKeys.w)) {
            this.hero.play("hero_run_anim", true);
        } 
        if (Phaser.Input.Keyboard.JustUp(this.analogCursorKeys.w)) {
            this.hero.play("hero_idle_anim", true);
        } 
        if (Phaser.Input.Keyboard.JustDown(this.analogCursorKeys.a)) {
            this.hero.play("hero_run_anim", true);
        } 
        if (Phaser.Input.Keyboard.JustUp(this.analogCursorKeys.a)) {
            this.hero.play("hero_idle_anim", true);
        } 
        if (Phaser.Input.Keyboard.JustDown(this.analogCursorKeys.s)) {
            this.hero.play("hero_run_anim", true); 
        } 
        if (Phaser.Input.Keyboard.JustUp(this.analogCursorKeys.s)) {
            this.hero.play("hero_idle_anim", true); 
        } 
        if (Phaser.Input.Keyboard.JustDown(this.analogCursorKeys.d)) {
            this.hero.play("hero_run_anim", true);
        }
        if (Phaser.Input.Keyboard.JustUp(this.analogCursorKeys.d)) {
            this.hero.play("hero_idle_anim", true);
        }

        if (this.cursorKeys.left.isDown || this.analogCursorKeys.a.isDown) {
            this.hero.setScale(-1, 1);
            this.hero.setVelocityX(-70);
        } else if (this.cursorKeys.right.isDown || this.analogCursorKeys.d.isDown) {
            this.hero.setScale(1, 1);
            this.hero.setVelocityX(70);
        }

        if (this.cursorKeys.up.isDown || this.analogCursorKeys.w.isDown) {
            this.hero.setVelocityY(-70);
        } else if (this.cursorKeys.down.isDown || this.analogCursorKeys.s.isDown) {
            this.hero.setVelocityY(70);
        }
    }
}