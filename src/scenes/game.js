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
        const tileset_interact = map.addTilesetImage('torch_spritesheet', 'tiles_file');

        const ground = map.createLayer('Ground', tileset);
        
        //chek collision

        // const debugGraphics = this.add.graphics().setAlpha(0.7);
        // walls.renderDebug(debugGraphics, {
        //     tileColor: null,
        //     collidingTleColor: new Phaser.Display.Color(231, 222, 48, 253),
        //     faceColor: new Phaser.Display.Color(231, 222, 56, 213),
        // });
        // decor.renderDebug(debugGraphics, {
        //     tileColor: null,
        //     collidingTleColor: new Phaser.Display.Color(231, 222, 48, 253),
        //     faceColor: new Phaser.Display.Color(231, 222, 56, 213),
        // });

        //enemy
        this.goblin = this.add.sprite(0, 0, "goblin_idle");
        this.goblin_knife = this.add.image(8, 0, "goblin_knife");
        this.goblin_knife.setScale(1);

        this.goblin.play("goblin_idle_anim");

        this.enemy_goblin = this.add.container(250, 300, [this.goblin, this.goblin_knife]);
        this.enemy_goblin.setSize(16, 16);
        this.physics.world.enable(this.enemy_goblin);
        
        
        this.input.on('gameobjectdown', this.hit, this);

        this.hero = this.physics.add.sprite(0, 0, "hero_idle_right");
        this.sword = this.add.image(7, 0, "sword");
        this.sword.setScale(0.65);

        this.hero.play("hero_idle_anim_right");

        this.player = this.add.container(260, 320, [this.hero, this.sword]);
        this.player.setSize(16, 16);
        this.physics.world.enable(this.player);
        
        const walls = map.createLayer('Walls', tileset);
        const decor = map.createLayer('Decor', tileset);
        const torch = map.createLayer('Torch', tileset_interact)

        walls.setCollisionByProperty({ collides: true });
        decor.setCollisionByProperty({ collides: true });
        ground.setCollisionByProperty({ collides: true });

        const ColliderObject = [this.player,  this.enemy_goblin];

        for (let i = 0; i != ColliderObject.length; i++) {
            this.physics.add.collider(ColliderObject[i], walls);
            this.physics.add.collider(ColliderObject[i], decor);
            this.physics.add.collider(ColliderObject[i], ground);
        }
        

        this.cursorKeys = this.input.keyboard.createCursorKeys();
        this.analogCursorKeys = this.input.keyboard.addKeys({
            w: Phaser.Input.Keyboard.KeyCodes.W,
            a: Phaser.Input.Keyboard.KeyCodes.A,
            s: Phaser.Input.Keyboard.KeyCodes.S,
            d: Phaser.Input.Keyboard.KeyCodes.D,
            k: Phaser.Input.Keyboard.KeyCodes.K
        })

        //camera
        this.cameras.main.setBounds(0, 0, 800 * 2, 800 * 2);
        this.physics.world.setBounds(0, 0, 800 * 2, 800 * 2);

        // this.add.image(0, 0, map).setOrigin(0);
        // this.add.image(800, 0, map).setOrigin(0).setFlipX(true);
        // this.add.image(0, 800, map).setOrigin(0).setFlipY(true);
        // this.add.image(800, 800, map).setOrigin(0).setFlipX(true).setFlipY(true);


        this.cameras.main.setViewport(20, 0, 270, 150);

        this.cameras.main.startFollow(this.player);

        this.cameras.main.followOffset.set(0, 0);
        
    }

    update() {
        this.moveHeroManager();
        this.dist = Phaser.Math.Distance.Between(this.player.x, this.player.y, this.enemy_goblin.x, this.enemy_goblin.y);
        console.log('dist =', this.dist);
        
    }

    hit(pointer, gameObject) {
        if (this.dist < 20) {
            gameObject.setTexture("dead_enemy");
            gameObject.play("dead_enemy_anim");
        }              
    }

    target() {
        
    }

    moveHeroManager() {
        this.player.body.setVelocity(0);

        if (Phaser.Input.Keyboard.JustDown(this.cursorKeys.right)) {
            this.hero.play("hero_run_anim_right", true);
            this.sword.setScale(0.65, 0.65);
            this.sword.x = this.hero.x + 7;
        }
        if (Phaser.Input.Keyboard.JustUp(this.cursorKeys.right) && !(this.cursorKeys.left.isDown || this.analogCursorKeys.a.isDown || this.cursorKeys.right.isDown || this.analogCursorKeys.d.isDown || this.cursorKeys.up.isDown || this.analogCursorKeys.w.isDown || this.cursorKeys.down.isDown || this.analogCursorKeys.s.isDown)) {
            this.hero.play("hero_idle_anim_right", true);            
        }
        if (Phaser.Input.Keyboard.JustDown(this.cursorKeys.left)) {
            this.hero.play("hero_run_anim_left", true);
            this.sword.setScale(-0.65, 0.65);
            this.sword.x = this.hero.x - 7;         
        }
        if (Phaser.Input.Keyboard.JustUp(this.cursorKeys.left) && !(this.cursorKeys.left.isDown || this.analogCursorKeys.a.isDown || this.cursorKeys.right.isDown || this.analogCursorKeys.d.isDown || this.cursorKeys.up.isDown || this.analogCursorKeys.w.isDown || this.cursorKeys.down.isDown || this.analogCursorKeys.s.isDown)) {
            this.hero.play("hero_idle_anim_left", true);
        } 
        if (Phaser.Input.Keyboard.JustDown(this.cursorKeys.up)) {
            this.hero.play("hero_run_anim_right", true);
            this.sword.setScale(0.65, 0.65);
            this.sword.x = this.hero.x + 7;
        }
        if (Phaser.Input.Keyboard.JustUp(this.cursorKeys.up) && !(this.cursorKeys.left.isDown || this.analogCursorKeys.a.isDown || this.cursorKeys.right.isDown || this.analogCursorKeys.d.isDown || this.cursorKeys.up.isDown || this.analogCursorKeys.w.isDown || this.cursorKeys.down.isDown || this.analogCursorKeys.s.isDown)) {
            this.hero.play("hero_idle_anim_right", true);
        }
        if (Phaser.Input.Keyboard.JustDown(this.cursorKeys.down)) {
            this.hero.play("hero_run_anim_right", true);
            this.sword.setScale(0.65, 0.65);
            this.sword.x = this.hero.x + 7;
        }
        if (Phaser.Input.Keyboard.JustUp(this.cursorKeys.down) && !(this.cursorKeys.left.isDown || this.analogCursorKeys.a.isDown || this.cursorKeys.right.isDown || this.analogCursorKeys.d.isDown || this.cursorKeys.up.isDown || this.analogCursorKeys.w.isDown || this.cursorKeys.down.isDown || this.analogCursorKeys.s.isDown)) {
            this.hero.play("hero_idle_anim_right", true);
        }        
        
        if (Phaser.Input.Keyboard.JustDown(this.analogCursorKeys.w)) {
            this.hero.play("hero_run_anim_right", true);
            this.sword.setScale(0.65, 0.65);
            this.sword.x = this.hero.x + 7;
        } 
        if (Phaser.Input.Keyboard.JustUp(this.analogCursorKeys.w) && !(this.cursorKeys.left.isDown || this.analogCursorKeys.a.isDown || this.cursorKeys.right.isDown || this.analogCursorKeys.d.isDown || this.cursorKeys.up.isDown || this.analogCursorKeys.w.isDown || this.cursorKeys.down.isDown || this.analogCursorKeys.s.isDown)) {
            this.hero.play("hero_idle_anim_right", true);
        } 
        if (Phaser.Input.Keyboard.JustDown(this.analogCursorKeys.a)) {
            this.hero.play("hero_run_anim_left", true);
            this.sword.setScale(-0.65, 0.65);
            this.sword.x = this.hero.x - 7;   
        } 
        if (Phaser.Input.Keyboard.JustUp(this.analogCursorKeys.a) && !(this.cursorKeys.left.isDown || this.analogCursorKeys.a.isDown || this.cursorKeys.right.isDown || this.analogCursorKeys.d.isDown || this.cursorKeys.up.isDown || this.analogCursorKeys.w.isDown || this.cursorKeys.down.isDown || this.analogCursorKeys.s.isDown)) {
            this.hero.play("hero_idle_anim_left", true);
        } 
        if (Phaser.Input.Keyboard.JustDown(this.analogCursorKeys.s)) {
            this.hero.play("hero_run_anim_right", true);
            this.sword.setScale(0.65, 0.65);
            this.sword.x = this.hero.x + 7;   
        } 
        if (Phaser.Input.Keyboard.JustUp(this.analogCursorKeys.s) && !(this.cursorKeys.left.isDown || this.analogCursorKeys.a.isDown || this.cursorKeys.right.isDown || this.analogCursorKeys.d.isDown || this.cursorKeys.up.isDown || this.analogCursorKeys.w.isDown || this.cursorKeys.down.isDown || this.analogCursorKeys.s.isDown)) {
            this.hero.play("hero_idle_anim_right", true);
        } 
        if (Phaser.Input.Keyboard.JustDown(this.analogCursorKeys.d)) {
            this.hero.play("hero_run_anim_right", true);
            this.sword.setScale(0.65, 0.65);
            this.sword.x = this.hero.x + 7;
        }
        if (Phaser.Input.Keyboard.JustUp(this.analogCursorKeys.d) && !(this.cursorKeys.left.isDown || this.analogCursorKeys.a.isDown || this.cursorKeys.right.isDown || this.analogCursorKeys.d.isDown || this.cursorKeys.up.isDown || this.analogCursorKeys.w.isDown || this.cursorKeys.down.isDown || this.analogCursorKeys.s.isDown)) {
            this.hero.play("hero_idle_anim-right", true);
        }

        if (this.cursorKeys.left.isDown || this.analogCursorKeys.a.isDown) {
            
            this.player.body.setVelocityX(-70);
        } else if (this.cursorKeys.right.isDown || this.analogCursorKeys.d.isDown) {
            
        
            this.player.body.setVelocityX(70);
        }

        if (this.cursorKeys.up.isDown || this.analogCursorKeys.w.isDown) {
            this.player.body.setVelocityY(-70);
        } else if (this.cursorKeys.down.isDown || this.analogCursorKeys.s.isDown) {
            this.player.body.setVelocityY(70);
        }
    }
}