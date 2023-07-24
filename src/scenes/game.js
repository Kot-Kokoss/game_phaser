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
        
        //goblin
        this.goblin = this.add.sprite(0, 0, "goblin_idle_right");
        this.goblin_knife = this.add.image(8, 0, "goblin_knife");
        this.goblin_knife.setScale(1);

        this.goblin.play("goblin_idle_anim_right");

        this.enemy_goblin = this.add.container(250, 500, [this.goblin, this.goblin_knife]);
        this.enemy_goblin.setSize(16, 16);
        this.physics.world.enable(this.enemy_goblin);

        this.goblin = this.add.sprite(0, 0, "goblin_idle_right");
        this.goblin_knife = this.add.image(8, 0, "goblin_knife");
        this.goblin_knife.setScale(1);

        this.goblin.play("goblin_idle_anim_right");

        this.enemy_goblin = this.add.container(300, 500, [this.goblin, this.goblin_knife]);
        this.enemy_goblin.setSize(16, 16);
        this.physics.world.enable(this.enemy_goblin);
        //slime
        this.slime = this.add.sprite(0, 0, "slime_idle_right");
        
        this.slime.play("slime_idle_anim_right");

        this.enemy_slime = this.add.container(500, 450, [this.slime]);
        this.enemy_slime.setSize(16, 16);
        this.physics.world.enable(this.enemy_slime);
        //fly
        this.fly = this.add.sprite(0, 0, "fly_right");
        
        this.fly.play("fly_anim_right");

        this.enemy_fly = this.add.container(530, 510, [this.fly]);
        this.enemy_fly.setSize(16, 16);
        this.physics.world.enable(this.enemy_fly);

        this.fly = this.add.sprite(0, 0, "fly_right");
        
        this.fly.play("fly_anim_right");

        this.enemy_fly = this.add.container(550, 410, [this.fly]);
        this.enemy_fly.setSize(16, 16);
        this.physics.world.enable(this.enemy_fly);
        //boss demon
        this.demon = this.add.sprite(0, 0, "demon_idle_right");
        
        this.demon.play("demon_idle_anim_right");

        this.enemy_demon = this.add.container(500, 235, [this.demon]);
        this.enemy_demon.setSize(32, 36);
        this.physics.world.enable(this.enemy_demon);
        //player
        this.hero = this.physics.add.sprite(0, 0, "hero_idle_right");
        this.sword = this.add.image(7, 0, "sword");
        this.sword.setScale(0.65);

        this.hero.play("hero_idle_anim_right");

        this.player = this.add.container(260, 320, [this.hero, this.sword]);
        this.player.setSize(16, 16);
        this.physics.world.enable(this.player);
        
        const walls = map.createLayer('Walls', tileset);
        const decor = map.createLayer('Decor', tileset);

        walls.setCollisionByProperty({ collides: true });
        decor.setCollisionByProperty({ collides: true });
        ground.setCollisionByProperty({ collides: true });

        const ColliderObject = [this.player,  this.enemy_goblin, this.enemy_slime, this.enemy_fly, this.enemy_demon];

        for (let i = 0; i != ColliderObject.length; i++) {
            this.physics.add.collider(ColliderObject[i], walls);
            this.physics.add.collider(ColliderObject[i], decor);
            this.physics.add.collider(ColliderObject[i], ground);
        }

        const ColliderObjectEnemy = [this.enemy_goblin, this.enemy_slime, this.enemy_fly, this.enemy_demon];

        for (let i = 0; i != ColliderObjectEnemy.length; i++) {
            this.physics.add.collider(ColliderObjectEnemy[i], this.player);
        }
        
        //torch decoration
        this.torch = this.add.sprite(320, 279, "torch");
        this.torch.play("torch_anim");
        this.torch = this.add.sprite(210, 279, "torch");
        this.torch.play("torch_anim");
        this.torch = this.add.sprite(312, 423, "torch");
        this.torch.play("torch_anim");
        this.torch = this.add.sprite(210, 423, "torch");
        this.torch.play("torch_anim");
        this.torch = this.add.sprite(570, 391, "torch");
        this.torch.play("torch_anim");
        this.torch = this.add.sprite(440, 391, "torch");
        this.torch.play("torch_anim");
        this.torch = this.add.sprite(409, 135, "torch");
        this.torch.play("torch_anim");
        this.torch = this.add.sprite(536, 135, "torch");
        this.torch.play("torch_anim");
        this.torch = this.add.sprite(584, 135, "torch");
        this.torch.play("torch_anim");
        this.torch = this.add.sprite(454, 71, "torch");
        this.torch.play("torch_anim");
        this.torch = this.add.sprite(406, 71, "torch");
        this.torch.play("torch_anim");
        this.torch = this.add.sprite(358, 71, "torch");
        this.torch.play("torch_anim");
        this.torch = this.add.sprite(278, 103, "torch");
        this.torch.play("torch_anim");
        this.torch = this.add.sprite(202, 103, "torch");
        this.torch.play("torch_anim");
        this.torch = this.add.sprite(136, 71, "torch");
        this.torch.play("torch_anim");
        this.torch = this.add.sprite(104, 71, "torch");
        this.torch.play("torch_anim");
        this.torch = this.add.sprite(72, 71, "torch");
        this.torch.play("torch_anim");

        //text
        let graphics = this.add.graphics();
        graphics.fillStyle(0x000000, 1);
        graphics.fillRect(140, 250, 200, 500);
        const controls = this.add.text(140, 250, '  Use "WASD" or\n  "ARROWS" to move\n  Use "K" to hit\n\n           OK!')
        controls.setMask(graphics.createGeometryMask());
        controls.setDepth(1);

        controls.setInteractive({ useHandCursor: true });
        this.input.on('pointerdown', function (pointer)
        {
            controls.destroy();
            graphics.destroy();

        }, this);

        const winGame = this.add.text(32, 75, ' Congratulations,\n you have completed\n     the game!!!');
        winGame.setTint(0xff00ff, 0xffff00, 0x0000ff, 0xff0000);

        //mov_key
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
        this.cameras.main.setViewport(20, -20, 270, 200);
        this.cameras.main.startFollow(this.player);
        this.cameras.main.followOffset.set(0, 0);

        //move_enemy
        this.timedEvent = this.time.addEvent({ delay: 600, callback: this.moveEnemyManager, callbackScope: this, loop: true });
    }

    update() {
        this.movePlayerManager();
        //hit
        if (Phaser.Input.Keyboard.JustDown(this.analogCursorKeys.k)) {
            
            if (this.sword.x < this.hero.x) {
                this.slash = this.add.sprite(this.hero.body.x - 10, this.hero.body.y + 10, "slash");
                this.slash.setScale(-1, 1);  
                              
            } else {
                this.slash = this.add.sprite(this.hero.body.x + 26, this.hero.body.y + 10, "slash");  
            }            
            this.slash.play("slash_anim", true);
            if ((Math.abs(this.slash.x - this.enemy_goblin.x) < 21) && (Math.abs(this.slash.y - this.enemy_goblin.y) < 21)) {
                console.log('death!!');
                this.death = this.add.sprite(this.enemy_goblin.x, this.enemy_goblin.y, "dead_enemy");
                this.enemy_goblin.destroy();
                this.enemy_goblin.x = undefined;
                this.enemy_goblin.y = undefined;
                this.death.play("dead_enemy_anim", true);
                this.death.on('animationcomplete', () => {
                    this.death.destroy();
                    });
                this.timedEvent.remove(); 
            }
        }

        this.dist = Phaser.Math.Distance.Between(this.player.x, this.player.y, this.enemy_goblin.x, this.enemy_goblin.y);
        console.log('dist =', this.dist);
        console.log(this.player.x);
        console.log(this.player.y);

    }

    moveEnemyManager() {
        // const enemyContainer = [this.enemy_goblin, this.enemy_slime, this.enemy_fly, this.enemy_demon];
        // const enemy = [this.goblin, this.slime, this.fly, this.demon];
        // const enemyAnimsIdleRight = ["goblin_idle_anim_right", "slime_idle_anim_right", "fly_anim_right", "demon_idle_anim_right"];
        // const enemyAnimsIdleLeft = ["goblin_idle_anim_left", "slime_idle_anim_left", "fly_anim_left", "demon_idle_anim_left"];
        // const enemyAnimsRunRight = ["goblin_run_anim_right", "slime_run_anim_right", "fly_anim_right", "demon_run_anim_right"];
        // const enemyAnimsRunLeft = ["goblin_run_anim_left", "slime_run_anim_left", "fly_anim_left", "demon_run_anim_left"];
        // for (let i; i != enemyContainer.length; i++){
            
                  
        // }
        //follow player
        if (this.dist < 50) {
    
            //move right
            if (this.enemy_goblin.x < this.player.x) {
                this.enemy_goblin.body.setVelocityX(50);
                this.goblin.play("goblin_run_anim_right", true);
                if (this.goblin === this.goblin) {
                    this.goblin_knife.setScale(1, 1); 
                    this.goblin_knife.x = this.goblin.x + 8;
                }                    
            }
            //move left
            if (this.enemy_goblin.x > this.player.x) {
                this.enemy_goblin.body.setVelocityX(-50);
                this.goblin.play("goblin_run_anim_left", true);
                this.goblin_knife.setScale(-1, 1); 
                this.goblin_knife.x = this.goblin.x - 8;
            }
            //move down
            if (this.enemy_goblin.y < this.player.y) {
                this.enemy_goblin.body.setVelocityY(50);
                if(this.goblin.anims.isPlaying && this.goblin.anims.currentAnim.key === "goblin_idle_anim_right") {
                    this.goblin.play("goblin_run_anim_right", true);
                    this.goblin_knife.setScale(1, 1);
                    this.goblin_knife.x = this.goblin.x + 8;
                } else if (this.goblin.anims.isPlaying && this.goblin.anims.currentAnim.key === "goblin_idle_anim_left") {
                    this.goblin.play("goblin_run_anim_left", true);
                    this.goblin_knife.setScale(-1, 1);
                    this.goblin_knife.x = this.goblin.x - 8;
                }
            }
            //move up
            if (this.enemy_goblin.y > this.player.y) {
                this.enemy_goblin.body.setVelocityY(-50);
                if(this.goblin.anims.isPlaying && this.goblin.anims.currentAnim.key === "goblin_idle_anim_right") {
                    this.goblin.play("goblin_run_anim_right", true);
                    this.goblin_knife.setScale(1, 1);
                    this.goblin_knife.x = this.goblin.x + 8;
                } else if (this.goblin.anims.isPlaying && this.goblin.anims.currentAnim.key === "goblin_idle_anim_left") {
                    this.goblin.play("goblin_run_anim_left", true);
                    this.goblin_knife.setScale(-1, 1);
                    this.goblin_knife.x = this.goblin.x - 8;
                }
            }
            

        } else {
            //wandering
            this.enemy_goblin.body.setVelocity(0);
            let course = Math.floor(Math.random() * (Math.floor(15) - Math.ceil(0) + 1)) + Math.ceil(0);

            //move left
            if (course === 0) {
                this.enemy_goblin.body.setVelocityX(-30);
                this.goblin.play("goblin_run_anim_left", true);
                this.goblin_knife.setScale(-1, 1);
                this.goblin_knife.x = this.goblin.x - 8;
            }
            //move right
            if (course === 1) {
                this.enemy_goblin.body.setVelocityX(30);
                this.goblin.play("goblin_run_anim_right", true);
                this.goblin_knife.setScale(1, 1); 
                this.goblin_knife.x = this.goblin.x + 8;
            }
            //move up
            if (course === 2) {
                this.enemy_goblin.body.setVelocityY(-30);
                if(this.goblin.anims.isPlaying && this.goblin.anims.currentAnim.key === "goblin_idle_anim_right") {
                    this.goblin.play("goblin_run_anim_right", true);
                    this.goblin_knife.setScale(1, 1);
                    this.goblin_knife.x = this.goblin.x + 8;
                } else if (this.goblin.anims.isPlaying && this.goblin.anims.currentAnim.key === "goblin_idle_anim_left") {
                    this.goblin.play("goblin_run_anim_left", true);
                    this.goblin_knife.setScale(-1, 1);
                    this.goblin_knife.x = this.goblin.x - 8;
                }
            }
            //move down
            if (course === 3) {
                this.enemy_goblin.body.setVelocityY(30);
                if(this.goblin.anims.isPlaying && this.goblin.anims.currentAnim.key === "goblin_idle_anim_right") {
                    this.goblin.play("goblin_run_anim_right", true);
                    this.goblin_knife.setScale(1, 1);
                    this.goblin_knife.x = this.goblin.x + 8;
                } else if (this.goblin.anims.isPlaying && this.goblin.anims.currentAnim.key === "goblin_idle_anim_left") {
                    this.goblin.play("goblin_run_anim_left", true);
                    this.goblin_knife.setScale(-1, 1);
                    this.goblin_knife.x = this.goblin.x - 8;
                }
            }
            if (course > 4) {
                this.enemy_goblin.body.setVelocity(0);
                if(this.goblin.anims.isPlaying && this.goblin.anims.currentAnim.key === "goblin_run_anim_right") {
                    this.goblin.play("goblin_idle_anim_right", true);
                    this.goblin_knife.setScale(1, 1);
                    this.goblin_knife.x = this.goblin.x + 8;
                } else if (this.goblin.anims.isPlaying && this.goblin.anims.currentAnim.key === "goblin_run_anim_left") {
                    this.goblin.play("goblin_idle_anim_left", true);
                    this.goblin_knife.setScale(-1, 1);
                    this.goblin_knife.x = this.goblin.x - 8;
                }
            }
        } 
    }
        

    movePlayerManager() {
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
            if(this.hero.anims.isPlaying && this.hero.anims.currentAnim.key === "hero_idle_anim_right") {
                this.hero.play("hero_run_anim_right", true);
                this.sword.setScale(0.65, 0.65);
                this.sword.x = this.hero.x + 7;
            } else if (this.hero.anims.isPlaying && this.hero.anims.currentAnim.key === "hero_idle_anim_left") {
                this.hero.play("hero_run_anim_left", true);
                this.sword.setScale(-0.65, 0.65);
                this.sword.x = this.hero.x - 7;
            }            
        }
        if (Phaser.Input.Keyboard.JustUp(this.cursorKeys.up) && !(this.cursorKeys.left.isDown || this.analogCursorKeys.a.isDown || this.cursorKeys.right.isDown || this.analogCursorKeys.d.isDown || this.cursorKeys.up.isDown || this.analogCursorKeys.w.isDown || this.cursorKeys.down.isDown || this.analogCursorKeys.s.isDown)) {
            if(this.hero.anims.isPlaying && this.hero.anims.currentAnim.key === "hero_run_anim_right") {
                this.hero.play("hero_idle_anim_right", true);
            } else if (this.hero.anims.isPlaying && this.hero.anims.currentAnim.key === "hero_run_anim_left") {
                this.hero.play("hero_idle_anim_left", true);
            }            
        }
        if (Phaser.Input.Keyboard.JustDown(this.cursorKeys.down)) {
            if(this.hero.anims.isPlaying && this.hero.anims.currentAnim.key === "hero_idle_anim_right") {
                this.hero.play("hero_run_anim_right", true);
                this.sword.setScale(0.65, 0.65);
                this.sword.x = this.hero.x + 7;
            } else if (this.hero.anims.isPlaying && this.hero.anims.currentAnim.key === "hero_idle_anim_left") {
                this.hero.play("hero_run_anim_left", true);
                this.sword.setScale(-0.65, 0.65);
                this.sword.x = this.hero.x - 7;
            }  
        }
        if (Phaser.Input.Keyboard.JustUp(this.cursorKeys.down) && !(this.cursorKeys.left.isDown || this.analogCursorKeys.a.isDown || this.cursorKeys.right.isDown || this.analogCursorKeys.d.isDown || this.cursorKeys.up.isDown || this.analogCursorKeys.w.isDown || this.cursorKeys.down.isDown || this.analogCursorKeys.s.isDown)) {
            if(this.hero.anims.isPlaying && this.hero.anims.currentAnim.key === "hero_run_anim_right") {
                this.hero.play("hero_idle_anim_right", true);
            } else if (this.hero.anims.isPlaying && this.hero.anims.currentAnim.key === "hero_run_anim_left") {
                this.hero.play("hero_idle_anim_left", true);
            }
        }        
        
        if (Phaser.Input.Keyboard.JustDown(this.analogCursorKeys.w)) {
            if(this.hero.anims.isPlaying && this.hero.anims.currentAnim.key === "hero_idle_anim_right") {
                this.hero.play("hero_run_anim_right", true);
                this.sword.setScale(0.65, 0.65);
                this.sword.x = this.hero.x + 7;
            } else if (this.hero.anims.isPlaying && this.hero.anims.currentAnim.key === "hero_idle_anim_left") {
                this.hero.play("hero_run_anim_left", true);
                this.sword.setScale(-0.65, 0.65);
                this.sword.x = this.hero.x - 7;
            } 
        } 
        if (Phaser.Input.Keyboard.JustUp(this.analogCursorKeys.w) && !(this.cursorKeys.left.isDown || this.analogCursorKeys.a.isDown || this.cursorKeys.right.isDown || this.analogCursorKeys.d.isDown || this.cursorKeys.up.isDown || this.analogCursorKeys.w.isDown || this.cursorKeys.down.isDown || this.analogCursorKeys.s.isDown)) {
            if(this.hero.anims.isPlaying && this.hero.anims.currentAnim.key === "hero_run_anim_right") {
                this.hero.play("hero_idle_anim_right", true);
            } else if (this.hero.anims.isPlaying && this.hero.anims.currentAnim.key === "hero_run_anim_left") {
                this.hero.play("hero_idle_anim_left", true);
            }
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
            if(this.hero.anims.isPlaying && this.hero.anims.currentAnim.key === "hero_idle_anim_right") {
                this.hero.play("hero_run_anim_right", true);
                this.sword.setScale(0.65, 0.65);
                this.sword.x = this.hero.x + 7;
            } else if (this.hero.anims.isPlaying && this.hero.anims.currentAnim.key === "hero_idle_anim_left") {
                this.hero.play("hero_run_anim_left", true);
                this.sword.setScale(-0.65, 0.65);
                this.sword.x = this.hero.x - 7;
            }  
        } 
        if (Phaser.Input.Keyboard.JustUp(this.analogCursorKeys.s) && !(this.cursorKeys.left.isDown || this.analogCursorKeys.a.isDown || this.cursorKeys.right.isDown || this.analogCursorKeys.d.isDown || this.cursorKeys.up.isDown || this.analogCursorKeys.w.isDown || this.cursorKeys.down.isDown || this.analogCursorKeys.s.isDown)) {
            if(this.hero.anims.isPlaying && this.hero.anims.currentAnim.key === "hero_run_anim_right") {
                this.hero.play("hero_idle_anim_right", true);
            } else if (this.hero.anims.isPlaying && this.hero.anims.currentAnim.key === "hero_run_anim_left") {
                this.hero.play("hero_idle_anim_left", true);
            }
        } 
        if (Phaser.Input.Keyboard.JustDown(this.analogCursorKeys.d)) {
            this.hero.play("hero_run_anim_right", true);
            this.sword.setScale(0.65, 0.65);
            this.sword.x = this.hero.x + 7;
        }
        if (Phaser.Input.Keyboard.JustUp(this.analogCursorKeys.d) && !(this.cursorKeys.left.isDown || this.analogCursorKeys.a.isDown || this.cursorKeys.right.isDown || this.analogCursorKeys.d.isDown || this.cursorKeys.up.isDown || this.analogCursorKeys.w.isDown || this.cursorKeys.down.isDown || this.analogCursorKeys.s.isDown)) {
            this.hero.play("hero_idle_anim_right", true);
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