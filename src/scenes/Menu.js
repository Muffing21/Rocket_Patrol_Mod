class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        // load audio
        this.load.audio('sfx_select', './assets/blip_select12.wav');
        this.load.audio('sfx_explosion', './assets/explosion38.wav');
        this.load.audio('sfx_rocket', './assets/rocket_shot.wav');
        this.load.audio('bg_song', './assets/shooting_stars.mp3');
        this.load.image('menu_bg', './assets/rocket_bg.png');
    }

    create() {
        // menu text configuration
        let menuConfig = {
            fontFamily: 'courier',
            fontSize: '28px',
            backgroundColor: '#ADD8E6',
            color: '#006400',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        
        this.menu_background = this.add.tileSprite(0, 0, 640, 480, 'menu_bg').setOrigin(0, 0);
        // show menu text
        menuConfig.fontSize = '75px';        //changing title art
        this.add.text(game.config.width/2, game.config.height/4 - borderUISize - borderPadding, 'ROCKET PATROL', menuConfig).setOrigin(0.5);
        menuConfig.fontSize = '30px';
        menuConfig.fontFamily = 'serif'
        menuConfig.backgroundColor = "#00FF00"
        
        this.add.text(game.config.width/2, game.config.height/2, 'P1 Use A-D keys to move & (SPACE) to fire', menuConfig).setOrigin(0.5);
        
        
        this.add.text(game.config.width/2, game.config.height/1.6, 'P2 use LEFT-RIGHT arrows to move & (UP) to fire', menuConfig).setOrigin(0.5);
        
        menuConfig.backgroundColor = '#ff0000';
        this.add.text(game.config.width/2, game.config.height/1.2 + borderUISize + borderPadding, 'Press A for Novice or D for Expert', menuConfig).setOrigin(0.5);

        // define keys
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyA)) {
          // Novice mode
          game.settings = {
            spaceshipSpeed: 3,
            gameTimer: 45000 
          }
          this.sound.play('sfx_select');
          
          this.scene.start("playScene");    
        }
        if (Phaser.Input.Keyboard.JustDown(keyD)) {
          // Expert mode
          game.settings = {
            spaceshipSpeed: 4,
            gameTimer: 30000   
          }
          this.sound.play('sfx_select');
          this.scene.start("playScene");    
        }
      }
}