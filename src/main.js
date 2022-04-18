//By Wichapas Pichetpongsa, Lo-Fi vibes & chill Rocket Patrol, 4/182022, 14 hours to complete(in one day no sleep) 

let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [ Menu, Play ]
}

let game = new Phaser.Game(config);

// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

// reserve keyboard variables
let keySPACE, keyR, keyA, keyD, keyUP, keyLEFT, keyRIGHT; 


// Allow the player to control the Rocket after it's fired (5): I simply allowed the player to move slightly since making the ability to move mid shoot is quite OP

// Add your own (copyright-free) background music to the Play scene (5): I added a background music that is listed as copy right free music

//Create a new scrolling tile sprite for the background (5): drawn the background in Adobe photoshop. It is the sky with clouds moving

// Display the time remaining (in seconds) on the screen (10): I displayed the timer on the top of the screen for both players

// Replace the UI borders with new artwork (10): I'm not sure if what I did counts as changing the UI borders. (Unsure about instructions) I changed the colors which makes it easier for players to distinguish

// Create a new title screen (e.g., new artwork, typography, layout) (10): drawn a background with clouds (lowkey changes the feeling on the game to be less depressing) and rocket Icons for free use from flaticon
// changed Fonts, text colors, text size, box colors etc...

// Implement a simultaneous two-player mode (30): I implemented this by having one player use the A-D key and Space bar to shoot while the other uses left right arrow keys and up to shoot

// Implement a new timing/scoring mechanism that adds time to the clock for 
// successful hits (20): I implemented this by having the time increment by 2 seconds for every shuttle you hit. An idea of reinforcing loop where the winning player will keep gaining advantage.
//(better skills = better rewards)

//total: 95

//known bugs: music for some reason playing twice after the first retry or main menu
//I would have loved to make my own rocket, spaceship etc but I dont have the time nor the skill