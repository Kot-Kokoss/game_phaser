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
        this.enemy_goblin.helth = 3;

        //slime
        this.slime = this.add.sprite(0, 0, "slime_idle_right");
        
        this.slime.play("slime_idle_anim_right");

        this.enemy_slime = this.add.container(500, 450, [this.slime]);
        this.enemy_slime.setSize(16, 16);
        this.physics.world.enable(this.enemy_slime);
        this.enemy_slime.helth = 1;
        //fly
        this.fly = this.add.sprite(0, 0, "fly_right");
        
        this.fly.play("fly_anim_right");

        this.enemy_fly = this.add.container(530, 510, [this.fly]);
        this.enemy_fly.setSize(16, 16);
        this.physics.world.enable(this.enemy_fly);

        this.enemy_fly.helth = 2;

        //boss demon
        this.demon = this.add.sprite(0, 0, "demon_idle_right");
        
        this.demon.play("demon_idle_anim_right");

        this.enemy_demon = this.add.container(500, 235, [this.demon]);
        this.enemy_demon.setSize(32, 36);
        this.physics.world.enable(this.enemy_demon);
        this.enemy_demon.helth = 10;

        //player
        this.hero = this.physics.add.sprite(0, 0, "hero_idle_right");
        this.sword = this.add.image(7, 0, "sword");
        this.sword.setScale(0.65);

        this.hero.play("hero_idle_anim_right");

        this.player = this.add.container(260, 320, [this.hero, this.sword]);
        this.player.setSize(16, 16);
        this.physics.world.enable(this.player);
        this.player.helth = 4;

        //collision
        
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
        graphics.setDepth(2);
        const controls = this.add.text(140, 250, '  Use "WASD" or\n  "ARROWS" to move\n  Use "K" to hit\n\n           OK!')
        controls.setMask(graphics.createGeometryMask());
        controls.setDepth(3);

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
        this.timedEventGoblin = this.time.addEvent({ delay: 600, callback: this.moveEnemyGoblin, callbackScope: this, loop: true });
        this.timedEventSlime = this.time.addEvent({ delay: 600, callback: this.moveEnemySlime, callbackScope: this, loop: true });
        this.timedEventFly = this.time.addEvent({ delay: 600, callback: this.moveEnemyFly, callbackScope: this, loop: true });
        this.timedEventDemon = this.time.addEvent({ delay: 600, callback: this.moveEnemyDemon, callbackScope: this, loop: true });

        //hit_enemy
        this.timedEventGoblinHit = this.time.addEvent({ delay: 600, callback: this.GoblinHitPlayer, callbackScope: this, loop: true });
        this.timedEventSlimeHit = this.time.addEvent({ delay: 600, callback: this.SlimeHitPlayer, callbackScope: this, loop: true });
        this.timedEventFlyHit = this.time.addEvent({ delay: 600, callback: this.FlyHitPlayer, callbackScope: this, loop: true });
        this.timedEventDemonHit = this.time.addEvent({ delay: 600, callback: this.DemonHitPlayer, callbackScope: this, loop: true });

        //helthBar
        this.helthBar = this.add.image(this.player.x - 80, this.player.y - 60,"ui_helth_4_bank");
        this.physics.world.enable(this.helthBar);
        this.helthBar.setDepth(1);
    }

    update() {
        this.movePlayerManager();
        this.helthUiManager()

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
                if (this.enemy_goblin.helth > 1) {
                    console.log('hit!!');
                    this.hit = this.add.sprite(this.enemy_goblin.x, this.enemy_goblin.y, "hit");
                    this.hit.play("hit_anim", true);
                    this.enemy_goblin.helth -= 1;
                } else {
                    console.log('death!!');
                    this.death = this.add.sprite(this.enemy_goblin.x, this.enemy_goblin.y, "dead_enemy");
                    this.enemy_goblin.destroy();
                    this.enemy_goblin.x = undefined;
                    this.enemy_goblin.y = undefined;
                    this.death.play("dead_enemy_anim", true);                    
                    this.death.on('animationcomplete', () => {
                        this.death.destroy();
                        });
                    this.timedEventGoblin.remove(); 
                }
            }
            if ((Math.abs(this.slash.x - this.enemy_slime.x) < 21) && (Math.abs(this.slash.y - this.enemy_slime.y) < 21)) {
                if (this.enemy_slime.helth > 1) {
                    console.log('hit!!');
                    this.hit = this.add.sprite(this.enemy_slime.x, this.enemy_slime.y, "hit");
                    this.hit.play("hit_anim", true);
                    this.enemy_slime.helth -= 1;
                } else {
                    console.log('death!!');
                    this.death = this.add.sprite(this.enemy_slime.x, this.enemy_slime.y, "dead_enemy");
                    this.enemy_slime.destroy();
                    this.enemy_slime.x = undefined;
                    this.enemy_slime.y = undefined;
                    this.death.play("dead_enemy_anim", true);                    
                    this.death.on('animationcomplete', () => {
                        this.death.destroy();
                        });
                    this.timedEventSlime.remove(); 
                }
            }
            if ((Math.abs(this.slash.x - this.enemy_fly.x) < 21) && (Math.abs(this.slash.y - this.enemy_fly.y) < 21)) {
                if (this.enemy_fly.helth > 1) {
                    console.log('hit!!');
                    this.hit = this.add.sprite(this.enemy_fly.x, this.enemy_fly.y, "hit");
                    this.hit.play("hit_anim", true);
                    this.enemy_fly.helth -= 1;
                } else {
                    console.log('death!!');
                    this.death = this.add.sprite(this.enemy_fly.x, this.enemy_fly.y, "dead_enemy");
                    this.enemy_fly.destroy();
                    this.enemy_fly.x = undefined;
                    this.enemy_fly.y = undefined;
                    this.death.play("dead_enemy_anim", true);                    
                    this.death.on('animationcomplete', () => {
                        this.death.destroy();
                        });
                    this.timedEventFly.remove(); 
                }
            }
            if ((Math.abs(this.slash.x - this.enemy_demon.x) < 25) && (Math.abs(this.slash.y - this.enemy_demon.y) < 25)) {
                if (this.enemy_demon.helth > 1) {
                    console.log('hit!!');
                    this.hit = this.add.sprite(this.enemy_demon.x, this.enemy_demon.y, "hit");
                    this.hit.play("hit_anim", true);
                    this.enemy_demon.helth -= 1;
                } else {
                    console.log('death!!');
                    this.death = this.add.sprite(this.enemy_demon.x, this.enemy_demon.y, "dead_enemy");
                    this.enemy_demon.destroy();
                    this.enemy_demon.x = undefined;
                    this.enemy_demon.y = undefined;
                    this.death.play("dead_enemy_anim", true);                    
                    this.death.on('animationcomplete', () => {
                        this.death.destroy();
                        });
                    this.timedEventDemon.remove(); 
                }           
            }
        }

        this.distGoblin = Phaser.Math.Distance.Between(this.player.x, this.player.y, this.enemy_goblin.x, this.enemy_goblin.y);
        this.distSlime = Phaser.Math.Distance.Between(this.player.x, this.player.y, this.enemy_slime.x, this.enemy_slime.y);
        this.distFly = Phaser.Math.Distance.Between(this.player.x, this.player.y, this.enemy_fly.x, this.enemy_fly.y);
        this.distDemon = Phaser.Math.Distance.Between(this.player.x, this.player.y, this.enemy_demon.x, this.enemy_demon.y);

    }

    GoblinHitPlayer() {
        //hit player
        if (this.distGoblin < 20) {
            if (this.player.helth > 1) {
                console.log('hitPLAYER!!');
                this.hit = this.add.sprite(this.player.x, this.player.y, "hit");
                this.hit.play("hit_anim", true);
                this.player.helth -= 1;
            } else {
                console.log('deathPLAYER!!');
                this.player.helth = 4;
                this.player.x = 260;
                this.player.y = 320;
                let graphicsDeath = this.add.graphics();
                graphicsDeath.fillStyle(0x000000, 1);
                graphicsDeath.fillRect(140, 250, 200, 500);
                graphicsDeath.setDepth(2);
                const deathMessage = this.add.text(140, 250, '  You died!!!\n\n           OK!')
                deathMessage.setMask(graphicsDeath.createGeometryMask());
                deathMessage.setDepth(3);

                deathMessage.setInteractive({ useHandCursor: true });
                this.input.on('pointerdown', function (pointer)
                {
                    deathMessage.destroy();
                    graphicsDeath.destroy();

                }, this); 
                }
        }
    }
    SlimeHitPlayer() {
        //hit player
        if (this.distSlime < 20) {
            if (this.player.helth > 1) {
                console.log('hitPLAYER!!');
                this.hit = this.add.sprite(this.player.x, this.player.y, "hit");
                this.hit.play("hit_anim", true);
                this.player.helth -= 1;
            } else {
                console.log('deathPLAYER!!');
                this.player.helth = 4;
                this.player.x = 260;
                this.player.y = 320;
                let graphicsDeath = this.add.graphics();
                graphicsDeath.fillStyle(0x000000, 1);
                graphicsDeath.fillRect(140, 250, 200, 500);
                graphicsDeath.setDepth(2);
                const deathMessage = this.add.text(140, 250, '  You died!!!\n\n           OK!')
                deathMessage.setMask(graphicsDeath.createGeometryMask());
                deathMessage.setDepth(3);

                deathMessage.setInteractive({ useHandCursor: true });
                this.input.on('pointerdown', function (pointer)
                {
                    deathMessage.destroy();
                    graphicsDeath.destroy();

                }, this); 
                }
        }
    }
    FlyHitPlayer() {
        //hit player
        if (this.distFly < 20) {
            if (this.player.helth > 1) {
                console.log('hitPLAYER!!');
                this.hit = this.add.sprite(this.player.x, this.player.y, "hit");
                this.hit.play("hit_anim", true);
                this.player.helth -= 1;
            } else {
                console.log('deathPLAYER!!');
                this.player.helth = 4;
                this.player.x = 260;
                this.player.y = 320;
                let graphicsDeath = this.add.graphics();
                graphicsDeath.fillStyle(0x000000, 1);
                graphicsDeath.fillRect(140, 250, 200, 500);
                graphicsDeath.setDepth(2);
                const deathMessage = this.add.text(140, 250, '  You died!!!\n\n           OK!')
                deathMessage.setMask(graphicsDeath.createGeometryMask());
                deathMessage.setDepth(3);

                deathMessage.setInteractive({ useHandCursor: true });
                this.input.on('pointerdown', function (pointer)
                {
                    deathMessage.destroy();
                    graphicsDeath.destroy();

                }, this); 
                }
        }
    }
    DemonHitPlayer() {
        //hit player
        if (this.distDemon < 20) {
            if (this.player.helth > 1) {
                console.log('hitPLAYER!!');
                this.hit = this.add.sprite(this.player.x, this.player.y, "hit");
                this.hit.play("hit_anim", true);
                this.player.helth -= 1;
            } else {
                console.log('deathPLAYER!!');
                this.player.helth = 4;
                this.player.x = 260;
                this.player.y = 320;
                let graphicsDeath = this.add.graphics();
                graphicsDeath.fillStyle(0x000000, 1);
                graphicsDeath.fillRect(140, 250, 200, 500);
                graphicsDeath.setDepth(2);
                const deathMessage = this.add.text(140, 250, '  You died!!!\n\n           OK!')
                deathMessage.setMask(graphicsDeath.createGeometryMask());
                deathMessage.setDepth(3);

                deathMessage.setInteractive({ useHandCursor: true });
                this.input.on('pointerdown', function (pointer)
                {
                    deathMessage.destroy();
                    graphicsDeath.destroy();

                }, this); 
                }
        }
    }          
    moveEnemyGoblin() {
        
        //follow player
        if (this.distGoblin < 50) {
    
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
    moveEnemySlime() {
        //follow player
        if (this.distSlime < 50) {
    
            //move right
            if (this.enemy_slime.x < this.player.x) {
                this.enemy_slime.body.setVelocityX(50);
                this.slime.play("slime_run_anim_right", true);                  
            }
            //move left
            if (this.enemy_slime.x > this.player.x) {
                this.enemy_slime.body.setVelocityX(-50);
                this.slime.play("slime_run_anim_left", true);
            }
            //move down
            if (this.enemy_slime.y < this.player.y) {
                this.enemy_slime.body.setVelocityY(50);
                if(this.slime.anims.isPlaying && this.slime.anims.currentAnim.key === "slime_idle_anim_right") {
                    this.slime.play("slime_run_anim_right", true);
                } else if (this.slime.anims.isPlaying && this.slime.anims.currentAnim.key === "slime_idle_anim_left") {
                    this.slime.play("slime_run_anim_left", true);
                }
            }
            //move up
            if (this.enemy_slime.y > this.player.y) {
                this.enemy_slime.body.setVelocityY(-50);
                if(this.slime.anims.isPlaying && this.slime.anims.currentAnim.key === "slime_idle_anim_right") {
                    this.slime.play("slime_run_anim_right", true);
                } else if (this.slime.anims.isPlaying && this.slime.anims.currentAnim.key === "slime_idle_anim_left") {
                    this.slime.play("slime_run_anim_left", true);
                }
            }
            

        } else {
            //wandering
            this.enemy_slime.body.setVelocity(0);
            let course = Math.floor(Math.random() * (Math.floor(15) - Math.ceil(0) + 1)) + Math.ceil(0);

            //move left
            if (course === 0) {
                this.enemy_slime.body.setVelocityX(-30);
                this.slime.play("slime_run_anim_left", true);
            }
            //move right
            if (course === 1) {
                this.enemy_slime.body.setVelocityX(30);
                this.slime.play("slime_run_anim_right", true);
                
            }
            //move up
            if (course === 2) {
                this.enemy_slime.body.setVelocityY(-30);
                if(this.slime.anims.isPlaying && this.slime.anims.currentAnim.key === "slime_idle_anim_right") {
                    this.slime.play("slime_run_anim_right", true);
                } else if (this.slime.anims.isPlaying && this.slime.anims.currentAnim.key === "slime_idle_anim_left") {
                    this.slime.play("slime_run_anim_left", true);
                }
            }
            //move down
            if (course === 3) {
                this.enemy_slime.body.setVelocityY(30);
                if(this.slime.anims.isPlaying && this.slime.anims.currentAnim.key === "slime_idle_anim_right") {
                    this.slime.play("slime_run_anim_right", true);
                } else if (this.slime.anims.isPlaying && this.slime.anims.currentAnim.key === "slime_idle_anim_left") {
                    this.slime.play("slime_run_anim_left", true);
                }
            }
            if (course > 4) {
                this.enemy_slime.body.setVelocity(0);
                if(this.slime.anims.isPlaying && this.slime.anims.currentAnim.key === "slime_run_anim_right") {
                    this.slime.play("slime_idle_anim_right", true);
                } else if (this.slime.anims.isPlaying && this.slime.anims.currentAnim.key === "slime_run_anim_left") {
                    this.slime.play("slime_idle_anim_left", true);
                }
            }
        } 
    }
    moveEnemyFly() {
        //follow player
        if (this.distFly < 50) {
    
            //move right
            if (this.enemy_fly.x < this.player.x) {
                this.enemy_fly.body.setVelocityX(50);
                this.fly.play("fly_anim_right", true);                  
            }
            //move left
            if (this.enemy_fly.x > this.player.x) {
                this.enemy_fly.body.setVelocityX(-50);
                this.fly.play("fly_anim_left", true);
            }
            //move down
            if (this.enemy_fly.y < this.player.y) {
                this.enemy_fly.body.setVelocityY(50);
                if(this.fly.anims.isPlaying && this.fly.anims.currentAnim.key === "fly_anim_right") {
                    this.fly.play("fly_anim_right", true);
                } else if (this.fly.anims.isPlaying && this.fly.anims.currentAnim.key === "fly_anim_left") {
                    this.fly.play("fly_anim_left", true);
                }
            }
            //move up
            if (this.enemy_fly.y > this.player.y) {
                this.enemy_fly.body.setVelocityY(-50);
                if(this.fly.anims.isPlaying && this.fly.anims.currentAnim.key === "fly_anim_right") {
                    this.fly.play("fly_anim_right", true);
                } else if (this.fly.anims.isPlaying && this.fly.anims.currentAnim.key === "fly_anim_left") {
                    this.fly.play("fly_anim_left", true);
                }
            }
            

        } else {
            //wandering
            this.enemy_fly.body.setVelocity(0);
            let course = Math.floor(Math.random() * (Math.floor(15) - Math.ceil(0) + 1)) + Math.ceil(0);

            //move left
            if (course === 0) {
                this.enemy_fly.body.setVelocityX(-30);
                this.fly.play("fly_anim_left", true);
            }
            //move right
            if (course === 1) {
                this.enemy_fly.body.setVelocityX(30);
                this.fly.play("fly_anim_right", true);
                
            }
            //move up
            if (course === 2) {
                this.enemy_fly.body.setVelocityY(-30);
                if(this.fly.anims.isPlaying && this.fly.anims.currentAnim.key === "fly_anim_right") {
                    this.fly.play("fly_anim_right", true);
                } else if (this.fly.anims.isPlaying && this.fly.anims.currentAnim.key === "fly_anim_left") {
                    this.fly.play("fly_anim_left", true);
                }
            }
            //move down
            if (course === 3) {
                this.enemy_fly.body.setVelocityY(30);
                if(this.fly.anims.isPlaying && this.fly.anims.currentAnim.key === "fly_anim_right") {
                    this.fly.play("fly_anim_right", true);
                } else if (this.fly.anims.isPlaying && this.fly.anims.currentAnim.key === "fly_anim_left") {
                    this.fly.play("fly_anim_left", true);
                }
            }
            if (course > 4) {
                this.enemy_fly.body.setVelocity(0);
                if(this.fly.anims.isPlaying && this.fly.anims.currentAnim.key === "fly_anim_right") {
                    this.fly.play("fly_anim_right", true);
                } else if (this.fly.anims.isPlaying && this.fly.anims.currentAnim.key === "fly_anim_left") {
                    this.fly.play("fly_anim_left", true);
                }
            }
        } 
    }
    moveEnemyDemon() {
        //follow player
        if (this.distDemon < 50) {
    
            //move right
            if (this.enemy_demon.x < this.player.x) {
                this.enemy_demon.body.setVelocityX(50);
                this.demon.play("demon_run_anim_right", true);                  
            }
            //move left
            if (this.enemy_demon.x > this.player.x) {
                this.enemy_demon.body.setVelocityX(-50);
                this.demon.play("demon_run_anim_left", true);
            }
            //move down
            if (this.enemy_demon.y < this.player.y) {
                this.enemy_demon.body.setVelocityY(50);
                if(this.demon.anims.isPlaying && this.demon.anims.currentAnim.key === "demon_idle_anim_right") {
                    this.demon.play("demon_run_anim_right", true);
                } else if (this.demon.anims.isPlaying && this.demon.anims.currentAnim.key === "demon_idle_anim_left") {
                    this.demon.play("demon_run_anim_left", true);
                }
            }
            //move up
            if (this.enemy_demon.y > this.player.y) {
                this.enemy_demon.body.setVelocityY(-50);
                if(this.demon.anims.isPlaying && this.demon.anims.currentAnim.key === "demon_idle_anim_right") {
                    this.demon.play("demon_run_anim_right", true);
                } else if (this.demon.anims.isPlaying && this.demon.anims.currentAnim.key === "demon_idle_anim_left") {
                    this.demon.play("demon_run_anim_left", true);
                }
            }
            

        } else {
            //wandering
            this.enemy_demon.body.setVelocity(0);
            let course = Math.floor(Math.random() * (Math.floor(15) - Math.ceil(0) + 1)) + Math.ceil(0);

            //move left
            if (course === 0) {
                this.enemy_demon.body.setVelocityX(-30);
                this.demon.play("demon_run_anim_left", true);
            }
            //move right
            if (course === 1) {
                this.enemy_demon.body.setVelocityX(30);
                this.demon.play("demon_run_anim_right", true);
                
            }
            //move up
            if (course === 2) {
                this.enemy_demon.body.setVelocityY(-30);
                if(this.demon.anims.isPlaying && this.demon.anims.currentAnim.key === "demon_idle_anim_right") {
                    this.demon.play("demon_run_anim_right", true);
                } else if (this.demon.anims.isPlaying && this.demon.anims.currentAnim.key === "demon_idle_anim_left") {
                    this.demon.play("demon_run_anim_left", true);
                }
            }
            //move down
            if (course === 3) {
                this.enemy_demon.body.setVelocityY(30);
                if(this.demon.anims.isPlaying && this.demon.anims.currentAnim.key === "demon_idle_anim_right") {
                    this.demon.play("demon_run_anim_right", true);
                } else if (this.demon.anims.isPlaying && this.demon.anims.currentAnim.key === "demon_idle_anim_left") {
                    this.demon.play("demon_run_anim_left", true);
                }
            }
            if (course > 4) {
                this.enemy_demon.body.setVelocity(0);
                if(this.demon.anims.isPlaying && this.demon.anims.currentAnim.key === "demon_run_anim_right") {
                    this.demon.play("demon_idle_anim_right", true);
                } else if (this.demon.anims.isPlaying && this.demon.anims.currentAnim.key === "demon_run_anim_left") {
                    this.demon.play("demon_idle_anim_left", true);
                }
            }
        } 
    }
        
    helthUiManager() {
        if (this.player.helth === 4) {
            this.helthBar.setTexture("ui_helth_4_bank");
        }
        if (this.player.helth === 3) {
            this.helthBar.setTexture("ui_helth_3_bank");
        }
        if (this.player.helth === 2) {
            this.helthBar.setTexture("ui_helth_2_bank");
        }
        if (this.player.helth === 1) {
            this.helthBar.setTexture("ui_helth_1_bank");
        }
        if (this.player.helth === 0) {
            this.helthBar.setTexture("ui_helth_empty");
        }
    }
    movePlayerManager() {
        this.player.body.setVelocity(0);
        this.helthBar.body.setVelocity(0);

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
            if (this.player.x - 80 !== this.helthBar.x) {
                this.helthBar.body.setVelocityX(0);
                this.helthBar.x = this.player.x - 80;
            } else {
                this.helthBar.body.setVelocityX(-70);
            }
        } else if (this.cursorKeys.right.isDown || this.analogCursorKeys.d.isDown) {
            this.player.body.setVelocityX(70);
            if (this.player.x - 80 !== this.helthBar.x) {
                this.helthBar.body.setVelocityX(0);
                this.helthBar.x = this.player.x - 80;
            } else {
                this.helthBar.body.setVelocityX(70);
            }
        }

        if (this.cursorKeys.up.isDown || this.analogCursorKeys.w.isDown) {
            this.player.body.setVelocityY(-70);
            if (this.player.y - 60 !== this.helthBar.y) {
                this.helthBar.body.setVelocityY(0);
                this.helthBar.y = this.player.y - 60;
            } else {
                this.helthBar.body.setVelocityY(-70);
            }
            
        } else if (this.cursorKeys.down.isDown || this.analogCursorKeys.s.isDown) {
            this.player.body.setVelocityY(70);
            if (this.player.y - 60 !== this.helthBar.y) {
                this.helthBar.body.setVelocityY(0);
                this.helthBar.y = this.player.y - 60;
            } else {
                this.helthBar.body.setVelocityY(70);
            }
        }
    }
}