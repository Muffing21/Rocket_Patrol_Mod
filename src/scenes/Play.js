class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        // load images/tile sprites
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('starfield', './assets/starfield.png');
        this.load.image('clouds', './assets/clouds.png');
        // load spritesheet
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
    }

    create() {
        let music = this.sound.add('bg_song');
        music.play();
        this.timeLeft = 60000;
        //song is copy right free music
        
        // add MY border
       // this.myBorder = this.add.tileSprite(0, 0, 680, 520, 'border').setOrigin(0, 0);

        
        // place tile sprite
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'clouds').setOrigin(0, 0);

        

        // green UI background
         this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 1.8, 0xFF0000).setOrigin(0, 0);//in game border
        // // white borders
         this.add.rectangle(0, 0, game.config.width, borderUISize, 0x00008b).setOrigin(0 ,0); //right border
         this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFF0000).setOrigin(0 ,0);//bottom rectangle
         this.add.rectangle(0, 0, borderUISize, game.config.height, 0x00008b).setOrigin(0 ,0); //left border
         this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0x00008b).setOrigin(0 ,0); //top border

        // add Rocket (p1)
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.2, 0);

        // add Rocket (p2)
        this.p2Rocket = new Rocket2(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.8, 0);


        // add Spaceships (x3)
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'spaceship', 0, 30).setOrigin(0, 0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'spaceship', 0, 20).setOrigin(0,0);
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'spaceship', 0, 10).setOrigin(0,0);

        // define keys
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);

        // animation config
        this.anims.create({
            

            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
            frameRate: 30
        });

        //particle emitter
        this.particles = this.add.particles('spaceship');
        this.emitter = this.particles.createEmitter();



        // initialize score && time counter
        this.p1Score = 0;
        this.p2Score = 0;
        this.p1Time = 45000;
        this.p2Time = 45000;

        // display score
        let scoreConfig = {
            fontFamily: 'serif',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig);
        this.timeLeft = this.add.text(borderPadding + borderUISize*6, borderUISize + borderPadding*2, this.p1Time, scoreConfig);
        
        this.backgroundColor = 'FFFF00';
        this.scoreRight = this.add.text(borderUISize*15 + borderPadding, borderUISize + borderPadding*2, this.p2Score, scoreConfig);
        this.timeRight = this.add.text(borderPadding + borderUISize*10, borderUISize + borderPadding*2, this.p2Time, scoreConfig);


        // GAME OVER flag
        this.gameOver = false;
        this.gameOverP2 = false;

        // 45-second play clock
        //game.settings.gameTimer
        //scoreConfig.fixedWidth = 0;
    
        
    }

    update(time, delta) {
        
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            //fixedWidth: 100
        }

        
        // very bad programming here but what can I do :(
        if(this.p1Time > 0){
            this.p1Time -= delta;
            this.timeLeft.text = (this.p1Time/1000).toFixed(2);
        }
        if(this.p2Time > 0){
            this.p2Time -= delta;
            this.timeRight.text = (this.p2Time/1000).toFixed(2);
        }
        if(this.p2Time < 1){
            this.p2Time = 0;
            this.gameOverP2 = true;
        }
        if(this.gameOver && this.gameOverP2){
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or A to Menu', scoreConfig).setOrigin(0.5);
            this.sound.get('bg_song').stop()
        }
        else{
            if(this.p1Time < 1){
            this.p1Time = 0;
            this.gameOver = true;
            }
            if(this.p2Time < 1){
                this.p2Time = 0;
                this.gameOverP2 = true;
            }
            if(this.gameOver && this.gameOverP2){
                this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
                this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or A to Menu', scoreConfig).setOrigin(0.5);
                this.sound.get('bg_song').stop()
            }
        }

        if((this.p1Time || this.p2Time) < 15000){
            this.x -= Phaser.Math.Between(5,20);
        }

      //  if(this.p1Time <= 0){
        //    this.clock = this.time.delayedCall(this.p1Time, () => {
                
                
                
          //  }, null, this);    
        //}
        
        // check key input for restart / menu
        if(this.gameOver && this.gameOverP2 && Phaser.Input.Keyboard.JustDown(keyR)) {
            
            this.scene.restart();
        }

        if(this.gameOver && this.gameOverP2 && Phaser.Input.Keyboard.JustDown(keyA)) {
     //       this.sound.get('bg_song').stop()
            this.scene.start("menuScene");
        }

        this.starfield.tilePositionX -= 4;  // update tile sprite

        if(!this.gameOver) {
            this.p1Rocket.update();             // update p1
            this.ship01.update();               // update spaceship (x3)
            this.ship02.update();
            this.ship03.update();
        }

        if(!this.gameOverP2){             
            this.p2Rocket.update();             // update p2
            this.ship01.update();               // update spaceship (x3)
            this.ship02.update();
            this.ship03.update();
        }

        // check collisions
        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);
        }
        if (this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
        }
        if (this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
        }
        
        if(this.checkCollision(this.p2Rocket, this.ship03)) {
            this.p2Rocket.reset();
            this.shipExplode2(this.ship03);
        }
        if (this.checkCollision(this.p2Rocket, this.ship02)) {
            this.p2Rocket.reset();
            this.shipExplode2(this.ship02);
        }
        if (this.checkCollision(this.p2Rocket, this.ship01)) {
            this.p2Rocket.reset();
            this.shipExplode2(this.ship01);

        }
    }

    checkCollision(rocket, ship) {
        // simple AABB checking
        if (rocket.x < ship.x + ship.width && 
            rocket.x + rocket.width > ship.x && 
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship. y) {
                return true;
        } else {
            return false;
        }
    }

    

    shipExplode(ship) {
        // temporarily hide ship
        ship.alpha = 0;                         
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');             // play explode animation
        boom.on('animationcomplete', () => {    // callback after anim completes
            ship.reset();                         // reset ship position
            ship.alpha = 1;                       // make ship visible again
            boom.destroy();                       // remove explosion sprite
        });
        // score add and repaint
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score; 
        this.p1Time += 2000;
        this.sound.play('sfx_explosion');
      }

    shipExplode2(ship){
         // temporarily hide ship
        ship.alpha = 0;                         
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');             // play explode animation
        boom.on('animationcomplete', () => {    // callback after anim completes
            ship.reset();                         // reset ship position
            ship.alpha = 1;                       // make ship visible again
            boom.destroy();                       // remove explosion sprite
        });
        // score add and repaint
        this.p2Score += ship.points;
        this.scoreRight.text = this.p2Score;
        this.p2Time += 2000;
        this.sound.play('sfx_explosion');
      }
}